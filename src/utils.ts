/**
 * Utility functions for working with model configurations.
 * @packageDocumentation
 */

import {
  ModelConfig,
  ModelProvider,
  ModelCapabilities,
  ModelRef,
  ModelSelection,
  ReasoningEffort,
} from './ModelConfig';
import { LEGACY_KEYS, MODEL_CONFIGS } from './ModelRegistry';

// ============================================================================
// Lookup
// ============================================================================

/**
 * Get a model by its reference (`provider/id`).
 *
 * @example
 * ```typescript
 * const opus = lookup('anthropic/claude-opus-5');
 * const gpt = lookup('openai/gpt-4o-2024-11-20');
 * ```
 */
export function lookup(ref: string): ModelConfig | undefined {
  return Object.hasOwn(MODEL_CONFIGS, ref) ? MODEL_CONFIGS[ref as ModelRef] : undefined;
}

/**
 * Find a model by the ID its provider's API takes. IDs can repeat across
 * providers (e.g. a Copilot or OpenRouter listing), so prefer `lookup` with a
 * full reference when the provider is known.
 *
 * @example
 * ```typescript
 * const model = resolve('claude-sonnet-4-5');
 * ```
 */
export function resolve(id: string): ModelConfig | undefined {
  return Object.values(MODEL_CONFIGS).find((m) => m.id === id);
}

/**
 * Check if a model reference exists.
 */
export function exists(ref: string): boolean {
  return Object.hasOwn(MODEL_CONFIGS, ref);
}

const EFFORTS = new Set<string>(Object.values(ReasoningEffort));

/**
 * Read a model selection written as `provider/id[@effort][+pro]`, or an
 * llm-zoo 1.x key such as `opus5T`. Returns `undefined` when the model is not
 * in the registry or the effort is not a known level. Whether the model
 * accepts that effort is left to the caller, which knows its own defaults.
 *
 * @example
 * ```typescript
 * parseModelRef('anthropic/claude-opus-5@high');
 * // → { ref: 'anthropic/claude-opus-5', effort: 'high' }
 * parseModelRef('openai/gpt-5.6-sol@xhigh+pro');
 * // → { ref: 'openai/gpt-5.6-sol', effort: 'xhigh', mode: 'pro' }
 * parseModelRef('opus5T');
 * // → { ref: 'anthropic/claude-opus-5', effort: 'high' }
 * ```
 */
export function parseModelRef(input: string): ModelSelection | undefined {
  const text = input.trim();
  if (Object.hasOwn(LEGACY_KEYS, text)) return LEGACY_KEYS[text];
  const match = /^([^@+]+?)(?:@([a-z]+))?(\+pro)?$/.exec(text);
  if (!match) return undefined;
  const [, ref = '', effort, pro] = match;
  if (!exists(ref)) return undefined;
  if (effort !== undefined && !EFFORTS.has(effort)) return undefined;
  return {
    ref: ref as ModelRef,
    ...(effort !== undefined && { effort: effort as ReasoningEffort }),
    ...(pro !== undefined && { mode: 'pro' as const }),
  };
}

/**
 * Write a model selection in its string form, `provider/id[@effort][+pro]`.
 * `thinking: false` has no string form and is omitted.
 */
export function formatModelRef(selection: ModelSelection): string {
  return `${selection.ref}${selection.effort ? `@${selection.effort}` : ''}${selection.mode === 'pro' ? '+pro' : ''}`;
}

// ============================================================================
// Filtering - Fluent Predicates
// ============================================================================

/**
 * Get all models from a provider.
 *
 * @example
 * ```typescript
 * const claudeModels = from(ModelProvider.ANTHROPIC);
 * const geminiModels = from(ModelProvider.GOOGLE);
 * ```
 */
export function from(provider: ModelProvider): ModelConfig[] {
  return Object.values(MODEL_CONFIGS).filter((m) => m.provider === provider);
}

/**
 * Find models matching a capability predicate.
 *
 * @example
 * ```typescript
 * // Vision + reasoning models
 * const smart = where((c, m) => c.supportsVision && m.reasoning !== undefined);
 *
 * // Models with great caching
 * const cached = where(c => c.cacheDiscountFactor <= 0.1);
 * ```
 */
export function where(
  predicate: (capabilities: ModelCapabilities, model: ModelConfig) => boolean,
): ModelConfig[] {
  return Object.values(MODEL_CONFIGS).filter((m) => predicate(m.capabilities, m));
}

