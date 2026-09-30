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
 * (api.meta.ai/v1) and also listed on OpenRouter.
 */
export const META_MODELS: Record<string, ModelConfig> = {
  musespark13: {
    name: 'musespark13',
    label: 'Muse Spark 1.3',
    fullName: 'muse-spark-1.3',
    shortName: 'muse-spark-1.3',
    openrouterFullName: 'meta/muse-spark-1.3',
    provider: ModelProvider.META,
    maxOutputTokens: 131072,
    contextWindow: 1048576,
    inputPrice: 1.25,
    outputPrice: 4.25,
    capabilities: {
      ...META_DEFAULT_CAPABILITIES,
      // `max` is accepted only on Standard-tier muse-spark-1.3
      // (dev.meta.ai/docs/reasoning); `none` returns HTTP 400.
      maxReasoningEffort: ReasoningEffort.MAX,
      supportedReasoningEfforts: [
        ReasoningEffort.MINIMAL,
        ReasoningEffort.LOW,
        ReasoningEffort.MEDIUM,
        ReasoningEffort.HIGH,
        ReasoningEffort.XHIGH,
        ReasoningEffort.MAX,
      ],
    },
    openRouterOnly: false,
  },
  // Muse Spark 1.2 (released 2026-08-05): Standard tier $1.25 / $0.15 cached /
  // $4.25, 1M context (dev.meta.ai/docs/models, /docs/pricing-rate-limits).
  // Effort minimal..xhigh (`max` is 1.3-only). Meta publishes no max output,
  // so 1.1/1.3's value is carried over. Superseded by 1.3 at the same price.
  musespark12: {
    name: 'musespark12',
    label: 'Muse Spark 1.2',
    fullName: 'muse-spark-1.2',
    shortName: 'muse-spark-1.2',
    openrouterFullName: 'meta/muse-spark-1.2',
    provider: ModelProvider.META,
    maxOutputTokens: 131072,
    contextWindow: 1048576,
    inputPrice: 1.25,
    outputPrice: 4.25,
    capabilities: {
      ...META_DEFAULT_CAPABILITIES,
      supportsNativeAudio: true,
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
    deprecated: true,
  },
  musespark11: {
    name: 'musespark11',
    label: 'Muse Spark 1.1',
    fullName: 'muse-spark-1.1',
    shortName: 'muse-spark-1.1',
    openrouterFullName: 'meta/muse-spark-1.1',
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
