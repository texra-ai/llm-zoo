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
 * (api.meta.ai/v1). Not available through OpenRouter.
 */
export const META_MODELS: readonly ModelEntry[] = [
  {
    label: 'Muse Spark 1.3',
    id: 'muse-spark-1.3',
    shortName: 'muse-spark-1.3',
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
    legacyKeys: { musespark13: { effort: ReasoningEffort.MEDIUM } },
    openRouterOnly: false,
  },
  {
    label: 'Muse Spark 1.1',
    id: 'muse-spark-1.1',
    shortName: 'muse-spark-1.1',
    provider: ModelProvider.META,
    maxOutputTokens: 131072,
    contextWindow: 1048576,
    inputPrice: 1.25,
    outputPrice: 4.25,
    capabilities: META_DEFAULT_CAPABILITIES,
    reasoning: { efforts: MUSE_SPARK_EFFORTS },
    source: { url: 'https://dev.meta.ai/docs/reasoning', verified: '2026-09-30' },
    legacyKeys: { musespark11: { effort: ReasoningEffort.MEDIUM } },
    openRouterOnly: false,
    deprecated: true,
  },
];
