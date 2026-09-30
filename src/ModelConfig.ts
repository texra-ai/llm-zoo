/**
 * Configuration types and constants for language model interactions and capabilities.
 * This module provides a comprehensive type system for describing LLM capabilities,
 * pricing, and provider-specific configurations.
 *
 * @packageDocumentation
 */

/**
 * Default context window size in tokens.
 * Used as fallback when model doesn't specify a custom context window.
 */
export const DEFAULT_CONTEXT_WINDOW = 128000;

/**
 * Reasoning effort levels for models that support configurable reasoning depth.
 * Higher effort typically results in better reasoning quality but increased latency and cost.
 */
export enum ReasoningEffort {
  /** Maximum reasoning effort - highest tier, above extra high */
  MAX = 'max',
  /** Extra high reasoning effort - maximum depth analysis */
  XHIGH = 'xhigh',
  /** High reasoning effort - thorough analysis */
  HIGH = 'high',
  /** Medium reasoning effort - balanced analysis */
  MEDIUM = 'medium',
  /** Low reasoning effort - quick analysis */
  LOW = 'low',
  /** Minimal reasoning effort - near-direct response */
  MINIMAL = 'minimal',
  /** No explicit reasoning - standard model behavior */
  NONE = 'none',
}

/**
 * The shared effort scale, lowest first. Every model's accepted levels are a
 * subset of it, so a requested level can be compared with any model's list.
 * `none` means "do not think".
 */
export const EFFORT_SCALE: readonly ReasoningEffort[] = [
  ReasoningEffort.NONE,
  ReasoningEffort.MINIMAL,
  ReasoningEffort.LOW,
  ReasoningEffort.MEDIUM,
  ReasoningEffort.HIGH,
  ReasoningEffort.XHIGH,
  ReasoningEffort.MAX,
];

/**
 * How a model reasons, as the provider documents it. A model without a
 * `reasoning` spec never thinks.
 *
 * - Always thinks, with effort levels: `{ efforts: [...] }` (no `off`).
 * - Always thinks, no control: `{ efforts: [] }`.
 * - Thinking can be turned off: add `off`, listing the effort levels the
 *   provider still accepts while thinking is off (`[]` when none).
 */
export interface ReasoningSpec {
  /** Effort levels accepted while thinking, in scale order; empty when the provider offers no effort control. */
  efforts: readonly ReasoningEffort[];
  /** Present when thinking can be turned off: the effort levels still accepted with thinking off. */
  off?: readonly ReasoningEffort[];
  /** Thinking length is set with a token budget (e.g. Anthropic `budget_tokens`) instead of adaptively. */
  budget?: boolean;
  /**
   * The provider's documented default level when a request names none; `none`
   * when the model thinks only if asked. A fact, not a recommendation.
   */
  providerDefault?: ReasoningEffort;
}

/** Request modes beyond the provider default. OpenAI's Responses API accepts `reasoning.mode: 'pro'`. */
export type ReasoningMode = 'pro';

/** Per-token prices, USD per million tokens. */
export interface TokenPrices {
  inputPrice: number;
  outputPrice: number;
}

/**
 * Where a model's facts were checked: the provider's official page and the
 * date (YYYY-MM-DD) it was last read.
 */
export interface ModelSource {
  url: string;
  verified: string;
}

/**
 * Supported language model providers.
 * Each provider has specific API formats, capabilities, and pricing structures.
 */
export enum ModelProvider {
  /** Anthropic (Claude models) */
  ANTHROPIC = 'anthropic',
  /** OpenAI (GPT, o-series models) */
  OPENAI = 'openai',
  /** Google (Gemini models) */
  GOOGLE = 'google',
  /** DeepSeek (V3, R1 models) */
  DEEPSEEK = 'deepseek',
  /** xAI (Grok models) */
  XAI = 'xai',
  /** Moonshot AI (Kimi models) */
  MOONSHOT = 'moonshot',
  /** Alibaba DashScope (Qwen models) */
  DASHSCOPE = 'dashscope',
  /** MiniMax (M-series models) */
  MINIMAX = 'minimax',
  /** GitHub Copilot */
  COPILOT = 'copilot',
  /** Zhipu AI (GLM models) */
  GLM = 'glm',
  /** Meta (Muse Spark models via Meta Model API) */
  META = 'meta',
  /** Other providers (OpenRouter-only models, etc.) */
  OTHERS = 'others',
}

