# llm-zoo 🦁

LLM pricing and capabilities change weekly. Docs are scattered. There's no single source of truth.

**One package. 150+ models. Every fact sourced from the provider's own docs.**

```typescript
import { lookup, cost, cheapest } from 'llm-zoo';

// Know everything about any model
const claude = lookup('anthropic/claude-sonnet-5-5');
console.log(claude.contextWindow);      // 1000000
console.log(claude.inputPrice);         // 2
console.log(claude.reasoning?.efforts); // ['low', 'medium', 'high', 'xhigh', 'max']

// Calculate exact costs
const price = cost('openai/gpt-6.1-sol', { input: 50000, output: 10000 });  // 0.2

// Find the right model
const budget = cheapest({ supportsVision: true, supportsNativeCodeExecution: true });
```

**Zero dependencies. Full TypeScript. Tree-shakeable. Effect schemas included.**

## Install

```bash
npm install llm-zoo
```

---

## Model References

Every model is keyed by its **reference**, `provider/id`, where `id` is the exact
model ID the provider's API takes: `anthropic/claude-opus-5-5`, `openai/gpt-6.1-sol`,
`deepseek/deepseek-flash`. There is one entry per API model ID — a thinking level,
pro mode or fast tier is a choice you make when calling it, not a separate model.

A **selection** (a model plus how to run it) has a string form
`provider/id[@effort][+pro]`:

```typescript
import { parseModelRef, formatModelRef, LEGACY_KEYS } from 'llm-zoo';

parseModelRef('anthropic/claude-opus-5-5@high');
// → { ref: 'anthropic/claude-opus-5-5', effort: 'high' }
parseModelRef('openai/gpt-5.6-sol@xhigh+pro');
// → { ref: 'openai/gpt-5.6-sol', effort: 'xhigh', mode: 'pro' }
parseModelRef('deepseek/deepseek-flash@none');   // effort 'none' = thinking off
formatModelRef({ ref: 'openai/gpt-6.1-sol', effort: 'medium' });
// → 'openai/gpt-6.1-sol@medium'

// llm-zoo 1.x keys still parse, to the selection they meant
parseModelRef('sonnet55');     // → { ref: 'anthropic/claude-sonnet-5-5', effort: 'high' }
LEGACY_KEYS['deepseek41'];     // → { ref: 'deepseek/deepseek-flash', effort: 'none' }
```

`parseModelRef` returns `undefined` for an unknown model or effort name; whether
the model accepts that effort is left to you (check `reasoning`).

**Service tiers are a routing choice, not part of a selection.** A model's
`tiers.fast` holds its fast-tier prices; ask for them when you route that way:

```typescript
cost('openai/gpt-6.1-sol', { input: 50000, output: 10000 });                    // 0.2
cost('openai/gpt-6.1-sol', { input: 50000, output: 10000 }, { tier: 'fast' });  // 0.4
```

## Reasoning

How a model thinks is data on its entry, as the provider documents it. A model
without `reasoning` never thinks.

```typescript
lookup('deepseek/deepseek-flash')?.reasoning;
// → { efforts: ['low', 'high', 'max'], off: [], providerDefault: 'high' }
```

| Field | Meaning |
|-------|---------|
| `efforts` | Levels accepted while thinking, lowest first (a subset of `EFFORT_SCALE`). `[]` = thinks, but has no effort control. |
| `off` | Present when thinking can be turned off; lists the levels still accepted with thinking off (usually `[]`). Absent = always thinks. |
| `budget` | Thinking length is set with a token budget (e.g. `thinking_budget`) rather than levels. |
| `providerDefault` | The provider's documented level when a request names none (`'none'` = thinks only if asked). Omitted when undocumented. |

`modes: ['pro']` marks OpenAI models that accept `reasoning.mode: 'pro'`.

Choosing a default effort, or what to do when a model lacks the level you asked
for (snap up, snap down, refuse), is **your policy**, not this package's — the
data only says what each provider accepts.

---

## Model Rankings

Current models only (retired and deprecated models excluded).

### Cheapest ($/1M tokens)

