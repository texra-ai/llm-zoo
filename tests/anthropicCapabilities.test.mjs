import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';

import * as rootEsm from '../dist/index.js';
import * as providersEsm from '../dist/providers/index.js';
import { ModelCapabilitiesSchema as ModelCapabilitiesSchemaEsm } from '../dist/schemas.js';

const require = createRequire(import.meta.url);
const rootCjs = require('../dist/index.cjs');
const providersCjs = require('../dist/providers/index.cjs');
const { ModelCapabilitiesSchema: ModelCapabilitiesSchemaCjs } = require('../dist/schemas.cjs');

const { ReasoningEffort } = rootEsm;
const fullEffortVocabulary = [
  ReasoningEffort.LOW,
  ReasoningEffort.MEDIUM,
  ReasoningEffort.HIGH,
  ReasoningEffort.XHIGH,
  ReasoningEffort.MAX,
];
const effortVocabularyWithoutXhigh = [
  ReasoningEffort.LOW,
  ReasoningEffort.MEDIUM,
  ReasoningEffort.HIGH,
  ReasoningEffort.MAX,
];
const opus45EffortVocabulary = [ReasoningEffort.LOW, ReasoningEffort.MEDIUM, ReasoningEffort.HIGH];
// Opus 5 rejects disabled thinking at xhigh/max even though its adaptive entry accepts both.
const opus5NonThinkingEffortVocabulary = [
  ReasoningEffort.LOW,
  ReasoningEffort.MEDIUM,
  ReasoningEffort.HIGH,
];

// Anthropic effort controls the whole response and does not require thinking.
// Adaptive thinking is a separate model behavior and is true only for its thinking entries.
const anthropicCapabilityMatrix = [
  ['opus46T', 'claude-opus-4-6', true, true, effortVocabularyWithoutXhigh, ReasoningEffort.MAX],
  ['opus46', 'claude-opus-4-6', false, true, effortVocabularyWithoutXhigh, ReasoningEffort.MAX],
  ['opus47T', 'claude-opus-4-7', true, true, fullEffortVocabulary, ReasoningEffort.MAX],
  ['opus47', 'claude-opus-4-7', false, true, fullEffortVocabulary, ReasoningEffort.MAX],
  ['opus48T', 'claude-opus-4-8', true, true, fullEffortVocabulary, ReasoningEffort.MAX],
  ['opus48', 'claude-opus-4-8', false, true, fullEffortVocabulary, ReasoningEffort.MAX],
  ['opus5T', 'claude-opus-5', true, true, fullEffortVocabulary, ReasoningEffort.MAX],
  ['opus5', 'claude-opus-5', false, true, opus5NonThinkingEffortVocabulary, undefined],
  ['sonnet46T', 'claude-sonnet-4-6', true, true, effortVocabularyWithoutXhigh, ReasoningEffort.MAX],
  ['sonnet46', 'claude-sonnet-4-6', false, true, effortVocabularyWithoutXhigh, ReasoningEffort.MAX],
  ['sonnet5T', 'claude-sonnet-5', true, true, fullEffortVocabulary, ReasoningEffort.MAX],
  ['sonnet5', 'claude-sonnet-5', false, true, fullEffortVocabulary, ReasoningEffort.MAX],
  ['fable51', 'claude-fable-5-1', true, true, fullEffortVocabulary, ReasoningEffort.MAX],
  ['mythos51', 'claude-mythos-5-1', true, true, fullEffortVocabulary, ReasoningEffort.MAX],
  ['fable5', 'claude-fable-5', true, true, fullEffortVocabulary, ReasoningEffort.MAX],
  ['mythos5', 'claude-mythos-5', true, true, fullEffortVocabulary, ReasoningEffort.MAX],
  ['opus45T', 'claude-opus-4-5', false, true, opus45EffortVocabulary, undefined],
  ['opus45', 'claude-opus-4-5', false, true, opus45EffortVocabulary, undefined],
  ['opus41T', 'claude-opus-4-1-20250805', false, false, undefined, undefined],
];

const registries = [
  ['root ESM', rootEsm.ANTHROPIC_MODELS],
  ['root CJS', rootCjs.ANTHROPIC_MODELS],
  ['providers ESM', providersEsm.ANTHROPIC_MODELS],
  ['providers CJS', providersCjs.ANTHROPIC_MODELS],
];

test('Anthropic exports distinguish adaptive thinking from effort support', () => {
  for (const [exportName, models] of registries) {
    for (const [key, fullName, adaptive, supportsEffort, acceptedEfforts, explicitMaximum] of
      anthropicCapabilityMatrix) {
      const model = models[key];
      assert.ok(model, `${exportName}: missing Anthropic model ${key}`);
      assert.equal(model.fullName, fullName, `${exportName}: ${key} fullName`);
      assert.equal(
        model.capabilities.supportsAdaptiveThinking,
        adaptive,
        `${exportName}: ${key} supportsAdaptiveThinking`,
      );
      assert.equal(
        model.capabilities.supportsReasoningEffort,
        supportsEffort,
        `${exportName}: ${key} supportsReasoningEffort`,
      );
      assert.equal(
        model.capabilities.reasoningEffort,
        supportsEffort ? ReasoningEffort.HIGH : ReasoningEffort.NONE,
        `${exportName}: ${key} reasoningEffort`,
      );
      assert.deepEqual(
        model.capabilities.supportedReasoningEfforts,
        acceptedEfforts,
        `${exportName}: ${key} supportedReasoningEfforts`,
      );
      assert.equal(
        model.capabilities.maxReasoningEffort,
        explicitMaximum,
        `${exportName}: ${key} maxReasoningEffort`,
      );
      assert.equal(
        model.capabilities.maxReasoningEffort ?? model.capabilities.reasoningEffort,
        explicitMaximum ?? (supportsEffort ? ReasoningEffort.HIGH : ReasoningEffort.NONE),
        `${exportName}: ${key} effective maximum`,
      );
    }
  }
});

test('only the documented Anthropic entries advertise adaptive thinking', () => {
  const adaptiveKeys = Object.entries(rootEsm.ANTHROPIC_MODELS)
    .filter(([, model]) => model.capabilities.supportsAdaptiveThinking)
    .map(([key]) => key);
  assert.deepEqual(adaptiveKeys, [
    'fable51',
    'mythos51',
    'fable5',
    'mythos5',
    'opus5T',
    'opus48T',
    'opus47T',
    'opus46T',
    'sonnet5T',
    'sonnet46T',
  ]);
});

test('Anthropic capability data round-trips through both Zod exports', () => {
  for (const [key] of anthropicCapabilityMatrix) {
    const capabilities = JSON.parse(JSON.stringify(rootEsm.ANTHROPIC_MODELS[key].capabilities));
    assert.deepEqual(ModelCapabilitiesSchemaEsm.parse(capabilities), capabilities, `${key} ESM schema`);
    assert.deepEqual(ModelCapabilitiesSchemaCjs.parse(capabilities), capabilities, `${key} CJS schema`);
  }
});

test('legacy capability payloads default adaptive thinking to false', () => {
  const capabilities = JSON.parse(JSON.stringify(rootEsm.ANTHROPIC_MODELS.opus46T.capabilities));
  delete capabilities.supportsAdaptiveThinking;

  assert.equal(ModelCapabilitiesSchemaEsm.parse(capabilities).supportsAdaptiveThinking, false);
  assert.equal(ModelCapabilitiesSchemaCjs.parse(capabilities).supportsAdaptiveThinking, false);
});