/**
 * Get models supporting a specific capability.
 *
 * @example
 * ```typescript
 * const visionaries = supporting('supportsVision');
 * const coders = supporting('supportsNativeCodeExecution');
 * ```
 */
export function supporting(
  capability: keyof ModelCapabilities,
): ModelConfig[] {
  return Object.values(MODEL_CONFIGS).filter((m) => {
    const value = m.capabilities[capability];
    return typeof value === 'boolean' ? value : value !== undefined;
  });
}

/**
 * Filter by context window size.
 *
 * @example
 * ```typescript
 * const longContext = withContext(200000);  // 200K+ context
 * const million = withContext(1000000);     // 1M+ context
 * ```
 */
export function withContext(minTokens: number): ModelConfig[] {
  return Object.values(MODEL_CONFIGS).filter(
    (m) => m.contextWindow >= minTokens,
  );
}

/**
 * Get models accessible via direct API (not OpenRouter-only).
 */
export function directAccess(): ModelConfig[] {
  return Object.values(MODEL_CONFIGS).filter((m) => !m.openRouterOnly);
}

/**
 * Get models only available through OpenRouter.
 */
export function openRouterOnly(): ModelConfig[] {
  return Object.values(MODEL_CONFIGS).filter((m) => m.openRouterOnly);
}

/**
 * Get models that have been retired and are no longer served.
 *
 * @example
 * ```typescript
 * const gone = retired();
 * console.log(`${gone.length} models are no longer available`);
 * ```
 */
export function retired(): ModelConfig[] {
  return Object.values(MODEL_CONFIGS).filter((m) => m.retired === true);
}

/**
 * Get only active (non-retired) models.
 *
 * @example
 * ```typescript
 * const available = active();
 * console.log(`${available.length} models are currently available`);
 * ```
 */
export function active(): ModelConfig[] {
  return Object.values(MODEL_CONFIGS).filter((m) => !m.retired);
}

// ============================================================================
// Cost Intelligence
// ============================================================================

/**
 * Calculate exact cost for a request.
 *
 * @example
 * ```typescript
 * // Basic usage
 * const price = cost('anthropic/claude-sonnet-4-5', { input: 10000, output: 5000 });
 *
 * // With prompt caching
 * const cached = cost('anthropic/claude-sonnet-4-5', {
 *   input: 10000,
 *   output: 5000,
 *   cached: 8000  // 8K tokens were cache hits
 * });
 * ```
 */
export function cost(
  model: ModelConfig | string,
  tokens: { input: number; output: number; cached?: number },
  options: { tier?: 'fast' } = {},
): number {
  const config = typeof model === 'string' ? lookup(model) : model;
  if (!config) {
    throw new Error(`Unknown model: ${model}`);
  }

  const prices = options.tier ? config.tiers?.[options.tier] : config;
  if (!prices) {
    throw new Error(`${config.ref} has no ${options.tier} tier`);
  }
  const { input, output, cached = 0 } = tokens;
  const uncached = input - cached;

  const inputCost = (uncached / 1_000_000) * prices.inputPrice;
  const cacheCost =
    (cached / 1_000_000) * prices.inputPrice * config.capabilities.cacheDiscountFactor;
  const outputCost = (output / 1_000_000) * prices.outputPrice;

  return inputCost + cacheCost + outputCost;
}

/**
 * Estimate worst-case cost (max output tokens).
 *
 * @example
 * ```typescript
 * const worst = maxCost('openai/gpt-4o-2024-11-20', 50000);
 * console.log(`Budget up to $${worst.toFixed(2)}`);
 * ```
 */
export function maxCost(model: ModelConfig | string, inputTokens: number): number {
  const config = typeof model === 'string' ? lookup(model) : model;
  if (!config) {
    throw new Error(`Unknown model: ${model}`);
  }
  return cost(config, { input: inputTokens, output: config.maxOutputTokens });
}

/**
 * Compare cost across models for the same workload.
 *
 * @example
 * ```typescript
 * const comparison = compareCosts(
 *   ['anthropic/claude-sonnet-4-5', 'openai/gpt-4o-2024-11-20', 'google/gemini-2.5-pro'],
 *   { input: 10000, output: 2000 }
 * );
 * // Returns sorted by cost: [{ model, cost }, ...]
 * ```
 */
export function compareCosts(
  models: (ModelConfig | string)[],
  tokens: { input: number; output: number; cached?: number },
): { model: ModelConfig; cost: number }[] {
  return models
    .map((m) => {
      const config = typeof m === 'string' ? lookup(m) : m;
      if (!config) throw new Error(`Unknown model: ${m}`);
      return { model: config, cost: cost(config, tokens) };
    })
    .sort((a, b) => a.cost - b.cost);
}

