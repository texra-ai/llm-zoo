import {
  DEFAULT_MODEL_CAPABILITIES,
  ModelCapabilities,
  ModelConfig,
  ModelProvider,
  ReasoningEffort,
} from '../ModelConfig';

/**
 * Default capabilities for Meta Model API models.
 * Muse Spark features automatic server-side prompt caching (no manual cache
 * markers) and built-in web search grounding via the `web_search` tool.
 */
const META_DEFAULT_CAPABILITIES: ModelCapabilities = {
  ...DEFAULT_MODEL_CAPABILITIES,
  supportsAutoPromptCaching: true,
  cacheDiscountFactor: 0.12,
  supportsReasoning: true,
  supportsReasoningEffort: true,
  reasoningEffort: ReasoningEffort.MEDIUM,
  supportsNativeWebSearch: true,
  supportsVision: true,
  supportsNativePdf: true,
  supportsIntermDevMsgs: true,
};

/**
 * Meta Model API model configurations.
 * Includes Muse Spark, served via Meta's OpenAI-compatible Model API
 * (api.meta.ai/v1). Not available through OpenRouter.
 */
export const META_MODELS: Record<string, ModelConfig> = {
  musespark13: {
    name: 'musespark13',
    label: 'Muse Spark 1.3',
    fullName: 'muse-spark-1.3',
    shortName: 'muse-spark-1.3',
    provider: ModelProvider.META,
    maxOutputTokens: 131072,
    contextWindow: 1048576,
    inputPrice: 1.25,
    outputPrice: 4.25,
    capabilities: {
      ...META_DEFAULT_CAPABILITIES,
      maxReasoningEffort: ReasoningEffort.XHIGH,
      supportedReasoningEfforts: [
        ReasoningEffort.MINIMAL,
        ReasoningEffort.LOW,
        ReasoningEffort.MEDIUM,
        ReasoningEffort.HIGH,
        ReasoningEffort.XHIGH,
      ],
    },
    openRouterOnly: false,
  },
  musespark11: {
    name: 'musespark11',
    label: 'Muse Spark 1.1',
    fullName: 'muse-spark-1.1',
    shortName: 'muse-spark-1.1',
    provider: ModelProvider.META,
    maxOutputTokens: 131072,
    contextWindow: 1048576,
    inputPrice: 1.25,
    outputPrice: 4.25,
    capabilities: META_DEFAULT_CAPABILITIES,
    openRouterOnly: false,
    deprecated: true,
  },
};
