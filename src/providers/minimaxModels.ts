import {
  DEFAULT_MODEL_CAPABILITIES,
  ModelCapabilities,
  ModelEntry,
  ModelProvider,
} from '../ModelConfig';

/**
 * Default capabilities for MiniMax models.
 * MiniMax M-series models support function calling, auto prompt caching,
 * and reasoning via interleaved thinking. They do not support vision.
 */
const MINIMAX_DEFAULT_CAPABILITIES: ModelCapabilities = {
  ...DEFAULT_MODEL_CAPABILITIES,
  supportsFunctionCalling: true,
  supportsAutoPromptCaching: true,
  cacheDiscountFactor: 0.1,
  supportsVision: false,
  supportsAssistantPrefill: true,
  supportsSystemPrompt: true,
  supportsInterleavedThinking: true,
};

/**
 * MiniMax model configurations.
 * Includes the M-series models: M3, M2.7 (and M2.7-highspeed), M2.5, M2.1, M2, M1, and MiniMax-01.
 */
export const MINIMAX_MODELS: readonly ModelEntry[] = [
  {
    label: 'MiniMax M3',
    id: 'MiniMax-M3',
    shortName: 'MiniMax-M3',
    openrouterFullName: 'minimax/minimax-m3',
    provider: ModelProvider.MINIMAX,
    // max_completion_tokens maximum 524288 for M3; 204800 for M2.x.
    maxOutputTokens: 524288,
    contextWindow: 1048576,
    inputPrice: 0.3,
    outputPrice: 1.2,
    capabilities: {
      ...MINIMAX_DEFAULT_CAPABILITIES,
      supportsVision: true,
      // Cache read $0.06 / 1M vs $0.30 / 1M input (<= 512K input tier).
      cacheDiscountFactor: 0.2,
    },
    // thinking: {type: 'disabled'} skips thinking; reasoning_effort is ignored
    // (only M3.1-Flash-Preview tunes depth). M2.x always think.
    reasoning: { efforts: [], off: [] },
    legacyKeys: { minimaxM3: {} },
    source: { url: 'https://platform.minimax.io/docs/api-reference/text-chat-openai', verified: '2026-09-30' },
    openRouterOnly: false,
  },
  {
    label: 'MiniMax M2.7',
    id: 'MiniMax-M2.7',
    shortName: 'MiniMax-M2.7',
    openrouterFullName: 'minimax/minimax-m2.7',
    provider: ModelProvider.MINIMAX,
    maxOutputTokens: 204800,
    contextWindow: 204800,
    inputPrice: 0.3,
    outputPrice: 1.2,
    capabilities: {
      ...MINIMAX_DEFAULT_CAPABILITIES,
      // Cache read $0.06 / 1M vs $0.30 / 1M input.
      cacheDiscountFactor: 0.2,
    },
    reasoning: { efforts: [] },
    legacyKeys: { minimaxM27: {} },
    source: { url: 'https://platform.minimax.io/docs/api-reference/text-chat-openai', verified: '2026-09-30' },
    openRouterOnly: false,
    deprecated: true,
  },
  // M2.7 at ~100 tps, same limits; $0.60 / $0.06 cache read / $2.40
  // (platform.minimax.io/docs/guides/pricing-paygo).
  {
    label: 'MiniMax M2.7 Highspeed',
    id: 'MiniMax-M2.7-highspeed',
    shortName: 'MiniMax-M2.7-highspeed',
    provider: ModelProvider.MINIMAX,
    maxOutputTokens: 204800,
    contextWindow: 204800,
    inputPrice: 0.6,
    outputPrice: 2.4,
    capabilities: {
      ...MINIMAX_DEFAULT_CAPABILITIES,
      // Cache read $0.06 / 1M vs $0.60 / 1M input.
      cacheDiscountFactor: 0.1,
    },
    reasoning: { efforts: [] },
    legacyKeys: { minimaxM27highspeed: {} },
    source: { url: 'https://platform.minimax.io/docs/api-reference/text-chat-openai', verified: '2026-09-30' },
    openRouterOnly: false,
    deprecated: true,
  },
  {
    label: 'MiniMax M2.5',
    id: 'MiniMax-M2.5',
    shortName: 'MiniMax-M2.5',
    openrouterFullName: 'minimax/minimax-m2.5',
    provider: ModelProvider.MINIMAX,
    maxOutputTokens: 196608,
    contextWindow: 196608,
    inputPrice: 0.2,
    outputPrice: 1.2,
    capabilities: {
      ...MINIMAX_DEFAULT_CAPABILITIES,
    },
    reasoning: { efforts: [] },
    legacyKeys: { minimaxM25: {} },
    source: { url: 'https://platform.minimax.io/docs/api-reference/text-chat-openai', verified: '2026-09-30' },
    openRouterOnly: false,
    deprecated: true,
  },
  {
    label: 'MiniMax M2.1',
    id: 'MiniMax-M2.1',
    shortName: 'MiniMax-M2.1',
    openrouterFullName: 'minimax/minimax-m2.1',
    provider: ModelProvider.MINIMAX,
    maxOutputTokens: 65536,
    contextWindow: 196608,
    inputPrice: 0.27,
    outputPrice: 0.95,
    capabilities: {
      ...MINIMAX_DEFAULT_CAPABILITIES,
    },
    reasoning: { efforts: [] },
    legacyKeys: { minimaxM21: {} },
    source: { url: 'https://platform.minimax.io/docs/api-reference/text-chat-openai', verified: '2026-09-30' },
    openRouterOnly: false,
    deprecated: true,
  },
  {
    label: 'MiniMax M2',
    id: 'MiniMax-M2',
    shortName: 'MiniMax-M2',
    openrouterFullName: 'minimax/minimax-m2',
    provider: ModelProvider.MINIMAX,
    maxOutputTokens: 196608,
    contextWindow: 196608,
    inputPrice: 0.255,
    outputPrice: 1.0,
    capabilities: {
      ...MINIMAX_DEFAULT_CAPABILITIES,
    },
    reasoning: { efforts: [] },
    legacyKeys: { minimaxM2: {} },
    source: { url: 'https://platform.minimax.io/docs/api-reference/text-chat-openai', verified: '2026-09-30' },
    openRouterOnly: false,
    deprecated: true,
  },
  {
    label: 'MiniMax M1',
    id: 'MiniMax-M1',
    shortName: 'MiniMax-M1',
    openrouterFullName: 'minimax/minimax-m1',
    provider: ModelProvider.MINIMAX,
    maxOutputTokens: 40000,
    contextWindow: 1000000,
    inputPrice: 0.4,
    outputPrice: 2.2,
    capabilities: {
      ...MINIMAX_DEFAULT_CAPABILITIES,
    },
    reasoning: { efforts: [] },
    source: { url: 'https://openrouter.ai/minimax/minimax-m1', verified: '2026-09-30' },
    legacyKeys: { minimaxM1: {} },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
    deprecated: true,
  },
  {
    label: 'MiniMax-01',
    id: 'MiniMax-01',
    shortName: 'MiniMax-01',
    openrouterFullName: 'minimax/minimax-01',
    provider: ModelProvider.MINIMAX,
    maxOutputTokens: 1000192,
    contextWindow: 1000192,
    inputPrice: 0.2,
    outputPrice: 1.1,
    capabilities: {
      ...MINIMAX_DEFAULT_CAPABILITIES,
      supportsVision: true,
    },
    // Not a reasoning model: OpenRouter lists no reasoning parameter for it.
    source: { url: 'https://openrouter.ai/minimax/minimax-01', verified: '2026-09-30' },
    legacyKeys: { minimax01: {} },
    // Not served on the vendor's own Responses API.
    openRouterOnly: true,
    deprecated: true,
  },
];
