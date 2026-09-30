import {
  DEFAULT_MODEL_CAPABILITIES,
  ModelCapabilities,
  ModelEntry,
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
export const DASHSCOPE_MODELS: readonly ModelEntry[] = [
  {
    label: 'Qwen 3 Max',
    id: 'qwen3-max',
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
    // Hybrid thinking: enable_thinking toggles it (off by default); thinking_budget caps its length.
    reasoning: { efforts: [], off: [], budget: true },
    legacyKeys: { qwen3max: {} },
    source: { url: 'https://www.alibabacloud.com/help/en/model-studio/deep-thinking', verified: '2026-09-30' },
    openRouterOnly: false,
    deprecated: true,
  },
  {
    label: 'Qwen Plus',
    id: 'qwen-plus',
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
    },
    // Hybrid thinking: enable_thinking toggles it (off by default); thinking_budget caps its length.
    reasoning: { efforts: [], off: [], budget: true },
    legacyKeys: { qwenplus: {} },
    source: { url: 'https://www.alibabacloud.com/help/en/model-studio/deep-thinking', verified: '2026-09-30' },
    openRouterOnly: false,
  },
  {
    label: 'Qwen Turbo',
    id: 'qwen-turbo-latest',
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
    },
    // Hybrid thinking: enable_thinking toggles it (off by default); thinking_budget caps its length.
    reasoning: { efforts: [], off: [], budget: true },
    legacyKeys: { qwenturbo: {} },
    source: { url: 'https://www.alibabacloud.com/help/en/model-studio/deep-thinking', verified: '2026-09-30' },
    openRouterOnly: false,
  },
];
