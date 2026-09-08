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
  // Muse Spark 1.3 Contributor (released alongside Muse Spark 1.3 on
  // 2026-09-02): same model and capabilities as the standard tier, at a
  // steep discount, in exchange for letting Meta use prompts/outputs to
  // improve its products. Also caps at 100 RPM per team vs. 3,000 on
  // Standard (not modeled here — the registry has no rate-limit field).
  musespark13c: {
    name: 'musespark13c',
    label: 'Muse Spark 1.3 (Contributor)',
    fullName: 'muse-spark-1.3-contributor',
    shortName: 'muse-spark-1.3-contributor',
    provider: ModelProvider.META,
    maxOutputTokens: 131072,
    contextWindow: 1048576,
    inputPrice: 0.1,
    outputPrice: 0.2,
    capabilities: {
      ...META_DEFAULT_CAPABILITIES,
      // Cached input $0.002 / 1M vs $0.10 / 1M input.
      cacheDiscountFactor: 0.02,
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
