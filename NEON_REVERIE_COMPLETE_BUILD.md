# NEON REVERIE
## Complete Build Specification for a Mobile-First Multiplayer Decentraland World

> **Tagline:** Remember. Stay Close. Escape the Loop.
>
> **Concept:** NEON REVERIE is a social multiplayer maze set inside a surreal memory simulation. Players cooperate to solve proximity-based puzzles, collect memory fragments, survive an Intruder, and use the consequences of previous loops to escape.

---

# 1. Product Definition

## 1.1 What we are building

NEON REVERIE is a small but polished multiplayer Decentraland World. It is not intended to be a giant open-world metaverse.

The experience is deliberately focused:

1. Players enter a neon memory world.
2. Players meet other players.
3. The game explains the rules with almost no text.
4. Players enter a maze.
5. They solve cooperative puzzles.
6. Some doors only respond when players are close together.
7. Separating from the group increases danger.
8. An Intruder appears and pressures players to reunite.
9. Players collect memory fragments.
10. The maze resets into a new loop.
11. Previous actions can be represented by ghost/memory traces.
12. The final puzzle requires cooperation and proximity.
13. Players escape and receive a completion result.

The experience must remain playable on desktop and mobile.

---

# 2. Design Pillars

## 2.1 Social first

The game should make players naturally interact with each other.

Do not build a beautiful room that happens to contain multiplayer avatars. Multiplayer must change how the game is played.

Examples:

- doors require two players;
- players must stay within a radius;
- one player can activate a mechanism while another crosses a path;
- memory fragments can be distributed between routes;
- the Intruder becomes more dangerous when the group separates.

## 2.2 Mobile first

Every mechanic must be usable with:

- touch movement;
- a single interaction button;
- readable UI;
- large targets;
- short text;
- no keyboard-only requirement;
- no precision mouse requirement.

## 2.3 Small world, high polish

Prefer:

- one main maze;
- one lobby;
- one memory chamber;
- one final chamber;
- a limited number of assets.

Avoid:

- huge maps;
- unnecessary NPCs;
- dozens of mechanics;
- heavy particle effects everywhere;
- large uncompressed textures;
- complicated inventory systems.

## 2.4 Replayability

The loop mechanic should give players a reason to run the experience again.

The second run can:

- change the route;
- reveal a different memory;
- change puzzle states;
- expose a different shortcut;
- change where the Intruder appears.

---

# 3. Keyword-to-Mechanic Mapping

The original creative keywords are directly incorporated into the design.

| Keyword | NEON REVERIE interpretation |
|---|---|
| TRON | Neon grid, light trails, glowing cyber architecture |
| Maze Runner | Main navigation and escape structure |
| Inception | Nested reality, previous loops affecting the next loop |
| Coco | Memory, identity, remembrance, colorful memory fragments |
| Proximity | Players must stay near each other for important mechanics |
| Intrusion | The Intruder enters when the group violates proximity/rules |
| Loop | The maze resets and evolves |

The project should be inspired by these themes, not copy protected characters, environments, music, logos, or artwork.

---

# 4. Player Experience

## 4.1 Opening

Player enters the World.

They see:

- a dark neon environment;
- a large NEON REVERIE title;
- a simple instruction;
- a visible portal into the maze.

Recommended opening text:

> MEMORY SYSTEM ONLINE  
> Stay close.  
> Find the fragments.  
> Escape the loop.

The player should understand the objective within approximately 10–20 seconds.

## 4.2 Lobby

The lobby is a circular safe area.

Suggested layout:

```text
                    MEMORY GATE
                         |
                         |
              +----------+----------+
              |                     |
              |      LOBBY          |
              |                     |
       [RULE] |     players         | [MEMORY]
              |                     |
              +----------+----------+
                         |
                    START PORTAL
```

The lobby should contain:

- start portal;
- objective sign;
- small visual demonstration of proximity;
- memory display;
- optional leaderboard/completion panel.

## 4.3 Maze

The first playable maze should have:

- 3 cooperative switches;
- 1 proximity gate;
- 3 memory fragments;
- 1 Intruder trigger;
- 1 exit;
- 1 loop transition.

Do not make the maze enormous.

A compact maze is better because:

- players can see each other;
- proximity matters;
- performance is easier;
- mobile navigation is easier;
- testing is faster.

---

# 5. Core Game Loop

```text
ENTER WORLD
    |
MEET PLAYERS
    |
READ/SEE OBJECTIVE
    |
ENTER MAZE
    |
FIND MEMORY
    |
SOLVE PUZZLE
    |
STAY CLOSE
    |
OPEN GATE
    |
INTRUDER EVENT
    |
REUNITE
    |
FIND EXIT
    |
LOOP TRANSITION
    |
MAZE STATE CHANGES
    |
COLLECT REMAINING MEMORIES
    |
FINAL CO-OP PUZZLE
    |
ESCAPE
```

---

# 6. Game State Model

Use an explicit state machine instead of scattered boolean variables.

Suggested states:

```ts
export type GameState =
  | 'LOBBY'
  | 'COUNTDOWN'
  | 'LOOP_ONE'
  | 'INTRUDER_ACTIVE'
  | 'LOOP_TRANSITION'
  | 'LOOP_TWO'
  | 'FINAL_ROOM'
  | 'COMPLETED'
```

The state machine should control:

- maze visibility;
- puzzle availability;
- Intruder;
- timer;
- memory progression;
- exit;
- UI.

Do not allow unrelated systems to independently decide whether the game is finished.

---

# 7. Suggested Project Structure

```text
neon-reverie/
├── assets/
│   ├── models/
│   ├── textures/
│   ├── audio/
│   └── materials/
├── src/
│   ├── index.ts
│   ├── game/
│   │   ├── gameState.ts
│   │   ├── gameManager.ts
│   │   ├── puzzleSystem.ts
│   │   ├── proximitySystem.ts
│   │   ├── intruderSystem.ts
│   │   ├── memorySystem.ts
│   │   ├── loopSystem.ts
│   │   └── objectiveSystem.ts
│   ├── world/
│   │   ├── lobby.ts
│   │   ├── maze.ts
│   │   ├── loopTwo.ts
│   │   └── finalRoom.ts
│   ├── entities/
│   │   ├── door.ts
│   │   ├── switch.ts
│   │   ├── memory.ts
│   │   ├── intruder.ts
│   │   └── portal.ts
│   ├── networking/
│   │   ├── networkState.ts
│   │   ├── playerState.ts
│   │   └── messages.ts
│   ├── ui/
│   │   ├── ui.tsx
│   │   ├── hud.tsx
│   │   └── screens.tsx
│   └── utils/
│       ├── distance.ts
│       ├── timer.ts
│       └── random.ts
├── scene.json
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
```

The exact starter project structure can vary with the current Decentraland template. Do not delete generated configuration files unless you know what they do.

---

# 8. Development Environment

Use:

- Node.js LTS compatible with the current Decentraland SDK tooling;
- npm;
- Git;
- GitHub;
- VS Code or another TypeScript editor;
- Decentraland Creator Hub when using the visual workflow;
- Decentraland SDK7 for code;
- a wallet capable of signing the World deployment;
- a Decentraland NAME/ENS name for World deployment.

Use the current stable Decentraland SDK rather than `@next` unless a specific feature requires the preview release.

Official SDK documentation:

https://docs.decentraland.org/creator/scenes-sdk7/

SDK coding overview:

https://docs.decentraland.org/sdk-reference/SDK-Overview/

---

# 9. Creating the Scene

Use the official Decentraland scene creation workflow.

A typical SDK7 project contains an entry point such as:

```ts
import { engine } from '@dcl/sdk/ecs'

export function main() {
  // Initialize the scene.
}
```

Entities are created through the ECS.

A minimal entity example:

