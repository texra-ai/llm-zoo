import {
  DEFAULT_MODEL_CAPABILITIES,
  ModelCapabilities,
  ModelConfig,
  ModelProvider,
} from '../ModelConfig';

/**
 * Default capabilities for Alibaba DashScope (Qwen) models.
 */
const DASHSCOPE_DEFAULT_CAPABILITIES: ModelCapabilities = {
  ...DEFAULT_MODEL_CAPABILITIES,
  supportsPromptCaching: false,
  supportsVision: true,
  supportsSystemPrompt: true,
};

/**
 * Alibaba DashScope (Qwen) model configurations.
 * Includes Qwen 3 Max, Plus, and Turbo variants.
 */
export const DASHSCOPE_MODELS: Record<string, ModelConfig> = {
  // Qwen3.8-Omni-Flash (released 2026-09-18): native omni-modal model that
  // understands text, image, audio, and video input and responds in text.
  // Reasoning is enabled by default with adjustable effort. Prices below are
  // the Singapore (International) tier, matching this file's existing
  // convention for qwen3max/qwenplus; Beijing and other regions are cheaper
  // ($0.113 / $0.382, cache-hit $0.014).
  // Sources: https://www.alibabacloud.com/help/en/model-studio/qwen3-8-omni-flash
  // and https://www.alibabacloud.com/help/en/model-studio/model-pricing
  qwen38omniflash: {
    name: 'qwen38omniflash',
    label: 'Qwen3.8 Omni Flash',
    fullName: 'qwen3.8-omni-flash',
    shortName: 'qwen3.8-omni-flash',
    openrouterFullName: 'qwen/qwen3.8-omni-flash',
    provider: ModelProvider.DASHSCOPE,
    maxOutputTokens: 131072,
    contextWindow: 1000000,
    inputPrice: 0.15,
    outputPrice: 0.47,
    capabilities: {
      ...DASHSCOPE_DEFAULT_CAPABILITIES,
      supportsVision: true,
      supportsNativeAudio: true,
      supportsReasoning: true,
      supportsAutoPromptCaching: true,
      // Cache-hit input $0.016 / 1M vs $0.15 / 1M input.
      cacheDiscountFactor: 0.016 / 0.15,
    },
    openRouterOnly: false,
  },
  qwen3max: {
    name: 'qwen3max',
    label: 'Qwen 3 Max',
    fullName: 'qwen3-max',
    shortName: 'qwen3-max',
    openrouterFullName: 'qwen/qwen-max',
    provider: ModelProvider.DASHSCOPE,
    maxOutputTokens: 65536,
    contextWindow: 262144,
    inputPrice: 1.2,
    outputPrice: 6,
    capabilities: {
      ...DASHSCOPE_DEFAULT_CAPABILITIES,
      supportsVision: false,
    },
    openRouterOnly: false,
    deprecated: true,
  },
  qwenplus: {
    name: 'qwenplus',
    label: 'Qwen Plus',
    fullName: 'qwen-plus',
    shortName: 'qwen-plus',
    openrouterFullName: 'qwen/qwen-plus',
    provider: ModelProvider.DASHSCOPE,
    maxOutputTokens: 32768,
    contextWindow: 1000000,
    inputPrice: 0.4,
    outputPrice: 1.2,
    capabilities: {
      ...DASHSCOPE_DEFAULT_CAPABILITIES,
      supportsVision: false,
      supportsReasoning: true,
    },
    openRouterOnly: false,
  },
  qwenturbo: {
    name: 'qwenturbo',
    label: 'Qwen Turbo',
    fullName: 'qwen-turbo-latest',
    shortName: 'qwen-turbo-latest',
    openrouterFullName: 'qwen/qwen-turbo',
    provider: ModelProvider.DASHSCOPE,
    maxOutputTokens: 8192,
    contextWindow: 131072,
    inputPrice: 0.05,
    outputPrice: 0.5,
    capabilities: {
      ...DASHSCOPE_DEFAULT_CAPABILITIES,
      supportsVision: false,
      supportsReasoning: true,
    },
    openRouterOnly: false,
  },
};
