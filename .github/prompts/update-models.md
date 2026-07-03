You maintain `llm-zoo`, an npm package that catalogs LLM models with
their pricing, context windows, and capabilities. Today's job: find
genuinely new LLM models released in roughly the last 7 days and add
any that this repository is missing.

## Scope — only providers this repo already tracks
Look at `src/providers/` for the authoritative list. As of now:
Anthropic, OpenAI, Google (Gemini), xAI (Grok), DeepSeek, Alibaba
(Qwen/DashScope), Zhipu (GLM), MiniMax, Moonshot (Kimi), plus a few
in `otherModels.ts`/`copilotModels.ts`. Do NOT add brand-new
providers (e.g. NVIDIA, Microsoft MAI, Unisound) — those are out of
scope for an automated PR.

## Process
1. Read every file in `src/providers/` to learn the current models
   and the exact entry shape for each provider (capabilities,
   pricing fields, `fullName`/`openrouterFullName`, thinking/base
   variant pattern, etc.). Match the existing style exactly.
2. Research recent releases with WebSearch. Treat aggregator/blog
   sites as leads only — they frequently hallucinate version numbers.
3. For each candidate, VERIFY against a primary/official source
   (the provider's own pricing or model docs) before adding it:
   exact API model ID, context window, max output tokens, input /
   output / cached-input prices, and capabilities (vision,
   reasoning/thinking, prompt caching). If you cannot confirm a
   field from an official source, do not invent it — skip the model.
4. Add only models that are (a) verified, (b) from an in-scope
   provider, and (c) not already present (check `fullName` and
   labels — mind base vs. thinking variants).
5. If you add anything: bump the `version` in `package.json` (minor
   bump), update any provider model counts / highlights in
   `README.md`, then run `npm run typecheck` and `npm run build` and
   make sure both pass.

## Output
- If you added one or more models: open ONE pull request against
  `main` from a branch named `auto/model-update-<YYYY-MM-DD>`. Title
  it `Add <models> (vX.Y.Z)`. In the body, list each model with its
  specs and a link to the official source you verified against, and
  note the version bump. Before opening, check for an already-open PR
  whose head branch starts with `auto/model-update-` (use
  `gh pr list`); if one exists, push your additions to that same
  branch instead of opening a duplicate.
- If you found nothing new and verified (the common case), make NO
  changes and open NO pull request. Just print a one-line summary of
  what you checked. Do not open empty or "nothing to do" PRs.

Be conservative: a missed model is fine (tomorrow's run catches it);
a wrong price or hallucinated model in a published package is not.