```ts
import { engine, Transform, MeshRenderer } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

const cube = engine.addEntity()

Transform.create(cube, {
  position: Vector3.create(8, 1, 8),
})

MeshRenderer.setBox(cube)
```

The important concept is:

- Entity = object identity.
- Component = data attached to the entity.
- System = function that updates behavior over time.

Decentraland systems can run every tick, so avoid expensive full-world scans.

---

# 10. Scene Initialization

The entry point should initialize the world in a predictable order.

Recommended architecture:

```ts
import { engine } from '@dcl/sdk/ecs'
import { createLobby } from './world/lobby'
import { createMaze } from './world/maze'
import { createGameManager } from './game/gameManager'

export function main() {
  createLobby()
  createMaze()
  createGameManager()
}
```

If a system is needed:

```ts
engine.addSystem(mySystem)
```

Keep each system focused.

Good:

```text
proximitySystem
puzzleSystem
intruderSystem
timerSystem
uiSystem
```

Bad:

```text
everythingSystem
```

---

# 11. World Layout

Use a coordinate system and document it.

Example:

```text
World: 32 x 32 logical meters

(0,0) ------------------------ (32,0)
 |                               |
 |            LOBBY              |
 |                               |
 |--------- MAZE GATE -----------|
 |                               |
 |             MAZE              |
 |                               |
 |                         EXIT  |
 |                               |
 |-------------------------------|
(0,32) ----------------------- (32,32)
```

Suggested zones:

```text
Z1: Lobby
Z2: Maze entrance
Z3: Puzzle room
Z4: Memory corridor
Z5: Proximity gate
Z6: Intruder arena
Z7: Loop chamber
Z8: Final room
```

Use simple geometry first.

---

# 12. Visual Direction

## 12.1 TRON-inspired layer

Use:

- dark surfaces;
- emissive-looking neon materials;
- grid lines;
- glowing paths;
- cyan/magenta/purple style accents.

Do not use official TRON assets or logos.

## 12.2 Memory layer

Use original visual motifs:

- floating memory shards;
- flowers;
- lantern-like lights;
- photographs/abstract memory panels;
- warm glowing particles.

Do not copy characters or copyrighted film assets.

## 12.3 Dream layer

Use:

- floating platforms;
- impossible corridors;
- mirrored routes;
- doors leading to unexpected spaces;
- subtle scale changes.

---

# 13. Asset Strategy

For the MVP, use mostly:

- primitive boxes;
- planes;
- cylinders;
- simple GLB models;
- small textures;
- procedural-looking materials;
- a small number of custom models.

Asset rules:

1. Prefer low-poly models.
2. Keep textures small.
3. Avoid unnecessary animations.
4. Reuse meshes.
5. Avoid dozens of unique materials.
6. Compress assets where appropriate.
7. Never ship unused assets.

The game should look good through composition and lighting rather than asset quantity.

---

# 14. Player Position

For local player position, Decentraland exposes the player entity.

Example pattern:

```ts
import { engine, Transform } from '@dcl/sdk/ecs'

function playerPositionSystem() {
  const transform = Transform.getOrNull(engine.PlayerEntity)

  if (!transform) return

  const position = transform.position

  // Use position.x, position.y, position.z
}

engine.addSystem(playerPositionSystem)
```

Do not access player/camera entities too early during initial module loading. Use them after scene initialization, inside `main()`-called code or systems.

---

# 15. Proximity System

Proximity is one of the main mechanics.

Define:

```ts
const PROXIMITY_RADIUS = 5
```

The important question is:

> Which players are close enough to count as a group?

For a small MVP, the local scene can use a simple distance function.

```ts
export function distanceXZ(
  a: { x: number; z: number },
  b: { x: number; z: number }
): number {
  const dx = a.x - b.x
  const dz = a.z - b.z

  return Math.sqrt(dx * dx + dz * dz)
}
```

For two players:

```text
distance <= 5m
        |
       YES
        |
   GROUP LINKED
        |
   door/puzzle can activate
```

When the distance becomes greater:

```text
distance > 5m
        |
       YES
        |
 PROXIMITY LOST
        |
 warning + Intruder pressure
```

For actual multiplayer, do not rely on a locally invented remote-player position if authoritative validation is required. Use Decentraland networking/server-authoritative capabilities where the mechanic must be trusted.

---

# 16. Proximity UI

Show a compact status:

```text
PROXIMITY
● LINKED
```

or:

```text
PROXIMITY
○ TOO FAR
```

Do not cover the screen with HUD elements.

The status should be visible but secondary to the environment.

---

# 17. Cooperative Switches

Create three switches:

```text
Switch A
Switch B
Switch C
```

Each switch can be activated by interaction.

Example state:

```ts
export interface SwitchState {
  id: string
  activated: boolean
}
```

When all three are activated:

```ts
if (switchA && switchB && switchC) {
  openMainDoor()
}
```

Better:

```ts
const switches = new Map<string, boolean>()

export function isPuzzleSolved() {
  return (
    switches.get('A') === true &&
    switches.get('B') === true &&
    switches.get('C') === true
  )
}
```

---

# 18. Click/Interaction System

Decentraland supports pointer interaction.

A simplified pattern:

```ts
import {
  engine,
  MeshRenderer,
  MeshCollider,
  Transform,
  pointerEventsSystem,
  PointerEventType,
  InputAction,
  PointerEvents
} from '@dcl/sdk/ecs'
```

The exact API may differ with SDK updates, so verify the current SDK reference when implementing.

Conceptually:

```text
PLAYER
  |
  | tap/click
  v
INTERACTION TARGET
  |
  v
ACTION HANDLER
  |
  v
UPDATE GAME STATE
```

For mobile, the interaction target must be physically and visually obvious.

---

# 19. Door Mechanic

A door has:

```ts
export interface DoorState {
  open: boolean
  requiredSwitches: string[]
  requiresProximity: boolean
}
```

Door logic:

```text
all switches active?
       |
      YES
       |
players close?
       |
      YES
       |
   OPEN DOOR
```

If players are too far apart:

```text
Door remains locked
UI: "Stay close"
```

---

# 20. Memory Fragments

Create three memory fragments:

```text
MEMORY_01
MEMORY_02
MEMORY_03
```

Each memory has:

```ts
export interface MemoryFragment {
  id: string
  collected: boolean
  title: string
  message: string
}
```

Example messages:

```text
MEMORY 01
"The maze remembers your footsteps."

MEMORY 02
"You have been here before."

MEMORY 03
"The loop is not resetting the maze."
```

Keep messages short.

When collected:

1. play a small visual effect;
2. update memory count;
3. show one short message;
4. remove or hide the fragment.

---

# 21. Memory UI

Recommended:

```text
MEMORIES  2 / 3
```

When a fragment is collected:

```text
MEMORY RECOVERED

"You have been here before."
```

Automatically dismiss it after a few seconds.

Do not require players to open a large inventory screen.

---

# 22. Intruder

The Intruder is the pressure system.

It should not become a complicated combat enemy.

Its job is to:

- increase tension;
- punish separation;
- force players to reunite;
- create a memorable moment.

Possible visual:

```text
       /\     /\
      /  \___/  \
     |   ◉   ◉   |
     |     ^     |
      \  _____  /
       \_______/
```

Keep the design original.

---

# 23. Intruder Behavior

Simple state machine:

```text
DORMANT
   |
   | proximity broken / event triggered
   v
SPAWNING
   |
   v
HUNTING
   |
   | players reunite
   v
RETREATING
   |
   v
DORMANT
```

Do not make the Intruder pathfinding system unnecessarily complex.

For MVP, it can:

- appear at a predefined point;
- move toward a group anchor;
- display a warning;
- disappear after players reunite.

---

# 24. Intruder Trigger

Suggested rules:

```ts
const SEPARATION_TIME = 8
```

