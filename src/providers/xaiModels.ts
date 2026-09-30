import {
  DEFAULT_MODEL_CAPABILITIES,
  ModelCapabilities,
  ModelConfig,
  ModelProvider,
  ReasoningEffort,
} from '../ModelConfig';

/**
 * Default capabilities for xAI Grok models.
 */
const XAI_DEFAULT_CAPABILITIES: ModelCapabilities = {
  ...DEFAULT_MODEL_CAPABILITIES,
  supportsVision: false,
};

/**
 * xAI Grok model configurations.
 * Includes Grok 4.7, 4.6, 4.5, 4.3, 4.20, Build 0.1, 4, 3, and 2 variants.
 */
export const XAI_MODELS: Record<string, ModelConfig> = {
  // Grok 4.7: a larger base model served at Grok 4.6's price and speed — 500K
  // context, $2 / $0.50 cached / $6 below 200K prompt tokens on the global
  // endpoint (2x above; the US regional endpoint bills 1.1x). Max output
  // carried over as for grok46.
  grok47: {
    name: 'grok47',
    label: 'Grok 4.7',
    fullName: 'grok-4.7',
    shortName: 'grok-4.7',
    openrouterFullName: 'x-ai/grok-4.7',
    provider: ModelProvider.XAI,
    maxOutputTokens: 128000,
    contextWindow: 500000,
    inputPrice: 2.0,
    outputPrice: 6.0,
    longContextPricing: {
      aboveInputTokens: 200_000,
      inputPrice: 4.0,
      outputPrice: 12.0,
      cacheDiscountFactor: 0.25,
    },
    capabilities: {
      ...XAI_DEFAULT_CAPABILITIES,
      // xAI caches prompts automatically; cached input is $0.50 of $2.00.
      supportsAutoPromptCaching: true,
      cacheDiscountFactor: 0.25,
      supportsVision: true,
      supportsReasoning: true,
      supportsReasoningEffort: true,
      reasoningEffort: ReasoningEffort.HIGH,
      maxReasoningEffort: ReasoningEffort.XHIGH,
      supportedReasoningEfforts: [
        ReasoningEffort.LOW,
        ReasoningEffort.MEDIUM,
        ReasoningEffort.HIGH,
        ReasoningEffort.XHIGH,
      ],
    },
    openRouterOnly: false,
  },
  // Grok Build 0.1: xAI's agentic coding model (successor to grok-code-fast-1,
  // which has routed here since 2026-05-15). 256K context, text + image
  // input, reasoning without a documented reasoning_effort control. $1.00 /
  // $0.20 cached / $2.00 below 200K prompt tokens (2x above). xAI publishes
  // no max output, so the 128K value of the other Grok entries is carried over.
  grokbuild01: {
    name: 'grokbuild01',
    label: 'Grok Build 0.1',
    fullName: 'grok-build-0.1',
    shortName: 'grok-build-0.1',
    openrouterFullName: 'x-ai/grok-build-0.1',
    provider: ModelProvider.XAI,
    maxOutputTokens: 128000,
    contextWindow: 256000,
    inputPrice: 1.0,
    outputPrice: 2.0,
    // Prompts above 200K bill the whole request at the tier (docs.x.ai/developers/models).
    longContextPricing: {
      aboveInputTokens: 200_000,
      inputPrice: 2.0,
      outputPrice: 4.0,
      cacheDiscountFactor: 0.2,
    },
    capabilities: {
      ...XAI_DEFAULT_CAPABILITIES,
      // xAI caches prompts automatically; cached input is $0.20 of $1.00.
      supportsAutoPromptCaching: true,
      cacheDiscountFactor: 0.2,
      supportsVision: true,
      supportsReasoning: true,
      supportsReasoningEffort: false,
    },
    openRouterOnly: false,
  },
  // Grok 4.6: 500K context and $2/$6 (<200K tier) pricing per docs.x.ai, same
  // as 4.5. xAI publishes no max output tokens for any Grok model ("no text
  // output limit"), so this carries over the 128K value used by the other
  // Grok 4.x entries here.
  grok46: {
    name: 'grok46',
    label: 'Grok 4.6',
    fullName: 'grok-4.6',
    shortName: 'grok-4.6',
    openrouterFullName: 'x-ai/grok-4.6',
    provider: ModelProvider.XAI,
    maxOutputTokens: 128000,
    contextWindow: 500000,
    inputPrice: 2.0,
    outputPrice: 6.0,
    longContextPricing: {
      aboveInputTokens: 200_000,
      inputPrice: 4.0,
      outputPrice: 12.0,
      cacheDiscountFactor: 0.25,
    },
    capabilities: {
      ...XAI_DEFAULT_CAPABILITIES,
      // xAI caches prompts automatically; cached input is $0.50 of $2.00.
      supportsAutoPromptCaching: true,
      cacheDiscountFactor: 0.25,
      supportsVision: true,
      supportsReasoning: true,
      supportsReasoningEffort: true,
      reasoningEffort: ReasoningEffort.HIGH,
      maxReasoningEffort: ReasoningEffort.XHIGH,
      supportedReasoningEfforts: [
        ReasoningEffort.LOW,
        ReasoningEffort.MEDIUM,
        ReasoningEffort.HIGH,
        ReasoningEffort.XHIGH,
      ],
    },
    openRouterOnly: false,
    // Superseded by Grok 4.7 (same price and speed).
    deprecated: true,
  },
  grok45: {
    name: 'grok45',
    label: 'Grok 4.5',
    fullName: 'grok-4.5',
    shortName: 'grok-4.5',
    openrouterFullName: 'x-ai/grok-4.5',
    provider: ModelProvider.XAI,
    maxOutputTokens: 128000,
    contextWindow: 500000,
    inputPrice: 2.0,
    outputPrice: 6.0,
    longContextPricing: {
      aboveInputTokens: 200_000,
      inputPrice: 4.0,
      outputPrice: 12.0,
      cacheDiscountFactor: 0.15,
    },
    capabilities: {
      ...XAI_DEFAULT_CAPABILITIES,
      // xAI caches prompts automatically; cached input is $0.30 of $2.00.
      supportsAutoPromptCaching: true,
      cacheDiscountFactor: 0.15,
      supportsVision: true,
      supportsReasoning: true,
      supportsReasoningEffort: true,
      reasoningEffort: ReasoningEffort.HIGH,
      supportedReasoningEfforts: [
        ReasoningEffort.LOW,
        ReasoningEffort.MEDIUM,
        ReasoningEffort.HIGH,
      ],
    },
    openRouterOnly: false,
    // Superseded by Grok 4.7 (same price and speed).
    deprecated: true,
  },
  grok43: {
    name: 'grok43',
    label: 'Grok 4.3',
    fullName: 'grok-4.3',
    shortName: 'grok-4.3',
    openrouterFullName: 'x-ai/grok-4.3',
    provider: ModelProvider.XAI,
    maxOutputTokens: 128000,
    contextWindow: 1000000,
    inputPrice: 1.25,
    outputPrice: 2.5,
    longContextPricing: {
      aboveInputTokens: 200_000,
      inputPrice: 2.5,
      outputPrice: 5.0,
      cacheDiscountFactor: 0.16,
    },
    capabilities: {
      ...XAI_DEFAULT_CAPABILITIES,
      // xAI caches prompts automatically; cached input is $0.20 of $1.25.
      supportsAutoPromptCaching: true,
      cacheDiscountFactor: 0.16,
      supportsReasoning: true,
      supportsReasoningEffort: true,
      reasoningEffort: ReasoningEffort.LOW,
    },
    openRouterOnly: false,
    deprecated: true,
  },
  // Grok 4.20 (0309): 1M context, text + image input, $1.25 / $0.20 cached /
  // $2.50 below 200K prompt tokens (2x above). Served as separate reasoning
  // and non-reasoning ids; reasoning_effort is not documented for either.
  // Still listed on docs.x.ai with no retirement notice, but superseded by
  // Grok 4.3 at the same price, so deprecated like grok43. Max output carried
  // over from the other Grok entries (xAI publishes none).
  grok420T: {
    name: 'grok420T',
    label: 'Grok 4.20 (Thinking)',
    fullName: 'grok-4.20-0309-reasoning',
    shortName: 'grok-4.20-reasoning',
    openrouterFullName: 'x-ai/grok-4.20',
    provider: ModelProvider.XAI,
    maxOutputTokens: 128000,
    contextWindow: 1000000,
    inputPrice: 1.25,
    outputPrice: 2.5,
    // Prompts above 200K bill the whole request at the tier (docs.x.ai/developers/models).
    longContextPricing: {
      aboveInputTokens: 200_000,
      inputPrice: 2.5,
      outputPrice: 5.0,
      cacheDiscountFactor: 0.16,
    },
    capabilities: {
      ...XAI_DEFAULT_CAPABILITIES,
      // xAI caches prompts automatically; cached input is $0.20 of $1.25.
      supportsAutoPromptCaching: true,
      cacheDiscountFactor: 0.16,
      supportsVision: true,
      supportsReasoning: true,
      supportsReasoningEffort: false,
    },
    openRouterOnly: false,
    deprecated: true,
  },
  grok420: {
    name: 'grok420',
    label: 'Grok 4.20',
    fullName: 'grok-4.20-0309-non-reasoning',
    shortName: 'grok-4.20-non-reasoning',
    openrouterFullName: 'x-ai/grok-4.20',
    provider: ModelProvider.XAI,
    maxOutputTokens: 128000,
    contextWindow: 1000000,
    inputPrice: 1.25,
    outputPrice: 2.5,
    // Prompts above 200K bill the whole request at the tier (docs.x.ai/developers/models).
    longContextPricing: {
      aboveInputTokens: 200_000,
      inputPrice: 2.5,
      outputPrice: 5.0,
      cacheDiscountFactor: 0.16,
    },
    capabilities: {
      ...XAI_DEFAULT_CAPABILITIES,
      // xAI caches prompts automatically; cached input is $0.20 of $1.25.
      supportsAutoPromptCaching: true,
      cacheDiscountFactor: 0.16,
      supportsVision: true,
      supportsReasoning: false,
      supportsReasoningEffort: false,
    },
    openRouterOnly: false,
    deprecated: true,
  },
  grok4: {
    name: 'grok4',
    label: 'Grok 4',
    fullName: 'grok-4-0709',
    shortName: 'grok-4',
    openrouterFullName: 'x-ai/grok-4-0709',
    provider: ModelProvider.XAI,
    maxOutputTokens: 128000,
    contextWindow: 256000,
    inputPrice: 3.0,
    outputPrice: 15.0,
    capabilities: {
      ...XAI_DEFAULT_CAPABILITIES,
      supportsReasoning: true,
      supportsReasoningEffort: false,
    },
    openRouterOnly: false,
    deprecated: true,
    retired: true,
  },
  grok3: {
    name: 'grok3',
    label: 'Grok 3',
    fullName: 'grok-3-beta',
    shortName: 'grok-3-beta',
    openrouterFullName: 'x-ai/grok-3',
    provider: ModelProvider.XAI,
    maxOutputTokens: 131072,
    contextWindow: 131072,
    inputPrice: 3.0,
    outputPrice: 15.0,
    capabilities: {
      ...XAI_DEFAULT_CAPABILITIES,
      supportsReasoning: false,
      supportsReasoningEffort: false,
    },
    openRouterOnly: false,
    deprecated: true,
    retired: true,
  },
  'grok3-': {
    name: 'grok3-',
    label: 'Grok 3 Mini',
    fullName: 'grok-3-mini-beta',
    shortName: 'grok-3-mini-beta',
    openrouterFullName: 'x-ai/grok-3-mini-beta',
    provider: ModelProvider.XAI,
    maxOutputTokens: 131072,
    contextWindow: 131072,
    inputPrice: 0.3,
    outputPrice: 0.5,
    capabilities: {
      ...XAI_DEFAULT_CAPABILITIES,
      supportsReasoning: true,
      supportsReasoningEffort: true,
      reasoningEffort: ReasoningEffort.LOW,
    },
    openRouterOnly: false,
    deprecated: true,
  },
  grok2: {
    name: 'grok2',
    label: 'Grok 2',
    fullName: 'grok-2-1212',
    shortName: 'grok-2',
    openrouterFullName: 'grok-ai/grok-2-1212',
    provider: ModelProvider.XAI,
    maxOutputTokens: 131072,
    contextWindow: 131072,
    inputPrice: 2.0,
    outputPrice: 10.0,
    capabilities: XAI_DEFAULT_CAPABILITIES,
    openRouterOnly: false,
    deprecated: true,
    retired: true,
  },
  grok2v: {
    name: 'grok2v',
    label: 'Grok 2 Vision',
    fullName: 'grok-2-1212-vision',
    shortName: 'grok-2-vision',
    openrouterFullName: 'grok-ai/grok-2-1212-vision',
    provider: ModelProvider.XAI,
    maxOutputTokens: 32768,
    contextWindow: 32768,
    inputPrice: 2.0,
    outputPrice: 10.0,
    capabilities: {
      ...XAI_DEFAULT_CAPABILITIES,
      supportsVision: true,
    },
    openRouterOnly: false,
    deprecated: true,
    retired: true,
  },
};
