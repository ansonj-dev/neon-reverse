# NEON REVERIE agent instructions

NEON REVERIE is a mobile-first multiplayer Decentraland SDK7 World.

## Source of truth

Read `NEON_REVERIE_COMPLETE_BUILD.md` for product/game design requirements. Do not inject the entire document into context for every task; read only the relevant sections.

## Engineering rules

- Use the current stable `@dcl/sdk` APIs.
- Prefer official Decentraland SDK Skills and documentation over memory.
- Inspect installed package types before introducing an API.
- Preserve the one-parcel, mobile-first, performance-conscious scope.
- Keep game logic in `src/game`, world construction in `src/world`, reusable entities in `src/entities`, networking in `src/networking`, and HUD in `src/ui`.
- Keep multiplayer behavior meaningful. Avoid fake multiplayer UI that does not affect gameplay.
- Do not add heavy third-party assets without explicit approval.
- Do not use copyrighted TRON/Coco characters, logos, environments, music, or artwork.
- Never commit wallet private keys, API keys, `.env` files, or secrets.
- Build and test after meaningful changes.
- For visual verification, use Decentraland Explorer MCP when available.