If players remain too far apart for 8 seconds:

```text
PROXIMITY LOST
      |
      v
8 second warning
      |
      v
INTRUDER SPAWNS
```

If they reunite during the warning:

```text
warning cancelled
```

This avoids punishing players immediately for a small navigation mistake.

---

# 25. Intruder Warning

Use:

```text
PROXIMITY LOST

The memory is breaking...
```

Then:

```text
INTRUSION DETECTED
```

Avoid excessive screen shaking.

Use:

- subtle UI pulse;
- sound;
- environmental lighting change;
- short visual distortion.

---

# 26. Loop System

The loop is the defining mechanic.

At the end of Loop One:

```text
EXIT
 |
 v
LOOP TRANSITION
 |
 v
LOOP TWO
```

Do not literally reload the entire scene unless necessary.

Instead, change game state and mutate the relevant objects.

Example:

```ts
export function beginLoopTwo() {
  gameState = 'LOOP_TWO'

  changeMazeLayout()
  resetPuzzleState()
  revealNewMemory()
}
```

---

# 27. Loop One vs Loop Two

Loop One:

```text
Route A = open
Route B = closed
Memory = hidden
```

Loop Two:

```text
Route A = closed
Route B = open
Memory = visible
```

This makes the world feel different without requiring a second giant map.

---

# 28. Ghost Mechanic

A powerful optional feature is a memory ghost.

The ghost represents a previous player run.

Store a simplified path:

```ts
interface PathPoint {
  x: number
  y: number
  z: number
  time: number
}
```

Record a point periodically rather than every frame:

```text
0 sec -> position
0.25 sec -> position
0.5 sec -> position
...
```

Keep the recording small.

In Loop Two, replay the path:

```text
CURRENT PLAYER
      |
      v
      A -------- B

GHOST
      |
      v
      C -------- D
```

The ghost can:

- reveal a route;
- activate a visual memory;
- demonstrate what happened in Loop One.

Do not make it physically complicated in the first implementation.

---

# 29. Final Puzzle

The final room combines all main ideas.

Requirements:

1. All required memories collected.
2. Correct loop reached.
3. Players are within proximity.
4. Two mechanisms activated.
5. Final door opens.

Concept:

```text
          MEMORY CORE

       [ PLAYER A ]
             |
             |
       [ PLAYER B ]

          LINKED

            +
       3 MEMORIES
            +
        LOOP 2
            |
            v
        FINAL EXIT
```

---

# 30. Completion

On completion:

```text
MEMORY SYNCHRONIZED

THE LOOP IS BROKEN

YOU ESCAPED.
```

Then show:

```text
TIME: 04:31
MEMORIES: 3/3
LOOPS: 2
```

Optional:

```text
RUN COMPLETE
```

The player should be able to return to the lobby and replay.

---

# 31. UI Architecture

Use Decentraland's React ECS UI system for 2D interface elements where appropriate.

Official dynamic UI documentation:

https://docs.decentraland.org/creator/scenes-sdk7/2d-ui/dynamic-ui

Example structure:

```ts
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import { uiMenu } from './ui'

export function main() {
  ReactEcsRenderer.setUiRenderer(uiMenu)
}
```

Recommended UI layers:

```text
HUD
 |
 +-- objective
 +-- memories
 +-- proximity
 +-- timer
 +-- temporary notifications
```

Avoid large permanent menus.

---

# 32. HUD Example

```text
┌──────────────────────────────┐
│ MEMORY 2/3     LOOP 1        │
│                              │
│          GAME VIEW           │
│                              │
│                              │
│ PROXIMITY ● LINKED           │
└──────────────────────────────┘
```

Mobile should be tested in portrait and landscape where supported by the target client.

---

# 33. Objective System

At any moment the player should know what to do.

Example:

```text
OBJECTIVE

Find 3 memories.
Stay close.
Reach the exit.
```

When a task is complete:

```text
✓ Memory recovered
```

Then replace it with the next objective.

---

# 34. Timer

A timer creates urgency.

Suggested:

```text
07:00
```

The timer should not make the game impossible.

If the timer reaches zero, use:

```text
LOOP COLLAPSE
```

Then return to the loop transition or restart the current puzzle.

Do not permanently trap the player.

---

# 35. Multiplayer Architecture

There are two separate concepts:

## Presence

Players can see other players in the same World.

## Game state

Puzzle state must be synchronized.

Do not assume that changing a local boolean automatically synchronizes it for everyone.

Decentraland supports serverless multiplayer/network synchronization APIs, including synchronized entities/state.

Official networking documentation:

https://docs.decentraland.org/creator/scenes-sdk7/networking/serverless-multiplayer

Use the supported current SDK networking primitives for:

- shared puzzle state;
- memory collection;
- game state;
- loop number;
- player participation.

---

# 36. State Synchronization

A conceptual shared state:

```ts
interface SharedGameState {
  state: GameState
  loop: number
  switches: {
    A: boolean
    B: boolean
    C: boolean
  }
  memories: {
    one: boolean
    two: boolean
    three: boolean
  }
  intruderActive: boolean
}
```

The actual implementation should use the current Decentraland networking API rather than inventing a custom protocol inside the scene.

---

# 37. Synchronization Rules

Synchronize only meaningful state.

Good:

```text
switch A activated
memory 2 collected
loop changed
intruder active
door opened
```

Bad:

```text
player x every frame
player y every frame
player z every frame
camera x every frame
camera rotation every frame
```

Excessive state traffic can hurt performance and complexity.

---

# 38. Server-Authoritative Considerations

If the mechanic affects a competitive result or must be trusted, do not blindly trust client-reported positions or scores.

A stronger architecture can use server-side verification.

For a simple hackathon prototype, keep the authoritative boundary clear:

```text
CLIENT
  |
  | interaction request
  v
GAME LOGIC / NETWORK STATE
  |
  v
SHARED RESULT
```

For sensitive mechanics:

```text
PLAYER IDENTITY
      +
ACTUAL PLAYER POSITION
      |
      v
VALIDATION
      |
      v
GAME STATE
```

Decentraland's current documentation includes server-authoritative multiplayer patterns.

---

# 39. Game Manager

Create one central manager.

Conceptual code:

```ts
export class GameManager {
  private state: GameState = 'LOBBY'
  private loop = 1

  getState() {
    return this.state
  }

  startGame() {
    if (this.state !== 'LOBBY') return

    this.state = 'COUNTDOWN'
  }

  startLoopOne() {
    this.state = 'LOOP_ONE'
    this.loop = 1
  }

  startLoopTwo() {
    this.state = 'LOOP_TWO'
    this.loop = 2
  }

  complete() {
    this.state = 'COMPLETED'
  }
}
```

The real implementation can be functional rather than class-based, but the responsibility should remain centralized.

---

# 40. Puzzle Manager

Keep puzzle logic independent.

```ts
export interface Puzzle {
  id: string
  solved: boolean
  solve(): void
}
```

Example:

```ts
const puzzleState = {
  switchA: false,
  switchB: false,
  switchC: false
}

export function isPuzzleSolved() {
  return (
    puzzleState.switchA &&
    puzzleState.switchB &&
    puzzleState.switchC
  )
}
```

When solved:

```ts
openDoor('MAIN_DOOR')
```

---

# 41. Entity Factories

Instead of duplicating entity creation code, create reusable factories.

Example:

```ts
export function createSwitch(
  position: Vector3,
  id: string
) {
  const entity = engine.addEntity()

  Transform.create(entity, {
    position
  })

  MeshRenderer.setBox(entity)

  return entity
}
```

Likewise:

```text
createDoor()
createMemory()
createPortal()
createLantern()
createNeonWall()
createIntruder()
```

This makes the scene easier to modify.

---

# 42. Door Animation

Avoid expensive skeletal animation for simple doors.

