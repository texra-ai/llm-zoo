import {
  DEFAULT_MODEL_CAPABILITIES,
  ModelCapabilities,
  ModelEntry,
  ModelProvider,
} from '../ModelConfig';

/**
 * Default capabilities for other/OpenRouter-only models.
 */
const OTHER_DEFAULT_CAPABILITIES: ModelCapabilities = {
  ...DEFAULT_MODEL_CAPABILITIES,
};

/**
 * Other model configurations (OpenRouter-only models).
 * Includes models that are only available through OpenRouter proxy.
 */
export const OTHER_MODELS: readonly ModelEntry[] = [
  {
    label: 'Llama 3.1 405B',
    id: 'meta-llama/llama-3.1-405b-instruct',
    shortName: 'meta-llama/llama-3.1-405b-instruct',
    openrouterFullName: 'meta-llama/llama-3.1-405b-instruct',
    provider: ModelProvider.OTHERS,
    maxOutputTokens: 131072,
    contextWindow: 131072,
    inputPrice: 3.0,
    outputPrice: 3.0,
    capabilities: OTHER_DEFAULT_CAPABILITIES,
    legacyKeys: { llama31: {} },
    openRouterOnly: true,
    deprecated: true,
    // Absent from OpenRouter's model list, and its endpoints list is empty
    // (openrouter.ai/api/v1/models, checked 2026-09-30).
    retired: true,
  },
  {
    label: 'QVQ 72B',
    id: 'qwen/qvq-72b-preview',
    shortName: 'qwen/qvq-72b-preview',
    openrouterFullName: 'qwen/qvq-72b-preview',
    provider: ModelProvider.OTHERS,
    maxOutputTokens: 4096,
    contextWindow: 128000,
    inputPrice: 0.25,
    outputPrice: 0.5,
    capabilities: {
      ...OTHER_DEFAULT_CAPABILITIES,
    },
    legacyKeys: { 'qvq-72b': {} },
    openRouterOnly: true,
    deprecated: true,
    retired: true,
  },
];
