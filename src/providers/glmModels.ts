import {
  DEFAULT_MODEL_CAPABILITIES,
  ModelCapabilities,
  ModelConfig,
  ModelProvider,
  ReasoningEffort,
} from '../ModelConfig';

/**
 * Default capabilities for Zhipu AI GLM models.
 * GLM models support function calling and vision by default.
 */
const GLM_DEFAULT_CAPABILITIES: ModelCapabilities = {
  ...DEFAULT_MODEL_CAPABILITIES,
  supportsFunctionCalling: true,
  supportsVision: true,
  supportsAssistantPrefill: true,
};

/**
 * Zhipu AI GLM model configurations.
 * Includes GLM-5, GLM-4.7, GLM-4.6V, and GLM-4.5 series.
 *
 * Model name conventions:
 * - fullName: Model name for native Zhipu AI API (e.g., 'glm-4.7', 'glm-5')
 * - openrouterFullName: Model name for OpenRouter API (e.g., 'z-ai/glm-4.7')
 */
export const GLM_MODELS: Record<string, ModelConfig> = {
  // GLM-5 (Flagship open-source model)
  glm5: {
    name: 'glm5',
    label: 'GLM-5',
    fullName: 'glm-5',
    shortName: 'glm-5',
    openrouterFullName: 'z-ai/glm-5',
    provider: ModelProvider.GLM,
    maxOutputTokens: 131072,
    contextWindow: 80000,
    inputPrice: 0.8,
    outputPrice: 2.56,
    capabilities: {
      ...GLM_DEFAULT_CAPABILITIES,
    },
    openRouterOnly: false,
  },
  // GLM-5 Turbo (Fast inference, agent-optimized)
  glm5turbo: {
    name: 'glm5turbo',
    label: 'GLM-5 Turbo',
    fullName: 'glm-5-turbo',
    shortName: 'glm-5-turbo',
    openrouterFullName: 'z-ai/glm-5-turbo',
    provider: ModelProvider.GLM,
    maxOutputTokens: 128000,
    contextWindow: 200000,
    inputPrice: 1.2,
    outputPrice: 4.0,
    capabilities: {
      ...GLM_DEFAULT_CAPABILITIES,
    },
    openRouterOnly: false,
  },
  // GLM-4.7 (Enhanced programming and multi-step reasoning)
  glm47: {
    name: 'glm47',
    label: 'GLM-4.7',
    fullName: 'glm-4.7',
    shortName: 'glm-4.7',
    openrouterFullName: 'z-ai/glm-4.7',
    provider: ModelProvider.GLM,
    maxOutputTokens: 128000,
    contextWindow: 200000,
    inputPrice: 0.4,
    outputPrice: 1.75,
    capabilities: {
      ...GLM_DEFAULT_CAPABILITIES,
    },
    openRouterOnly: false,
  },
  // GLM-4.7 Flash (Free efficient 30B-class model)
  glm47flash: {
    name: 'glm47flash',
    label: 'GLM-4.7 Flash',
    fullName: 'glm-4.7-flash',
    shortName: 'glm-4.7-flash',
    openrouterFullName: 'z-ai/glm-4.7-flash:free',
    provider: ModelProvider.GLM,
    maxOutputTokens: 128000,
    contextWindow: 202752,
    inputPrice: 0,
    outputPrice: 0,
    capabilities: {
      ...GLM_DEFAULT_CAPABILITIES,
    },
    openRouterOnly: false,
  },
  // GLM-4.6V (Multimodal vision model)
  glm46v: {
    name: 'glm46v',
    label: 'GLM-4.6V',
    fullName: 'glm-4.6v',
    shortName: 'glm-4.6v',
    openrouterFullName: 'z-ai/glm-4.6v',
    provider: ModelProvider.GLM,
    maxOutputTokens: 8192,
    contextWindow: 128000,
    inputPrice: 0.3,
    outputPrice: 0.9,
    capabilities: {
      ...GLM_DEFAULT_CAPABILITIES,
      supportsVision: true,
      supportsNativePdf: true,
    },
    openRouterOnly: false,
  },
  // GLM-4.5 (Hybrid reasoning MoE model, 355B/32B active)
  glm45: {
    name: 'glm45',
    label: 'GLM-4.5',
    fullName: 'glm-4.5',
    shortName: 'glm-4.5',
    openrouterFullName: 'z-ai/glm-4.5',
    provider: ModelProvider.GLM,
    maxOutputTokens: 98304,
    contextWindow: 131072,
    inputPrice: 0.6,
    outputPrice: 2.2,
    capabilities: {
      ...GLM_DEFAULT_CAPABILITIES,
      supportsReasoning: true,
      supportsReasoningEffort: false,
      reasoningEffort: ReasoningEffort.HIGH,
    },
    openRouterOnly: false,
  },
  // GLM-4.5V (Vision-language MoE model, 106B/12B active)
  glm45v: {
    name: 'glm45v',
    label: 'GLM-4.5V',
    fullName: 'glm-4.5v',
    shortName: 'glm-4.5v',
    openrouterFullName: 'z-ai/glm-4.5v',
    provider: ModelProvider.GLM,
    maxOutputTokens: 8192,
    contextWindow: 66000,
    inputPrice: 0.6,
    outputPrice: 1.8,
    capabilities: {
      ...GLM_DEFAULT_CAPABILITIES,
      supportsVision: true,
    },
    openRouterOnly: false,
  },
  // GLM-4.5 Air (Free lightweight agent model)
  glm45air: {
    name: 'glm45air',
    label: 'GLM-4.5 Air',
    fullName: 'glm-4.5-air',
    shortName: 'glm-4.5-air',
    openrouterFullName: 'z-ai/glm-4.5-air:free',
    provider: ModelProvider.GLM,
    maxOutputTokens: 96000,
    contextWindow: 131072,
    inputPrice: 0,
    outputPrice: 0,
    capabilities: {
      ...GLM_DEFAULT_CAPABILITIES,
    },
    openRouterOnly: false,
  },
  // GLM-4 32B (Superseded by GLM-4.7 and GLM-5)
  glm432b: {
    name: 'glm432b',
    label: 'GLM-4 32B',
    fullName: 'glm-4-32b',
    shortName: 'glm-4-32b',
    openrouterFullName: 'z-ai/glm-4-32b',
    provider: ModelProvider.GLM,
    maxOutputTokens: 8192,
    contextWindow: 128000,
    inputPrice: 0.1,
    outputPrice: 0.1,
    capabilities: {
      ...GLM_DEFAULT_CAPABILITIES,
      supportsVision: false,
    },
    openRouterOnly: false,
    deprecated: true,
  },
};
