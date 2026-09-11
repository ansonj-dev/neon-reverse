import { GameState, SwitchId } from './types'

export interface GameSnapshot {
  state: GameState
  loop: number
  switches: Record<SwitchId, boolean>
  memories: Record<number, boolean>
  proximitySatisfied: boolean
  intruderActive: boolean
  completed: boolean
}

export const initialSnapshot: GameSnapshot = {
  state: 'LOBBY',
  loop: 1,
  switches: { alpha: false, beta: false, gamma: false },
  memories: { 1: false, 2: false, 3: false },
  proximitySatisfied: false,
  intruderActive: false,
  completed: false
}
