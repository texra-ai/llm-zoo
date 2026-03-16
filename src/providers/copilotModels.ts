import {
  DEFAULT_MODEL_CAPABILITIES,
  ModelCapabilities,
  ModelConfig,
  ModelProvider,
  ReasoningEffort,
} from '../ModelConfig';

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
 * These models are free-tier and powered by GPT-4o.
 */
export const COPILOT_MODELS: Record<string, ModelConfig> = {
  copilot4o: {
    name: 'copilot4o',
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
    description: 'GitHub Copilot GPT-4o. Free-tier model for code completion and chat. 128K context, 8K max output.',
  },
};