// ============================================================================
// Smart Selection
// ============================================================================

/**
 * Find the cheapest model meeting your requirements.
 *
 * @example
 * ```typescript
 * // Cheapest with vision
 * const budget = cheapest({ supportsVision: true });
 *
 * // Cheapest reasoning model with 100K+ context
 * const thinker = cheapest(
 *   { supportsVision: true },
 *   { minContext: 100000 }
 * );
 * ```
 */
export function cheapest(
  capabilities: Partial<ModelCapabilities>,
  options?: { minContext?: number; provider?: ModelProvider },
): ModelConfig | undefined {
  const candidates = Object.values(MODEL_CONFIGS).filter((m) => {
    if (options?.minContext && m.contextWindow < options.minContext) {
      return false;
    }
    if (options?.provider && m.provider !== options.provider) {
      return false;
    }
    for (const [key, value] of Object.entries(capabilities)) {
      if (m.capabilities[key as keyof ModelCapabilities] !== value) {
        return false;
      }
    }
    return true;
  });

  if (candidates.length === 0) return undefined;

  return candidates.sort(
    (a, b) => a.inputPrice + a.outputPrice - (b.inputPrice + b.outputPrice),
  )[0];
}

/**
 * Find the most capable model within a budget.
 * Returns the priciest model under the limit (more expensive = usually better).
 *
 * @example
 * ```typescript
 * // Best model under $5/1M combined tokens
 * const best = smartpick(5);
 *
 * // Best reasoning model under $10
 * const bestReasoner = smartpick(10, { supportsVision: true });
 * ```
 */
export function smartpick(
  maxPricePerMillion: number,
  capabilities?: Partial<ModelCapabilities>,
): ModelConfig | undefined {
  let candidates = Object.values(MODEL_CONFIGS).filter(
    (m) => m.inputPrice + m.outputPrice <= maxPricePerMillion,
  );

  if (capabilities) {
    candidates = candidates.filter((m) => {
      for (const [key, value] of Object.entries(capabilities)) {
        if (m.capabilities[key as keyof ModelCapabilities] !== value) {
          return false;
        }
      }
      return true;
    });
  }

  if (candidates.length === 0) return undefined;

  // Higher price generally = more capable, so return the priciest under budget
  return candidates.sort(
    (a, b) => (b.inputPrice + b.outputPrice) - (a.inputPrice + a.outputPrice),
  )[0];
}

/**
 * Rank models by a metric.
 *
 * @example
 * ```typescript
 * const byPrice = ranked('price');        // Cheapest first
 * const byContext = ranked('context', 'desc');  // Largest context first
 * const byOutput = ranked('output', 'desc');    // Most output first
 * ```
 */
export function ranked(
  by: 'price' | 'context' | 'output',
  order: 'asc' | 'desc' = 'asc',
): ModelConfig[] {
  const getValue = (m: ModelConfig): number => {
    switch (by) {
      case 'price':
        return m.inputPrice + m.outputPrice;
      case 'context':
        return m.contextWindow;
      case 'output':
        return m.maxOutputTokens;
    }
  };

  return Object.values(MODEL_CONFIGS).sort((a, b) => {
    const diff = getValue(a) - getValue(b);
    return order === 'asc' ? diff : -diff;
  });
}

// ============================================================================
// Display Helpers
// ============================================================================

/**
 * Format a token count as a human-readable string (e.g. 128000 → "128K", 1000000 → "1M").
 */
function formatTokens(tokens: number): string {
  if (tokens >= 1_000_000 && tokens % 1_000_000 === 0) {
    return `${tokens / 1_000_000}M`;
  }
  if (tokens >= 1_000) {
    return `${Math.round(tokens / 1_000)}K`;
  }
  return String(tokens);
}

/**
 * Format a price as a compact string (e.g. 3.0 → "$3", 0.25 → "$0.25").
 */
function formatPrice(price: number): string {
  if (price === 0) return 'free';
  // Drop trailing zeros: $3.00 → $3, $0.50 → $0.50
  const formatted = price % 1 === 0 ? String(price) : price.toFixed(2).replace(/0+$/, '');
  return `$${formatted}`;
}

