# AI / Decentraland skills setup

The official Decentraland vibe-coding documentation recommends the SDK Skills package for AI agents.

From the project root:

```bash
npx skills add decentraland/sdk-skills --all
```

For Explorer verification:

```bash
npx skills add decentraland/sdk-skills --skill unity-explorer-mcp
```

The Explorer MCP server is started by the Decentraland desktop client when the scene is launched with:

```bash
npm run start -- --mcp
```

It listens locally at:

```text
http://127.0.0.1:8123/unity-explorer-mcp
```

Continue's MCP support depends on the version/configuration of Continue you have installed. This repository therefore does not hard-code a Continue-specific MCP JSON schema. Use Continue's current MCP configuration UI/docs and register the HTTP endpoint above as `explorer`.
