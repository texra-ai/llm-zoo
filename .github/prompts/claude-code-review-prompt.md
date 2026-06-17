Review this `llm-zoo` pull request.

Get the diff with `gh pr diff`. This package catalogs LLM models, so most PRs
add or edit model entries in `src/providers/*Models.ts` or adjust pricing.

Focus your review on:

1. **Verify the data.** For every added or changed model, check the API model
   ID, context window, max output tokens, input/output/cached prices, and
   capability flags against the provider's official documentation (use WebFetch
   / WebSearch on the provider's own pricing or model docs — not aggregator
   blogs, which routinely hallucinate version numbers and prices). Call out any
   field you could not confirm from a primary source.
2. **Check internal consistency.** `cacheDiscountFactor` should match the stated
   cached vs. input price; base and `(Thinking)` variants should share the right
   model ID; capability flags should be coherent.
3. **Check repo consistency.** Confirm the `package.json` version was bumped
   (minor, for new models) and that `README.md` provider counts and highlights
   were updated to match. Confirm `npm run typecheck` and `npm run build` would
   still pass (reason about the types; do not run a publish).

Do not ask the author to add abstractions, factories, or wrappers — this is a
data package. Before posting, read existing inline threads and PR comments and
avoid re-raising resolved issues.

For each concrete issue, post an inline comment on the relevant line. At the end,
post a concise PR-level summary, including a `Verified` section listing the files
and line ranges you actually opened and the official sources you checked prices
against.
