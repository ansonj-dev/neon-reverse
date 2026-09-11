import { GameSnapshot } from './gameState'

export class LoopSystem {
  private timer = 0
  private readonly onLoopTwo: () => void
  private readonly onFinalRoom: () => void

  constructor(onLoopTwo: () => void, onFinalRoom: () => void) {
    this.onLoopTwo = onLoopTwo
    this.onFinalRoom = onFinalRoom
  }

  startTransition(snapshot: GameSnapshot): void {
    snapshot.state = 'LOOP_TRANSITION'
    this.timer = 4
  }

  update(dt: number, snapshot: GameSnapshot): void {
    if (snapshot.state !== 'LOOP_TRANSITION') return
    this.timer -= dt
    if (this.timer > 0) return
    if (snapshot.loop === 1) {
      snapshot.loop = 2
      snapshot.state = 'LOOP_TWO'
      this.onLoopTwo()
    } else {
      snapshot.state = 'FINAL_ROOM'
      this.onFinalRoom()
    }
  }
}
