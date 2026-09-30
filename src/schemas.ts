/**
 * Zod v4 validation schemas for llm-zoo types.
 * Requires zod ^4.0.0 as peer dependency.
 *
 * @example
 * ```typescript
 * import { ModelConfigSchema } from 'llm-zoo/schemas';
 *
 * const result = ModelConfigSchema.safeParse(myConfig);
 * if (!result.success) {
 *   console.error(result.error);
 * }
 * ```
 */

import { z } from 'zod';
import { ModelProvider, ReasoningEffort } from './ModelConfig';

// ============================================================================
// Zod v4 Schemas
// ============================================================================

export const ReasoningEffortSchema = z.nativeEnum(ReasoningEffort);

export const ModelProviderSchema = z.nativeEnum(ModelProvider);

/** Feature flags defining model's supported capabilities and behaviors. */
export const ModelCapabilitiesSchema = z.object({
  supportsFunctionCalling: z.boolean(),
  supportsNativeMCPServer: z.boolean(),
  supportsNativeWebSearch: z.boolean(),
  supportsDynamicFilteringWebSearch: z.boolean(),
  supportsNativeCodeExecution: z.boolean(),
  supportsPromptCaching: z.boolean(),
  supportsAutoPromptCaching: z.boolean(),
  cacheDiscountFactor: z.number(),
  supportsInterleavedThinking: z.boolean(),
  supportsVision: z.boolean(),
  supportsNativePdf: z.boolean(),
  supportsAssistantPrefill: z.boolean(),
  supportsPredictiveOutput: z.boolean(),
  supportsTokenCounting: z.boolean(),
  supportsSystemPrompt: z.boolean(),
  supportsIntermDevMsgs: z.boolean(),
  supportsNativeAudio: z.boolean(),
});

const EffortListSchema = z.array(ReasoningEffortSchema).readonly();

/** How a model reasons; see `ReasoningSpec`. */
export const ReasoningSpecSchema = z.object({
  efforts: EffortListSchema,
  off: EffortListSchema.optional(),
  budget: z.boolean().optional(),
  providerDefault: ReasoningEffortSchema.optional(),
});

const TokenPricesSchema = z.object({ inputPrice: z.number(), outputPrice: z.number() });

/** Rates billed for a whole request whose prompt is above the threshold. */
export const LongContextPricingSchema = z.object({
  aboveInputTokens: z.number(),
  inputPrice: z.number(),
  outputPrice: z.number(),
  cacheDiscountFactor: z.number(),
});

/** A model reference, `provider/id`. */
export const ModelRefSchema = z.templateLiteral([ModelProviderSchema, '/', z.string()]);

/** A model plus how to run it; see `ModelSelection`. */
export const ModelSelectionSchema = z.object({
  ref: ModelRefSchema,
  effort: ReasoningEffortSchema.optional(),
  thinking: z.boolean().optional(),
  mode: z.literal('pro').optional(),
});

/** Complete configuration for a language model instance. */
export const ModelConfigSchema = z.object({
  ref: ModelRefSchema,
  id: z.string(),
  label: z.string(),
  shortName: z.string(),
  provider: ModelProviderSchema,
  maxOutputTokens: z.number(),
  inputPrice: z.number(),
  outputPrice: z.number(),
  contextWindow: z.number(),
  capabilities: ModelCapabilitiesSchema,
  reasoning: ReasoningSpecSchema.optional(),
  modes: z.array(z.literal('pro')).readonly().optional(),
  tiers: z
    .object({
      fast: TokenPricesSchema.extend({ longContextPricing: LongContextPricingSchema.optional() }).optional(),
    })
    .optional(),
  longContextPricing: LongContextPricingSchema.optional(),
  source: z.object({ url: z.string(), verified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) }).optional(),
  legacyKeys: z.record(z.string(), ModelSelectionSchema.omit({ ref: true })).optional(),
  openRouterOnly: z.boolean(),
  openrouterFullName: z.string().optional(),
  vscodeLMFullName: z.string().optional(),
  copilotFullName: z.string().optional(),
  baseUrl: z.string().optional(),
  requiresResponsesAPI: z.boolean().optional(),
  codexSubscription: z.boolean().optional(),
  kimiSubscription: z.boolean().optional(),
  deprecated: z.boolean().optional(),
  retired: z.boolean().optional(),
});

/** Registry of all model configurations. */
export const ModelRegistrySchema = z.record(ModelRefSchema, ModelConfigSchema);

// Export inferred types for convenience
export type ModelCapabilitiesSchemaType = z.infer<typeof ModelCapabilitiesSchema>;
export type ModelConfigSchemaType = z.infer<typeof ModelConfigSchema>;
export type ModelRegistrySchemaType = z.infer<typeof ModelRegistrySchema>;
export type ModelSelectionSchemaType = z.infer<typeof ModelSelectionSchema>;
