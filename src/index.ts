import { engine } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { buildLobby } from './world/lobby'
import { buildMaze } from './world/maze'
import { buildLoopTwo } from './world/loopTwo'
import { buildFinalRoom } from './world/finalRoom'
import { createSwitch } from './entities/switch'
import { createMemory } from './entities/memory'
import { createDoor } from './entities/door'
import { createIntruder } from './entities/intruder'
import { PuzzleSystem } from './game/puzzleSystem'
import { MemorySystem } from './game/memorySystem'
import { IntruderSystem } from './game/intruderSystem'
import { LoopSystem } from './game/loopSystem'
import { GameManager } from './game/gameManager'
import { NetworkState } from './networking/networkState'
import { setupHud } from './ui/hud'
import { countNearbyPlayers, proximitySystem } from './game/proximitySystem'
import { createBox } from './entities/primitive'
import { GameSnapshot, initialSnapshot } from './game/gameState'

export function main(): void {
  buildMaze()

  let manager: GameManager
  let started = false
  let echoTimer = 0
  let echoReady = false

  const door = createDoor(Vector3.create(8, 1.75, 10.3))
  const intruderEntity = createIntruder()
  const network = new NetworkState(initialSnapshot)

  const puzzle = new PuzzleSystem(door, () => manager?.triggerIntruder())
  const memories = new MemorySystem(() => undefined)
  const intruder = new IntruderSystem(intruderEntity)
  const loop = new LoopSystem(
    () => {
      buildLoopTwo()
      puzzle.reset(manager.snapshot)
      memories.reset(manager.snapshot)
      manager.snapshot.proximitySatisfied = false
    },
    () => buildFinalRoom(() => manager.escape())
  )

  manager = new GameManager(puzzle, memories, intruder, loop, network)

  buildLobby(() => {
    if (started) return
    started = true
    manager.start()
  })

  puzzle.registerSwitch(createSwitch('alpha', Vector3.create(4, 0.8, 7.3), (id) => {
    if (manager.snapshot.proximitySatisfied || echoReady) manager.pressSwitch(id)
  }))
  puzzle.registerSwitch(createSwitch('beta', Vector3.create(12, 0.8, 8.8), (id) => {
    if (manager.snapshot.proximitySatisfied || echoReady) manager.pressSwitch(id)
  }))
  puzzle.registerSwitch(createSwitch('gamma', Vector3.create(8, 0.8, 12.8), (id) => {
    if (manager.snapshot.proximitySatisfied || echoReady) manager.pressSwitch(id)
  }))

  memories.register(createMemory(1, Vector3.create(2.8, 0.8, 8.8), (id) => manager.collectMemory(id)))
  memories.register(createMemory(2, Vector3.create(13.2, 0.8, 10.8), (id) => manager.collectMemory(id)))
  memories.register(createMemory(3, Vector3.create(8, 0.8, 14.0), (id) => manager.collectMemory(id)))

  createBox({
    position: Vector3.create(8, 0.3, 5.2),
    scale: Vector3.create(4, 0.15, 4),
    color: Color4.create(0.15, 0.65, 1, 1),
    collider: false
  })

  setupHud(() => manager.snapshot, countNearbyPlayers)
  manager.installSystems()
  network.onSnapshot((snapshot) => manager.applyRemoteSnapshot(snapshot))

  engine.addSystem((dt: number) => {
    if (!started) return
    proximitySystem(manager.snapshot, (satisfied) => manager.markProximity(satisfied))

    if (countNearbyPlayers() < 2) echoTimer += dt
    else echoTimer = 0

    // A solo visitor can complete the core loop using a lightweight "memory echo" fallback.
    // The social route remains the preferred path and is explicitly surfaced in the HUD.
    if (echoTimer >= 8 && manager.snapshot.state !== 'COMPLETED') {
      echoReady = true
      if (!manager.snapshot.proximitySatisfied) manager.markProximity(true)
    }
    if (countNearbyPlayers() >= 2) echoReady = false
  })

  // Keep a local reference alive for generated builds that tree-shake aggressively.
  const initial: GameSnapshot = initialSnapshot
  void initial
}
