import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';

import * as rootEsm from '../dist/index.js';
import { ModelRegistrySchema, ModelSelectionSchema } from '../dist/schemas.js';

const require = createRequire(import.meta.url);
const rootCjs = require('../dist/index.cjs');

const { MODEL_CONFIGS, LEGACY_KEYS, EFFORT_SCALE, parseModelRef, formatModelRef } = rootEsm;
const models = Object.values(MODEL_CONFIGS);
const rank = (effort) => EFFORT_SCALE.indexOf(effort);

test('every model is keyed by provider/id', () => {
  for (const [ref, model] of Object.entries(MODEL_CONFIGS)) {
    assert.equal(ref, `${model.provider}/${model.id}`);
    assert.equal(model.ref, ref);
  }
});

test('ESM and CJS builds expose the same registry', () => {
  assert.deepEqual(Object.keys(rootCjs.MODEL_CONFIGS), Object.keys(MODEL_CONFIGS));
  assert.deepEqual(rootCjs.LEGACY_KEYS, LEGACY_KEYS);
});

test('the registry satisfies its Zod schema', () => {
  const data = JSON.parse(JSON.stringify(MODEL_CONFIGS));
  assert.deepEqual(ModelRegistrySchema.parse(data), data);
});

test('effort lists are on the shared scale, in order, without none', () => {
  for (const { ref, reasoning } of models) {
    if (!reasoning) continue;
    for (const [field, list] of [['efforts', reasoning.efforts], ['off', reasoning.off ?? []]]) {
      assert.ok(!list.includes('none'), `${ref} ${field} lists none`);
      assert.ok(list.every((effort) => rank(effort) > 0), `${ref} ${field} has an unknown level`);
      assert.deepEqual([...list].sort((a, b) => rank(a) - rank(b)), [...list], `${ref} ${field} out of order`);
      assert.equal(new Set(list).size, list.length, `${ref} ${field} repeats a level`);
    }
    if (reasoning.providerDefault === 'none') {
      assert.ok(reasoning.off, `${ref} defaults to no thinking but cannot turn thinking off`);
    } else if (reasoning.providerDefault !== undefined) {
      assert.ok(reasoning.efforts.includes(reasoning.providerDefault), `${ref} default not in efforts`);
    }
  }
});

test('models that are still served name the page their facts come from', () => {
  for (const { ref, retired, source } of models) {
    if (retired) continue;
    assert.ok(source, `${ref} has no source`);
    assert.match(source.url, /^https:\/\//, `${ref} source url`);
    assert.match(source.verified, /^\d{4}-\d{2}-\d{2}$/, `${ref} source date`);
  }
});

test('no provider file has an unresolved effort list', () => {
  const dir = new URL('../src/providers/', import.meta.url);
  for (const file of readdirSync(dir)) {
    const text = readFileSync(new URL(file, dir), 'utf8');
    assert.ok(!/TODO verify \*\//.test(text), `${file} still has a TODO verify marker`);
  }
});

test('each legacy key selects something its model accepts', () => {
  for (const [key, selection] of Object.entries(LEGACY_KEYS)) {
    ModelSelectionSchema.parse(selection);
    const { reasoning, modes = [], ref } = MODEL_CONFIGS[selection.ref];
    const { effort, thinking, mode } = selection;
    if (mode) assert.ok(modes.includes(mode), `${key}: ${ref} has no ${mode} mode`);
    if (effort === undefined) continue;
    assert.ok(reasoning, `${key}: ${ref} never reasons but the key sets an effort`);
    if (effort === 'none') {
      assert.ok(reasoning.off, `${key}: ${ref} cannot turn thinking off`);
    } else if (thinking === false) {
      assert.ok(reasoning.off?.includes(effort), `${key}: ${ref} rejects ${effort} with thinking off`);
    } else {
      assert.ok(reasoning.efforts.includes(effort), `${key}: ${ref} rejects ${effort}`);
    }
  }
});

test('model references parse and format symmetrically', () => {
  for (const text of [
    'anthropic/claude-opus-5',
    'anthropic/claude-opus-5@high',
    'anthropic/claude-opus-5@none',
    'openai/gpt-5.6-sol@xhigh+pro',
  ]) {
    assert.equal(formatModelRef(parseModelRef(text)), text);
  }
  assert.deepEqual(parseModelRef('opus5T'), { ref: 'anthropic/claude-opus-5', effort: 'high' });
  assert.equal(parseModelRef('anthropic/not-a-model'), undefined);
  assert.equal(parseModelRef('anthropic/claude-opus-5@turbo'), undefined);
  assert.equal(parseModelRef('claude-opus-5'), undefined);
});

test('tier prices are used only when a tier is asked for', () => {
  const model = MODEL_CONFIGS['openai/gpt-5.6-sol'];
  const tokens = { input: 1_000_000, output: 0 };
  assert.equal(rootEsm.cost(model, tokens), model.inputPrice);
  assert.equal(rootEsm.cost(model, tokens, { tier: 'fast' }), model.tiers.fast.inputPrice);
});

test('lookups ignore Object.prototype keys', () => {
  for (const key of ['toString', 'constructor', '__proto__', 'hasOwnProperty']) {
    assert.equal(parseModelRef(key), undefined, key);
    assert.equal(rootEsm.lookup(key), undefined, key);
    assert.equal(rootEsm.exists(key), false, key);
  }
});

test('pricing a tier the model does not offer is an error, not a silent standard price', () => {
  assert.throws(() => rootEsm.cost('anthropic/claude-opus-5', { input: 1, output: 1 }, { tier: 'fast' }), /no fast tier/);
});

test('1.x thinking keys of budget-thinking models still ask for thinking', () => {
  for (const key of ['sonnet45T', 'haiku45T', 'sonnet4T']) {
    assert.equal(LEGACY_KEYS[key].thinking, true, key);
  }
  assert.equal(LEGACY_KEYS.sonnet45.effort, 'none');
});

test('a merged entry keeps the routing names of its plain (non-thinking) variant', () => {
  const sonnet45 = MODEL_CONFIGS['anthropic/claude-sonnet-4-5'];
  assert.equal(sonnet45.openrouterFullName, 'anthropic/claude-sonnet-4.5');
  assert.equal(sonnet45.vscodeLMFullName, 'claude-sonnet-4.5');
  assert.equal(sonnet45.capabilities.supportsAssistantPrefill, true);
});
