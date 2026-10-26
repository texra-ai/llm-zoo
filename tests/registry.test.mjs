import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';

import { Schema } from 'effect';

import * as rootEsm from '../dist/index.js';
import { ModelRegistrySchema, ModelSelectionSchema } from '../dist/schemas.js';

const require = createRequire(import.meta.url);
const rootCjs = require('../dist/index.cjs');

const { MODEL_CONFIGS, EFFORT_SCALE, parseModelRef, formatModelRef } = rootEsm;
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
});

test('a CommonJS caller requires the ESM-only schemas entry', () => {
  assert.equal(require('llm-zoo/schemas').ModelRegistrySchema, ModelRegistrySchema);
});

test('the registry satisfies its schema', () => {
  const data = JSON.parse(JSON.stringify(MODEL_CONFIGS));
  assert.deepEqual(Schema.decodeUnknownSync(ModelRegistrySchema)(data), data);
  const decodeSelection = Schema.decodeUnknownSync(ModelSelectionSchema);
  assert.throws(() => decodeSelection({ ref: 'nobody/gpt-6' }), 'a reference names a known provider');
  const [first] = Object.values(data);
  assert.throws(() => Schema.decodeUnknownSync(ModelRegistrySchema)({ 'nobody/gpt-6': first }), 'an unknown key is refused, not dropped');
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

test('model references parse and format symmetrically', () => {
  for (const text of [
    'anthropic/claude-opus-5',
    'anthropic/claude-opus-5@high',
    'anthropic/claude-opus-5@none',
    'openai/gpt-5.6-sol@xhigh+pro',
  ]) {
    assert.equal(formatModelRef(parseModelRef(text)), text);
  }
  assert.equal(parseModelRef('opus5T'), undefined, 'a 1.x key is not a reference');
  assert.equal(parseModelRef('anthropic/not-a-model'), undefined);
  assert.equal(parseModelRef('anthropic/claude-opus-5@turbo'), undefined);
  assert.equal(parseModelRef('claude-opus-5'), undefined);
});

test('tier prices are used only when a tier is asked for', () => {
  const model = MODEL_CONFIGS['openai/gpt-5.6-sol'];
  // 100K input: below the long-context threshold, so the flat rates apply.
  const tokens = { input: 100_000, output: 0 };
  assert.equal(rootEsm.cost(model, tokens), model.inputPrice / 10);
  assert.equal(rootEsm.cost(model, tokens, { tier: 'fast' }), model.tiers.fast.inputPrice / 10);
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

