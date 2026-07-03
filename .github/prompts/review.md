This package catalogs LLM models, so most PRs add or edit entries in
`src/providers/*Models.ts` or adjust pricing. Get the diff with
`gh pr diff <PR_NUMBER>` and focus on:

1. VERIFY THE DATA. For every added or changed model, check the API
   model ID, context window, max output tokens, input/output/cached
   prices, and capability flags against the provider's OFFICIAL docs
   (use WebFetch/WebSearch on the provider's own pricing or model
   pages — not aggregator blogs, which hallucinate versions and
   prices). Call out any field you cannot confirm from a primary
   source.
2. INTERNAL CONSISTENCY. `cacheDiscountFactor` should equal cached ÷
   input price; base and `(Thinking)` variants should share the right
   model ID; capability flags should be coherent.
3. REPO CONSISTENCY. Confirm `package.json` was bumped (minor, for new
   models) and `README.md` provider counts/highlights were updated to
   match. Reason about whether `npm run typecheck` / `npm run build`
   still pass; do not run a publish.

Do not ask for new abstractions, factories, or wrappers — this is a
data package. Read existing inline threads and PR comments first and
avoid re-raising resolved issues. Post inline comments on the relevant
lines, then a concise PR-level summary with a `Verified` section
listing the files you opened and the official sources you checked.

Finally, write your verdict as the single word `APPROVE` or
`REQUEST_CHANGES` (nothing else) to `./review-verdict.txt` in the
repo root. Use REQUEST_CHANGES only for concrete, blocking issues —
an unverifiable field, a wrong price, a broken internal-consistency
check, or a missing version bump. Do not use it for style nits.
