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
 * Includes V4.1, V4, V3.2, R1, and thinking variants.
 *
 * Model name conventions:
 * - fullName: Model name for native DeepSeek API (e.g., 'deepseek-chat', 'deepseek-reasoner')
 * - openrouterFullName: Model name for OpenRouter API (e.g., 'deepseek/deepseek-v3.2')
 */
export const DEEPSEEK_MODELS: Record<string, ModelConfig> = {
  // DeepSeek-V4.1-Flash (Non-thinking Mode)
  // Released 2026-09-10: a new Causal Encoder-Decoder architecture (the
  // smallest model in DeepSeek's new architecture family) with native
  // multimodal visual understanding folded into the base model, replacing
  // the separate V4-Flash / V4-Flash-Vision-Exp split below. The canonical
  // model id is `deepseek-flash`; the retired `deepseek-v4-flash` and
  // `deepseek-v4-flash-vision-exp` ids continue to route here for
  // compatibility. Pricing reflects the same-day rate cut DeepSeek announced
  // alongside the release (off-peak; peak, 01:00-04:00 and 06:00-10:00 UTC
  // weekdays, is 2x). Source: https://api-docs.deepseek.com/quick_start/pricing
  deepseek41: {
    name: 'deepseek41',
    label: 'DeepSeek V4.1 Flash',
    fullName: 'deepseek-flash',
    shortName: 'deepseek-flash',
    openrouterFullName: 'deepseek/deepseek-v4.1-flash',
    provider: ModelProvider.DEEPSEEK,
    maxOutputTokens: 393216,
    contextWindow: 1048576,
    inputPrice: 0.15,
    outputPrice: 0.6,
    capabilities: {
      ...DEEPSEEK_DEFAULT_CAPABILITIES,
      supportsVision: true,
      supportsAssistantPrefill: true,
      supportsFunctionCalling: true,
      cacheDiscountFactor: 0.02,
    },
    openRouterOnly: false,
  },
  // DeepSeek-V4.1-Flash (Thinking Mode)
  // reasoning_effort defaults to high. Flash resolves three distinct levels —
  // low, high, max — so all three are listed. minimal also maps onto low,
  // while medium and xhigh are compatibility aliases that both map onto high
  // and ultra maps onto max, so none of those are listed as distinct levels.
  deepseek41T: {
    name: 'deepseek41T',
    label: 'DeepSeek V4.1 Flash (Thinking)',
    fullName: 'deepseek-flash',
    shortName: 'deepseek-flash',
    openrouterFullName: 'deepseek/deepseek-v4.1-flash',
    provider: ModelProvider.DEEPSEEK,
    maxOutputTokens: 393216,
    contextWindow: 1048576,
    inputPrice: 0.15,
    outputPrice: 0.6,
    capabilities: {
      ...DEEPSEEK_DEFAULT_CAPABILITIES,
      supportsVision: true,
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
  // DeepSeek-V4-Flash (Non-thinking Mode)
  // Official API release (DeepSeek-V4-Flash-0731, public beta): the model id
  // stays `deepseek-v4-flash`, so this entry covers the official build. The
  // legacy `deepseek-chat` / `deepseek-reasoner` names point at this model's
  // non-thinking / thinking modes until they are discontinued.
  // Retired 2026-09-10 in favor of DeepSeek-V4.1-Flash (`deepseek41` above);
  // the `deepseek-v4-flash` id keeps routing to V4.1-Flash for compatibility
  // rather than failing outright, so this entry is deprecated, not retired.
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
    deprecated: true,
  },
  // DeepSeek-V4-Flash (Thinking Mode)
  // reasoning_effort defaults to high. Flash resolves three distinct levels —
  // low, high, max — so all three are listed. xhigh and medium are accepted as
  // compatibility aliases and both map onto high here, so neither is listed as
  // a distinct level.
  // Retired 2026-09-10, see `deepseek` above; superseded by `deepseek41T`.
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
    deprecated: true,
  },
  // DeepSeek-V4-Flash-Vision-Exp
  // Experimental vision-enabled variant of V4-Flash (announced 2026-08-21):
  // same base model, same non-thinking chat endpoint, now also accepting
  // image inputs (base64, external URL, or Files API `file_id`) per
  // DeepSeek's Vision guide. That guide states image tokens "are billed
  // together with your text tokens" at the model's normal rate — it
  // publishes no separate image-pricing tier — so this entry mirrors the
  // `deepseek` (V4-Flash non-thinking) entry's price, context window, and
  // max output tokens. The guide only documents non-thinking chat usage, so
  // no thinking-mode variant is listed here.
  // Retired 2026-09-10: vision is now native in `deepseek41` above, and the
  // `deepseek-v4-flash-vision-exp` id routes to V4.1-Flash for compatibility.
  deepseekvision: {
    name: 'deepseekvision',
    label: 'DeepSeek V4 Flash Vision (Exp)',
    fullName: 'deepseek-v4-flash-vision-exp',
    shortName: 'deepseek-v4-flash-vision-exp',
    openrouterFullName: 'deepseek/deepseek-v4-flash-vision-exp',
    provider: ModelProvider.DEEPSEEK,
    maxOutputTokens: 393216,
    contextWindow: 1048576,
    inputPrice: 0.14,
    outputPrice: 0.28,
    capabilities: {
      ...DEEPSEEK_DEFAULT_CAPABILITIES,
      supportsVision: true,
      supportsAssistantPrefill: true,
      supportsFunctionCalling: true,
      cacheDiscountFactor: 0.02,
    },
    openRouterOnly: false,
    deprecated: true,
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
  // Same reasoning_effort vocabulary as Flash (low/high/max), but Pro
  // currently resolves low onto high, so only two distinct levels are listed.
  // The compatibility alias xhigh maps to max here, so it is not a level of
  // its own. DeepSeek says Pro is expected to support all three levels in
  // early August 2026; recheck then.
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
