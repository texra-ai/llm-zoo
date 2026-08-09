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
 * Includes Qwen 3.8 Max, Qwen 3 Max, Plus, and Turbo variants.
 */
export const DASHSCOPE_MODELS: Record<string, ModelConfig> = {
  qwen38max: {
    name: 'qwen38max',
    label: 'Qwen 3.8 Max',
    fullName: 'qwen3.8-max',
    shortName: 'qwen3.8-max',
    openrouterFullName: 'qwen/qwen3.8-max',
    provider: ModelProvider.DASHSCOPE,
    maxOutputTokens: 131072,
    contextWindow: 1000000,
    inputPrice: 2.0,
    outputPrice: 6.0,
    capabilities: {
      ...DASHSCOPE_DEFAULT_CAPABILITIES,
      supportsReasoning: true,
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
