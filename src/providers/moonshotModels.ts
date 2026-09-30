import {
  DEFAULT_MODEL_CAPABILITIES,
  ModelCapabilities,
  ModelEntry,
  ModelProvider,
  ReasoningEffort,
} from '../ModelConfig';

/**
 * Default capabilities for Moonshot (Kimi) models.
 */
const MOONSHOT_DEFAULT_CAPABILITIES: ModelCapabilities = {
  ...DEFAULT_MODEL_CAPABILITIES,
  supportsPromptCaching: false,
  supportsSystemPrompt: true,
};

// Kimi K3 and the Kimi Code `kimi-for-coding` alias take top-level
// `reasoning_effort` low | high | max and always reason.
const KIMI_EFFORTS = [ReasoningEffort.LOW, ReasoningEffort.HIGH, ReasoningEffort.MAX] as const;

const KIMI_CODE_MODELS_URL = 'https://www.kimi.com/code/docs/en/kimi-code/models.html';

/**
 * Moonshot AI (Kimi) model configurations.
 * Includes Kimi K2 and thinking variants.
 */
export const MOONSHOT_MODELS: readonly ModelEntry[] = [
  {
    label: 'Moonshot V1 128K',
    id: 'moonshot-v1-128k',
    shortName: 'moonshot-v1-128k',
    openrouterFullName: 'moonshotai/moonshot-v1-128k',
    provider: ModelProvider.MOONSHOT,
    maxOutputTokens: 64000,
    contextWindow: 131072,
    inputPrice: 2.0,
    outputPrice: 5.0,
    capabilities: {
      ...MOONSHOT_DEFAULT_CAPABILITIES,
      supportsVision: false,
    },
    legacyKeys: { kimi: {} },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
    deprecated: true,
    // moonshot-v1 series discontinued 2026-08-31 (platform.kimi.ai/docs/models);
    // gone from OpenRouter too.
    retired: true,
  },
  {
    label: 'Moonshot V1 128K Vision',
    id: 'moonshot-v1-128k-vision-preview',
    shortName: 'moonshot-v1-128k-vision-preview',
    openrouterFullName: 'moonshotai/moonshot-v1-128k-vision',
    provider: ModelProvider.MOONSHOT,
    maxOutputTokens: 64000,
    contextWindow: 131072,
    inputPrice: 2.0,
    outputPrice: 5.0,
    capabilities: {
      ...MOONSHOT_DEFAULT_CAPABILITIES,
      supportsVision: true,
    },
    legacyKeys: { kimiv: {} },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
    deprecated: true,
    // moonshot-v1 series discontinued 2026-08-31 (platform.kimi.ai/docs/models);
    // gone from OpenRouter too.
    retired: true,
  },
  {
    label: 'Kimi Thinking Preview',
    id: 'kimi-thinking-preview',
    shortName: 'kimi-thinking-preview',
    openrouterFullName: 'moonshotai/kimi-thinking-preview',
    provider: ModelProvider.MOONSHOT,
    maxOutputTokens: 64000,
    contextWindow: 128000,
    inputPrice: 0.42,
    outputPrice: 1.68,
    capabilities: {
      ...MOONSHOT_DEFAULT_CAPABILITIES,
      supportsVision: true,
    },
    reasoning: { efforts: [] },
    legacyKeys: { kimit: {} },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
    deprecated: true,
    retired: true,
  },
  {
    label: 'Kimi K2',
    id: 'kimi-k2-0905-preview',
    shortName: 'kimi-k2-preview',
    openrouterFullName: 'moonshotai/kimi-k2-0905',
    provider: ModelProvider.MOONSHOT,
    maxOutputTokens: 64000,
    contextWindow: 262144,
    inputPrice: 0.6,
    outputPrice: 2.5,
    capabilities: {
      ...MOONSHOT_DEFAULT_CAPABILITIES,
      supportsVision: false,
      supportsAutoPromptCaching: true,
      cacheDiscountFactor: 0.25,
    },
    legacyKeys: { kimi2: {} },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
    deprecated: true,
    retired: true,
  },
  {
    label: 'Kimi K2 Turbo',
    id: 'kimi-k2-turbo-preview',
    shortName: 'kimi-k2-turbo-preview',
    openrouterFullName: 'moonshotai/kimi-k2-turbo',
    provider: ModelProvider.MOONSHOT,
    maxOutputTokens: 64000,
    contextWindow: 262144,
    inputPrice: 1.15,
    outputPrice: 8.0,
    capabilities: {
      ...MOONSHOT_DEFAULT_CAPABILITIES,
      supportsVision: false,
      supportsAutoPromptCaching: true,
      cacheDiscountFactor: 0.15 / 1.15,
    },
    legacyKeys: { 'kimi2+': {} },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
    deprecated: true,
    retired: true,
  },
  {
    label: 'Kimi K2',
    id: 'kimi-k2-thinking',
    shortName: 'kimi-k2-thinking',
    openrouterFullName: 'moonshotai/kimi-k2-thinking',
    provider: ModelProvider.MOONSHOT,
    maxOutputTokens: 64000,
    contextWindow: 262144,
    inputPrice: 0.6,
    outputPrice: 2.5,
    capabilities: {
      ...MOONSHOT_DEFAULT_CAPABILITIES,
      supportsVision: false,
      supportsInterleavedThinking: true,
      supportsAutoPromptCaching: true,
      cacheDiscountFactor: 0.25,
    },
    reasoning: { efforts: [] },
    legacyKeys: { kimi2T: {} },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
    deprecated: true,
    retired: true,
  },
  {
    label: 'Kimi K2 Turbo',
    id: 'kimi-k2-thinking-turbo',
    shortName: 'kimi-k2-thinking-turbo',
    openrouterFullName: 'moonshotai/kimi-k2-thinking-turbo',
    provider: ModelProvider.MOONSHOT,
    maxOutputTokens: 64000,
    contextWindow: 262144,
    inputPrice: 1.15,
    outputPrice: 8.0,
    capabilities: {
      ...MOONSHOT_DEFAULT_CAPABILITIES,
      supportsVision: false,
      supportsInterleavedThinking: true,
      supportsAutoPromptCaching: true,
      cacheDiscountFactor: 0.15 / 1.15,
    },
    reasoning: { efforts: [] },
    legacyKeys: { 'kimi2T+': {} },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
    deprecated: true,
    retired: true,
  },
  // kimi-k2.7-code: Moonshot's strongest coding model (released 2026-06-12).
  // 1T-param MoE (32B active), multimodal (~30% fewer thinking tokens than
  // K2.6). Thinking is mandatory: the API errors if `thinking` is disabled,
  // and there is no effort parameter.
  {
    label: 'Kimi K2.7 Code',
    id: 'kimi-k2.7-code',
    shortName: 'kimi-k2.7-code',
    openrouterFullName: 'moonshotai/kimi-k2.7-code',
    provider: ModelProvider.MOONSHOT,
    maxOutputTokens: 64000,
    contextWindow: 262144,
    inputPrice: 0.95,
    outputPrice: 4.0,
    capabilities: {
      ...MOONSHOT_DEFAULT_CAPABILITIES,
      supportsVision: true,
      supportsInterleavedThinking: true,
      supportsAutoPromptCaching: true,
      // Cached input $0.19 / 1M vs $0.95 / 1M input.
      cacheDiscountFactor: 0.19 / 0.95,
    },
    reasoning: { efforts: [] },
    source: { url: 'https://platform.kimi.ai/docs/guide/kimi-k2-7-code-quickstart', verified: '2026-09-30' },
    // 1.x `kimi27code` asked for thinking off, which the API rejects; it now
    // resolves to the (thinking) default.
    legacyKeys: { kimi27code: {}, kimi27codeT: {} },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
  },
  // kimi-k2.6: A model that can enable or disable thinking capability, enabled by default. You can disable thinking by using {"type": "disabled"}
  {
    label: 'Kimi K2.6',
    id: 'kimi-k2.6',
    shortName: 'kimi-k2.6',
    openrouterFullName: 'moonshotai/kimi-k2.6',
    provider: ModelProvider.MOONSHOT,
    maxOutputTokens: 64000,
    contextWindow: 262144,
    inputPrice: 0.95,
    outputPrice: 4.0,
    capabilities: {
      ...MOONSHOT_DEFAULT_CAPABILITIES,
      supportsVision: true,
      supportsInterleavedThinking: true,
      supportsAutoPromptCaching: true,
      // Cached input $0.16 / 1M vs $0.95 / 1M input
      // (https://platform.kimi.ai/docs/pricing/chat).
      cacheDiscountFactor: 0.16 / 0.95,
    },
    // `thinking: {type: enabled|disabled}` (default enabled); no effort parameter.
    reasoning: { efforts: [], off: [] },
    source: { url: 'https://platform.kimi.ai/docs/guide/kimi-k2-6-quickstart', verified: '2026-09-30' },
    legacyKeys: { kimi26: { effort: ReasoningEffort.NONE }, kimi26T: {} },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
  },
  // kimi-k2.5: A model that can enable or disable thinking capability, enabled by default. You can disable thinking by using {"type": "disabled"}
  {
    label: 'Kimi K2.5',
    id: 'kimi-k2.5',
    shortName: 'kimi-k2.5',
    openrouterFullName: 'moonshotai/kimi-k2.5',
    provider: ModelProvider.MOONSHOT,
    maxOutputTokens: 64000,
    contextWindow: 262144,
    inputPrice: 0.6,
    outputPrice: 3.0,
    capabilities: {
      ...MOONSHOT_DEFAULT_CAPABILITIES,
      supportsVision: true,
      supportsInterleavedThinking: true,
      supportsAutoPromptCaching: true,
      cacheDiscountFactor: 0.1 / 0.6,
    },
    reasoning: { efforts: [], off: [] },
    // Moonshot discontinued kimi-k2.5 on 2026-08-31 (this page); OpenRouter
    // still routes it to third-party hosts. Thinking facts carried over.
    source: { url: 'https://platform.kimi.ai/docs/models', verified: '2026-09-30' },
    legacyKeys: { kimi25: { effort: ReasoningEffort.NONE }, kimi25T: {} },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
    deprecated: true,
  },
  // kimi-k3: Moonshot's flagship model (2.8T params), built on Kimi Delta
  // Attention with native visual understanding and a 1M-token context window.
  // Always reasons; reasoning_effort low | high | max, default max.
  {
    label: 'Kimi K3',
    id: 'kimi-k3',
    shortName: 'kimi-k3',
    openrouterFullName: 'moonshotai/kimi-k3',
    // Also served by the Kimi Code subscription endpoint under the wire ID
    // `k3` (clients must rewrite kimi-k3 -> k3 on that route). Moderato tier
    // gets 256K context there; Allegretto+ gets the full 1M. That route takes
    // the same efforts but defaults to high (KIMI_CODE_MODELS_URL).
    kimiSubscription: true,
    provider: ModelProvider.MOONSHOT,
    maxOutputTokens: 1048576,
    contextWindow: 1048576,
    inputPrice: 3.0,
    outputPrice: 15.0,
    capabilities: {
      ...MOONSHOT_DEFAULT_CAPABILITIES,
      supportsVision: true,
      supportsInterleavedThinking: true,
      supportsAutoPromptCaching: true,
      // Cached input $0.30 / 1M vs $3.00 / 1M input (cache miss).
      cacheDiscountFactor: 0.3 / 3.0,
    },
    reasoning: { efforts: KIMI_EFFORTS, providerDefault: ReasoningEffort.MAX },
    source: { url: 'https://platform.kimi.ai/docs/guide/use-reasoning-effort', verified: '2026-09-30' },
    legacyKeys: { kimi3: { effort: ReasoningEffort.MAX } },
    openRouterOnly: false,
  },
  // ==========================================================================
  // Kimi Code (Moonshot coding-subscription plan) — served ONLY by the managed
  // endpoint https://api.kimi.com/coding/v1 (OAuth device-flow token or Kimi
  // Code console API key). Open-platform keys do not work here and vice versa.
  // Both protocols on that endpoint accept exactly these three wire IDs.
  // Prices are 0: usage is covered by the membership, not per-token billing.
  // ==========================================================================
  // kimi-for-coding: the coding-plan alias included with every membership
  // tier (currently K2.8 Preview; Moonshot may repoint it over time).
  // reasoning_effort low | high | max, default max.
  {
    label: 'Kimi for Coding',
    id: 'kimi-for-coding',
    shortName: 'kimi-for-coding',
    provider: ModelProvider.MOONSHOT,
    baseUrl: 'https://api.kimi.com/coding/v1',
    kimiSubscription: true,
    maxOutputTokens: 64000,
    contextWindow: 262144,
    inputPrice: 0,
    outputPrice: 0,
    capabilities: {
      ...MOONSHOT_DEFAULT_CAPABILITIES,
      supportsVision: true,
      supportsInterleavedThinking: true,
      supportsAutoPromptCaching: true,
    },
    reasoning: { efforts: KIMI_EFFORTS, providerDefault: ReasoningEffort.MAX },
    source: { url: KIMI_CODE_MODELS_URL, verified: '2026-09-30' },
    legacyKeys: { kimiCoding: {} },
    openRouterOnly: false,
  },
  // kimi-for-coding-highspeed: Allegretto+ only; K2.7 Code at 5-6x output
  // speed. Thinking is always on, with no effort control.
  {
    label: 'Kimi for Coding (High-Speed)',
    id: 'kimi-for-coding-highspeed',
    shortName: 'kimi-for-coding-highspeed',
    provider: ModelProvider.MOONSHOT,
    baseUrl: 'https://api.kimi.com/coding/v1',
    kimiSubscription: true,
    maxOutputTokens: 64000,
    contextWindow: 262144,
    inputPrice: 0,
    outputPrice: 0,
    capabilities: {
      ...MOONSHOT_DEFAULT_CAPABILITIES,
      supportsVision: true,
      supportsInterleavedThinking: true,
      supportsAutoPromptCaching: true,
    },
    reasoning: { efforts: [] },
    source: { url: KIMI_CODE_MODELS_URL, verified: '2026-09-30' },
    legacyKeys: { kimiCodingFast: {} },
    openRouterOnly: false,
  },
];
