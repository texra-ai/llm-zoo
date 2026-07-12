import {
  DEFAULT_MODEL_CAPABILITIES,
  ModelCapabilities,
  ModelConfig,
  ModelProvider,
  ReasoningEffort,
} from '../ModelConfig';

/**
 * Model names documented as supported by GitHub Copilot.
 *
 * These names prepare the catalog for a future Copilot adapter without
 * asserting request identifiers, API pricing, context limits, or capabilities
 * that GitHub does not specify for third-party clients. A future authenticated
 * adapter should obtain request identifiers from the account-specific `/models`
 * response at runtime.
 *
 * Source (verified 2026-07-12):
 * https://docs.github.com/en/copilot/reference/ai-models/supported-models
 */
export const COPILOT_MODEL_NAMES = [
  'GPT-5 mini',
  'GPT-5.3-Codex',
  'GPT-5.4',
  'GPT-5.4 mini',
  'GPT-5.4 nano',
  'GPT-5.5',
  'GPT-5.6 Luna',
  'GPT-5.6 Sol',
  'GPT-5.6 Terra',
  'Claude Fable 5',
  'Claude Haiku 4.5',
  'Claude Opus 4.5',
  'Claude Opus 4.6',
  'Claude Opus 4.7',
  'Claude Opus 4.8',
  'Claude Opus 4.8 (fast mode) (preview)',
  'Claude Sonnet 4.5',
  'Claude Sonnet 4.6',
  'Claude Sonnet 5',
  'Gemini 2.5 Pro',
  'Gemini 3 Flash',
  'Gemini 3.1 Pro',
  'Gemini 3.5 Flash',
  'MAI-Code-1-Flash',
  'Raptor mini',
  'Kimi-K2.7-Code',
] as const;

export type CopilotModelName = (typeof COPILOT_MODEL_NAMES)[number];

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
