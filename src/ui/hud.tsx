import ReactEcs, { Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { GameSnapshot } from '../game/gameState'

export function setupHud(getSnapshot: () => GameSnapshot, getPlayers: () => number): void {
  ReactEcsRenderer.setUiRenderer(() => <Hud getSnapshot={getSnapshot} getPlayers={getPlayers} />, {
    virtualWidth: 1920,
    virtualHeight: 1080
  })
}

function Hud(props: { getSnapshot: () => GameSnapshot; getPlayers: () => number }) {
  const state = props.getSnapshot()
  const memories = Object.values(state.memories).filter(Boolean).length
  const switches = Object.values(state.switches).filter(Boolean).length
  const players = props.getPlayers()
  const message = getMessage(state, players)
  const accent = state.completed ? Color4.create(0.1, 1, 0.7, 1) : Color4.create(0.2, 1, 1, 1)

  return (
    <UiEntity
      uiTransform={{
        positionType: 'absolute',
        position: { left: 32, top: 30 },
        width: 720,
        height: 170,
        flexDirection: 'column',
        padding: 22
      }}
      uiBackground={{ color: Color4.create(0.01, 0.02, 0.07, 0.86) }}
    >
      <Label value='NEON REVERIE' fontSize={30} color={accent} />
      <Label value={`LOOP ${state.loop}   •   FRIENDS ${players}   •   SWITCHES ${switches}/3   •   MEMORIES ${memories}/3`} fontSize={20} />
      <Label value={message} fontSize={22} />
    </UiEntity>
  )
}

function getMessage(state: GameSnapshot, players: number): string {
  if (state.completed) return 'ESCAPED — the loop remembers you. Play again with a friend.'
  if (state.state === 'LOBBY') return 'Tap ENTER THE MEMORY MAZE. Two players unlock the full resonance.'
  if (state.state === 'COUNTDOWN') return 'MEMORY SYNC — get ready to enter the maze.'
  if (state.state === 'INTRUDER_ACTIVE') return 'INTRUDER ACTIVE — reunite inside the signal.'
  if (state.state === 'LOOP_TRANSITION') return 'MEMORY SHIFT — your actions changed the next loop.'
  if (state.state === 'FINAL_ROOM') {
    if (memoriesCollected(state) < 3) return 'FINAL MEMORY — collect every fragment before you escape.'
    if (!state.proximitySatisfied) return 'FINAL MEMORY — stand together at the escape signal.'
    return 'FINAL MEMORY — tap ESCAPE together.'
  }
  if (players < 2) return 'ECHO MODE — invite a friend for the true cooperative route.'
  if (memoriesCollected(state) < 3) return 'MEMORY — collect the remaining fragments.'
  if (!state.proximitySatisfied) return 'PROXIMITY — stay within the neon signal.'
  if (!Object.values(state.switches).every(Boolean)) return 'CO-OP — activate the three switches together.'
  return 'Find the fragments. Stay close. Escape the loop.'
}

function memoriesCollected(state: GameSnapshot): number {
  return Object.values(state.memories).filter(Boolean).length
}
