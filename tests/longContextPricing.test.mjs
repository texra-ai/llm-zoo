import assert from 'node:assert/strict';
import test from 'node:test';

import { MODEL_CONFIGS, cost, requestRates } from '../dist/index.js';
import { ModelConfigSchema } from '../dist/schemas.js';

const models = Object.values(MODEL_CONFIGS);
// Every rate set that carries a long-context tier: a model's standard rates
// and each of its service tiers.
const rateSets = models
  .flatMap((m) => [
    { label: m.ref, model: m, prices: m },
    ...Object.entries(m.tiers ?? {}).map(([tier, prices]) => ({ label: `${m.ref} ${tier}`, model: m, prices })),
  ])
  .filter(({ prices }) => prices.longContextPricing);

test('every long-context tier is reachable, never cheaper than its flat rates, and valid', () => {
  assert.ok(rateSets.length > 0);
  assert.ok(rateSets.some(({ label }) => label.endsWith(' fast')), 'no service tier has a long-context tier');
  for (const { label, model, prices } of rateSets) {
    const tier = prices.longContextPricing;
    assert.ok(tier.aboveInputTokens < model.contextWindow, `${label}: threshold beyond the window`);
    assert.ok(tier.inputPrice >= prices.inputPrice, `${label}: tier input below flat`);
    assert.ok(tier.outputPrice >= prices.outputPrice, `${label}: tier output below flat`);
    assert.ok(tier.cacheDiscountFactor > 0 && tier.cacheDiscountFactor <= 1, label);
    const data = JSON.parse(JSON.stringify(model));
    assert.deepEqual(ModelConfigSchema.parse(data), data, label);
  }
});

test('requestRates switches only above the threshold', () => {
  assert.deepEqual(requestRates('openai/gpt-6.1-sol', 272_000), {
    inputPrice: 2,
    outputPrice: 10,
    cacheDiscountFactor: 0.05,
  });
  assert.deepEqual(requestRates('openai/gpt-6.1-sol', 272_001), {
    inputPrice: 4,
    outputPrice: 15,
    cacheDiscountFactor: 0.05,
  });
  // A model without a tier bills flat at any size.
  const sonnet = MODEL_CONFIGS['anthropic/claude-sonnet-5-5'];
  assert.equal(sonnet.longContextPricing, undefined);
  assert.equal(requestRates(sonnet, 900_000).inputPrice, sonnet.inputPrice);
});

test('a service tier uses its own rates and its own long-context tier', () => {
  const sol = MODEL_CONFIGS['openai/gpt-5.6-sol'];
  assert.ok(sol.tiers.fast.longContextPricing);
  assert.deepEqual(requestRates(sol, 272_000, { tier: 'fast' }), {
    inputPrice: 8,
    outputPrice: 40,
    cacheDiscountFactor: 0.1,
  });
  assert.deepEqual(requestRates(sol, 272_001, { tier: 'fast' }), {
    inputPrice: 16,
    outputPrice: 60,
    cacheDiscountFactor: 0.1,
  });
  // Without a tier, the standard long-context rates apply.
  assert.equal(requestRates(sol, 272_001).inputPrice, 8);
  assert.throws(() => requestRates('anthropic/claude-opus-5', 1, { tier: 'fast' }), /no fast tier/);
  assert.throws(() => requestRates('anthropic/not-a-model', 1), /Unknown model/);
});

test('cost bills the whole request at the tier, output included', () => {
  // 300K prompt, 100K of it cached, 10K output on GPT-6.1 Sol's tier:
  // 200K x $4 + 100K x $4 x 0.05 + 10K x $15, per 1M tokens.
  const expected = 0.8 + 0.02 + 0.15;
  const actual = cost('openai/gpt-6.1-sol', { input: 300_000, cached: 100_000, output: 10_000 });
  assert.ok(Math.abs(actual - expected) < 1e-12, `${actual} != ${expected}`);
});

test("cost at a service tier applies that tier's long-context rates", () => {
  // 300K prompt, 100K cached, 10K output on GPT-5.6 Sol fast above 272K:
  // 200K x $16 + 100K x $16 x 0.1 + 10K x $60, per 1M tokens.
  const expected = 3.2 + 0.16 + 0.6;
  const tokens = { input: 300_000, cached: 100_000, output: 10_000 };
  const actual = cost('openai/gpt-5.6-sol', tokens, { tier: 'fast' });
  assert.ok(Math.abs(actual - expected) < 1e-12, `${actual} != ${expected}`);
  // Below the threshold the fast tier's flat rates apply.
  assert.equal(cost('openai/gpt-5.6-sol', { input: 100_000, output: 0 }, { tier: 'fast' }), 0.8);
});