| Model | Input | Output | Provider |
|-------|-------|--------|----------|
| `openai/gpt-6-luna` | $0.10 | $0.50 | OpenAI |
| `anthropic/claude-haiku-5-5` | $0.10 | $0.50 | Anthropic |
| `dashscope/qwen3.8-flash` | $0.15 | $0.47 | DashScope |
| `glm/glm-5.3-flash` | $0.15 | $0.50 | GLM |
| `deepseek/deepseek-flash` | $0.15 | $0.60 | DeepSeek |
| `minimax/MiniMax-M3` | $0.30 | $1.20 | MiniMax |
| `minimax/MiniMax-M2.7` | $0.30 | $1.20 | MiniMax |
| `google/gemini-3.5-flash-lite` | $0.30 | $2.50 | Google |
| `glm/glm-5.3-flashx` | $0.37 | $1.25 | GLM |
| `dashscope/qwen-plus` | $0.40 | $1.20 | DashScope |

Claude Haiku 5.5 bills prompts over 100K tokens at $0.50 / $2.50.

### Premium ($/1M tokens)

| Model | Input | Output | Reasoning | Provider |
|-------|-------|--------|-----------|----------|
| `anthropic/claude-fable-5-1` | $10 | $50 | ✓ | Anthropic |
| `anthropic/claude-mythos-5-1` | $10 | $50 | ✓ | Anthropic |
| `openai/gpt-6-astra` | $10 | $50 | ✓ | OpenAI |
| `openai/chat-latest` | $5 | $30 | | OpenAI |
| `anthropic/claude-opus-5-5` | $4 | $20 | ✓ | Anthropic |
| `moonshot/kimi-k3` | $3 | $15 | ✓ | Moonshot |
| `openai/gpt-5.6-terra` | $2 | $12 | ✓ | OpenAI |
| `google/gemini-3.1-pro-preview` | $2 | $12 | ✓ | Google |
| `google/gemini-4-argon` | $2 | $10 | ✓ | Google |
| `anthropic/claude-sonnet-5-5` | $2 | $10 | ✓ | Anthropic |
| `openai/gpt-6.1-sol` | $2 | $10 | ✓ | OpenAI |

OpenAI's fast tier doubles these (`openai/gpt-6-astra`: $20 / $100; `openai/gpt-6.1-sol`: $4 / $20).
Gemini 4 Argon's $2 / $10 is introductory through 2026-11-30; Google lists $4 / $20 from 2026-12-01.

### Largest Context

| Context (tokens) | Models |
|------------------|--------|
| 1,050,000 | `openai/gpt-6-astra`, `openai/gpt-6.1-sol`, `openai/gpt-6-luna`, `openai/gpt-5.6-terra` |
| 1,048,576 | `google/gemini-4-argon`, `google/gemini-3.8-flash`, `google/gemini-3.5-flash-lite`, `google/gemini-3.1-pro-preview`, `deepseek/deepseek-flash`, `deepseek/deepseek-v4-pro`, `moonshot/kimi-k3`, `minimax/MiniMax-M3`, `meta/muse-wonder-1.0`, `meta/muse-spark-1.3` |
| 1,000,000 | `anthropic/claude-fable-5-1`, `anthropic/claude-mythos-5-1`, `anthropic/claude-opus-5-5`, `anthropic/claude-sonnet-5-5`, `anthropic/claude-haiku-5-5`, `glm/glm-5.3`, `glm/glm-5.3-flash`, `glm/glm-5.3-flashx`, `dashscope/qwen3.8-max`, `dashscope/qwen3.8-flash`, `dashscope/qwen3.7-plus`, `dashscope/qwen-plus` |
| 500,000 | `xai/grok-4.7` |

### Capabilities

Of the 37 current models:

| Capability | Count | Examples |
|------------|-------|----------|
| Reasoning | 36 | `anthropic/claude-opus-5-5`, `openai/gpt-6.1-sol`, `deepseek/deepseek-flash`, `xai/grok-4.7` |
| Prompt caching | 36 | `anthropic/claude-opus-5-5`, `google/gemini-4-argon`, `deepseek/deepseek-flash`, `glm/glm-5.3` |
| Vision | 31 | `anthropic/claude-sonnet-5-5`, `openai/gpt-6.1-sol`, `google/gemini-3.1-pro-preview` |
| Effort levels | 23 | `anthropic/claude-sonnet-5-5`, `openai/gpt-6.1-sol`, `glm/glm-5.3`, `moonshot/kimi-k3` |
| Code execution | 14 | `anthropic/claude-sonnet-5-5`, `openai/gpt-6.1-sol`, `google/gemini-3.8-flash` |
| Thinking can be turned off | 12 | `anthropic/claude-haiku-5-5`, `openai/gpt-6-luna`, `deepseek/deepseek-flash`, `dashscope/qwen3.8-max`, `moonshot/kimi-k2.6` |
| Web search | 12 | `anthropic/claude-opus-5-5`, `openai/gpt-6.1-sol`, `meta/muse-wonder-1.0` |
| Fast tier + pro mode | 4 | `openai/gpt-6-astra`, `openai/gpt-6.1-sol`, `openai/gpt-6-luna`, `openai/gpt-5.6-terra` |

