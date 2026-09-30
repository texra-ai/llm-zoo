import {
  DEFAULT_MODEL_CAPABILITIES,
  ModelCapabilities,
  ModelEntry,
  ModelProvider,
  ReasoningEffort,
} from '../ModelConfig';

/** GLM-5.3 series: "only the low / high / max levels are supported". */
const LOW_HIGH_MAX_EFFORTS = [ReasoningEffort.LOW, ReasoningEffort.HIGH, ReasoningEffort.MAX] as const;

/**
 * Default capabilities for Zhipu AI GLM models.
 * Current GLM models support function calling, reasoning with interleaved
 * thinking, and automatic prompt caching by default. Individual entries
 * override modality support and cache pricing where needed.
 */
const GLM_DEFAULT_CAPABILITIES: ModelCapabilities = {
  ...DEFAULT_MODEL_CAPABILITIES,
  supportsFunctionCalling: true,
  supportsVision: false,
  supportsAssistantPrefill: true,
  supportsInterleavedThinking: true,
  supportsAutoPromptCaching: true,
};

/**
 * Zhipu AI GLM model configurations.
 * Includes GLM-5.3-Flash, GLM-5.3, GLM-5.2, GLM-5.1, GLM-5V-Turbo, GLM-5, GLM-4.7, GLM-4.6V, and GLM-4.5 series.
 *
 * Model name conventions:
 * - fullName: Model name for native Zhipu AI API (e.g., 'glm-5.2', 'glm-5')
 * - openrouterFullName: Model name for OpenRouter API (e.g., 'z-ai/glm-5.2')
 */
