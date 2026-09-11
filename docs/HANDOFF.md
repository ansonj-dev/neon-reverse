# NEON REVERIE handoff

This archive was generated from the NEON_REVERIE_COMPLETE_BUILD.md master specification and current official SDK7 guidance.

## On the user's PC

1. Extract the archive.
2. Open the `neon-reverie` folder in VS Code.
3. Open a terminal in that folder.
4. Run:

```bash
npm install
```

5. Install official Decentraland skills:

```bash
npx skills add decentraland/sdk-skills --all
npx skills add decentraland/sdk-skills --skill unity-explorer-mcp
```

6. Start a preview:

```bash
npm run start
```

7. When the Decentraland desktop client is available and you want MCP verification:

```bash
npm run start -- --mcp
```

The MCP endpoint is local-only:

`http://127.0.0.1:8123/unity-explorer-mcp`

## Important

The archive is a code-first SDK7 foundation, not a claim that the scene has already been visually verified in Explorer. The local MCP connection is required for an agent to see the running scene, inspect logs, take screenshots, and walk/click through the actual Explorer.

After `npm install`, run `npm run build`. If the SDK reports API/type errors, fix those against the installed current SDK rather than pinning an obsolete API from an old tutorial.
