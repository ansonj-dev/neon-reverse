import { GameSnapshot } from './gameState'
import { SwitchId } from './types'
import { SwitchHandle } from '../entities/switch'
import { DoorHandle } from '../entities/door'

export class PuzzleSystem {
  private readonly switches = new Map<SwitchId, SwitchHandle>()
  private readonly door: DoorHandle
  private readonly onProgress: () => void

  constructor(door: DoorHandle, onProgress: () => void) {
    this.door = door
    this.onProgress = onProgress
  }

  registerSwitch(handle: SwitchHandle): void {
    this.switches.set(handle.id, handle)
  }

  press(id: SwitchId, snapshot: GameSnapshot): void {
    if (snapshot.switches[id]) return
    snapshot.switches[id] = true
    this.switches.get(id)?.setActive(true)
    if (Object.values(snapshot.switches).every(Boolean)) {
      this.door.open()
      this.onProgress()
    }
  }

  reset(snapshot: GameSnapshot): void {
    for (const id of Object.keys(snapshot.switches) as SwitchId[]) {
      snapshot.switches[id] = false
      this.switches.get(id)?.setActive(false)
    }
    this.door.close()
  }

  apply(snapshot: GameSnapshot): void {
    const complete = Object.values(snapshot.switches).every(Boolean)
    for (const id of Object.keys(snapshot.switches) as SwitchId[]) {
      this.switches.get(id)?.setActive(snapshot.switches[id])
    }
    if (complete) this.door.open()
    else this.door.close()
  }
}
