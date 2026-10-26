/**
 * Model names documented as supported by GitHub Copilot.
 *
 * These labels cover the complete documented catalog. Copilot has no model
 * entries of its own: it is a route to the providers' models, whose entries
 * carry `copilotFullName` and `vscodeLMFullName` route identifiers.
 * An authenticated adapter should still intersect the static catalog with the
 * account-specific model response at runtime because availability depends on
 * the user's plan, policy, and client.
 *
 * Source (verified 2026-10-25):
 * https://docs.github.com/en/copilot/reference/ai-models/supported-models
 * (data: https://github.com/github/docs/blob/02c25d16369fe27f9bdb28d1201f6b452f0d21dd/data/tables/copilot/model-release-status.yml)
 */
export const COPILOT_MODEL_NAMES = [
  'GPT-5.3-Codex',
  'GPT-5.4 nano',
  'GPT-5.6 Luna',
  'GPT-5.6 Sol',
  'GPT-5.6 Terra',
  'GPT-6 Astra',
  'GPT-6 Luna',
  'GPT-6 Sol',
  'GPT-6.1 Sol',
  'Claude Fable 5',
  'Claude Fable 5.1',
  'Claude Haiku 4.5',
  'Claude Haiku 5.5',
  'Claude Opus 4.8',
  'Claude Opus 4.8 (fast mode) (preview)',
  'Claude Opus 5',
  'Claude Opus 5.5',
  'Claude Sonnet 4.6',
  'Claude Sonnet 5',
  'Claude Sonnet 5.5',
  'Gemini 3.8 Flash',
  'Gemini 4 Argon',
  'MAI-Code-1.1-Flash',
  'Kimi K3',
  'Grok 4.5',
  'Grok 4.6',
  'Grok 4.7',
] as const;

export type CopilotModelName = (typeof COPILOT_MODEL_NAMES)[number];

/**
 * Exact identifiers documented for GitHub Copilot's `--model` option.
 *
 * Source (verified 2026-10-25):
 * https://github.com/github/docs/blob/02c25d16369fe27f9bdb28d1201f6b452f0d21dd/content/copilot/reference/copilot-cli-reference/cli-command-reference.md#L794-L804
 */
export const COPILOT_MODEL_IDS = [
  'claude-sonnet-5.5',
  'gpt-6.1-sol',
  'gpt-6-astra',
  'gpt-6-luna',
  'claude-opus-5.5',
  'claude-haiku-5.5',
  'claude-haiku-4.5',
  'gpt-5.3-codex',
  'gemini-3.8-flash',
] as const;

export type CopilotModelId = (typeof COPILOT_MODEL_IDS)[number];
