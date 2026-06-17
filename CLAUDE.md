# CLAUDE.md

Guidance for Claude Code (and the repo's GitHub automation) when working in
`llm-zoo`.

## What this is

`llm-zoo` is a small TypeScript npm package that catalogs LLM models — their
pricing, context windows, capabilities, and provider / OpenRouter routing names.
It is a **data package**, not an application or framework: there is no UI,
server, or platform layer.

- Models live in `src/providers/<provider>Models.ts` as typed `ModelConfig`
  entries.
- Shared types and schemas are in `src/ModelConfig.ts` and `src/schemas.ts`.
- The aggregate registry and lookups are assembled in `src/providers/index.ts`.

## Core rules

1. **Model data are facts.** Pricing, context windows, max output tokens, and
   API model IDs (`fullName`, `shortName`, `openrouterFullName`) must come from
   the provider's **official documentation** — not memory, and not aggregator
   blogs (they routinely hallucinate version numbers and prices). If you cannot
   confirm a field from a primary source, do not guess it; leave the model out.
2. **Match the existing shape.** Before adding an entry, read neighboring
   entries for that provider and copy their structure exactly: capability flags,
   price fields, the base-vs-`(Thinking)` variant pattern, and
   `cacheDiscountFactor` (which must equal cached price ÷ input price).
3. **Keep things consistent.** A change that adds models must also:
   - bump the `version` in `package.json` (minor bump for new models), and
   - update any affected provider counts / highlights in `README.md`.
4. **Keep the build green.** Run `npm run typecheck` and `npm run build`; both
   must pass. Do not run `npm publish` (releases happen via a GitHub Release —
   see below).

## Don't

- Don't add speculative abstractions, factories, or wrappers. This is a flat
  data package.
- Don't introduce new providers in automated PRs without a human decision.

## Releasing

Publishing is automated: creating a **GitHub Release** (tag `vX.Y.Z`) triggers
`.github/workflows/publish.yml`, which builds and runs `npm publish` with
provenance. So a release = bump `package.json`, merge to `main`, then cut the
GitHub Release.
