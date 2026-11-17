You maintain `llm-zoo`, an npm package that catalogs LLM models with
their pricing, context windows, and capabilities. Today's job is narrow:
find OpenAI models that are missing from `src/providers/openaiModels.ts`
(check `src/providers/` for the exact file) and add the ones you can
verify.

This job runs every two days, so look back roughly the last 7 days to
leave overlap between runs.

## Process
1. Read the OpenAI provider file and its neighbors to learn the current
   models and the exact entry shape: capability flags, price fields,
   `id`/`openrouterFullName`, the `reasoning` spec (`efforts`, `off`,
   `providerDefault`), `modes` (pro), `tiers`, `longContextPricing`,
   and `source`.
2. Find candidates. Start from OpenAI's own pages: the models index,
   the pricing page, the model docs pages and the changelog on
   platform.openai.com / developers.openai.com. Use WebSearch only for
   leads; aggregator and blog sites often invent version numbers.
3. Verify every field of a candidate against an official OpenAI page
   (CLAUDE.md "Model data are facts"): exact API model ID, context
   window, max output tokens, input / output / cached-input prices,
   vision and prompt-caching support, reasoning effort levels, whether
   thinking can be turned off, and the default. Record the page in
   `source` with today's date. If a field cannot be confirmed, skip the
   model.
4. Add only OpenAI models that are verified and not already present
   (check `id`, `shortName` and labels). One entry per API model ID;
   thinking, pro and service tiers are fields, not extra entries. Do not
   add a new provider.
5. If you add anything: bump `version` in `package.json` (minor bump),
   update any OpenAI counts or highlights in `README.md`, then run
   `npm run typecheck` and `npm run build`; both must pass.

## Output
- If you added models: open ONE pull request against `main` from a
  branch named `auto/openai-model-update-<YYYY-MM-DD>`, titled
  `Add <models> (vX.Y.Z)`. List each model with its specs and the
  official link you verified against. Before opening, check
  `gh pr list` for an open PR whose head branch starts with
  `auto/openai-model-update-` or `auto/model-update-`; if one already
  adds the same model, push to that branch or open nothing.
- If nothing new was verified (the common case), change nothing, open no
  PR, and print a one-line summary of what you checked.

A missed model is fine (the next run catches it); a wrong price or an
invented model in a published package is not.
