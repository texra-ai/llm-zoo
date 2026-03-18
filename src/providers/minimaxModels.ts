import {
  DEFAULT_MODEL_CAPABILITIES,
  ModelCapabilities,
  ModelConfig,
  ModelProvider,
  ReasoningEffort,
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
  supportsReasoning: true,
  supportsInterleavedThinking: true,
  supportsReasoningEffort: false,
  reasoningEffort: ReasoningEffort.NONE,
};

/**
 * MiniMax model configurations.
 * Includes the M-series models: M2.7, M2.5, M2.1, M2, M1, and MiniMax-01.
 */
export const MINIMAX_MODELS: Record<string, ModelConfig> = {
  minimaxM27: {
    name: 'minimaxM27',
    label: 'MiniMax M2.7',
    fullName: 'MiniMax-M2.7',
    shortName: 'MiniMax-M2.7',
    openrouterFullName: 'minimax/minimax-m2.7',
    provider: ModelProvider.MINIMAX,
    maxOutputTokens: 196608,
    contextWindow: 204800,
    inputPrice: 0.3,
    outputPrice: 1.2,
    capabilities: {
      ...MINIMAX_DEFAULT_CAPABILITIES,
    },
    openRouterOnly: false,
  },
  minimaxM25: {
    name: 'minimaxM25',
    label: 'MiniMax M2.5',
    fullName: 'MiniMax-M2.5',
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
    openRouterOnly: false,
  },
  minimaxM21: {
    name: 'minimaxM21',
    label: 'MiniMax M2.1',
    fullName: 'MiniMax-M2.1',
    shortName: 'MiniMax-M2.1',
    openrouterFullName: 'minimax/minimax-m2.1',
    provider: ModelProvider.MINIMAX,
    maxOutputTokens: 65536,
    contextWindow: 65536,
    inputPrice: 0.3,
    outputPrice: 1.2,
    capabilities: {
      ...MINIMAX_DEFAULT_CAPABILITIES,
    },
    openRouterOnly: false,
    deprecated: true,
  },
  minimaxM2: {
    name: 'minimaxM2',
    label: 'MiniMax M2',
    fullName: 'MiniMax-M2',
    shortName: 'MiniMax-M2',
    openrouterFullName: 'minimax/minimax-m2',
    provider: ModelProvider.MINIMAX,
    maxOutputTokens: 196608,
    contextWindow: 196608,
    inputPrice: 0.27,
    outputPrice: 0.95,
    capabilities: {
      ...MINIMAX_DEFAULT_CAPABILITIES,
    },
    openRouterOnly: false,
    deprecated: true,
  },
  minimaxM1: {
    name: 'minimaxM1',
    label: 'MiniMax M1',
    fullName: 'MiniMax-M1',
    shortName: 'MiniMax-M1',
    openrouterFullName: 'minimax/minimax-m1',
    provider: ModelProvider.MINIMAX,
    maxOutputTokens: 40000,
    contextWindow: 196608,
    inputPrice: 0.255,
    outputPrice: 1.0,
    capabilities: {
      ...MINIMAX_DEFAULT_CAPABILITIES,
    },
    openRouterOnly: false,
    deprecated: true,
  },
  minimax01: {
    name: 'minimax01',
    label: 'MiniMax-01',
    fullName: 'MiniMax-01',
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
    openRouterOnly: false,
    deprecated: true,
  },
};
