import assert from 'node:assert/strict';
import test from 'node:test';

import { MODEL_CONFIGS, cost, requestRates } from '../dist/index.js';
import { ModelConfigSchema } from '../dist/schemas.js';

const tiered = Object.values(MODEL_CONFIGS).filter((m) => m.longContextPricing);

test('every long-context tier is reachable, never cheaper than the flat rates, and valid', () => {
  assert.ok(tiered.length > 0);
  for (const m of tiered) {
    const tier = m.longContextPricing;
    assert.ok(tier.aboveInputTokens < m.contextWindow, `${m.name}: threshold beyond the window`);
    assert.ok(tier.inputPrice >= m.inputPrice, `${m.name}: tier input below flat`);
    assert.ok(tier.outputPrice >= m.outputPrice, `${m.name}: tier output below flat`);
    assert.ok(tier.cacheDiscountFactor > 0 && tier.cacheDiscountFactor <= 1, m.name);
    assert.equal(ModelConfigSchema.safeParse(m).success, true, m.name);
  }
});

test('requestRates switches only above the threshold', () => {
  assert.deepEqual(requestRates('gpt61-', 272_000), {
    inputPrice: 2,
    outputPrice: 10,
    cacheDiscountFactor: 0.05,
  });
  assert.deepEqual(requestRates('gpt61-', 272_001), {
    inputPrice: 4,
    outputPrice: 15,
    cacheDiscountFactor: 0.05,
  });
  // A model without a tier bills flat at any size.
  assert.equal(requestRates('sonnet55', 900_000).inputPrice, MODEL_CONFIGS.sonnet55.inputPrice);
});

test('cost bills the whole request at the tier, output included', () => {
  // 300K prompt, 100K of it cached, 10K output on GPT-6.1 Sol's tier:
  // 200K x $4 + 100K x $4 x 0.05 + 10K x $15, per 1M tokens.
  const expected = 0.8 + 0.02 + 0.15;
  const actual = cost('gpt61-', { input: 300_000, cached: 100_000, output: 10_000 });
  assert.ok(Math.abs(actual - expected) < 1e-12, `${actual} != ${expected}`);
});
