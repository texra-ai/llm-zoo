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
 * Includes Qwen 3.8 Max, Qwen 3.7 Plus, Qwen 3.8 Flash, Qwen 3 Max, Plus, and
 * Turbo variants. Prices are the Singapore (International) list prices.
 */
export const DASHSCOPE_MODELS: Record<string, ModelConfig> = {
  // qwen3.8-max: 2.4T-parameter MoE flagship with native image/video input.
  // Hybrid thinking (enable_thinking). 1,000,000-token context, 131,072 max
  // output. $2 input / $0.25 implicit-cache input / $6 output.
  // Sources: https://www.alibabacloud.com/help/en/model-studio/qwen3-8-max and
  // https://www.alibabacloud.com/help/en/model-studio/model-pricing
  qwen38max: {
    name: 'qwen38max',
    label: 'Qwen 3.8 Max',
    fullName: 'qwen3.8-max',
    shortName: 'qwen3.8-max',
    provider: ModelProvider.DASHSCOPE,
    maxOutputTokens: 131072,
    contextWindow: 1000000,
    inputPrice: 2,
    outputPrice: 6,
    capabilities: {
      ...DASHSCOPE_DEFAULT_CAPABILITIES,
      supportsReasoning: true,
      supportsAutoPromptCaching: true,
      // Implicit-cache input $0.25 / 1M vs $2 / 1M input.
      cacheDiscountFactor: 0.25 / 2,
    },
    openRouterOnly: false,
  },
  // qwen3.7-plus (= qwen3.7-plus-2026-05-26): image/video input, hybrid
  // thinking (on by default). 1,000,000-token context, 131,072 max output.
  // Prices are the <=256K-input tier: $0.4 input / $0.08 implicit-cache input
  // / $1.6 output (256K-1M tier: $1.2 / $0.24 / $4.8).
  // Source: https://www.alibabacloud.com/help/en/model-studio/qwen3-7-plus
  qwen37plus: {
    name: 'qwen37plus',
    label: 'Qwen 3.7 Plus',
    fullName: 'qwen3.7-plus',
    shortName: 'qwen3.7-plus',
    openrouterFullName: 'qwen/qwen3.7-plus',
    provider: ModelProvider.DASHSCOPE,
    maxOutputTokens: 131072,
    contextWindow: 1000000,
    inputPrice: 0.4,
    outputPrice: 1.6,
    capabilities: {
      ...DASHSCOPE_DEFAULT_CAPABILITIES,
      supportsReasoning: true,
      supportsAutoPromptCaching: true,
      // Implicit-cache input $0.08 / 1M vs $0.4 / 1M input.
      cacheDiscountFactor: 0.08 / 0.4,
    },
    openRouterOnly: false,
  },
  // qwen3.8-flash: image/video input, hybrid thinking (on by default).
  // 1,000,000-token context, 131,072 max output. $0.15 input / $0.016
  // implicit-cache input / $0.47 output.
  // Source: https://www.alibabacloud.com/help/en/model-studio/qwen3-8-flash
  qwen38flash: {
    name: 'qwen38flash',
    label: 'Qwen 3.8 Flash',
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
      supportsReasoning: true,
      supportsAutoPromptCaching: true,
      // Implicit-cache input $0.016 / 1M vs $0.15 / 1M input.
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
    // "Qwen-Turbo will no longer be updated. We recommend switching to
    // Qwen-Flash." (model-studio/model-pricing)
    deprecated: true,
  },
};