A simple transform animation is enough.

Concept:

```ts
function openDoorSystem(dt: number) {
  // Move door upward or sideways.
}
```

For example:

```text
closed:
████

opening:
██

open:
__
```

A 1–2 second animation is enough.

---

# 43. Memory Animation

Memory fragments can:

- slowly rotate;
- bob vertically;
- emit a small glow;
- play a subtle sound.

Use one system for all memory fragments rather than one system per fragment.

Concept:

```ts
function memoryAnimationSystem(dt: number) {
  // Iterate only over memory entities.
}
```

---

# 44. Performance Rules

Every frame is expensive.

Avoid:

```ts
for (const entity of ALL_ENTITIES) {
  // expensive work
}
```

Prefer component queries that target relevant entities.

Decentraland's SDK documentation specifically recommends querying only the entities relevant to a system.

Use:

```ts
engine.getEntitiesWith(ComponentA, ComponentB)
```

rather than repeatedly scanning unrelated objects.

---

# 45. Performance Budget

Target:

- low object count;
- low draw-call pressure;
- few materials;
- small textures;
- simple collisions;
- limited particles;
- limited real-time effects;
- no unnecessary continuous network messages.

Mobile is the constraint.

If something looks impressive on desktop but makes mobile uncomfortable, remove it.

---

# 46. Collision Strategy

Use collisions only where gameplay requires them.

Examples:

- maze walls;
- doors;
- floor;
- physical blockers.

Do not place colliders on every decorative object.

Decorative objects that do not need collision should not block movement.

---

# 47. Lighting Strategy

Use lighting to establish mood without building an expensive lighting system.

Suggested visual hierarchy:

```text
Lobby
  -> safe, bright

Maze
  -> dark, neon

Intruder
  -> unstable lighting

Memory room
  -> warm and colorful

Final room
  -> bright reveal
```

The player should understand where to go through lighting and composition.

---

# 48. Audio Strategy

Audio is important but should remain lightweight.

Suggested sound events:

```text
World entered
Button activated
Memory collected
Door opened
Proximity lost
Intruder detected
Loop transition
Final door
Completion
```

Avoid continuous music tracks with large file sizes unless optimized.

Provide a mute option if possible.

---

# 49. Audio Feedback for Mobile

Because mobile players may look away from the screen or have visual distractions, audio should reinforce:

- proximity warning;
- memory collection;
- door opening;
- Intruder arrival.

Never make an important mechanic dependent only on sound.

---

# 50. Maze Design Rules

A good maze should not be confusing for the sake of confusion.

Use landmarks:

```text
NEON TREE
MEMORY WALL
RED GATE
BLUE GATE
CENTRAL CORE
```

Players should be able to say:

> "Meet me at the red gate."

That helps multiplayer communication.

---

# 51. Navigation Design

Use:

- color;
- symbols;
- landmarks;
- light trails;
- architecture.

Avoid:

- tiny signs;
- long paragraphs;
- identical corridors everywhere.

The maze should feel mysterious but still readable.

---

# 52. Proximity Puzzle Design

Good:

```text
Two players stand on two pads.
Door opens.
```

Better:

```text
Player A holds the left pad.
Player B crosses.
Player B activates the memory.
Both reunite.
```

This makes the mechanic social.

---

# 53. Intruder Design

The Intruder should never feel unfair.

It should:

1. warn;
2. escalate;
3. chase;
4. disappear when the social objective is restored.

Do not instantly kill players.

This is a social adventure, not a hardcore horror game.

---

# 54. Failure Handling

If players fail:

```text
LOOP DESTABILIZED

Try again.
```

Reset:

- puzzle state;
- Intruder;
- timer;
- required memory positions.

Do not eject players from the World.

---

# 55. Multiple Players

Design for:

- 2 players as the ideal minimum;
- 3–4 players as a good group;
- more players only if the World remains readable.

The game should not become impossible if 4 people enter.

For the MVP, avoid puzzles that require exactly two players unless the experience explicitly explains that requirement.

---

# 56. Solo Fallback

Although the game is social, the player should not become completely stuck if nobody else is present.

Use a lobby message:

```text
Waiting for another memory...

Invite a friend to begin.
```

If the rules of the hackathon permit solo play, an optional training mode can demonstrate mechanics.

Do not let solo mode become the main game.

---

# 57. Networking Edge Cases

Handle:

### Player joins during game

Show:

```text
A new memory has entered.
```

Then place them in a safe state.

### Player leaves

If a puzzle depends on that player:

```text
Puzzle reset.
Find another memory.
```

### Network temporarily unavailable

Show:

```text
SYNCING...
```

Disable state-changing interactions until synchronized where appropriate.

Decentraland provides synchronization status APIs; use the current documented approach.

---

# 58. Input Design

Desktop:

- keyboard movement;
- mouse interaction.

Mobile:

- virtual movement controls provided by the client;
- tap interaction;
- minimal UI.

Do not make:

- shift combinations;
- keyboard shortcuts;
- drag precision;
- mouse-only interactions

mandatory for completing the game.

---

# 59. Mobile UI Rules

Use:

- minimum comfortable touch target sizes;
- high contrast;
- short labels;
- no tiny text;
- no UI at the very edge where it can be difficult to touch.

Avoid:

```text
[ tiny button ]
```

Prefer:

```text
[      INTERACT      ]
```

when an explicit action button is necessary.

---

# 60. Camera and Environment

Do not put important information:

- directly behind the player;
- at extremely high angles;
- inside narrow corners;
- behind large decorative objects.

Test from the actual player camera.

---

# 61. Accessibility

Provide:

- readable text;
- visual + audio feedback;
- clear objectives;
- non-color-only puzzle communication.

For example, do not make a puzzle:

> "Stand on the red tile."

Only.

Use:

```text
RED / TRIANGLE
BLUE / CIRCLE
```

with distinct symbols.

---

# 62. Security and Secrets

Never put:

- private wallet keys;
- API secrets;
- passwords;
- signing keys

inside the repository.

Never commit:

```text
.env
private-key.txt
wallet.json
secret.json
```

Use environment variables and deployment secrets.

For GitHub:

```text
Settings
  -> Secrets and variables
  -> Actions
```

if automated deployment is used.

---

# 63. scene.json and World Configuration

For deployment to a Decentraland World, the scene needs a `worldConfiguration` entry.

Concept:

```json
{
  "worldConfiguration": {
    "name": "your-name.dcl.eth"
  }
}
```

The exact generated scene metadata should be preserved.

The World name must correspond to a Decentraland NAME/ENS owned by the deploying wallet.

Decentraland's Worlds documentation states that World deployment is associated with a Decentraland NAME or ENS domain.

Official Worlds overview:

https://docs.decentraland.org/apis/apis/worlds/overview

---

# 64. Getting a World Name

You need a Decentraland NAME/ENS domain that you control for World deployment.

Examples conceptually:

```text
neonreverie.dcl.eth
```

or another available name you own.

Do not assume that the name `neonreverie.dcl.eth` is available.

The deploying wallet must have the required ownership.

The current Worlds Content Server documentation confirms that deployment validates that the wallet owns the DCL name specified by the scene.

---

# 65. World Deployment

The current Decentraland documentation supports publishing through Creator Hub and through the CLI.

Creator Hub flow:

```text
Open scene
   |
Publish
   |
Publish to World
   |
Select NAME / ENS
   |
Sign with wallet
   |
Validation
   |
Deployment
```

CLI concept:

```bash
npm run deploy -- --target-content https://worlds-content-server.decentraland.org
```

The exact command available in the current generated project should be checked with:

```bash
npm run
```

and the current Decentraland documentation.

Official publishing documentation:

https://docs.decentraland.org/creator/scenes-sdk7/publishing/publishing

---

# 66. Creator Hub Publishing

If using Creator Hub:

