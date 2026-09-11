import { MessageBus } from '@dcl/sdk/message-bus'
import { GameSnapshot } from '../game/gameState'

export type GameMessage = {
  snapshot: GameSnapshot
  sender?: string
}

const CHANNEL = 'neon-reverie-state-v2'

export class NetworkState {
  private readonly bus = new MessageBus()
  private snapshot: GameSnapshot
  private listener: ((snapshot: GameSnapshot) => void) | undefined

  constructor(initial: GameSnapshot) {
    this.snapshot = cloneSnapshot(initial)
    this.bus.on(CHANNEL, (message: GameMessage) => {
      this.snapshot = cloneSnapshot(message.snapshot)
      this.listener?.(this.snapshot)
    })
  }

  publish(snapshot: GameSnapshot): void {
    this.snapshot = cloneSnapshot(snapshot)
    this.bus.emit(CHANNEL, { snapshot: this.snapshot })
  }

  onSnapshot(listener: (snapshot: GameSnapshot) => void): void {
    this.listener = listener
  }

  getSnapshot(): GameSnapshot {
    return cloneSnapshot(this.snapshot)
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