export const GLM_MODELS: readonly ModelEntry[] = [
  // GLM-5.3-Flash (Native multimodal model, released 2026-08-26)
  // 1M-token context with mandatory reasoning and GLM-5.3's Low/High/Max tiers.
  {
    label: 'GLM-5.3 Flash',
    id: 'glm-5.3-flash',
    shortName: 'glm-5.3-flash',
    openrouterFullName: 'z-ai/glm-5.3-flash',
    provider: ModelProvider.GLM,
    maxOutputTokens: 131072,
    contextWindow: 1000000,
    inputPrice: 0.15,
    outputPrice: 0.5,
    capabilities: {
      ...GLM_DEFAULT_CAPABILITIES,
      supportsVision: true,
      // List price after the promo ended 2026-09-09: $0.15 input / $0.03 cached
      // input / $0.50 output.
      cacheDiscountFactor: 0.2,
    },
    reasoning: { efforts: LOW_HIGH_MAX_EFFORTS, providerDefault: ReasoningEffort.MAX },
    legacyKeys: { glm53flash: { effort: ReasoningEffort.MAX } },
    source: { url: 'https://docs.z.ai/api-reference/llm/chat-completion', verified: '2026-09-30' },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
  },
  // GLM-5.3 (Flagship agentic coding model, announced 2026-08-14)
  // Same base model as GLM-5.2, post-training only. 1M-token context, three
  // thinking-effort tiers (Low/High/Max, default Max), text-only.
  {
    label: 'GLM-5.3',
    id: 'glm-5.3',
    shortName: 'glm-5.3',
    openrouterFullName: 'z-ai/glm-5.3',
    provider: ModelProvider.GLM,
    maxOutputTokens: 131072,
    contextWindow: 1000000,
    inputPrice: 1.4,
    outputPrice: 4.4,
    capabilities: {
      ...GLM_DEFAULT_CAPABILITIES,
      supportsVision: false,
      // Cached input $0.26 / 1M vs $1.4 / 1M input.
      cacheDiscountFactor: 0.186,
    },
    reasoning: { efforts: LOW_HIGH_MAX_EFFORTS, providerDefault: ReasoningEffort.MAX },
    legacyKeys: { glm53: { effort: ReasoningEffort.MAX } },
    source: { url: 'https://docs.z.ai/guides/llm/glm-5.3', verified: '2026-09-30' },
    openRouterOnly: false,
  },
  // GLM-5.2 (Flagship agentic coding model, announced 2026-06-13)
  // 744B MoE (40B active), 1M-token context, text-only. Accepts the full
  // none-to-max effort vocabulary, but none/minimal skip thinking, low/medium
  // map to high and xhigh maps to max: two distinct levels while thinking.
  // Superseded by GLM-5.3 (same base model, post-training-only upgrade).
  {
    label: 'GLM-5.2',
    id: 'glm-5.2',
    shortName: 'glm-5.2',
    openrouterFullName: 'z-ai/glm-5.2',
    provider: ModelProvider.GLM,
    maxOutputTokens: 131072,
    contextWindow: 1000000,
    inputPrice: 1.4,
    outputPrice: 4.4,
    capabilities: {
      ...GLM_DEFAULT_CAPABILITIES,
      supportsVision: false,
      // Cached input $0.26 / 1M vs $1.4 / 1M input.
      cacheDiscountFactor: 0.186,
    },
    reasoning: { efforts: [ReasoningEffort.HIGH, ReasoningEffort.MAX], off: [], providerDefault: ReasoningEffort.MAX },
    legacyKeys: { glm52: { effort: ReasoningEffort.MAX } },
    source: { url: 'https://docs.z.ai/api-reference/llm/chat-completion', verified: '2026-09-30' },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
    deprecated: true,
    // No longer listed by OpenRouter (checked 2026-09-30), its only route.
    retired: true,
  },
  // GLM-5.1 (Agentic coding model, released 2026-04-07)
  {
    label: 'GLM-5.1',
    id: 'glm-5.1',
    shortName: 'glm-5.1',
    openrouterFullName: 'z-ai/glm-5.1',
    provider: ModelProvider.GLM,
    maxOutputTokens: 65535,
    contextWindow: 202752,
    inputPrice: 1.4,
    outputPrice: 4.4,
    capabilities: {
      ...GLM_DEFAULT_CAPABILITIES,
      // Cached input $0.26 / 1M vs $1.4 / 1M input.
      cacheDiscountFactor: 0.186,
    },
    reasoning: { efforts: [], off: [] },
    legacyKeys: { glm51: {} },
    source: { url: 'https://docs.z.ai/api-reference/llm/chat-completion', verified: '2026-09-30' },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
    deprecated: true,
    // No longer listed by OpenRouter (checked 2026-09-30), its only route.
    retired: true,
  },
  // GLM-5V-Turbo (Native multimodal agent for vision-based coding)
  {
    label: 'GLM-5V Turbo',
    id: 'glm-5v-turbo',
    shortName: 'glm-5v-turbo',
    openrouterFullName: 'z-ai/glm-5v-turbo',
    provider: ModelProvider.GLM,
    maxOutputTokens: 131072,
    contextWindow: 202752,
    inputPrice: 1.2,
    outputPrice: 4.0,
    capabilities: {
      ...GLM_DEFAULT_CAPABILITIES,
      supportsVision: true,
      supportsNativePdf: true,
      // Cached input $0.24 / 1M vs $1.2 / 1M input.
      cacheDiscountFactor: 0.2,
    },
    reasoning: { efforts: [] },
    legacyKeys: { glm5vturbo: {} },
    source: { url: 'https://docs.z.ai/guides/vlm/glm-5v-turbo', verified: '2026-09-30' },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
  },
  // GLM-5 (Flagship open-source model)
  {
    label: 'GLM-5',
    id: 'glm-5',
    shortName: 'glm-5',
    openrouterFullName: 'z-ai/glm-5',
    provider: ModelProvider.GLM,
    maxOutputTokens: 131072,
    contextWindow: 80000,
    inputPrice: 1.0,
    outputPrice: 3.2,
    capabilities: {
      ...GLM_DEFAULT_CAPABILITIES,
      // Cached input $0.2 / 1M vs $1.0 / 1M input.
      cacheDiscountFactor: 0.2,
    },
    reasoning: { efforts: [], off: [] },
    legacyKeys: { glm5: {} },
    source: { url: 'https://docs.z.ai/api-reference/llm/chat-completion', verified: '2026-09-30' },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
    deprecated: true,
    // No longer listed by OpenRouter (checked 2026-09-30), its only route.
    retired: true,
  },
  // GLM-5 Turbo (Fast inference, agent-optimized)
  {
    label: 'GLM-5 Turbo',
    id: 'glm-5-turbo',
    shortName: 'glm-5-turbo',
    openrouterFullName: 'z-ai/glm-5-turbo',
    provider: ModelProvider.GLM,
    maxOutputTokens: 128000,
    contextWindow: 200000,
    inputPrice: 1.2,
    outputPrice: 4.0,
    capabilities: {
      ...GLM_DEFAULT_CAPABILITIES,
      // Cached input $0.24 / 1M vs $1.2 / 1M input.
      cacheDiscountFactor: 0.2,
    },
    reasoning: { efforts: [], off: [] },
    legacyKeys: { glm5turbo: {} },
    source: { url: 'https://docs.z.ai/guides/llm/glm-5-turbo', verified: '2026-09-30' },
    openRouterOnly: false,
  },
  // GLM-4.7 (Enhanced programming and multi-step reasoning)
  {
    label: 'GLM-4.7',
    id: 'glm-4.7',
    shortName: 'glm-4.7',
    openrouterFullName: 'z-ai/glm-4.7',
    provider: ModelProvider.GLM,
    maxOutputTokens: 128000,
    contextWindow: 200000,
    inputPrice: 0.6,
    outputPrice: 2.2,
    capabilities: {
      ...GLM_DEFAULT_CAPABILITIES,
      // Cached input $0.11 / 1M vs $0.6 / 1M input.
      cacheDiscountFactor: 0.183,
    },
    reasoning: { efforts: [], off: [] },
    legacyKeys: { glm47: {} },
    source: { url: 'https://docs.z.ai/api-reference/llm/chat-completion', verified: '2026-09-30' },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
    deprecated: true,
    // No longer listed by OpenRouter (checked 2026-09-30), its only route.
    retired: true,
  },
  // GLM-4.7 Flash (Free efficient 30B-class model)
  {
    label: 'GLM-4.7 Flash',
    id: 'glm-4.7-flash',
    shortName: 'glm-4.7-flash',
    openrouterFullName: 'z-ai/glm-4.7-flash:free',
    provider: ModelProvider.GLM,
    maxOutputTokens: 128000,
    contextWindow: 202752,
    inputPrice: 0,
    outputPrice: 0,
    capabilities: {
      ...GLM_DEFAULT_CAPABILITIES,
    },
    reasoning: { efforts: [], off: [] },
    legacyKeys: { glm47flash: {} },
    source: { url: 'https://docs.z.ai/api-reference/llm/chat-completion', verified: '2026-09-30' },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
    deprecated: true,
    // No longer listed by OpenRouter (checked 2026-09-30), its only route.
    retired: true,
  },
  // GLM-4.6V (Multimodal vision model)
  {
    label: 'GLM-4.6V',
    id: 'glm-4.6v',
    shortName: 'glm-4.6v',
    openrouterFullName: 'z-ai/glm-4.6v',
    provider: ModelProvider.GLM,
    maxOutputTokens: 8192,
    contextWindow: 128000,
    inputPrice: 0.3,
    outputPrice: 0.9,
    capabilities: {
      ...GLM_DEFAULT_CAPABILITIES,
      supportsVision: true,
      supportsNativePdf: true,
      // Cached input $0.05 / 1M vs $0.3 / 1M input.
      cacheDiscountFactor: 0.167,
    },
    reasoning: { efforts: [] },
    legacyKeys: { glm46v: {} },
    source: { url: 'https://docs.z.ai/guides/vlm/glm-4.6v', verified: '2026-09-30' },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
    deprecated: true,
    // No longer listed by OpenRouter (checked 2026-09-30), its only route.
    retired: true,
  },
  // GLM-4.5 (Hybrid reasoning MoE model, 355B/32B active)
  {
    label: 'GLM-4.5',
    id: 'glm-4.5',
    shortName: 'glm-4.5',
    openrouterFullName: 'z-ai/glm-4.5',
    provider: ModelProvider.GLM,
    maxOutputTokens: 98304,
    contextWindow: 131072,
    inputPrice: 0.6,
    outputPrice: 2.2,
    capabilities: {
      ...GLM_DEFAULT_CAPABILITIES,
      // Cached input $0.11 / 1M vs $0.6 / 1M input.
      cacheDiscountFactor: 0.183,
    },
    reasoning: { efforts: [], off: [] },
    legacyKeys: { glm45: {} },
    source: { url: 'https://docs.z.ai/api-reference/llm/chat-completion', verified: '2026-09-30' },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
    deprecated: true,
    // No longer listed by OpenRouter (checked 2026-09-30), its only route.
    retired: true,
  },
  // GLM-4.5V (Vision-language MoE model, 106B/12B active)
  {
    label: 'GLM-4.5V',
    id: 'glm-4.5v',
    shortName: 'glm-4.5v',
    openrouterFullName: 'z-ai/glm-4.5v',
    provider: ModelProvider.GLM,
    maxOutputTokens: 8192,
    contextWindow: 66000,
    inputPrice: 0.6,
    outputPrice: 1.8,
    capabilities: {
      ...GLM_DEFAULT_CAPABILITIES,
      supportsVision: true,
      // Cached input $0.11 / 1M vs $0.6 / 1M input.
      cacheDiscountFactor: 0.183,
    },
    reasoning: { efforts: [], off: [] },
    legacyKeys: { glm45v: {} },
    source: { url: 'https://docs.z.ai/api-reference/llm/chat-completion', verified: '2026-09-30' },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
    deprecated: true,
    // No longer listed by OpenRouter (checked 2026-09-30), its only route.
    retired: true,
  },
  // GLM-4.5 Air (Free lightweight agent model)
  {
    label: 'GLM-4.5 Air',
    id: 'glm-4.5-air',
    shortName: 'glm-4.5-air',
    openrouterFullName: 'z-ai/glm-4.5-air:free',
    provider: ModelProvider.GLM,
    maxOutputTokens: 96000,
    contextWindow: 131072,
    inputPrice: 0,
    outputPrice: 0,
    capabilities: {
      ...GLM_DEFAULT_CAPABILITIES,
    },
    reasoning: { efforts: [], off: [] },
    legacyKeys: { glm45air: {} },
    source: { url: 'https://docs.z.ai/api-reference/llm/chat-completion', verified: '2026-09-30' },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
    deprecated: true,
    // No longer listed by OpenRouter (checked 2026-09-30), its only route.
    retired: true,
  },
  // GLM-4 32B (Superseded by GLM-4.7 and GLM-5)
  {
    label: 'GLM-4 32B',
    id: 'glm-4-32b',
    shortName: 'glm-4-32b',
    openrouterFullName: 'z-ai/glm-4-32b',
    provider: ModelProvider.GLM,
    maxOutputTokens: 8192,
    contextWindow: 128000,
    inputPrice: 0.1,
    outputPrice: 0.1,
    capabilities: {
      ...GLM_DEFAULT_CAPABILITIES,
      supportsInterleavedThinking: false,
      supportsAutoPromptCaching: false,
      supportsVision: false,
    },
    legacyKeys: { glm432b: {} },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
    deprecated: true,
    // No longer listed by OpenRouter (checked 2026-09-30), its only route.
    retired: true,
  },
];