1. Open the NEON REVERIE project.
2. Build/validate the scene.
3. Click Publish.
4. Select Publish to World.
5. Select the World/NAME you control.
6. Connect/sign with the wallet when prompted.
7. Wait for deployment.
8. Open the resulting World in Decentraland.

Do not enter private keys into random websites or scripts.

Use the official Decentraland workflow.

---

# 67. CLI Publishing

From the project directory:

```bash
npm install
```

Then:

```bash
npm run build
```

or the build command exposed by the current project.

Then deploy using the project's supported deploy script.

Current Decentraland documentation also shows:

```bash
npm run deploy -- --target-content https://worlds-content-server.decentraland.org
```

A direct CLI invocation is also documented by Decentraland's Worlds Content Server:

```bash
dcl deploy --target-content https://worlds-content-server.decentraland.org
```

Use the command supported by the current version of your scene.

---

# 68. Deployment Authentication

World deployment requires wallet signing.

Do not hard-code a private key in source.

If using the CLI and an environment variable is required:

```bash
export DCL_PRIVATE_KEY=...
```

only do this in a secure local shell or protected CI secret.

Never commit the value.

For a first deployment, Creator Hub is preferable if it is easier and available.

---

# 69. Accessing the World

The current Decentraland documentation describes World access through the Explorer and World-specific commands.

Conceptually:

```text
/world your-name.dcl.eth
```

or the current supported World access URL/deep link.

After deployment, verify:

1. World loads.
2. Scene appears.
3. Player can move.
4. Interactions work.
5. Multiplayer works.
6. Loop works.
7. No console/runtime errors prevent gameplay.

---

# 70. Publishing Configuration

A World can optionally be configured for Places/discoverability depending on current Decentraland options.

Do not opt out of discoverability if you want the World to be easier to find unless the project has a specific reason.

Use the current Decentraland publishing documentation as the authoritative source for current options.

---

# 71. Build Validation

Before deployment:

```text
TypeScript compile
        |
        v
Scene build
        |
        v
Asset validation
        |
        v
Runtime test
        |
        v
Mobile test
        |
        v
World deployment
```

Never deploy the first build without testing.

---

# 72. Testing Checklist

## Basic

- [ ] World loads.
- [ ] Lobby loads.
- [ ] Player can move.
- [ ] Maze is accessible.
- [ ] All objects are visible.
- [ ] No blocking collision errors.

## Gameplay

- [ ] Switch A works.
- [ ] Switch B works.
- [ ] Switch C works.
- [ ] Door opens.
- [ ] Memory 1 works.
- [ ] Memory 2 works.
- [ ] Memory 3 works.
- [ ] Proximity detection works.
- [ ] Intruder activates.
- [ ] Intruder disappears/recedes correctly.
- [ ] Loop transition works.
- [ ] Loop 2 changes something.
- [ ] Final puzzle works.
- [ ] Completion screen works.

## Multiplayer

- [ ] Player A can see Player B.
- [ ] Both players can participate.
- [ ] Shared puzzle state synchronizes.
- [ ] Memory collection state synchronizes.
- [ ] Door state synchronizes.
- [ ] Loop state synchronizes.
- [ ] Player leaving does not permanently break the game.

## Mobile

- [ ] Text is readable.
- [ ] Buttons are easy to tap.
- [ ] No keyboard-only action exists.
- [ ] Movement feels comfortable.
- [ ] Maze is readable.
- [ ] Effects do not overload the screen.
- [ ] Loading is acceptable.

---

# 73. Debugging Strategy

Use structured logs.

Good:

```ts
console.log('[GAME] Loop changed:', loop)
console.log('[PUZZLE] Switch activated:', id)
console.log('[MEMORY] Collected:', id)
console.log('[INTRUDER] Spawned')
```

Bad:

```ts
console.log('here')
console.log('test')
console.log('aaaa')
```

Prefix logs:

```text
[GAME]
[NETWORK]
[PUZZLE]
[MEMORY]
[INTRUDER]
[PROXIMITY]
[UI]
```

This makes multiplayer debugging much easier.

---

# 74. Debug Mode

Create a development-only debug overlay.

Example:

```text
DEBUG
State: LOOP_TWO
Loop: 2
Memories: 3/3
Proximity: LINKED
Intruder: OFF
Players: 2
```

Do not show this in the polished public experience.

---

# 75. Debug Controls

If useful during development, create temporary debug functions:

```ts
debugSkipToLoopTwo()
debugCollectAllMemories()
debugSpawnIntruder()
debugSolvePuzzle()
debugResetGame()
```

These should either be removed before release or guarded so normal players cannot trigger them.

---

# 76. Error Handling

Do not allow one missing entity to crash the entire scene.

Bad:

```ts
const transform = Transform.get(entity)!
```

Safer:

```ts
const transform = Transform.getOrNull(entity)

if (!transform) return
```

Especially use defensive checks around:

- player entities;
- optional components;
- networking state;
- dynamically destroyed entities.

---

# 77. Reset System

Every run should have a clean reset path.

Create:

```ts
export function resetRun() {
  resetPuzzle()
  resetMemories()
  resetIntruder()
  resetTimer()
  resetDoors()
}
```

For Loop Two:

```ts
export function resetForLoopTwo() {
  resetPuzzle()
  changeMazeRoute()
  repositionMemories()
}
```

Do not duplicate reset logic in five different files.

---

# 78. Recommended File Responsibilities

## `index.ts`

Only scene bootstrap.

## `gameState.ts`

Game state definitions.

## `gameManager.ts`

Game progression.

## `proximitySystem.ts`

Distance and proximity state.

## `puzzleSystem.ts`

Puzzle conditions.

## `memorySystem.ts`

Memory collection.

## `intruderSystem.ts`

Intruder behavior.

## `loopSystem.ts`

Loop transitions.

## `networkState.ts`

Shared multiplayer state.

## `maze.ts`

Static world geometry.

## `ui.tsx`

User interface.

This separation makes the project easier to debug and extend.

---

# 79. Example Main Entry

A conceptual final structure:

```ts
import { engine } from '@dcl/sdk/ecs'
import { createLobby } from './world/lobby'
import { createMaze } from './world/maze'
import { createFinalRoom } from './world/finalRoom'

import { proximitySystem } from './game/proximitySystem'
import { puzzleSystem } from './game/puzzleSystem'
import { memorySystem } from './game/memorySystem'
import { intruderSystem } from './game/intruderSystem'
import { loopSystem } from './game/loopSystem'

export function main() {
  createLobby()
  createMaze()
  createFinalRoom()

  engine.addSystem(proximitySystem)
  engine.addSystem(puzzleSystem)
  engine.addSystem(memorySystem)
  engine.addSystem(intruderSystem)
  engine.addSystem(loopSystem)
}
```

The actual function signatures should match the current SDK project.

---

# 80. Example Proximity System

Conceptual implementation:

```ts
import { engine, Transform } from '@dcl/sdk/ecs'

const PROXIMITY_RADIUS = 5

function distance(
  a: { x: number; z: number },
  b: { x: number; z: number }
) {
  const dx = a.x - b.x
  const dz = a.z - b.z

  return Math.sqrt(dx * dx + dz * dz)
}

export function proximitySystem() {
  const local = Transform.getOrNull(engine.PlayerEntity)

  if (!local) return

  // Obtain synchronized remote player transforms using
  // the current Decentraland multiplayer API.

  // Compare the relevant player positions.
  // Update shared proximity state.
}

engine.addSystem(proximitySystem)
```

Do not copy this blindly as a complete multiplayer implementation. The current networking API must be used for remote-player state.

---

# 81. Example Memory Factory

