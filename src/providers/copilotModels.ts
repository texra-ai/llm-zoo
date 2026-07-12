import {
  DEFAULT_MODEL_CAPABILITIES,
  ModelCapabilities,
  ModelConfig,
  ModelProvider,
  ReasoningEffort,
} from '../ModelConfig';

/** A GitHub-documented Copilot model identifier and its display name. */
export interface CopilotModelName {
  readonly fullName: string;
  readonly label: string;
}

/**
 * Model identifiers accepted by GitHub Copilot CLI.
 *
 * These name-only records prepare the catalog for a future Copilot adapter
 * without asserting API pricing, context limits, or capabilities that GitHub
 * does not specify for third-party clients. A future authenticated adapter
 * should still prefer the account-specific `/models` response at runtime.
 *
 * Source (verified 2026-07-12):
 * https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#supported-models
 */
export const COPILOT_MODEL_NAMES = [
  { fullName: 'claude-sonnet-4.6', label: 'Claude Sonnet 4.6' },
  { fullName: 'gpt-5.4', label: 'GPT-5.4' },
  { fullName: 'claude-haiku-4.5', label: 'Claude Haiku 4.5' },
  { fullName: 'gpt-5.3-codex', label: 'GPT-5.3 Codex' },
  { fullName: 'gemini-3.1-pro-preview', label: 'Gemini 3.1 Pro' },
  { fullName: 'gemini-3.5-flash', label: 'Gemini 3.5 Flash' },
  { fullName: 'mai-code-1-flash', label: 'MAI-Code-1-Flash' },
] as const satisfies readonly CopilotModelName[];

/**
 * Default capabilities for GitHub Copilot models.
 */
const COPILOT_DEFAULT_CAPABILITIES: ModelCapabilities = {
  ...DEFAULT_MODEL_CAPABILITIES,
  supportsVision: true,
  supportsNativePdf: false,
};

/**
 * GitHub Copilot model configurations.
 * The configured GPT-4o placeholder is retained for compatibility. Future
 * Copilot integrations should use COPILOT_MODEL_NAMES plus runtime discovery.
 */
export const COPILOT_MODELS: Record<string, ModelConfig> = {
  copilot4o: {
    name: 'copilot4o',
    label: 'Copilot GPT-4o',
    fullName: 'copilot-gpt-4o',
    shortName: 'copilot-gpt-4o',
    provider: ModelProvider.COPILOT,
    maxOutputTokens: 8192,
    contextWindow: 128000,
    inputPrice: 0,
    outputPrice: 0,
    capabilities: {
      ...COPILOT_DEFAULT_CAPABILITIES,
      reasoningEffort: ReasoningEffort.MEDIUM,
    },
    openRouterOnly: false,
    deprecated: true,
  },
};
