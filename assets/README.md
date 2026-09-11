# Assets

The current prototype intentionally uses SDK7 primitives so it remains light enough for development on modest hardware.

When adding `.glb`/`.gltf` assets:

- confirm the license before use;
- optimize triangle/material/texture counts;
- prefer compressed, low-detail mobile-friendly assets;
- test the resulting scene budgets;
- get user approval before an AI agent downloads third-party assets.
