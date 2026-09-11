# NEON REVERIE

**Remember. Stay Close. Escape the Loop.**

NEON REVERIE is a mobile-first multiplayer Decentraland SDK7 World built for the Friendzone Buildathon. It turns social presence into the core mechanic: players enter a neon memory maze, cooperate on proximity puzzles, collect memories, survive an Intruder, experience a changing loop, and escape together.

## Why this fits Friendzone

- **Mobile-first:** touch-compatible pointer interactions, large targets, short readable HUD, no keyboard-only mechanic, virtual UI scale, and a compact one-parcel scene.
- **Social value:** three cooperative switches, proximity gates, group reunion pressure, shared memory progression, and a final two-presence escape.
- **Standalone:** the World starts without a scheduled event or host and includes a lightweight Echo Mode fallback for a solo visitor.
- **Replayability:** the second loop changes the visual route/state and makes the first run's consequences visible.
- **Performance:** geometry is generated from low-cost primitives; no required external GLB/GLTF packs; limited entities and particles; short routes and small UI.
- **Originality:** the design uses neon, maze, memory, proximity, intrusion and loop themes without copying protected characters, logos, music, or artwork.
- **Open source:** MIT licensed and intended for a public GitHub repository.

## Gameplay

1. Enter the lobby and tap **ENTER THE MEMORY MAZE**.
2. Activate three switches.
3. Collect three memory fragments.
4. Stay inside the neon proximity signal.
5. The Intruder appears after the first cooperative gate opens.
6. Reunite to trigger the loop transition.
7. Loop Two reveals a memory trace and resets the puzzle.
8. Solve the second route and reach the Final Memory chamber.
9. Collect the final memories while staying together.
10. Escape and replay with friends.

If a visitor is alone, Echo Mode gradually enables the core route. The HUD makes clear that two real players are the intended experience.

## Technical architecture

```text
src/
├── index.ts
├── game/
│   ├── gameManager.ts       # state machine + progression
│   ├── gameState.ts         # explicit game snapshot
│   ├── puzzleSystem.ts      # cooperative switches + door
│   ├── proximitySystem.ts   # nearby-player detection
│   ├── memorySystem.ts      # fragments + reset/apply
│   ├── intruderSystem.ts    # moving pressure event
│   ├── loopSystem.ts        # Loop One → Loop Two → Final Room
│   └── types.ts
├── networking/
│   └── networkState.ts      # Decentraland MessageBus sync
├── entities/
│   ├── primitive.ts
│   ├── switch.ts
│   ├── memory.ts
│   ├── door.ts
│   └── intruder.ts
├── world/
│   ├── lobby.ts
│   ├── maze.ts
│   ├── loopTwo.ts
│   └── finalRoom.ts
└── ui/
    └── hud.tsx
```

## Requirements

- Node.js 20+
- npm 10+
- VS Code or another TypeScript editor
- Decentraland Creator Hub / Desktop client for local preview
- A Decentraland NAME/World for deployment

## Install

```bash
npm install
```

## Run

```bash
npm run start
```

Mobile preview:

```bash
npm run start -- --mobile
```

MCP-enabled preview after installing the official Decentraland skill:

```bash
npm run start -- --mcp
```

## Build

```bash
npm run build
```

## Deploy

Deployment is performed through Decentraland's deployment flow. Configure the World/NAME through the publishing workflow; never put private wallet keys in this repository.

```bash
npm run deploy
```

## Official Decentraland AI skills

```bash
npx skills add decentraland/sdk-skills --all
npx skills add decentraland/sdk-skills --skill unity-explorer-mcp
```

The MCP Explorer workflow lets an AI coding tool inspect the running scene, interact with it, inspect logs, take screenshots and check performance.

## AWS

AWS is **not required to host the Decentraland World**. The World is published through Decentraland. AWS may be added later for external persistence, analytics, matchmaking or an authoritative backend if testing proves the extra infrastructure is useful.


## License

MIT
