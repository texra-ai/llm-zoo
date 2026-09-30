import {
  DEFAULT_MODEL_CAPABILITIES,
  ModelCapabilities,
  ModelEntry,
  ModelProvider,
  ReasoningEffort,
} from '../ModelConfig';

/** Distinct reasoning_effort levels while thinking (other names are aliases). */
const LOW_HIGH_MAX_EFFORTS = [ReasoningEffort.LOW, ReasoningEffort.HIGH, ReasoningEffort.MAX] as const;

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
export const DEEPSEEK_MODELS: readonly ModelEntry[] = [
  // DeepSeek-V4.1-Flash (Non-thinking Mode)
  // Released 2026-09-10: a new Causal Encoder-Decoder architecture (the
  // smallest model in DeepSeek's new architecture family) with native
  // multimodal visual understanding folded into the base model, replacing
  // the separate V4-Flash / V4-Flash-Vision-Exp split below. The canonical
  // model id is `deepseek-flash`; the superseded `deepseek-v4-flash` and
  // `deepseek-v4-flash-vision-exp` ids continue to route here for
  // compatibility. Prices are the off-peak rate, which the pricing page
  // presents as the default ("Off-peak rates are half of the peak rates";
  // peak is 01:00-04:00 and 06:00-10:00 UTC, Mon-Fri). DeepSeek announced an
  // accompanying price reduction in the changelog, not on the pricing page.
  // Sources: https://api-docs.deepseek.com/quick_start/pricing and
  // https://api-docs.deepseek.com/updates/
  // DeepSeek-V4.1-Flash (Thinking Mode)
  // reasoning_effort defaults to high. Flash resolves three distinct levels —
  // low, high, max — so all three are listed. minimal also maps onto low,
  // while medium and xhigh are compatibility aliases that both map onto high
  // and ultra maps onto max, so none of those are listed as distinct levels.
  {
    label: 'DeepSeek V4.1 Flash',
    id: 'deepseek-flash',
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
      supportsFunctionCalling: true,
      supportsAssistantPrefill: true,
      cacheDiscountFactor: 0.02,
    },
    reasoning: { efforts: LOW_HIGH_MAX_EFFORTS, off: [], providerDefault: ReasoningEffort.HIGH },
    legacyKeys: { deepseek41: { effort: ReasoningEffort.NONE }, deepseek41T: { effort: ReasoningEffort.HIGH } },
    source: { url: 'https://api-docs.deepseek.com/guides/thinking_mode', verified: '2026-09-30' },
    openRouterOnly: false,
  },
  // DeepSeek-V4-Flash (Non-thinking Mode)
  // Official API release (DeepSeek-V4-Flash-0731, public beta): the model id
  // stays `deepseek-v4-flash`, so this entry covers the official build. The
  // legacy `deepseek-chat` / `deepseek-reasoner` names point at this model's
  // non-thinking / thinking modes until they are discontinued.
  // Deprecated 2026-09-10 in favor of DeepSeek-V4.1-Flash (`deepseek41`
  // above); the `deepseek-v4-flash` id keeps routing to V4.1-Flash for
  // compatibility rather than failing outright, so this entry is
  // deprecated, not retired. Pricing below matches `deepseek41`, not the
  // historical V4-Flash rate: the pricing page states `deepseek-v4-flash`
  // requests are now served by V4.1-Flash and billed at its price.
  // DeepSeek-V4-Flash (Thinking Mode)
  // reasoning_effort defaults to high. Flash resolves three distinct levels —
  // low, high, max — so all three are listed. xhigh and medium are accepted as
  // compatibility aliases and both map onto high here, so neither is listed as
  // a distinct level.
  // Deprecated 2026-09-10, see `deepseek` above; superseded by `deepseek41T`.
  // Pricing matches `deepseek41T`, see `deepseek`'s comment above for why.
  {
    label: 'DeepSeek V4 Flash',
    id: 'deepseek-v4-flash',
    shortName: 'deepseek-v4-flash',
    openrouterFullName: 'deepseek/deepseek-v4-flash',
    provider: ModelProvider.DEEPSEEK,
    maxOutputTokens: 393216,
    contextWindow: 1048576,
    inputPrice: 0.15,
    outputPrice: 0.6,
    // capabilities describe V4-Flash (unchanged); pricing above follows the
    // compat routing to V4.1-Flash.
    capabilities: {
      ...DEEPSEEK_DEFAULT_CAPABILITIES,
      supportsFunctionCalling: true,
      supportsAssistantPrefill: true,
      cacheDiscountFactor: 0.02,
    },
    reasoning: { efforts: LOW_HIGH_MAX_EFFORTS, off: [], providerDefault: ReasoningEffort.HIGH },
    legacyKeys: { deepseek: { effort: ReasoningEffort.NONE }, deepseekT: { effort: ReasoningEffort.HIGH } },
    source: { url: 'https://api-docs.deepseek.com/quick_start/pricing', verified: '2026-09-30' },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
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
  // Deprecated 2026-09-10: vision is now native in `deepseek41` above, and
  // the `deepseek-v4-flash-vision-exp` id routes to V4.1-Flash for
  // compatibility rather than failing outright, so this entry is
  // deprecated, not retired. Pricing matches `deepseek41`, see `deepseek`'s
  // comment above for why.
  {
    label: 'DeepSeek V4 Flash Vision (Exp)',
    id: 'deepseek-v4-flash-vision-exp',
    shortName: 'deepseek-v4-flash-vision-exp',
    openrouterFullName: 'deepseek/deepseek-v4-flash-vision-exp',
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
    legacyKeys: { deepseekvision: {} },
    source: { url: 'https://api-docs.deepseek.com/quick_start/pricing', verified: '2026-09-30' },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
    deprecated: true,
  },
  // DeepSeek-V4-Pro (Non-thinking Mode)
  // DeepSeek-V4-Pro (Thinking Mode)
  // Since the V4-Pro GA release (2026-08-13) Pro resolves the same three
  // distinct levels as Flash: "thinking modes of V4-Pro and V4-Flash now
  // support three thinking effort levels: low / high / max"
  // (https://api-docs.deepseek.com/updates/). Default high.
  // Model version DeepSeek-V4-Pro-0813. Off-peak list price (the pricing
  // page's default; peak is double): $0.66 input / $0.022 cached input /
  // $1.98 output. Source: https://api-docs.deepseek.com/quick_start/pricing
  {
    label: 'DeepSeek V4 Pro',
    id: 'deepseek-v4-pro',
    shortName: 'deepseek-v4-pro',
    openrouterFullName: 'deepseek/deepseek-v4-pro',
    provider: ModelProvider.DEEPSEEK,
    maxOutputTokens: 393216,
    contextWindow: 1048576,
    inputPrice: 0.66,
    outputPrice: 1.98,
    capabilities: {
      ...DEEPSEEK_DEFAULT_CAPABILITIES,
      supportsFunctionCalling: true,
      supportsAssistantPrefill: true,
      cacheDiscountFactor: 0.022 / 0.66,
    },
    reasoning: { efforts: LOW_HIGH_MAX_EFFORTS, off: [], providerDefault: ReasoningEffort.HIGH },
    legacyKeys: { deepseekpro: { effort: ReasoningEffort.NONE }, deepseekproT: { effort: ReasoningEffort.HIGH } },
    source: { url: 'https://api-docs.deepseek.com/guides/thinking_mode', verified: '2026-09-30' },
    openRouterOnly: false,
  },
  // DeepSeek-V3.2 (Non-thinking Mode)
  {
    label: 'DeepSeek V3.2',
    id: 'deepseek-chat',
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
    legacyKeys: { dsv32: {}, dsv3: {}, dsv3o: {} },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
    deprecated: true,
    retired: true,
  },
  // DeepSeek-V3.2 (Thinking Mode)
  {
    label: 'DeepSeek V3.2',
    id: 'deepseek-reasoner',
    shortName: 'deepseek-reasoner',
    openrouterFullName: 'deepseek/deepseek-v3.2',
    provider: ModelProvider.DEEPSEEK,
    maxOutputTokens: 65536,
    contextWindow: 163840,
    inputPrice: 0.28,
    outputPrice: 0.42,
    capabilities: {
      ...DEEPSEEK_DEFAULT_CAPABILITIES,
      supportsFunctionCalling: true,
      supportsAssistantPrefill: true,
    },
    reasoning: { efforts: [] },
    legacyKeys: { dsv32T: {}, 'deepseekT+': {}, dsr1: {}, dsr1o: {} },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
    deprecated: true,
    retired: true,
  },
];
