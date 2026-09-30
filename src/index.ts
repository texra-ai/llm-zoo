/**
 * # LLM Zoo
 *
 * A comprehensive database of 80+ language models from 9 providers.
 * Zero dependencies. Full TypeScript. Tree-shakeable.
 *
 * @packageDocumentation
 *
 * @example Quick Start
 * ```typescript
 * import { lookup, cost, cheapest } from 'llm-zoo';
 *
 * // Lookup any model
 * const claude = lookup('anthropic/claude-sonnet-4-5');
 *
 * // Calculate costs
 * const price = cost('openai/gpt-4o-2024-11-20', { input: 10000, output: 2000 });
 *
 * // Find the perfect model
 * const budget = cheapest({ supportsVision: true });
 * ```
 */

// Core types (use `export type` for isolatedModules compatibility)
export type {
  ModelConfig,
  ModelEntry,
  ModelCapabilities,
  ModelRef,
  ModelSelection,
  ModelSource,
  ReasoningMode,
  ReasoningSpec,
  TokenPrices,
} from './ModelConfig';
export {
  ModelProvider,
  ReasoningEffort,
  EFFORT_SCALE,
  DEFAULT_MODEL_CAPABILITIES,
  DEFAULT_CONTEXT_WINDOW,
} from './ModelConfig';

// Registry
export {
  MODEL_CONFIGS,
  MODELS,
  LEGACY_KEYS,
  ANTHROPIC_MODELS,
  OPENAI_MODELS,
  OPENAI_REASONING_MODELS,
  OPENAI_DEEP_RESEARCH_MODELS,
  GOOGLE_MODELS,
  DEEPSEEK_MODELS,
  XAI_MODELS,
  MOONSHOT_MODELS,
  DASHSCOPE_MODELS,
  COPILOT_MODELS,
  COPILOT_MODEL_IDS,
  COPILOT_MODEL_NAMES,
  META_MODELS,
  OTHER_MODELS,
} from './ModelRegistry';
export type { CopilotModelId, CopilotModelName } from './ModelRegistry';

// Utilities
export {
  // Lookup
  lookup,
  resolve,
  exists,
  parseModelRef,
  formatModelRef,
  // Filtering
  from,
  where,
  supporting,
  withContext,
  directAccess,
  openRouterOnly,
  retired,
  active,
  // Cost
  cost,
  maxCost,
  compareCosts,
  // Smart Selection
  cheapest,
  smartpick,
  ranked,
  // Display
  hint,
  // Insights
  insights,
  // Legacy (deprecated)
  getModel,
  getModelByFullName,
  hasModel,
  getModelsByProvider,
  filterByCapability,
  getModelsWithCapability,
  calculateCost,
  estimateMaxCost,
  sortModelsByMetric,
  findCheapestModel,
  getRegistryStats,
} from './utils';

// Note: Zod schemas are available via 'llm-zoo/schemas' (requires zod peer dependency)