```ts
import {
  engine,
  Transform,
  MeshRenderer,
  MeshCollider
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

export function createMemory(
  id: string,
  position: Vector3
) {
  const entity = engine.addEntity()

  Transform.create(entity, {
    position
  })

  MeshRenderer.setBox(entity)

  MeshCollider.setBox(entity)

  return {
    id,
    entity
  }
}
```

Then attach the current SDK-supported interaction event.

---

# 82. Example Game State

```ts
export interface GameData {
  state: GameState
  loop: number

  switches: Record<string, boolean>

  memories: Record<string, boolean>

  intruderActive: boolean

  timerSeconds: number
}
```

Initial state:

```ts
export const gameData: GameData = {
  state: 'LOBBY',
  loop: 1,

  switches: {
    A: false,
    B: false,
    C: false
  },

  memories: {
    MEMORY_01: false,
    MEMORY_02: false,
    MEMORY_03: false
  },

  intruderActive: false,

  timerSeconds: 420
}
```

---

# 83. State Transitions

Allowed transitions:

```text
LOBBY
  -> COUNTDOWN

COUNTDOWN
  -> LOOP_ONE

LOOP_ONE
  -> INTRUDER_ACTIVE
  -> LOOP_TRANSITION

INTRUDER_ACTIVE
  -> LOOP_ONE

LOOP_TRANSITION
  -> LOOP_TWO

LOOP_TWO
  -> FINAL_ROOM

FINAL_ROOM
  -> COMPLETED

COMPLETED
  -> LOBBY
```

Do not allow random code to set:

```ts
state = 'COMPLETED'
```

unless the completion requirements are satisfied.

---

# 84. Completion Conditions

```ts
export function canComplete() {
  return (
    gameData.loop >= 2 &&
    allMemoriesCollected() &&
    finalPuzzleSolved() &&
    playersAreLinked()
  )
}
```

This is the single gate for completion.

---

# 85. Content Style

Use short narrative fragments.

Example:

```text
MEMORY 01

The maze remembers footsteps.
```

```text
MEMORY 02

You have already escaped.
```

```text
MEMORY 03

Then why are you still here?
```

Final:

```text
You were never escaping the maze.

You were escaping the loop.
```

This gives the game personality without requiring a large story engine.

---

# 86. Avoiding Copyright Problems

Use the keywords as creative inspiration.

Do not use:

- TRON logo;
- official TRON characters;
- Coco characters;
- Coco music;
- film screenshots;
- copyrighted promotional art;
- ripped game assets.

Build original:

- neon architecture;
- memory symbols;
- original Intruder;
- original soundtrack/effects;
- original story.

The project should be recognizable as its own IP.

---

# 87. Git Workflow

Initialize:

```bash
git init
```

Create repository:

```text
neon-reverie
```

Recommended branches:

```text
main
develop
```

For a solo hackathon, even a single `main` branch is acceptable.

Commit logically:

```text
feat: add neon lobby
feat: add maze geometry
feat: add cooperative switches
feat: add memory fragments
feat: add proximity mechanic
feat: add intruder
feat: add loop transition
feat: add final puzzle
perf: optimize scene assets
fix: synchronize puzzle state
```

---

# 88. `.gitignore`

Ensure sensitive/local files are ignored.

Typical entries:

```text
node_modules/
.env
.env.*
dist/
build/
.DS_Store
*.log
```

Do not blindly ignore files that the Decentraland project requires.

---

# 89. README

The repository README should explain:

```text
NEON REVERIE
 |
 +-- What it is
 +-- How to install
 +-- How to run
 +-- How to build
 +-- How to deploy
 +-- Architecture
 +-- Multiplayer
 +-- Controls
 +-- Credits
```

Keep the README synchronized with the project.

---

# 90. Local Development Loop

Typical loop:

```bash
npm install
npm run start
```

or the current command exposed by the generated project.

Use:

```bash
npm run
```

to see available scripts.

Then:

```text
edit code
   |
save
   |
run preview
   |
test
   |
inspect console
   |
repeat
```

Do not wait until the entire game is complete before testing.

---

# 91. Recommended Build Order Inside the Codebase

Implement the actual systems in this dependency order:

```text
Scene
 |
 +-- geometry
 |
 +-- player interactions
 |
 +-- game state
 |
 +-- puzzle
 |
 +-- memory
 |
 +-- proximity
 |
 +-- networking
 |
 +-- Intruder
 |
 +-- loop
 |
 +-- UI
 |
 +-- polish
```

This prevents the project from becoming impossible to debug.

---

# 92. First Playable Definition

The first meaningful playable build should be:

```text
Lobby
  |
Maze
  |
2 switches
  |
Door
  |
Memory
  |
Exit
```

Once that works, add:

```text
proximity
```

Then:

```text
Intruder
```

Then:

```text
Loop
```

Then:

```text
final room
```

The key is that every addition must sit on top of a working experience.

---

# 93. Full Final Experience

The polished experience should look like:

```text
                         NEON REVERIE
                              |
                              v
                           LOBBY
                              |
                      "STAY CLOSE"
                              |
                              v
                         MAZE ENTRY
                              |
                +-------------+-------------+
                |                           |
             MEMORY                       SWITCH
                |                           |
                +-------------+-------------+
                              |
                         PROXIMITY GATE
                              |
                              v
                     INTRUDER TRIGGER
                              |
                              v
                        REUNITE
                              |
                              v
                           EXIT
                              |
                              v
                         LOOP TWO
                              |
                   +----------+----------+
                   |                     |
                GHOST                 MEMORY
                   |                     |
                   +----------+----------+
                              |
                              v
                         FINAL ROOM
                              |
                    TWO PLAYERS LINK
                              |
                              v
                           EXIT
                              |
                              v
                         COMPLETED
```

---

# 94. Visual Scene Blueprint

```text
                         NORTH

              ┌─────────────────────────┐
              │      MEMORY CHAMBER     │
              │                         │
              │       ✦ MEMORY ✦        │
              ├────────────┬────────────┤
              │            │             │
              │  SWITCH A  │  SWITCH B  │
              │            │             │
              ├────────────┴─────────────┤
              │                          │
              │       CENTRAL MAZE       │
              │                          │
              │   ┌──────┐     ┌──────┐ │
              │   │      │     │      │ │
              │   │      └─────┘      │ │
              │   │                   │ │
              │   └───────┐   ┌───────┘ │
              │           │   │          │
              ├───────────┴───┴──────────┤
              │      PROXIMITY GATE      │
              ├──────────────────────────┤
              │                          │
              │      INTRUDER ARENA      │
              │                          │
              ├──────────────────────────┤
              │       LOOP CHAMBER       │
              └──────────────────────────┘

                         SOUTH
```

---

# 95. Exact Game Rules

## Rule 1

The player enters the World.

## Rule 2

At least one other player is recommended for the intended experience.

## Rule 3

The objective is to recover three memories.

## Rule 4

Three switches open the main gate.

## Rule 5

Important gates require players to be within the proximity radius.

## Rule 6

Remaining separated for too long activates the Intruder.

## Rule 7

Reuniting reduces the Intruder threat.

## Rule 8

The exit begins Loop Two.

## Rule 9

Loop Two changes the maze.

## Rule 10

The final room requires synchronized cooperation.

## Rule 11

Completion returns the group to the lobby/replay state.

---

# 96. Difficulty Tuning

Start easy.

Suggested initial values:

```text
Proximity radius: 5m
Separation warning: 8 seconds
Intruder warning: 3 seconds
Memory count: 3
Switch count: 3
Loop count: 2
Initial timer: 7 minutes
```

Tune after real playtesting.

Do not choose difficulty mathematically before watching real players.

---

# 97. Replay Variations

Once the base game works, add small variations.

Example:

```ts
const variants = [
  {
    closedRoute: 'A',
    memoryRoute: 'B'
  },
  {
    closedRoute: 'B',
    memoryRoute: 'C'
  }
]
```

