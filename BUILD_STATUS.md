# NEON REVERIE Build Status

## Current state

This archive is the **submission-oriented completed source build** for NEON REVERIE. It implements the gameplay loop described by `NEON_REVERIE_COMPLETE_BUILD.md` and is scoped against the Friendzone Buildathon judging criteria.

### Implemented

- SDK7 TypeScript project structure
- One-parcel neon lobby and maze
- Touch-compatible pointer interactions
- Explicit game state machine
- Three cooperative switches
- Proximity requirement for the cooperative route
- Solo Echo fallback after a short wait when the World is empty
- Three memory fragments with resettable visual state
- Intruder activation and movement pressure
- Loop One → Loop Two transition
- Visible loop-memory trace
- Second puzzle progression into Final Memory room
- Final cooperative proximity escape condition
- Decentraland MessageBus shared snapshot synchronization
- Remote snapshot application to puzzle/memory/intruder state
- Mobile-oriented virtual-resolution HUD
- Performance-conscious primitive geometry and one-parcel scope
- Buildathon compliance matrix
- GitHub Actions build workflow
- MIT license
- README and AI/MCP setup documentation

## Verification limitation in this environment

The container used to assemble this archive does not have access to the npm registry. Therefore `npm install` could not download the Decentraland SDK packages, and a real `npm run build` / Decentraland Explorer run could not be completed here.

The source was checked for syntax/delimiter consistency and the architecture was aligned with the current official SDK7 documentation and template. The first local verification step after extracting this archive is:

```bash
npm install
npm run build
```

Then run:

```bash
npm run start -- --mobile
```

and, after installing the official skills:

```bash
npm run start -- --mcp
```

## Deployment requirement

The owner must configure a Decentraland World/NAME and publish the scene through Decentraland's publishing workflow. No wallet private key is included or required in this repository.

## AWS

AWS is intentionally not made a runtime dependency. A Decentraland World is published through Decentraland. AWS can be added later for optional external persistence, matchmaking, analytics, or an authoritative backend.
