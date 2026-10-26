import {
  DEFAULT_MODEL_CAPABILITIES,
  ModelCapabilities,
  ModelEntry,
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
  supportsNativeWebSearch: true,
  supportsVision: true,
  supportsNativePdf: true,
  supportsIntermDevMsgs: true,
};

// Muse Spark always reasons: `reasoning_effort: "none"` returns HTTP 400, and
// an omitted effort means a model-determined level (no documented default).
// https://dev.meta.ai/docs/reasoning
const MUSE_SPARK_EFFORTS = [
  ReasoningEffort.MINIMAL,
  ReasoningEffort.LOW,
  ReasoningEffort.MEDIUM,
  ReasoningEffort.HIGH,
  ReasoningEffort.XHIGH,
] as const;

/**
 * Meta Model API model configurations.
 * Includes Muse Spark, served via Meta's OpenAI-compatible Model API
 * (api.meta.ai/v1) and also listed on OpenRouter.
 */
export const META_MODELS: readonly ModelEntry[] = [
  // Muse Wonder 1.0 (preview, released 2026-10-12): Standard tier $4 / $0.20
  // cached / $20, 1M context, text/image/video/audio/PDF input, effort
  // minimal..max (dev.meta.ai/docs/models, /docs/pricing-rate-limits,
  // /docs/reasoning). Meta publishes no max output; Muse Spark 1.3's 131072
  // is carried over by owner decision. OpenRouter lists it as meta/muse-wonder.
  // muse-wonder-full-1.0 is Muse Code only (no API price), so it is not listed.
  {
    label: 'Muse Wonder 1.0',
    id: 'muse-wonder-1.0',
    shortName: 'muse-wonder-1.0',
    openrouterFullName: 'meta/muse-wonder',
    provider: ModelProvider.META,
    maxOutputTokens: 131072,
    contextWindow: 1048576,
    inputPrice: 4.0,
    outputPrice: 20.0,
    capabilities: {
      ...META_DEFAULT_CAPABILITIES,
      cacheDiscountFactor: 0.05,
      supportsNativeAudio: true,
    },
    reasoning: { efforts: [...MUSE_SPARK_EFFORTS, ReasoningEffort.MAX] },
    source: { url: 'https://dev.meta.ai/models/muse-wonder', verified: '2026-10-16' },
    openRouterOnly: false,
  },
  {
    label: 'Muse Spark 1.3',
    id: 'muse-spark-1.3',
    shortName: 'muse-spark-1.3',
    openrouterFullName: 'meta/muse-spark-1.3',
    provider: ModelProvider.META,
    maxOutputTokens: 131072,
    contextWindow: 1048576,
    inputPrice: 1.25,
    outputPrice: 4.25,
    capabilities: {
      ...META_DEFAULT_CAPABILITIES,
    },
    // "max" is Standard-tier muse-spark-1.3 only (not Contributor tier).
    reasoning: { efforts: [...MUSE_SPARK_EFFORTS, ReasoningEffort.MAX] },
    source: { url: 'https://dev.meta.ai/docs/reasoning', verified: '2026-09-30' },
    openRouterOnly: false,
  },
  // Muse Spark 1.2 (released 2026-08-05): Standard tier $1.25 / $0.15 cached /
  // $4.25, 1M context, audio input (dev.meta.ai/docs/models,
  // /docs/pricing-rate-limits). Meta publishes no max output, so 1.1/1.3's
  // value is carried over. Superseded by 1.3 at the same price.
  {
    label: 'Muse Spark 1.2',
    id: 'muse-spark-1.2',
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
    },
    // "max" is 1.3-only.
    reasoning: { efforts: MUSE_SPARK_EFFORTS },
    source: { url: 'https://dev.meta.ai/docs/reasoning', verified: '2026-09-30' },
    openRouterOnly: false,
    deprecated: true,
  },
  {
    label: 'Muse Spark 1.1',
    id: 'muse-spark-1.1',
    shortName: 'muse-spark-1.1',
    openrouterFullName: 'meta/muse-spark-1.1',
    provider: ModelProvider.META,
    maxOutputTokens: 131072,
    contextWindow: 1048576,
    inputPrice: 1.25,
    outputPrice: 4.25,
    capabilities: META_DEFAULT_CAPABILITIES,
    reasoning: { efforts: MUSE_SPARK_EFFORTS },
    source: { url: 'https://dev.meta.ai/docs/reasoning', verified: '2026-09-30' },
    openRouterOnly: false,
    deprecated: true,
  },
];