### Providers

| Provider | Models | Current | Highlights |
|----------|--------|---------|------------|
| **OpenAI** | 43 | 5 | GPT-6 Astra, GPT-6.1 Sol, GPT-6 Luna, GPT-5.6 Terra, Chat Latest; fast tier and pro mode; Codex subscription windows |
| **Anthropic** | 26 | 5 | Fable 5.1, Mythos 5.1, Opus 5.5, Sonnet 5.5, Haiku 5.5, 1M context, 97.5% cache savings on Fable/Mythos 5.1, PDF support |
| **GLM** | 16 | 5 | Zhipu GLM-5.3 / Flash / FlashX, native vision, 1M context |
| **Google** | 15 | 4 | Gemini 4 Argon, 3.8 Flash, 3.1 Pro, 1M context, audio input |
| **Moonshot** | 13 | 5 | Kimi K3 (1M context), K2.7 Code, K2.6, Kimi Code subscription |
| **xAI** | 12 | 2 | Grok 4.7 (500K context), Grok Build 0.1, effort levels, vision |
| **MiniMax** | 8 | 3 | M3 (1M context, thinking can be turned off, long-context tier above 512K), M2.7, M2.7 Highspeed |
| **DeepSeek** | 6 | 2 | V4.1 Flash (native vision, $0.15/1M), V4 Pro, three effort levels |
| **DashScope** | 6 | 4 | Qwen3.8 Max / Flash, Qwen3.7 Plus, 1M context, thinking budget |
| **Meta** | 4 | 2 | Muse Wonder 1.0 (preview), Muse Spark 1.3, 1M context, agentic + multimodal |
| **OpenRouter** | 2 | 0 | Llama 405B, QVQ-72B (retired) |
| **Copilot** | 1 | 0 | Deprecated GPT-4o config; 26 documented names and 7 exact model identifiers |

"Models" counts every entry, including retired ones kept so old configurations still resolve; "Current" excludes retired and deprecated models.

---

## API

### Lookup

```typescript
lookup('anthropic/claude-sonnet-5-5')  // → ModelConfig | undefined
resolve('claude-sonnet-5-5')           // → by API model ID
exists('openai/gpt-6.1-sol')           // → true
parseModelRef('sonnet55')              // → selection, from a ref string or 1.x key
```

### Filter

```typescript
from(ModelProvider.ANTHROPIC)          // → all Claude models
where((c, m) => c.supportsVision && m.reasoning !== undefined)  // capabilities + model
supporting('supportsNativeWebSearch')  // → models with a capability
withContext(500000)                    // → 500K+ context models
active()                               // → models that are not retired
```

### Cost

```typescript
cost('anthropic/claude-sonnet-5-5', { input: 10000, output: 5000 })
cost('anthropic/claude-sonnet-5-5', { input: 10000, output: 5000, cached: 8000 })  // with caching
cost('openai/gpt-6.1-sol', { input: 10000, output: 5000 }, { tier: 'fast' })       // fast tier
maxCost('openai/gpt-6.1-sol', 50000)                                                // worst case
compareCosts(['anthropic/claude-sonnet-5-5', 'openai/gpt-6.1-sol'], { input: 10000, output: 2000 })
requestRates('openai/gpt-6.1-sol', 300_000)                                         // rates for a 300K-token prompt
requestRates('openai/gpt-5.6-sol', 300_000, { tier: 'fast' })                       // same, at the fast tier
```

Some models bill a whole request at higher rates once its prompt is long
(OpenAI above 272K input tokens, xAI and Gemini Pro above 200K, Qwen3.7-Plus
above 256K). Those models carry `longContextPricing`, and `cost` and
`requestRates` apply it automatically. A service tier can have its own
long-context rates (`tiers.fast.longContextPricing`, e.g. GPT-5.6 Sol fast);
with `{ tier }`, the tier's rates and its long-context tier are used.