Select one at the beginning of Loop Two.

This creates replayability without requiring a procedural maze generator.

---

# 98. Procedural Variation

If time allows, randomize:

- memory location;
- switch order;
- one shortcut;
- Intruder spawn point.

Do not randomize the entire maze.

Players should be able to learn the world.

---

# 99. Onboarding

The first 30 seconds should teach:

```text
MOVE
  ↓
SEE FRIEND
  ↓
STAY CLOSE
  ↓
INTERACT
  ↓
COLLECT MEMORY
```

Do not create a 2-minute tutorial.

The environment itself should teach the mechanics.

---

# 100. Environmental Tutorial

At the lobby:

```text
Player
  ↓
walks onto glowing pad
  ↓
another player enters
  ↓
pad glows
  ↓
door opens
```

Players understand proximity without reading a manual.

---

# 101. Visual Feedback

Every interaction should have at least one feedback channel.

Examples:

```text
Switch activated
 -> light changes
 -> sound
 -> UI tick

Memory collected
 -> fragment disappears
 -> particle burst
 -> memory counter increases

Door opened
 -> animation
 -> sound
 -> path lighting

Proximity lost
 -> UI warning
 -> environmental pulse
 -> sound
```

---

# 102. Don't Overuse Effects

If everything glows, nothing feels important.

Use visual hierarchy:

```text
Normal object      -> low intensity
Interactive object -> medium
Objective           -> high
Intruder            -> strongest
Final exit          -> strongest reveal
```

---

# 103. Scene Editor vs Code

Use visual tools for:

- rough layout;
- geometry;
- placement;
- environment composition.

Use code for:

- gameplay;
- puzzles;
- proximity;
- memory collection;
- networking;
- loop;
- Intruder;
- dynamic UI.

The strongest workflow is hybrid rather than forcing everything into code.

---

# 104. Scene Editor Workflow

When using Creator Hub's Scene Editor:

1. Create/import the scene.
2. Build the static environment.
3. Place interactive objects.
4. Name objects clearly.
5. Keep hierarchy organized.
6. Test navigation.
7. Move gameplay logic into SDK7 code when dynamic behavior is needed.

Avoid putting hundreds of unnamed objects into the hierarchy.

Use names such as:

```text
Maze_Wall_01
Door_Main
Switch_A
Switch_B
Switch_C
Memory_01
Memory_02
Memory_03
Intruder_Spawn
Final_Portal
```

---

# 105. Naming Convention

Use:

```text
TYPE_NAME_NUMBER
```

Examples:

```text
WALL_01
DOOR_MAIN
SWITCH_A
MEMORY_01
LIGHT_LOBBY_01
SPAWN_INTRUDER
PORTAL_FINAL
```

This makes debugging much easier.

---

# 106. World Coordinates

Keep important gameplay objects documented.

Example:

```ts
export const LOCATIONS = {
  lobbySpawn: { x: 16, y: 1, z: 28 },
  mazeEntrance: { x: 16, y: 1, z: 23 },
  switchA: { x: 8, y: 1, z: 16 },
  switchB: { x: 24, y: 1, z: 16 },
  switchC: { x: 16, y: 1, z: 10 },
  intruderSpawn: { x: 16, y: 1, z: 6 },
  finalExit: { x: 16, y: 1, z: 2 }
}
```

This avoids magic numbers scattered across files.

---

# 107. Constants

Create:

```ts
export const GAME_CONFIG = {
  PROXIMITY_RADIUS: 5,
  SEPARATION_WARNING_SECONDS: 8,
  INITIAL_TIME_SECONDS: 420,
  REQUIRED_MEMORIES: 3,
  REQUIRED_SWITCHES: 3,
  TOTAL_LOOPS: 2
}
```

If you tune the game, change one place.

---

# 108. Networking Message Design

If using message-based multiplayer APIs, keep messages small and explicit.

Conceptual events:

```text
PLAYER_READY
SWITCH_ACTIVATED
MEMORY_COLLECTED
DOOR_OPENED
INTRUDER_STARTED
LOOP_STARTED
GAME_COMPLETED
```

Example conceptual payload:

```ts
{
  type: 'SWITCH_ACTIVATED',
  switchId: 'A'
}
```

Do not send unnecessary continuous data.

---

# 109. Idempotency

A network event may be received more than once or a player may attempt the same action repeatedly.

Make actions safe:

```ts
if (switchState[id]) {
  return
}

switchState[id] = true
```

For memory:

```ts
if (memoryState[id]) {
  return
}

memoryState[id] = true
```

This prevents duplicate state corruption.

---

# 110. Host Migration / Player Leaving

Do not make the first player permanently responsible for the entire game.

If the architecture uses a host/authority concept, define what happens when that player leaves.

A robust design either:

- uses server/shared state;
- allows another participant to continue;
- resets the run cleanly.

For a small hackathon game, a clean reset is better than a broken session.

---

# 111. World Loading

Keep the initial area lightweight.

Do not make the player wait for:

- every optional asset;
- distant decorative content;
- unnecessary audio.

Load only what is needed or use the current Decentraland asset behavior appropriately.

---

# 112. Asset Optimization

Before adding a model:

Ask:

1. Is it needed?
2. Can it be reused?
3. Is the polygon count reasonable?
4. Are textures unnecessarily large?
5. Can the same material be reused?
6. Does it have unnecessary animation data?

A 50-object world with optimized assets is better than a 500-object world with poor optimization.

---

# 113. Texture Guidelines

Prefer:

```text
512x512
1024x1024
```

when sufficient.

Do not automatically use:

```text
4096x4096
```

for every asset.

A neon wall rarely needs a huge texture.

---

# 114. Particle Guidelines

Use particles only for:

- memories;
- Intruder;
- loop transition;
- final reveal.

Do not fill the entire maze with particles.

---

# 115. Performance Testing

Test with:

- low-end laptop;
- desktop;
- mobile device;
- multiple players;
- multiple effects active.

Measure:

- frame smoothness;
- loading time;
- interaction responsiveness;
- network state;
- memory usage if available.

The mobile experience is the acceptance test.

---

# 116. Final Mobile Acceptance Test

A player holding a phone should be able to:

```text
Open World
  ↓
Understand objective
  ↓
Move
  ↓
Find another player
  ↓
Enter maze
  ↓
Interact
  ↓
Stay close
  ↓
Collect memories
  ↓
Escape
```

without a keyboard or external instructions.

---

# 117. Deployment Troubleshooting

## World name error

Check:

```text
scene.json
worldConfiguration.name
```

and confirm the deploying wallet owns the corresponding NAME.

## Deployment rejected

Check:

- wallet signature;
- NAME ownership;
- scene validation;
- current SDK;
- World deployment target.

## Scene loads but objects are missing

Check:

- asset paths;
- GLB files;
- scene build;
- console errors;
- asset references.

## Multiplayer does not synchronize

Check:

- synchronization state;
- shared state creation;
- message/event handling;
- whether the current SDK networking API is being used correctly.

## Mobile is slow

Reduce:

- textures;
- particles;
- unique materials;
- objects;
- real-time effects;
- unnecessary systems.

---

# 118. Publishing Through Creator Hub

The official publishing flow currently supports publishing a scene to a World from Creator Hub.

The documented sequence is:

```text
Open scene
    |
Publish
    |
PUBLISH TO WORLD
    |
Select NAME/ENS
    |
Sign deployment
    |
Validation
    |
Published
```

Reference:

https://docs.decentraland.org/creator/scenes-sdk7/publishing/publishing

---

# 119. Publishing Through CLI

The current documentation provides the World target:

```bash
https://worlds-content-server.decentraland.org
```

Example:

```bash
npm run deploy -- --target-content https://worlds-content-server.decentraland.org
```

The Worlds Content Server documentation also documents:

