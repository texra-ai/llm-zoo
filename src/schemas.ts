/**
 * Effect Schema validation schemas for llm-zoo types.
 * Requires effect ^4.0.0 as peer dependency.
 *
 * @example
 * ```typescript
 * import { Result, Schema } from 'effect';
 * import { ModelConfigSchema } from 'llm-zoo/schemas';
 *
 * const result = Schema.decodeUnknownResult(ModelConfigSchema)(myConfig);
 * if (Result.isFailure(result)) {
 *   console.error(result.failure.message);
 * }
 * ```
 */

import { Schema } from 'effect';
import { ModelProvider, ReasoningEffort } from './ModelConfig';

export const ReasoningEffortSchema = Schema.Enum(ReasoningEffort);

export const ModelProviderSchema = Schema.Enum(ModelProvider);

/** Feature flags defining model's supported capabilities and behaviors. */
export const ModelCapabilitiesSchema = Schema.Struct({
  supportsFunctionCalling: Schema.Boolean,
  supportsNativeMCPServer: Schema.Boolean,
  supportsNativeWebSearch: Schema.Boolean,
  supportsDynamicFilteringWebSearch: Schema.Boolean,
  supportsNativeCodeExecution: Schema.Boolean,
  supportsPromptCaching: Schema.Boolean,
  supportsAutoPromptCaching: Schema.Boolean,
  cacheDiscountFactor: Schema.Finite,
  supportsInterleavedThinking: Schema.Boolean,
  supportsVision: Schema.Boolean,
  supportsNativePdf: Schema.Boolean,
  supportsAssistantPrefill: Schema.Boolean,
  supportsPredictiveOutput: Schema.Boolean,
  supportsTokenCounting: Schema.Boolean,
  supportsSystemPrompt: Schema.Boolean,
  supportsIntermDevMsgs: Schema.Boolean,
  supportsNativeAudio: Schema.Boolean,
});

const EffortListSchema = Schema.Array(ReasoningEffortSchema);

/** How a model reasons; see `ReasoningSpec`. */
export const ReasoningSpecSchema = Schema.Struct({
  efforts: EffortListSchema,
  off: Schema.optional(EffortListSchema),
  budget: Schema.optional(Schema.Boolean),
  providerDefault: Schema.optional(ReasoningEffortSchema),
});

/** Rates billed for a whole request whose prompt is above the threshold. */
export const LongContextPricingSchema = Schema.Struct({
  aboveInputTokens: Schema.Finite,
  inputPrice: Schema.Finite,
  outputPrice: Schema.Finite,
  cacheDiscountFactor: Schema.Finite,
});

/** A model reference, `provider/id`. A template literal takes no enum part,
 *  so the provider is its literal values. */
export const ModelRefSchema = Schema.TemplateLiteral([Schema.Literals(Object.values(ModelProvider)), '/', Schema.String]);

const selectionFields = {
  effort: Schema.optional(ReasoningEffortSchema),
  thinking: Schema.optional(Schema.Boolean),
  mode: Schema.optional(Schema.Literal('pro')),
};

/** A model plus how to run it; see `ModelSelection`. */
export const ModelSelectionSchema = Schema.Struct({ ref: ModelRefSchema, ...selectionFields });

/** Complete configuration for a language model instance. */
export const ModelConfigSchema = Schema.Struct({
  ref: ModelRefSchema,
  id: Schema.String,
  label: Schema.String,
  shortName: Schema.String,
  provider: ModelProviderSchema,
  maxOutputTokens: Schema.Finite,
  inputPrice: Schema.Finite,
  outputPrice: Schema.Finite,
  contextWindow: Schema.Finite,
  capabilities: ModelCapabilitiesSchema,
  reasoning: Schema.optional(ReasoningSpecSchema),
  modes: Schema.optional(Schema.Array(Schema.Literal('pro'))),
  tiers: Schema.optional(
    Schema.Struct({
      fast: Schema.optional(
        Schema.Struct({
          inputPrice: Schema.Finite,
          outputPrice: Schema.Finite,
          longContextPricing: Schema.optional(LongContextPricingSchema),
        }),
      ),
    }),
  ),
  longContextPricing: Schema.optional(LongContextPricingSchema),
  source: Schema.optional(
    Schema.Struct({ url: Schema.String, verified: Schema.String.check(Schema.isPattern(/^\d{4}-\d{2}-\d{2}$/)) }),
  ),
  legacyKeys: Schema.optional(Schema.Record(Schema.String, Schema.Struct(selectionFields))),
  openRouterOnly: Schema.Boolean,
  openrouterFullName: Schema.optional(Schema.String),
  vscodeLMFullName: Schema.optional(Schema.String),
  copilotFullName: Schema.optional(Schema.String),
  baseUrl: Schema.optional(Schema.String),
  requiresResponsesAPI: Schema.optional(Schema.Boolean),
  codexSubscription: Schema.optional(Schema.Struct({ contextWindow: Schema.Int.check(Schema.isGreaterThan(0)) })),
  kimiSubscription: Schema.optional(Schema.Boolean),
  deprecated: Schema.optional(Schema.Boolean),
  retired: Schema.optional(Schema.Boolean),
});

/** Registry of all model configurations. */
export const ModelRegistrySchema = Schema.Record(ModelRefSchema, ModelConfigSchema);

// Export inferred types for convenience
export type ModelCapabilitiesSchemaType = typeof ModelCapabilitiesSchema.Type;
export type ModelConfigSchemaType = typeof ModelConfigSchema.Type;
export type ModelRegistrySchemaType = typeof ModelRegistrySchema.Type;
export type ModelSelectionSchemaType = typeof ModelSelectionSchema.Type;