/**
 * Generate a dynamic hint string for a model, suitable for dropdown tooltips.
 * Combines context window size and pricing info.
 *
 * @example
 * ```typescript
 * hint('anthropic/claude-sonnet-4-5');
 * // → "200K context, $3/$15 per 1M tokens"
 *
 * hint('openai/gpt-4o-2024-11-20');
 * // → "128K context, $2.50/$10 per 1M tokens"
 *
 * // Also accepts a ModelConfig directly
 * const model = lookup('anthropic/claude-opus-4-6');
 * hint(model);
 * // → "200K context, $15/$75 per 1M tokens"
 * ```
 */
export function hint(model: ModelConfig | string): string {
  const config = typeof model === 'string' ? lookup(model) : model;
  if (!config) {
    throw new Error(`Unknown model: ${model}`);
  }

  const ctx = formatTokens(config.contextWindow);
  const input = formatPrice(config.inputPrice);
  const output = formatPrice(config.outputPrice);

  return `${ctx} context, ${input}/${output} per 1M tokens`;
}

// ============================================================================
// Insights
// ============================================================================

/**
 * Get registry statistics and insights.
 *
 * @example
 * ```typescript
 * const { totalModels, providers, capabilities } = insights();
 * console.log(`${totalModels} models across ${Object.keys(providers).length} providers`);
 * ```
 */
export function insights(): {
  totalModels: number;
  providers: Record<ModelProvider, number>;
  capabilities: Record<string, number>;
  pricing: { cheapest: ModelConfig; mostExpensive: ModelConfig };
  context: { smallest: ModelConfig; largest: ModelConfig };
} {
  const models = Object.values(MODEL_CONFIGS);

  // Count by provider
  const providers = {} as Record<ModelProvider, number>;
  for (const provider of Object.values(ModelProvider)) {
    providers[provider] = models.filter((m) => m.provider === provider).length;
  }

  // Count by capability
  const capabilityKeys = [
    'supportsFunctionCalling',
    'supportsVision',
    'supportsNativeCodeExecution',
    'supportsNativeWebSearch',
    'supportsDynamicFilteringWebSearch',
    'supportsPromptCaching',
    'supportsNativePdf',
    'supportsNativeAudio',
  ];

  const capabilities: Record<string, number> = {
    Reasoning: models.filter((m) => m.reasoning !== undefined).length,
  };
  for (const key of capabilityKeys) {
    const shortKey = key.replace('supports', '').replace('Native', '');
    capabilities[shortKey] = models.filter(
      (m) => m.capabilities[key as keyof ModelCapabilities],
    ).length;
  }

  // Extremes
  const byPrice = [...models].sort(
    (a, b) => a.inputPrice + a.outputPrice - (b.inputPrice + b.outputPrice),
  );
  const byContext = [...models].sort((a, b) => a.contextWindow - b.contextWindow);

  return {
    totalModels: models.length,
    providers,
    capabilities,
    pricing: {
      cheapest: byPrice[0]!,
      mostExpensive: byPrice[byPrice.length - 1]!,
    },
    context: {
      smallest: byContext[0]!,
      largest: byContext[byContext.length - 1]!,
    },
  };
}

// ============================================================================
// Legacy Aliases (backward compatibility)
// ============================================================================

/** @deprecated Use `lookup()` instead */
export const getModel = lookup;
/** @deprecated Use `resolve()` instead */
export const getModelByFullName = resolve;
/** @deprecated Use `exists()` instead */
export const hasModel = exists;
/** @deprecated Use `from()` instead */
export const getModelsByProvider = from;
/** @deprecated Use `where()` instead */
export const filterByCapability = where;
/** @deprecated Use `supporting()` instead */
export const getModelsWithCapability = supporting;
/** @deprecated Use `cost()` instead */
export function calculateCost(
  model: ModelConfig | string,
  inputTokens: number,
  outputTokens: number,
  cachedInputTokens: number = 0,
): number {
  return cost(model, { input: inputTokens, output: outputTokens, cached: cachedInputTokens });
}
/** @deprecated Use `maxCost()` instead */
export const estimateMaxCost = maxCost;
/** @deprecated Use `ranked()` instead */
export function sortModelsByMetric(
  metric: 'price' | 'context' | 'output',
  ascending: boolean = true,
): ModelConfig[] {
  return ranked(metric, ascending ? 'asc' : 'desc');
}
/** @deprecated Use `cheapest()` instead */
export function findCheapestModel(
  requirements: Partial<ModelCapabilities>,
  minContextWindow?: number,
): ModelConfig | undefined {
  return cheapest(requirements, minContextWindow !== undefined ? { minContext: minContextWindow } : {});
}
/** @deprecated Use `insights()` instead */
export const getRegistryStats = insights;
