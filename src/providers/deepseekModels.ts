import {
  DEFAULT_MODEL_CAPABILITIES,
  ModelCapabilities,
  ModelConfig,
  ModelProvider,
  ReasoningEffort,
} from '../ModelConfig';

/**
 * Default capabilities for DeepSeek models.
 * Features automatic prompt caching.
 */
const DEEPSEEK_DEFAULT_CAPABILITIES: ModelCapabilities = {
  ...DEFAULT_MODEL_CAPABILITIES,
  supportsAutoPromptCaching: true,
  cacheDiscountFactor: 0.1,
  supportsVision: false,
};

/**
 * DeepSeek model configurations.
 * Includes V4, V3.2, R1, and thinking variants.
 *
 * Model name conventions:
 * - fullName: Model name for native DeepSeek API (e.g., 'deepseek-chat', 'deepseek-reasoner')
 * - openrouterFullName: Model name for OpenRouter API (e.g., 'deepseek/deepseek-v3.2')
 */
export const DEEPSEEK_MODELS: Record<string, ModelConfig> = {
  // DeepSeek-V4-Flash (Non-thinking Mode)
  // Official API release (DeepSeek-V4-Flash-0731, public beta): the model id
  // stays `deepseek-v4-flash`, so this entry covers the official build. The
  // legacy `deepseek-chat` / `deepseek-reasoner` names point at this model's
  // non-thinking / thinking modes until they are discontinued.
  deepseek: {
    name: 'deepseek',
    label: 'DeepSeek V4 Flash',
    fullName: 'deepseek-v4-flash',
    shortName: 'deepseek-v4-flash',
    openrouterFullName: 'deepseek/deepseek-v4-flash',
    provider: ModelProvider.DEEPSEEK,
    maxOutputTokens: 393216,
    contextWindow: 1048576,
    inputPrice: 0.14,
    outputPrice: 0.28,
    capabilities: {
      ...DEEPSEEK_DEFAULT_CAPABILITIES,
      supportsAssistantPrefill: true,
      supportsFunctionCalling: true,
      cacheDiscountFactor: 0.02,
    },
    openRouterOnly: false,
  },
  // DeepSeek-V4-Flash (Thinking Mode)
  // reasoning_effort defaults to high. The 0731 build resolves three distinct
  // levels — low, high, max — so all three are listed. The API also accepts
  // medium and xhigh for compatibility, mapping them onto high and max
  // respectively; those aliases are deliberately not listed.
  deepseekT: {
    name: 'deepseekT',
    label: 'DeepSeek V4 Flash (Thinking)',
    fullName: 'deepseek-v4-flash',
    shortName: 'deepseek-v4-flash',
    openrouterFullName: 'deepseek/deepseek-v4-flash',
    provider: ModelProvider.DEEPSEEK,
    maxOutputTokens: 393216,
    contextWindow: 1048576,
    inputPrice: 0.14,
    outputPrice: 0.28,
    capabilities: {
      ...DEEPSEEK_DEFAULT_CAPABILITIES,
      supportsReasoning: true,
      supportsReasoningEffort: true,
      reasoningEffort: ReasoningEffort.HIGH,
      maxReasoningEffort: ReasoningEffort.MAX,
      supportedReasoningEfforts: [
        ReasoningEffort.LOW,
        ReasoningEffort.HIGH,
        ReasoningEffort.MAX,
      ],
      supportsFunctionCalling: true,
      supportsAssistantPrefill: true,
      cacheDiscountFactor: 0.02,
    },
    openRouterOnly: false,
  },
  // DeepSeek-V4-Pro (Non-thinking Mode)
  deepseekpro: {
    name: 'deepseekpro',
    label: 'DeepSeek V4 Pro',
    fullName: 'deepseek-v4-pro',
    shortName: 'deepseek-v4-pro',
    openrouterFullName: 'deepseek/deepseek-v4-pro',
    provider: ModelProvider.DEEPSEEK,
    maxOutputTokens: 393216,
    contextWindow: 1048576,
    inputPrice: 0.435,
    outputPrice: 0.87,
    capabilities: {
      ...DEEPSEEK_DEFAULT_CAPABILITIES,
      supportsAssistantPrefill: true,
      supportsFunctionCalling: true,
      cacheDiscountFactor: 0.003625 / 0.435,
    },
    openRouterOnly: false,
  },
  // DeepSeek-V4-Pro (Thinking Mode)
  // Same reasoning_effort vocabulary as Flash, but Pro currently resolves low
  // onto high, so only the two distinct levels are listed; DeepSeek has said
  // Pro's mapping changes in early August 2026, at which point low becomes a
  // distinct level here too.
  deepseekproT: {
    name: 'deepseekproT',
    label: 'DeepSeek V4 Pro (Thinking)',
    fullName: 'deepseek-v4-pro',
    shortName: 'deepseek-v4-pro',
    openrouterFullName: 'deepseek/deepseek-v4-pro',
    provider: ModelProvider.DEEPSEEK,
    maxOutputTokens: 393216,
    contextWindow: 1048576,
    inputPrice: 0.435,
    outputPrice: 0.87,
    capabilities: {
      ...DEEPSEEK_DEFAULT_CAPABILITIES,
      supportsReasoning: true,
      supportsReasoningEffort: true,
      reasoningEffort: ReasoningEffort.HIGH,
      maxReasoningEffort: ReasoningEffort.MAX,
      supportedReasoningEfforts: [ReasoningEffort.HIGH, ReasoningEffort.MAX],
      supportsFunctionCalling: true,
      supportsAssistantPrefill: true,
      cacheDiscountFactor: 0.003625 / 0.435,
    },
    openRouterOnly: false,
  },
  // DeepSeek-V3.2 (Non-thinking Mode)
  dsv32: {
    name: 'dsv32',
    label: 'DeepSeek V3.2',
    fullName: 'deepseek-chat',
    shortName: 'deepseek-chat',
    openrouterFullName: 'deepseek/deepseek-v3.2',
    provider: ModelProvider.DEEPSEEK,
    maxOutputTokens: 8192,
    contextWindow: 128000,
    inputPrice: 0.28,
    outputPrice: 0.42,
    capabilities: {
      ...DEEPSEEK_DEFAULT_CAPABILITIES,
      supportsAssistantPrefill: true,
      supportsFunctionCalling: true,
    },
    openRouterOnly: false,
    deprecated: true,
    retired: true,
  },
  // DeepSeek-V3.2 (Thinking Mode)
  dsv32T: {
    name: 'dsv32T',
    label: 'DeepSeek V3.2 (Thinking)',
    fullName: 'deepseek-reasoner',
    shortName: 'deepseek-reasoner',
    openrouterFullName: 'deepseek/deepseek-v3.2',
    provider: ModelProvider.DEEPSEEK,
    maxOutputTokens: 65536,
    contextWindow: 163840,
    inputPrice: 0.28,
    outputPrice: 0.42,
    capabilities: {
      ...DEEPSEEK_DEFAULT_CAPABILITIES,
      supportsReasoning: true,
      supportsReasoningEffort: false,
      supportsFunctionCalling: true,
      supportsAssistantPrefill: true,
    },
    openRouterOnly: false,
    deprecated: true,
    retired: true,
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
    retired: true,
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
    capabilities: {
      ...DEEPSEEK_DEFAULT_CAPABILITIES,
      supportsAssistantPrefill: true,
    },
    openRouterOnly: false,
    deprecated: true,
    retired: true,
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
    capabilities: {
      ...DEEPSEEK_DEFAULT_CAPABILITIES,
      supportsReasoning: true,
      supportsReasoningEffort: false,
    },
    openRouterOnly: false,
    deprecated: true,
    retired: true,
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
    capabilities: {
      ...DEEPSEEK_DEFAULT_CAPABILITIES,
      supportsAssistantPrefill: true,
    },
    openRouterOnly: false,
    deprecated: true,
    retired: true,
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
    capabilities: {
      ...DEEPSEEK_DEFAULT_CAPABILITIES,
      supportsReasoning: true,
      supportsReasoningEffort: false,
    },
    openRouterOnly: false,
    deprecated: true,
    retired: true,
  },
};