### Select

```typescript
cheapest({ supportsVision: true })
cheapest({ supportsNativePdf: true }, { minContext: 100000 })
smartpick(5)                    // priciest model under $5/1M tokens (input + output)
ranked('price')                 // cheapest first
ranked('context', 'desc')       // largest context first
```

### Insights

```typescript
const { totalModels, providers, pricing, context } = insights();
```

---

## Effect Schemas

Validate model configs at runtime (requires `effect@^4.0.0`):

```typescript
import { Result, Schema } from 'effect';
import { ModelConfigSchema, ModelSelectionSchema } from 'llm-zoo/schemas';

// Validate custom model config
const result = Schema.decodeUnknownResult(ModelConfigSchema)(myConfig);
if (Result.isFailure(result)) {
  console.error(result.failure.message);
}

// Validate a stored selection
const selection = Schema.decodeUnknownSync(ModelSelectionSchema)({ ref: 'openai/gpt-6.1-sol', effort: 'high' });
```

Since 4.0.0 these are Effect Schema values; 3.x shipped Zod schemas under the same names. Like `effect` 4, the `llm-zoo/schemas` entry is ESM-only: a CommonJS caller needs Node 20.19+ or 22.12+ (`require` of ESM), and a CommonJS TypeScript project needs TypeScript 5.8+ with `module: nodenext`. The root and `llm-zoo/providers` entries still ship CommonJS.

Available schemas:
- `ModelConfigSchema` — Full model configuration
- `ModelRegistrySchema` — The whole registry, keyed by reference
- `ModelCapabilitiesSchema` — Capability flags
- `ReasoningSpecSchema` — A model's `reasoning` spec
- `LongContextPricingSchema` — A long-context pricing tier
- `ModelRefSchema` — A `provider/id` reference
- `ModelSelectionSchema` — A reference plus effort / thinking / mode
- `ModelProviderSchema` — Provider enum
- `ReasoningEffortSchema` — Reasoning levels

---

## Data Structure

```typescript
type ModelRef = `${ModelProvider}/${string}`;   // 'anthropic/claude-sonnet-5-5'

interface ModelConfig {
  ref: ModelRef;             // registry key
  id: string;                // 'claude-sonnet-5-5', the API model ID
  shortName: string;         // unpinned ID (no date suffix)
  label: string;             // 'Sonnet 5.5'
  provider: ModelProvider;
  inputPrice: number;        // $/1M tokens
  outputPrice: number;
  contextWindow: number;
  maxOutputTokens: number;
  capabilities: ModelCapabilities;
  reasoning?: ReasoningSpec;          // absent = never thinks
  modes?: readonly 'pro'[];           // OpenAI reasoning.mode
  tiers?: { fast?: { inputPrice: number; outputPrice: number; longContextPricing?: LongContextPricing } };
  longContextPricing?: LongContextPricing;  // rates for a whole request above a prompt size
  source?: { url: string; verified: string };  // official page + date read
  legacyKeys?: Record<string, { effort?: ReasoningEffort; thinking?: boolean; mode?: 'pro' }>;
  openRouterOnly: boolean;
  openrouterFullName?: string;
  codexSubscription?: { contextWindow: number };  // served by the ChatGPT Codex backend, with its input window
  deprecated?: boolean;
  retired?: boolean;         // no longer served
  // ... and more (vscodeLMFullName, copilotFullName, baseUrl, ...)
}

interface LongContextPricing {
  aboveInputTokens: number;  // applies when the prompt (cached included) is above this
  inputPrice: number;
  outputPrice: number;
  cacheDiscountFactor: number;
}

interface ReasoningSpec {
  efforts: readonly ReasoningEffort[];   // accepted while thinking
  off?: readonly ReasoningEffort[];      // present = thinking can be turned off
  budget?: boolean;                      // token-budget thinking
  providerDefault?: ReasoningEffort;     // documented default
}

interface ModelSelection {
  ref: ModelRef;
  effort?: ReasoningEffort;  // 'none' = thinking off
  thinking?: boolean;
  mode?: 'pro';
}

interface ModelCapabilities {
  supportsFunctionCalling: boolean;
  supportsVision: boolean;
  supportsNativeCodeExecution: boolean;
  supportsNativeWebSearch: boolean;
  supportsPromptCaching: boolean;
  supportsAutoPromptCaching: boolean;
  cacheDiscountFactor: number;   // 0.1 = 90% savings
  supportsInterleavedThinking: boolean;
  supportsNativePdf: boolean;
  supportsNativeAudio: boolean;
  // ... and more
}
```