/**
 * A model's identity: its provider and the model ID that provider's API takes,
 * e.g. `anthropic/claude-opus-5`. This is the registry key.
 */
export type ModelRef = `${ModelProvider}/${string}`;

/**
 * A model plus how to run it. Written as a string: `provider/id[@effort][+pro]`,
 * e.g. `anthropic/claude-opus-5@high`. `effort: 'none'` turns thinking off;
 * `thinking: false` with another effort is for models whose `reasoning.off`
 * lists that level. Service tiers are not part of a selection: they are a
 * routing choice of the caller.
 */
export interface ModelSelection {
  ref: ModelRef;
  effort?: ReasoningEffort;
  thinking?: boolean;
  mode?: ReasoningMode;
}

/**
 * Feature flags defining a model's supported capabilities and behaviors.
 * These capabilities help determine which features can be used with a specific model.
 */
export interface ModelCapabilities {
  /** Whether the model supports function/tool calling */
  supportsFunctionCalling: boolean;

  /** Whether the model supports native MCP (Model Context Protocol) servers */
  supportsNativeMCPServer: boolean;

  /** Whether the model has built-in web search capability */
  supportsNativeWebSearch: boolean;

  /**
   * Whether the model supports dynamic filtering for web search (web_search_20260209).
   * Dynamic filtering allows the model to write and execute code to post-process
   * search results before loading them into context, improving accuracy and reducing tokens.
   * Requires code execution to be enabled.
   */
  supportsDynamicFilteringWebSearch: boolean;

  /** Whether the model can execute code natively (e.g., Python sandbox) */
  supportsNativeCodeExecution: boolean;

  /** Whether the model supports explicit prompt caching */
  supportsPromptCaching: boolean;

  /** Whether the model automatically caches prompts without explicit markers */
  supportsAutoPromptCaching: boolean;

  /**
   * Cost multiplier for cached tokens (0.0-1.0).
   * Lower values mean greater savings when using cached content.
   * Example: 0.1 means cached tokens cost 10% of normal price.
   */
  cacheDiscountFactor: number;

  /** Whether reasoning can be interleaved with tool calls and regular output */
  supportsInterleavedThinking: boolean;

  /** Whether the model can process images */
  supportsVision: boolean;

  /** Whether the model can process PDF documents natively */
  supportsNativePdf: boolean;

  /** Whether the model can process audio input natively */
  supportsNativeAudio: boolean;

  /** Whether the model supports assistant message prefilling (on requests without thinking, where thinking can be turned off) */
  supportsAssistantPrefill: boolean;

  /** Whether the model supports predictive/speculative output */
  supportsPredictiveOutput: boolean;

  /** Whether the model provides accurate token counting */
  supportsTokenCounting: boolean;

  /** Whether the model supports system prompts */
  supportsSystemPrompt: boolean;

  /** Whether the model supports intermediate developer messages */
  supportsIntermDevMsgs: boolean;
}

/**
 * Base model capabilities with sensible defaults.
 * Models should spread this and override specific capabilities.
 */
export const DEFAULT_MODEL_CAPABILITIES: ModelCapabilities = {
  supportsFunctionCalling: true,
  supportsNativeMCPServer: false,
  supportsNativeWebSearch: false,
  supportsDynamicFilteringWebSearch: false,
  supportsNativeCodeExecution: false,
  supportsPromptCaching: false,
  supportsAutoPromptCaching: false,
  cacheDiscountFactor: 1.0,
  supportsInterleavedThinking: false,
  supportsVision: true,
  supportsNativePdf: false,
  supportsAssistantPrefill: false,
  supportsPredictiveOutput: false,
  supportsTokenCounting: false,
  supportsSystemPrompt: true,
  supportsIntermDevMsgs: false,
  supportsNativeAudio: false,
};

/** A provider file's entry: a `ModelConfig` whose `ref` the registry derives from `provider` and `id`. */
export type ModelEntry = Omit<ModelConfig, 'ref'>;

/**
 * Complete configuration for a language model.
 * Contains all metadata needed to work with the model including
 * pricing, capabilities, and provider-specific settings.
 */
