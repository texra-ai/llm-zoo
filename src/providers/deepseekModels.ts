import {
  DEFAULT_MODEL_CAPABILITIES,
  ModelCapabilities,
  ModelConfig,
  ModelProvider,
} from '../ModelConfig';

/**
 * Default capabilities for DeepSeek models.
 * Features automatic prompt caching with 90% cost savings.
 */
const DEEPSEEK_DEFAULT_CAPABILITIES: ModelCapabilities = {
  ...DEFAULT_MODEL_CAPABILITIES,
  supportsAutoPromptCaching: true,
  cacheDiscountFactor: 0.1,
  supportsVision: false,
};

/**
 * DeepSeek model configurations.
 * Includes V3.2, R1, and thinking variants.
 *
 * Model name conventions:
 * - fullName: Model name for native DeepSeek API (e.g., 'deepseek-chat', 'deepseek-reasoner')
 * - openrouterFullName: Model name for OpenRouter API (e.g., 'deepseek/deepseek-v3.2')
 */
export const DEEPSEEK_MODELS: Record<string, ModelConfig> = {
  // DeepSeek-V3.2 (Non-thinking Mode)
  deepseek: {
    name: 'deepseek',
    label: 'DeepSeek V3.2',
    fullName: 'deepseek-chat',
    shortName: 'deepseek-chat',
    openrouterFullName: 'deepseek/deepseek-v3.2',
    provider: ModelProvider.DEEPSEEK,
    maxOutputTokens: 8192,
    contextWindow: 128000,
    inputPrice: 0.28,
    outputPrice: 0.42,
    description: 'DeepSeek V3.2 chat, very cheap',
    capabilities: {
      ...DEEPSEEK_DEFAULT_CAPABILITIES,
      supportsAssistantPrefill: true,
      supportsFunctionCalling: true,
    },
    openRouterOnly: false,
  },
  // DeepSeek-V3.2 (Thinking Mode)
  deepseekT: {
    name: 'deepseekT',
    label: 'DeepSeek (Thinking)',
    fullName: 'deepseek-reasoner',
    shortName: 'deepseek-reasoner',
    openrouterFullName: 'deepseek/deepseek-v3.2',
    provider: ModelProvider.DEEPSEEK,
    maxOutputTokens: 65536,
    contextWindow: 163840,
    inputPrice: 0.28,
    outputPrice: 0.42,
    description: 'DeepSeek V3.2 with reasoning, very cheap',
    capabilities: {
      ...DEEPSEEK_DEFAULT_CAPABILITIES,
      supportsReasoning: true,
      supportsReasoningEffort: false,
      supportsFunctionCalling: true,
      supportsAssistantPrefill: true,
    },
    openRouterOnly: false,
  },
  // DeepSeek-V3.2-Speciale (Extended Thinking)
  'deepseekT+': {
    name: 'deepseekT+',
    label: 'DeepSeek Speciale (Thinking)',
    fullName: 'deepseek-reasoner',
    shortName: 'deepseek-reasoner',
    openrouterFullName: 'deepseek/deepseek-v3.2-speciale',
    provider: ModelProvider.DEEPSEEK,
    maxOutputTokens: 131072,
    contextWindow: 163840,
    inputPrice: 0.28,
    outputPrice: 0.42,
    description: 'DeepSeek V3.2 Speciale, extended thinking',
    capabilities: {
      ...DEEPSEEK_DEFAULT_CAPABILITIES,
      supportsReasoning: true,
      supportsReasoningEffort: false,
      supportsFunctionCalling: false,
      supportsAssistantPrefill: false,
    },
    openRouterOnly: false,
    baseUrl: 'https://api.deepseek.com/v3.2_speciale_expires_on_20251215',
    deprecated: true,
  },
  dsv3: {
    name: 'dsv3',
    label: 'DeepSeek V3',
    fullName: 'deepseek-chat',
    shortName: 'deepseek-chat',
    openrouterFullName: 'deepseek/deepseek-chat-v3-0324',
    provider: ModelProvider.DEEPSEEK,
    maxOutputTokens: 64000,
    contextWindow: 128000,
    inputPrice: 0.14,
    outputPrice: 0.28,
    description: 'DeepSeek V3.0 chat',
    capabilities: {
      ...DEEPSEEK_DEFAULT_CAPABILITIES,
      supportsAssistantPrefill: true,
    },
    openRouterOnly: false,
    deprecated: true,
  },
  dsr1: {
    name: 'dsr1',
    label: 'DeepSeek R1',
    fullName: 'deepseek-reasoner',
    shortName: 'deepseek-reasoner',
    openrouterFullName: 'deepseek/deepseek-r1-0528',
    provider: ModelProvider.DEEPSEEK,
    maxOutputTokens: 65536,
    contextWindow: 128000,
    inputPrice: 4,
    outputPrice: 4,
    description: 'DeepSeek R1 reasoning model',
    capabilities: {
      ...DEEPSEEK_DEFAULT_CAPABILITIES,
      supportsReasoning: true,
      supportsReasoningEffort: false,
    },
    openRouterOnly: false,
    deprecated: true,
  },
  dsv3o: {
    name: 'dsv3o',
    label: 'DeepSeek V3 (Old)',
    fullName: 'deepseek-chat',
    shortName: 'deepseek-chat',
    openrouterFullName: 'deepseek/deepseek-chat-v3-0324',
    provider: ModelProvider.DEEPSEEK,
    maxOutputTokens: 8192,
    contextWindow: 64000,
    inputPrice: 0.27,
    outputPrice: 1.1,
    description: 'DeepSeek V3.0 chat (OpenRouter)',
    capabilities: {
      ...DEEPSEEK_DEFAULT_CAPABILITIES,
      supportsAssistantPrefill: true,
    },
    openRouterOnly: false,
    deprecated: true,
  },
  dsr1o: {
    name: 'dsr1o',
    label: 'DeepSeek R1 (Old)',
    fullName: 'deepseek-reasoner',
    shortName: 'deepseek-reasoner',
    openrouterFullName: 'deepseek/deepseek-r1-0528',
    provider: ModelProvider.DEEPSEEK,
    maxOutputTokens: 64000,
    contextWindow: 64000,
    inputPrice: 0.55,
    outputPrice: 2.19,
    description: 'DeepSeek R1 reasoning (OpenRouter)',
    capabilities: {
      ...DEEPSEEK_DEFAULT_CAPABILITIES,
      supportsReasoning: true,
      supportsReasoningEffort: false,
    },
    openRouterOnly: false,
    deprecated: true,
  },
};