```bash
dcl deploy --target-content https://worlds-content-server.decentraland.org
```

Reference:

https://github.com/decentraland/worlds-content-server

Always prefer the command documented by the current project version.

---

# 120. Verifying Deployment

After deployment:

```text
Deployment complete
      |
      v
Open World
      |
      v
Check lobby
      |
      v
Check maze
      |
      v
Check interactions
      |
      v
Test second player
      |
      v
Complete run
```

If the deployed version differs from local preview, compare:

- scene files;
- generated build;
- asset references;
- configuration;
- SDK version.

---

# 121. World Access

Decentraland's current World documentation supports entering a World through the Explorer using the World NAME.

Conceptually:

```text
your-name.dcl.eth
```

Use the current Explorer/World access mechanism documented by Decentraland.

The publishing documentation currently describes a `decentraland://` World deep link and `/goto NAME.dcl.eth` command.

---

# 122. Continuous Deployment

Optional.

After the local deployment works, GitHub Actions can automate deployment.

Conceptual workflow:

```text
push main
   |
GitHub Actions
   |
npm install
   |
build
   |
deploy
```

Keep wallet credentials in GitHub Secrets.

Never put them in:

```text
.github/workflows/*.yml
```

as plain text.

---

# 123. GitHub Actions Concept

A deployment workflow can conceptually contain:

```yaml
name: Deploy NEON REVERIE

on:
  push:
    branches:
      - main

env:
  DCL_PRIVATE_KEY: ${{ secrets.DCL_PRIVATE_KEY }}

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Install
        run: npm install

      - name: Build
        run: npm run build:ci

      - name: Deploy
        run: npm run deploy:prod
```

The exact script names must match the current scene project's `package.json`.

For the first deployment, manual deployment is simpler.

---

# 124. Final Repository Structure

A clean final repository should look approximately like:

```text
neon-reverie/
│
├── assets/
│   ├── models/
│   ├── textures/
│   └── audio/
│
├── src/
│   ├── index.ts
│   │
│   ├── game/
│   │   ├── gameState.ts
│   │   ├── gameManager.ts
│   │   ├── puzzleSystem.ts
│   │   ├── proximitySystem.ts
│   │   ├── intruderSystem.ts
│   │   ├── memorySystem.ts
│   │   └── loopSystem.ts
│   │
│   ├── world/
│   │   ├── lobby.ts
│   │   ├── maze.ts
│   │   ├── loopTwo.ts
│   │   └── finalRoom.ts
│   │
│   ├── entities/
│   │   ├── door.ts
│   │   ├── switch.ts
│   │   ├── memory.ts
│   │   └── intruder.ts
│   │
│   ├── networking/
│   │   ├── networkState.ts
│   │   └── messages.ts
│   │
│   ├── ui/
│   │   ├── ui.tsx
│   │   └── hud.tsx
│   │
│   └── utils/
│       ├── distance.ts
│       ├── timer.ts
│       └── constants.ts
│
├── scene.json
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
```

---

# 125. Complete Functional Specification

NEON REVERIE is considered functionally complete when all of the following are true:

```text
WORLD
✓ Loads as a Decentraland World
✓ Player can move
✓ Environment is visually coherent

SOCIAL
✓ Multiple players can occupy the same World
✓ Players can see/interact in the same experience
✓ Game mechanics reward cooperation

MAZE
✓ Maze is navigable
✓ Landmarks exist
✓ Exit exists

PUZZLES
✓ Three switches work
✓ Door state is synchronized
✓ Final puzzle works

MEMORIES
✓ Three memories exist
✓ Collection is synchronized
✓ Memory UI updates
✓ Narrative messages appear

PROXIMITY
✓ Distance is calculated
✓ Linked state is visible
✓ Gates can require proximity
✓ Separation creates consequences

INTRUDER
✓ Trigger works
✓ Warning appears
✓ Intruder enters
✓ Reunion reduces threat

LOOP
✓ Loop one can finish
✓ Loop transition works
✓ Loop two changes the world
✓ Previous-run memory/ghost can be displayed if implemented

FINAL
✓ Final room opens
✓ Players must cooperate
✓ Completion state is shown
✓ Replay/reset works

MOBILE
✓ Touch-first interaction
✓ Readable UI
✓ No keyboard-only requirement
✓ Performance acceptable
```

---

# 126. What Not to Build

Do not add these unless everything else already works:

- NFT inventory;
- token economy;
- marketplace;
- blockchain rewards;
- complex combat;
- character classes;
- huge procedural worlds;
- voice chat;
- dozens of NPCs;
- complicated crafting;
- massive inventory;
- realistic physics;
- large open-world traversal.

None of these are necessary to communicate the core idea.

---

# 127. What Makes NEON REVERIE Special

The project's central idea is not:

> "A maze in Decentraland."

It is:

> **"A maze that remembers the players."**

The multiplayer mechanic is not:

> "Other people happen to be here."

It is:

> **"You need another person to change what the maze can do."**

The loop mechanic is not:

> "The level restarts."

It is:

> **"Your previous run becomes part of the next run."**

The Intruder is not:

> "A random monster."

It is:

> **"The consequence of breaking the connection between players."**

That is the creative identity of the project.

---

# 128. Final Architecture Diagram

```text
                         DECENTRALAND WORLD
                                  |
                    +-------------+-------------+
                    |                           |
                 CLIENT A                    CLIENT B
                    |                           |
                    +-------------+-------------+
                                  |
                         NETWORK / SHARED STATE
                                  |
               +------------------+------------------+
               |                  |                  |
          GAME STATE          PLAYER STATE       EVENTS
               |                  |                  |
       +-------+--------+         |          +-------+-------+
       |       |        |         |          |       |       |
    PUZZLES  MEMORIES  LOOP    POSITION   DOOR   INTRUDER  UI
       |       |        |         |          |       |       |
       +-------+--------+---------+----------+-------+-------+
                                  |
                            WORLD ENTITIES
                                  |
                  +---------------+---------------+
                  |               |               |
                MAZE           MEMORY          FINAL ROOM
                  |
              PROXIMITY
                  |
              INTRUDER
```

---

# 129. Final Development Principle

When choosing between two implementations, choose the one that is:

1. easier to understand;
2. easier to debug;
3. cheaper to run;
4. better on mobile;
5. more social;
6. more visually readable.

Do not choose complexity simply because it sounds technically impressive.

---

# 130. Official Technical References

Decentraland SDK overview:

https://docs.decentraland.org/sdk-reference/SDK-Overview/

SDK7 coding scenes:

https://docs.decentraland.org/creator/scenes-sdk7/

SDK7 dynamic UI:

https://docs.decentraland.org/creator/scenes-sdk7/2d-ui/dynamic-ui

SDK7 serverless multiplayer:

https://docs.decentraland.org/creator/scenes-sdk7/networking/serverless-multiplayer

Decentraland publishing:

https://docs.decentraland.org/creator/scenes-sdk7/publishing/publishing

Decentraland Worlds API overview:

https://docs.decentraland.org/apis/apis/worlds/overview

Worlds Content Server:

https://github.com/decentraland/worlds-content-server

---

# 131. Final One-Sentence Definition

**NEON REVERIE is a mobile-first multiplayer Decentraland World where friends explore a neon memory maze, solve proximity-based puzzles, survive an Intruder, and use the remnants of previous loops to finally escape.**

---

# 132. Build Philosophy

Build the smallest version that already feels like NEON REVERIE.

The minimum identity is:

```text
NEON
+
MAZE
+
FRIENDS
+
PROXIMITY
+
MEMORY
+
INTRUDER
+
LOOP
```

If those seven things feel connected, the project works.

If those seven things are not working, adding more features will not fix it.

The goal is not to build the biggest Decentraland scene.

The goal is to build a world that makes two people say:

> "Wait... let's try the maze again."
