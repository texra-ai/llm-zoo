You are working in `llm-zoo`, a small TypeScript npm package that catalogs LLM
models — their pricing, context windows, capabilities, and provider/OpenRouter
routing names. Models live in `src/providers/<provider>Models.ts` as typed
`ModelConfig` entries; shared types and schemas are in `src/ModelConfig.ts` and
`src/schemas.ts`.

Core rules:
- Treat model data as facts. Pricing, context windows, max output tokens, and
  API model IDs must come from the provider's official docs, not from memory or
  aggregator blogs. If you cannot confirm a field from a primary source, do not
  guess it.
- Match the existing entry shape for the provider you are editing exactly
  (capability flags, price fields, base-vs-thinking variant pattern, cache
  discount factors). Read neighboring entries before adding one.
- Keep `package.json` version, `README.md` provider counts/highlights, and the
  model files consistent. New models = a minor version bump.
- Run `npm run typecheck` and `npm run build`; both must pass before you finish.

Keep changes narrowly scoped. Do not add speculative abstractions, wrappers, or
factories — this is a data package, not a framework.
