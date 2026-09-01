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
 * Includes Qwen3.8 Flash, Qwen 3 Max, Plus, and Turbo variants.
 */
export const DASHSCOPE_MODELS: Record<string, ModelConfig> = {
  // Qwen3.8-Flash (open-weight multimodal MoE, released 2026-08-26): 125B
  // total / 6B active params, native 262K context extendable to 1M, image and
  // video input, optional thinking mode. Pricing and context/output limits
  // per Alibaba Cloud's official Model Studio docs (Singapore/international
  // rates); cached input is billed at 10% of the standard input price.
  qwen38flash: {
    name: 'qwen38flash',
    label: 'Qwen3.8 Flash',
    fullName: 'qwen3.8-flash',
    shortName: 'qwen3.8-flash',
    openrouterFullName: 'qwen/qwen3.8-flash',
    provider: ModelProvider.DASHSCOPE,
    maxOutputTokens: 131072,
    contextWindow: 1000000,
    inputPrice: 0.15,
    outputPrice: 0.47,
    capabilities: {
      ...DASHSCOPE_DEFAULT_CAPABILITIES,
      supportsVision: true,
      supportsReasoning: true,
      supportsPromptCaching: true,
      // Cached input is 10% of the $0.15/1M standard input price.
      cacheDiscountFactor: 0.1,
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
