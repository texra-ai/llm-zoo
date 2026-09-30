import {
  DEFAULT_MODEL_CAPABILITIES,
  ModelCapabilities,
  ModelEntry,
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

// Reasoning on Grok 4.5+ cannot be disabled; `reasoning_effort` defaults to
// "high". Grok 4.5 treats "xhigh" as an alias for "high", so it is not listed.
// https://docs.x.ai/docs/guides/reasoning
const LOW_TO_HIGH_EFFORTS = [ReasoningEffort.LOW, ReasoningEffort.MEDIUM, ReasoningEffort.HIGH] as const;
const LOW_TO_XHIGH_EFFORTS = [...LOW_TO_HIGH_EFFORTS, ReasoningEffort.XHIGH] as const;

/**
 * xAI Grok model configurations.
 * Includes Grok 4.7, 4.6, 4.5, 4.3, 4.20, Build 0.1, 4, 3, and 2 variants.
 */
export const XAI_MODELS: readonly ModelEntry[] = [
  // Grok 4.7: a larger base model served at Grok 4.6's price and speed — 500K
  // context, $2 / $0.50 cached / $6 below 200K prompt tokens on the global
  // endpoint (2x above; the US regional endpoint bills 1.1x). Max output
  // carried over as for grok46.
  {
    label: 'Grok 4.7',
    id: 'grok-4.7',
    shortName: 'grok-4.7',
    openrouterFullName: 'x-ai/grok-4.7',
    provider: ModelProvider.XAI,
    maxOutputTokens: 128000,
    contextWindow: 500000,
    inputPrice: 2.0,
    outputPrice: 6.0,
    capabilities: {
      ...XAI_DEFAULT_CAPABILITIES,
      // xAI caches prompts automatically; cached input is $0.50 of $2.00.
      supportsAutoPromptCaching: true,
      cacheDiscountFactor: 0.25,
      supportsVision: true,
    },
    reasoning: { efforts: LOW_TO_XHIGH_EFFORTS, providerDefault: ReasoningEffort.HIGH },
    source: { url: 'https://docs.x.ai/docs/guides/reasoning', verified: '2026-09-30' },
    legacyKeys: { grok47: { effort: ReasoningEffort.HIGH } },
    openRouterOnly: false,
  },
  // Grok Build 0.1: xAI's agentic coding model (successor to grok-code-fast-1,
  // which has routed here since 2026-05-15). 256K context, text + image
  // input. $1.00 / $0.20 cached / $2.00 below 200K prompt tokens (2x above).
  // xAI publishes no max output, so the 128K value of the other Grok entries
  // is carried over.
  {
    label: 'Grok Build 0.1',
    id: 'grok-build-0.1',
    shortName: 'grok-build-0.1',
    openrouterFullName: 'x-ai/grok-build-0.1',
    provider: ModelProvider.XAI,
    maxOutputTokens: 128000,
    contextWindow: 256000,
    inputPrice: 1.0,
    outputPrice: 2.0,
    capabilities: {
      ...XAI_DEFAULT_CAPABILITIES,
      // xAI caches prompts automatically; cached input is $0.20 of $1.00.
      supportsAutoPromptCaching: true,
      cacheDiscountFactor: 0.2,
      supportsVision: true,
    },
    // Reasons; no documented reasoning_effort control.
    reasoning: { efforts: [] },
    source: { url: 'https://docs.x.ai/docs/models/grok-build-0.1', verified: '2026-09-30' },
    legacyKeys: { grokbuild01: {} },
    openRouterOnly: false,
  },
  // Grok 4.6: 500K context and $2/$6 (<200K tier) pricing per docs.x.ai, same
  // as 4.5. xAI publishes no max output tokens for any Grok model ("no text
  // output limit"), so this carries over the 128K value used by the other
  // Grok 4.x entries here.
  {
    label: 'Grok 4.6',
    id: 'grok-4.6',
    shortName: 'grok-4.6',
    openrouterFullName: 'x-ai/grok-4.6',
    provider: ModelProvider.XAI,
    maxOutputTokens: 128000,
    contextWindow: 500000,
    inputPrice: 2.0,
    outputPrice: 6.0,
    capabilities: {
      ...XAI_DEFAULT_CAPABILITIES,
      // xAI caches prompts automatically; cached input is $0.50 of $2.00.
      supportsAutoPromptCaching: true,
      cacheDiscountFactor: 0.25,
      supportsVision: true,
    },
    reasoning: { efforts: LOW_TO_XHIGH_EFFORTS, providerDefault: ReasoningEffort.HIGH },
    source: { url: 'https://docs.x.ai/docs/guides/reasoning', verified: '2026-09-30' },
    legacyKeys: { grok46: { effort: ReasoningEffort.HIGH } },
    openRouterOnly: false,
    // Superseded by Grok 4.7 (same price and speed).
    deprecated: true,
  },
  {
    label: 'Grok 4.5',
    id: 'grok-4.5',
    shortName: 'grok-4.5',
    openrouterFullName: 'x-ai/grok-4.5',
    provider: ModelProvider.XAI,
    maxOutputTokens: 128000,
    contextWindow: 500000,
    inputPrice: 2.0,
    outputPrice: 6.0,
    capabilities: {
      ...XAI_DEFAULT_CAPABILITIES,
      // xAI caches prompts automatically; cached input is $0.30 of $2.00.
      supportsAutoPromptCaching: true,
      cacheDiscountFactor: 0.15,
      supportsVision: true,
    },
    reasoning: { efforts: LOW_TO_HIGH_EFFORTS, providerDefault: ReasoningEffort.HIGH },
    source: { url: 'https://docs.x.ai/docs/guides/reasoning', verified: '2026-09-30' },
    legacyKeys: { grok45: { effort: ReasoningEffort.HIGH } },
    openRouterOnly: false,
    // Superseded by Grok 4.7 (same price and speed).
    deprecated: true,
  },
  {
    label: 'Grok 4.3',
    id: 'grok-4.3',
    shortName: 'grok-4.3',
    openrouterFullName: 'x-ai/grok-4.3',
    provider: ModelProvider.XAI,
    maxOutputTokens: 128000,
    contextWindow: 1000000,
    inputPrice: 1.25,
    outputPrice: 2.5,
    capabilities: {
      ...XAI_DEFAULT_CAPABILITIES,
      // xAI caches prompts automatically; cached input is $0.20 of $1.25.
      supportsAutoPromptCaching: true,
      cacheDiscountFactor: 0.16,
    },
    // Model page lists efforts none|low|medium|high|xhigh (default low);
    // "none" turns reasoning off.
    reasoning: { efforts: LOW_TO_XHIGH_EFFORTS, off: [], providerDefault: ReasoningEffort.LOW },
    source: { url: 'https://docs.x.ai/docs/models/grok-4.3', verified: '2026-09-30' },
    legacyKeys: { grok43: { effort: ReasoningEffort.LOW } },
    openRouterOnly: false,
    deprecated: true,
  },
  // Grok 4.20 (0309): 1M context, text + image input, $1.25 / $0.20 cached /
  // $2.50 below 200K prompt tokens (2x above). Served as separate reasoning
  // and non-reasoning ids; reasoning_effort is not documented for either.
  // Still listed on docs.x.ai with no retirement notice, but superseded by
  // Grok 4.3 at the same price, so deprecated like grok-4.3. Max output
  // carried over from the other Grok entries (xAI publishes none).
  {
    label: 'Grok 4.20 (Thinking)',
    id: 'grok-4.20-0309-reasoning',
    shortName: 'grok-4.20-reasoning',
    openrouterFullName: 'x-ai/grok-4.20',
    provider: ModelProvider.XAI,
    maxOutputTokens: 128000,
    contextWindow: 1000000,
    inputPrice: 1.25,
    outputPrice: 2.5,
    capabilities: {
      ...XAI_DEFAULT_CAPABILITIES,
      // xAI caches prompts automatically; cached input is $0.20 of $1.25.
      supportsAutoPromptCaching: true,
      cacheDiscountFactor: 0.16,
      supportsVision: true,
    },
    reasoning: { efforts: [] },
    source: { url: 'https://docs.x.ai/docs/models/grok-4.20-0309-reasoning', verified: '2026-09-30' },
    legacyKeys: { grok420T: {} },
    openRouterOnly: false,
    deprecated: true,
  },
  {
    label: 'Grok 4.20',
    id: 'grok-4.20-0309-non-reasoning',
    shortName: 'grok-4.20-non-reasoning',
    openrouterFullName: 'x-ai/grok-4.20',
    provider: ModelProvider.XAI,
    maxOutputTokens: 128000,
    contextWindow: 1000000,
    inputPrice: 1.25,
    outputPrice: 2.5,
    capabilities: {
      ...XAI_DEFAULT_CAPABILITIES,
      // xAI caches prompts automatically; cached input is $0.20 of $1.25.
      supportsAutoPromptCaching: true,
      cacheDiscountFactor: 0.16,
      supportsVision: true,
    },
    source: { url: 'https://docs.x.ai/docs/models/grok-4.20-0309-non-reasoning', verified: '2026-09-30' },
    legacyKeys: { grok420: {} },
    openRouterOnly: false,
    deprecated: true,
  },
  {
    label: 'Grok 4',
    id: 'grok-4-0709',
    shortName: 'grok-4',
    openrouterFullName: 'x-ai/grok-4-0709',
    provider: ModelProvider.XAI,
    maxOutputTokens: 128000,
    contextWindow: 256000,
    inputPrice: 3.0,
    outputPrice: 15.0,
    capabilities: {
      ...XAI_DEFAULT_CAPABILITIES,
    },
    reasoning: { efforts: [] },
    legacyKeys: { grok4: {} },
    openRouterOnly: false,
    deprecated: true,
    retired: true,
  },
  {
    label: 'Grok 3',
    id: 'grok-3-beta',
    shortName: 'grok-3-beta',
    openrouterFullName: 'x-ai/grok-3',
    provider: ModelProvider.XAI,
    maxOutputTokens: 131072,
    contextWindow: 131072,
    inputPrice: 3.0,
    outputPrice: 15.0,
    capabilities: {
      ...XAI_DEFAULT_CAPABILITIES,
    },
    legacyKeys: { grok3: {} },
    openRouterOnly: false,
    deprecated: true,
    retired: true,
  },
  {
    label: 'Grok 3 Mini',
    id: 'grok-3-mini-beta',
    shortName: 'grok-3-mini-beta',
    openrouterFullName: 'x-ai/grok-3-mini-beta',
    provider: ModelProvider.XAI,
    maxOutputTokens: 131072,
    contextWindow: 131072,
    inputPrice: 0.3,
    outputPrice: 0.5,
    capabilities: {
      ...XAI_DEFAULT_CAPABILITIES,
    },
    // No longer in xAI's docs; the archived reasoning guide lists low | high
    // for grok-3-mini and documents no default.
    reasoning: { efforts: [ReasoningEffort.LOW, ReasoningEffort.HIGH] },
    source: {
      url: 'https://web.archive.org/web/20260101122454/https://docs.x.ai/docs/guides/reasoning',
      verified: '2026-09-30',
    },
    legacyKeys: { 'grok3-': { effort: ReasoningEffort.LOW } },
    openRouterOnly: false,
    deprecated: true,
  },
  {
    label: 'Grok 2',
    id: 'grok-2-1212',
    shortName: 'grok-2',
    openrouterFullName: 'grok-ai/grok-2-1212',
    provider: ModelProvider.XAI,
    maxOutputTokens: 131072,
    contextWindow: 131072,
    inputPrice: 2.0,
    outputPrice: 10.0,
    capabilities: XAI_DEFAULT_CAPABILITIES,
    legacyKeys: { grok2: {} },
    openRouterOnly: false,
    deprecated: true,
    retired: true,
  },
  {
    label: 'Grok 2 Vision',
    id: 'grok-2-1212-vision',
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
    legacyKeys: { grok2v: {} },
    openRouterOnly: false,
    deprecated: true,
    retired: true,
  },
];
