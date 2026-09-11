export type GameState =
  | 'LOBBY'
  | 'COUNTDOWN'
  | 'LOOP_ONE'
  | 'INTRUDER_ACTIVE'
  | 'LOOP_TRANSITION'
  | 'LOOP_TWO'
  | 'FINAL_ROOM'
  | 'COMPLETED'

export type SwitchId = 'alpha' | 'beta' | 'gamma'
