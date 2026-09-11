# Friendzone Buildathon Compliance Matrix

This project is intentionally scoped against the Friendzone judging model: mobile-first experience, social value, mobile UX/accessibility, performance/optimization, creativity/originality, retention/discovery, and overall execution.

## Eligibility

| Requirement | Project response |
|---|---|
| Decentraland World | SDK7 scene with `scene.json`, designed for World deployment |
| Public during judging | Deployment must be kept online by the owner |
| Meaningful social interaction | Cooperative switches, proximity, reunion, shared state, final co-op escape |
| Persistent standalone experience | No host or scheduled event is required; lobby starts from player interaction |
| Mobile/touch/small screens | Pointer interactions, large targets, short HUD, virtual UI scale, compact scene |
| Open source | MIT license and source repository |
| Original | Original NEON REVERIE design; no copied protected assets |
| Not single-player only | Social mechanics are the main route; Echo Mode exists only as an accessibility/empty-world fallback |

## Judging targets

### Mobile-First Experience

The experience starts in under 30 seconds, uses a small route, avoids precision-only interactions, and uses a compact HUD designed around virtual dimensions.

### Social Value

The game changes when friends join. Proximity affects progression, the Intruder creates a reunion moment, and shared state is synchronized through the Decentraland MessageBus.

### Mobile UX and Accessibility

Interactions use the SDK's device-agnostic pointer abstraction. The UI uses a virtual resolution, large readable text, concise instructions, and no required typing.

### Performance and Optimization

The shipped foundation deliberately avoids required imported 3D models, uses primitive geometry, keeps the world to one parcel, limits entity count, and avoids heavy particle systems.

### Creativity and Originality

The seven connected identity pillars are: NEON + MAZE + FRIENDS + PROXIMITY + MEMORY + INTRUDER + LOOP.

### Retention and Discovery

The second loop visibly changes the world, memories are replayable, and the intended social loop encourages bringing another player back to attempt the escape again.

### Overall Execution

The repository includes source organization, README, license, build/run/deploy scripts, MCP guidance, and a manual mobile test checklist.

## Verification policy

Do not claim a performance score, successful deployment, or mobile compatibility until it has been measured on the actual target device. Run the build and a real mobile test before submitting.