export interface ModelConfig {
  /** Registry key: `${provider}/${id}`. */
  ref: ModelRef;

  /**
   * The model ID the provider's API takes (e.g. "claude-opus-5", "gpt-4o-2024-11-20").
   * This is the string sent to the provider.
   */
  id: string;

  /**
   * Unpinned API model name without date suffix (e.g., "gpt-5.4", "claude-opus-4-1").
   * Equals `id` when the model has no date-pinned variant.
   * Useful for providers/clients that prefer non-date-pinned model identifiers.
   */
  shortName: string;

  /** The model's provider */
  provider: ModelProvider;

  /** Maximum tokens the model can generate in a single response */
  maxOutputTokens: number;

  /** Cost per million input tokens in USD */
  inputPrice: number;

  /** Cost per million output tokens in USD */
  outputPrice: number;

  /** Maximum context window size in tokens */
  contextWindow: number;

  /** Model capability flags */
  capabilities: ModelCapabilities;

  /** How the model reasons; absent when it never thinks. */
  reasoning?: ReasoningSpec;

  /** Request modes the model accepts beyond the default. OpenAI's `pro` exists only in the Responses API. */
  modes?: readonly ReasoningMode[];

  /**
   * Service tiers beyond standard, with their prices (e.g. OpenAI
   * `service_tier: 'fast'`). Choosing a tier is a routing decision of the
   * caller, never part of a model selection.
   */
  tiers?: { fast?: TokenPrices };

  /** Where these facts were checked. Required for every model that is not retired. */
  source?: ModelSource;

  /**
   * Registry keys from llm-zoo 1.x that meant this model, each with the
   * selection it stood for (e.g. `opus5T` → effort high). Kept so old
   * configurations can be read; new code uses `ref`. A selection carries no
   * service tier, so a 1.x fast-tier key maps to the standard selection and
   * the caller chooses the tier.
   */
  legacyKeys?: Readonly<Record<string, Omit<ModelSelection, 'ref'>>>;

  /**
   * Whether this model is only available through OpenRouter.
   * When true, direct API access is not available.
   */
  openRouterOnly: boolean;

  /**
   * Model identifier for OpenRouter API.
   * Example: "anthropic/claude-sonnet-4.5"
   */
  openrouterFullName?: string;

  /**
   * Model identifier for the VS Code Language Model API (`vscode.lm`).
   * Example: "claude-sonnet-4.5" (matches the `id` field of a vscode.lm ChatModel).
   */
  vscodeLMFullName?: string;

  /** Exact model identifier documented for GitHub Copilot model selection. */
  copilotFullName?: string;

  /**
   * Custom base URL for this specific model.
   * Overrides the provider's default endpoint.
   */
  baseUrl?: string;

  /**
   * Whether this model requires OpenAI's Responses API format.
   * Used for special models like deep research that bypass standard chat completions.
   */
  requiresResponsesAPI?: boolean;

  /**
   * Human-friendly display name for the model.
   * Used as the label in model dropdowns so users can identify models at a glance.
   */
  label: string;

  /**
   * Whether the Codex backend (ChatGPT subscription) currently serves this
   * model. Source of truth: the model manifest embedded in the Codex CLI
   * (`models-manager`) cross-checked against
   * https://developers.openai.com/codex/models — serving status is not
   * derivable from the model name, reasoning tier, or deprecation status.
   * @default false
   */
  codexSubscription?: boolean;

  /**
   * Whether the Kimi Code backend (Moonshot coding-subscription plan) serves
   * this model. Kimi Code models are exclusive to the managed endpoint
   * `https://api.kimi.com/coding/v1` (OAuth device-flow token or console API
   * key) — they are NOT served by the Moonshot open platform, and open-platform
   * keys do not work on the coding endpoint. Source of truth: kimi-cli's
   * platform registry and https://www.kimi.com/code/docs/en/.
   * @default false
   */
  kimiSubscription?: boolean;

  /**
   * Whether this model is deprecated and no longer recommended for use.
   * Deprecated models are still functional but have been superseded by newer versions.
   * @default false
   */
  deprecated?: boolean;

  /**
   * Whether this model has been retired and is no longer served by the provider.
   * Retired models cannot be used for inference — API calls will fail.
   * @default false
   */
  retired?: boolean;
}
