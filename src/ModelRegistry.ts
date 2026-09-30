/**
 * Central registry of all available language model configurations.
 * This module aggregates model configurations from all providers and
 * exports them as a unified registry keyed by model reference.
 *
 * @packageDocumentation
 */

import { ModelConfig, ModelEntry, ModelRef, ModelSelection } from './ModelConfig';
import {
  ANTHROPIC_MODELS,
  OPENAI_DEEP_RESEARCH_MODELS,
  OPENAI_REASONING_MODELS,
  OPENAI_MODELS,
  GOOGLE_MODELS,
  XAI_MODELS,
  OTHER_MODELS,
  DEEPSEEK_MODELS,
  GLM_MODELS,
  META_MODELS,
  MINIMAX_MODELS,
  MOONSHOT_MODELS,
  DASHSCOPE_MODELS,
  COPILOT_MODELS,
  COPILOT_MODEL_IDS,
  COPILOT_MODEL_NAMES,
  type CopilotModelId,
  type CopilotModelName,
} from './providers';

const ENTRIES: readonly ModelEntry[] = [
  ...ANTHROPIC_MODELS,
  ...OPENAI_DEEP_RESEARCH_MODELS,
  ...OPENAI_REASONING_MODELS,
  ...OPENAI_MODELS,
  ...GOOGLE_MODELS,
  ...XAI_MODELS,
  ...OTHER_MODELS,
  ...DEEPSEEK_MODELS,
  ...GLM_MODELS,
  ...META_MODELS,
  ...MINIMAX_MODELS,
  ...MOONSHOT_MODELS,
  ...DASHSCOPE_MODELS,
  ...COPILOT_MODELS,
];

/**
 * Complete registry of all available model configurations, keyed by
 * `${provider}/${id}`.
 *
 * @example
 * ```typescript
 * import { MODEL_CONFIGS } from 'llm-zoo';
 *
 * const opus = MODEL_CONFIGS['anthropic/claude-opus-5'];
 * console.log(opus.contextWindow);      // 1000000
 * console.log(opus.reasoning?.efforts); // ['low', 'medium', 'high', 'xhigh', 'max']
 * ```
 */
export const MODEL_CONFIGS: Readonly<Record<ModelRef, ModelConfig>> = Object.fromEntries(
  ENTRIES.map((entry) => {
    const ref: ModelRef = `${entry.provider}/${entry.id}`;
    return [ref, { ref, ...entry }];
  }),
);

/** All model references. */
export const MODELS = Object.keys(MODEL_CONFIGS) as ModelRef[];

/**
 * llm-zoo 1.x registry keys, each mapped to the model selection it stood for
 * (e.g. `opus5T` → `{ ref: 'anthropic/claude-opus-5', effort: 'high' }`).
 */
export const LEGACY_KEYS: Readonly<Record<string, ModelSelection>> = Object.fromEntries(
  Object.values(MODEL_CONFIGS).flatMap((model) =>
    Object.entries(model.legacyKeys ?? {}).map(([key, selection]) => [key, { ref: model.ref, ...selection }]),
  ),
);

/**
 * Re-export individual provider model collections for granular access.
 */
export {
  ANTHROPIC_MODELS,
  OPENAI_DEEP_RESEARCH_MODELS,
  OPENAI_REASONING_MODELS,
  OPENAI_MODELS,
  GOOGLE_MODELS,
  XAI_MODELS,
  OTHER_MODELS,
  DEEPSEEK_MODELS,
  GLM_MODELS,
  META_MODELS,
  MINIMAX_MODELS,
  MOONSHOT_MODELS,
  DASHSCOPE_MODELS,
  COPILOT_MODELS,
  COPILOT_MODEL_IDS,
  COPILOT_MODEL_NAMES,
  type CopilotModelId,
  type CopilotModelName,
};
