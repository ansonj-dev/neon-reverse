import { engine } from '@dcl/sdk/ecs'
import { GameSnapshot, initialSnapshot } from './gameState'
import { SwitchId } from './types'
import { PuzzleSystem } from './puzzleSystem'
import { MemorySystem } from './memorySystem'
import { IntruderSystem } from './intruderSystem'
import { LoopSystem } from './loopSystem'
import { NetworkState } from '../networking/networkState'

export class GameManager {
  readonly snapshot: GameSnapshot = cloneSnapshot(initialSnapshot)
  private readonly puzzle: PuzzleSystem
  private readonly memories: MemorySystem
  private readonly intruder: IntruderSystem
  private readonly loop: LoopSystem
  private readonly network: NetworkState
  private onHudUpdate: (() => void) | undefined
  private countdownRemaining = 0

  constructor(
    puzzle: PuzzleSystem,
    memories: MemorySystem,
    intruder: IntruderSystem,
    loop: LoopSystem,
    network: NetworkState
  ) {
    this.puzzle = puzzle
    this.memories = memories
    this.intruder = intruder
    this.loop = loop
    this.network = network
  }

  setHudUpdate(callback: () => void): void {
    this.onHudUpdate = callback
  }

  start(): void {
    this.snapshot.state = 'COUNTDOWN'
    this.countdownRemaining = 3
    this.publish()
  }

  pressSwitch(id: SwitchId): void {
    if (this.snapshot.state !== 'LOOP_ONE' && this.snapshot.state !== 'LOOP_TWO') return
    this.puzzle.press(id, this.snapshot)
    this.publish()
  }

  collectMemory(id: number): void {
    if (this.snapshot.state !== 'LOOP_ONE' && this.snapshot.state !== 'LOOP_TWO') return
    this.memories.collect(id, this.snapshot)
    this.publish()
  }

  triggerIntruder(): void {
    if (this.snapshot.state === 'LOOP_ONE') {
      this.snapshot.state = 'INTRUDER_ACTIVE'
      this.intruder.activate(this.snapshot)
      this.publish()
      return
    }
    if (this.snapshot.state === 'LOOP_TWO') {
      this.loop.startTransition(this.snapshot)
      this.publish()
    }
  }

  reunite(): void {
    if (this.snapshot.state !== 'INTRUDER_ACTIVE') return
    this.intruder.deactivate(this.snapshot)
    this.loop.startTransition(this.snapshot)
    this.publish()
  }

  complete(): void {
    if (this.snapshot.completed || this.snapshot.state !== 'FINAL_ROOM') return
    this.snapshot.state = 'COMPLETED'
    this.snapshot.completed = true
    this.intruder.deactivate(this.snapshot)
    this.publish()
  }

  escape(): void {
    if (this.snapshot.state !== 'FINAL_ROOM') return
    if (!Object.values(this.snapshot.memories).every(Boolean) || !this.snapshot.proximitySatisfied) return
    this.complete()
  }

  update(dt: number): void {
    if (this.snapshot.state === 'COUNTDOWN') {
      this.countdownRemaining -= dt
      if (this.countdownRemaining <= 0) {
        this.snapshot.state = 'LOOP_ONE'
        this.publish()
      }
      return
    }
    this.intruder.update(dt, this.snapshot)
    if (this.snapshot.state === 'INTRUDER_ACTIVE' && this.snapshot.proximitySatisfied) {
      this.reunite()
      return
    }
    this.loop.update(dt, this.snapshot)
  }

  markProximity(satisfied: boolean): void {
    if (this.snapshot.proximitySatisfied === satisfied) return
    this.snapshot.proximitySatisfied = satisfied
    if (satisfied && this.snapshot.state === 'INTRUDER_ACTIVE') this.reunite()
    else this.publish()
  }

  applyRemoteSnapshot(snapshot: GameSnapshot): void {
    if (snapshot.state === 'COMPLETED' && this.snapshot.completed) return
    Object.assign(this.snapshot, cloneSnapshot(snapshot))
    this.puzzle.apply(this.snapshot)
    this.memories.apply(this.snapshot)
    if (this.snapshot.intruderActive) this.intruder.activate(this.snapshot)
    else this.intruder.deactivate(this.snapshot)
    this.onHudUpdate?.()
  }

  installSystems(): void {
    engine.addSystem((dt: number) => this.update(dt))
  }

  private publish(): void {
    this.network.publish(this.snapshot)
    this.onHudUpdate?.()
  }
}

function cloneSnapshot(snapshot: GameSnapshot): GameSnapshot {
  return {
    state: snapshot.state,
    loop: snapshot.loop,
    switches: { ...snapshot.switches },
    memories: { ...snapshot.memories },
    proximitySatisfied: snapshot.proximitySatisfied,
    intruderActive: snapshot.intruderActive,
    completed: snapshot.completed
  }
}
