This is `llm-zoo`, a TypeScript npm package that catalogs LLM models (pricing,
context windows, capabilities, provider/OpenRouter routing names). It is a data
package, not an application framework — there is no UI, server, or platform
layer to reason about.

Review priorities, in order:
1. **Data correctness.** Prices, context windows, max output tokens, and API
   model IDs (`fullName`, `shortName`, `openrouterFullName`) must match the
   provider's official documentation. Flag any value that looks invented,
   copied from the wrong model, or internally inconsistent (e.g. a
   `cacheDiscountFactor` that does not match the stated cached price).
2. **Schema / type validity.** Entries must satisfy the `ModelConfig` type and
   the project's schemas; capability flags must be coherent (e.g. a reasoning
   variant sets `supportsReasoning`).
3. **Consistency.** `package.json` version bump, `README.md` provider
   counts/highlights, and the model maps must agree. New models should be a
   minor bump.
4. **Build hygiene.** Changes must keep `npm run typecheck` and `npm run build`
   green.

Never recommend new abstractions, factories, or wrappers — they do not belong in
a data package. Cite `path:line` for every finding and include a `Verified`
section listing the files you actually opened. If you assert a price or model ID
is wrong, name the official source it should match.