---

## Use Cases

### LLM Router

```typescript
import { where, cost } from 'llm-zoo';

function route(needs: { vision?: boolean; budget: number; tokens: number }) {
  return where((c, m) => !m.retired && (!needs.vision || c.supportsVision))
    .filter(m => cost(m, { input: needs.tokens, output: 4000 }) <= needs.budget)
    .sort((a, b) => a.inputPrice - b.inputPrice)[0];
}
```

### Edge Function (Supabase/Vercel)

```typescript
import { lookup, parseModelRef, cost } from 'llm-zoo';

export async function validateRequest(model: string, tokens: number, tier: string) {
  const selection = parseModelRef(model);          // e.g. 'openai/gpt-6.1-sol@high'
  if (!selection) return { error: 'Unknown model' };

  const config = lookup(selection.ref)!;
  if (config.retired) return { error: 'Model retired' };
  if (tier === 'free' && config.inputPrice > 1) {
    return { error: 'Upgrade for premium models' };
  }

  return {
    allowed: true,
    estimatedCost: cost(config, { input: tokens, output: 4000 })
  };
}
```

### Cost Dashboard

```typescript
import { cost, MODEL_CONFIGS } from 'llm-zoo';

const report = Object.entries(usage).map(([ref, tokens]) => ({
  model: ref,
  spent: cost(ref, tokens),
  provider: MODEL_CONFIGS[ref]?.provider,
}));
```

---

## Direct Access

```typescript
import { MODEL_CONFIGS, MODELS, ANTHROPIC_MODELS } from 'llm-zoo';

MODEL_CONFIGS['anthropic/claude-sonnet-5-5'].inputPrice;
MODELS.forEach(ref => console.log(ref));   // every 'provider/id'
ANTHROPIC_MODELS.map(m => m.id);           // provider lists are arrays of entries
```

---

## Upgrading from 2.x

- **`codexSubscription` is an object.** It was `true` when the ChatGPT Codex
  backend served a model; it is now `{ contextWindow }`, the input window that
  backend grants (smaller than the API's `contextWindow`). Test
  `m.codexSubscription !== undefined` and read
  `m.codexSubscription.contextWindow`.

## Upgrading from 1.x

- **Keys → references.** Registry keys are now `provider/id`. Convert stored 1.x
  keys with `parseModelRef(key)` or `LEGACY_KEYS[key]`, which give the selection
  the key meant (e.g. `opus5T` → `{ ref: 'anthropic/claude-opus-5', effort: 'high' }`).
- **`fullName` → `id`.** `name` is removed; `ref` is added.
- **Reasoning capability fields → `reasoning`.** `supportsReasoning`,
  `supportsReasoningEffort`, `reasoningEffort`, `maxReasoningEffort` and
  `supportedReasoningEfforts` are replaced by the `reasoning` spec; test
  `m.reasoning !== undefined` instead of `supportsReasoning`.
- **Variant entries → data on one entry.** Separate thinking, `serviceTier`
  (fast) and `reasoningMode` (pro) entries for the same API model ID are now
  one entry with `reasoning.off`, `tiers` and `modes`.
- **`where` predicates get the model as a second argument:**
  `where((capabilities, model) => ...)`.
- Provider exports (`ANTHROPIC_MODELS`, ...) are arrays of entries rather than
  key-indexed records.

---

## Open Source by texra-ai

This package is part of a growing collection of open-source projects by [texra-ai](https://github.com/texra-ai):

| Project | Description | Links |
|---------|-------------|-------|
| **llm-zoo** | 150+ LLM models — pricing, capabilities, and context windows in one package | [GitHub](https://github.com/texra-ai/llm-zoo) · [npm](https://www.npmjs.com/package/llm-zoo) |
| **mcp-server-mathematica** | MCP server that executes Mathematica code via `wolframscript` and verifies mathematical derivations | [GitHub](https://github.com/texra-ai/mcp-server-mathematica) |

---

## Contributing

Found incorrect pricing? Missing capability? New model released? **PRs welcome!**

Model data lives in `src/providers/`, one entry per API model ID. Take every
value from the provider's official docs and record the page in `source`.

## License

MIT
