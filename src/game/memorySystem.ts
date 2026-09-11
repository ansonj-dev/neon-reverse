import { MemoryHandle } from '../entities/memory'
import { GameSnapshot } from './gameState'

export class MemorySystem {
  private readonly memories = new Map<number, MemoryHandle>()
  private readonly onAllCollected: () => void

  constructor(onAllCollected: () => void) {
    this.onAllCollected = onAllCollected
  }

  register(memory: MemoryHandle): void {
    this.memories.set(memory.id, memory)
  }

  collect(id: number, snapshot: GameSnapshot): void {
    if (snapshot.memories[id]) return
    snapshot.memories[id] = true
    this.memories.get(id)?.collect()
    if (Object.values(snapshot.memories).every(Boolean)) this.onAllCollected()
  }

  reset(snapshot: GameSnapshot): void {
    for (const id of Object.keys(snapshot.memories)) {
      snapshot.memories[Number(id)] = false
      this.memories.get(Number(id))?.reset()
    }
  }

  apply(snapshot: GameSnapshot): void {
    for (const [id, memory] of this.memories) {
      if (snapshot.memories[id]) memory.collect()
      else memory.reset()
    }
  }
}
