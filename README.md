# llm-zoo 🦁

LLM pricing and capabilities change weekly. Docs are scattered. There's no single source of truth.

**One package. 100+ models. Always current.**

```typescript
import { lookup, cost, cheapest } from 'llm-zoo';

// Know everything about any model
const claude = lookup('sonnet46');
console.log(claude.contextWindow);  // 1000000
console.log(claude.inputPrice);     // 3

// Calculate exact costs
const price = cost('gpt4o', { input: 50000, output: 10000 });

// Find the right model
const budget = cheapest({ supportsVision: true, supportsReasoning: true });
```

**Zero dependencies. Full TypeScript. Tree-shakeable. Zod schemas included.**

## Install

```bash
npm install llm-zoo
```

---

## Model Rankings

### Cheapest ($/1M tokens)

| Model | Input | Output | Provider |
|-------|-------|--------|----------|
| `qwenturbo` | $0.05 | $0.50 | DashScope |
| `deepseek` | $0.14 | $0.28 | DeepSeek |
| `gemini31f-` | $0.25 | $1.50 | Google |
| `gemini3f` | $0.30 | $2.50 | Google |
| `gpt41-` | $0.40 | $1.60 | OpenAI |
| `qwenplus` | $0.40 | $1.20 | DashScope |
| `kimi25` | $0.60 | $3.00 | Moonshot |
| `haiku45` | $1.00 | $5.00 | Anthropic |
| `grok43` | $1.25 | $2.50 | xAI |
| `gpt52` | $1.75 | $14.00 | OpenAI |

### Premium ($/1M tokens)

| Model | Input | Output | Reasoning | Provider |
|-------|-------|--------|-----------|----------|
| `gpt55pro` | $30 | $180 | ✓ | OpenAI |
| `fable5` | $10 | $50 | ✓ | Anthropic |
| `gpt56` | $5 | $30 | ✓ | OpenAI |
| `opus48T` | $5 | $25 | ✓ | Anthropic |
| `opus48` | $5 | $25 | - | Anthropic |
| `sonnet46T` | $3 | $15 | ✓ | Anthropic |
| `gpt56-` | $2.50 | $15 | ✓ | OpenAI |
| `gpt41` | $2 | $8 | - | OpenAI |
| `gpt52` | $1.75 | $14 | ✓ | OpenAI |

### Largest Context

| Model | Context | Provider |
|-------|---------|----------|
| `gpt56` | 1M | OpenAI |
| `gpt56-` | 1M | OpenAI |
| `gpt56--` | 1M | OpenAI |
| `gemini31p` | 1M | Google |
| `gemini31f-` | 1M | Google |
| `gemini3f` | 1M | Google |
| `opus48` | 1M | Anthropic |
| `sonnet46` | 1M | Anthropic |
| `qwenplus` | 1M | DashScope |
| `gpt41` | 1M | OpenAI |
| `grok43` | 1M | xAI |
| `gpt52` | 400K | OpenAI |
| `kimi25` | 262K | Moonshot |

### Capabilities

| Capability | Count | Examples |
|------------|-------|----------|
| Vision | 45+ | `sonnet46`, `gpt41`, `gemini31p` |
| Reasoning | 30+ | `opus48T`, `gpt56`, `deepseekT`, `grok43` |
| Code Execution | 20+ | `sonnet46`, `gpt41`, `gemini3f` |
| Web Search | 15+ | `opus48`, `gpt41`, `gpt56-` |
| Prompt Caching | 25+ | All Claude, Gemini, DeepSeek |

### Providers

| Provider | Models | Highlights |
|----------|--------|------------|
| **Anthropic** | 32 | Fable 5, Mythos 5, Sonnet 5, 1M context, 90% cache savings, PDF support |
| **OpenAI** | 38 | GPT-5.x reasoning, deep research |
| **GLM** | 12 | Zhipu GLM-5.x, up to 1M context |
| **DeepSeek** | 11 | Budget reasoning ($0.14/1M) |
| **Moonshot** | 13 | Kimi K2.7 Code, K2.6 thinking mode |
| **Google** | 9 | 1M context, audio input |
| **MiniMax** | 6 | M-series reasoning, 1M context |
| **xAI** | 7 | Grok 4.5, Grok 4.3 with 1M context, configurable reasoning |
| **Meta** | 1 | Muse Spark 1.1, 1M context, agentic + multimodal |
| **DashScope** | 3 | Qwen with 1M context |
| **OpenRouter** | 2 | Llama 405B, QVQ-72B |
| **Copilot** | 1 | Deprecated GPT-4o config; 26 documented names and 7 exact model identifiers |

---

## API

### Lookup

```typescript
lookup('sonnet46')              // → ModelConfig | undefined
resolve('claude-sonnet-4-6')    // → by full API name
exists('gpt4o')                 // → true
```

### Filter

```typescript
from(ModelProvider.ANTHROPIC)   // → all Claude models
where(c => c.supportsVision)    // → by capability predicate
supporting('supportsReasoning') // → models with reasoning
withContext(500000)             // → 500K+ context models
```

### Cost

```typescript
cost('sonnet46', { input: 10000, output: 5000 })
cost('sonnet46', { input: 10000, output: 5000, cached: 8000 })  // with caching
maxCost('gpt4o', 50000)                                         // worst case
compareCosts(['sonnet46', 'gpt4o'], { input: 10000, output: 2000 })
```

### Select

```typescript
cheapest({ supportsVision: true })
cheapest({ supportsReasoning: true }, { minContext: 100000 })
smartpick(5)                    // best model under $5/1M tokens
ranked('price')                 // cheapest first
ranked('context', 'desc')       // largest context first
```

### Insights

```typescript
const { totalModels, providers, pricing, context } = insights();
```

---

## Zod Schemas (v4)

Validate model configs at runtime (requires `zod@^4.0.0`):

```typescript
import { ModelConfigSchema } from 'llm-zoo/schemas';

// Validate custom model config
const result = ModelConfigSchema.safeParse(myConfig);
if (!result.success) {
  console.error(result.error);
}

// Validate API responses
const validatedModel = ModelConfigSchema.parse(apiResponse);
```

Available schemas:
- `ModelConfigSchema` — Full model configuration
- `ModelCapabilitiesSchema` — Capability flags
- `ModelProviderSchema` — Provider enum
- `ReasoningEffortSchema` — Reasoning levels

---

## Data Structure

```typescript
interface ModelConfig {
  name: string;              // 'sonnet46'
  fullName: string;          // 'claude-sonnet-4-6'
  provider: ModelProvider;
  inputPrice: number;        // $/1M tokens
  outputPrice: number;
  contextWindow: number;
  maxOutputTokens: number;
  capabilities: ModelCapabilities;
  openRouterOnly: boolean;
  openrouterFullName?: string;
}

interface ModelCapabilities {
  supportsFunctionCalling: boolean;
  supportsVision: boolean;
  supportsReasoning: boolean;
  supportsNativeCodeExecution: boolean;
  supportsNativeWebSearch: boolean;
  supportsPromptCaching: boolean;
  cacheDiscountFactor: number;   // 0.1 = 90% savings
  // ... and more
}
```

---

## Use Cases

### LLM Router

```typescript
import { where, cost } from 'llm-zoo';

function route(needs: { vision?: boolean; budget: number; tokens: number }) {
  return where(c => !needs.vision || c.supportsVision)
    .filter(m => cost(m, { input: needs.tokens, output: 4000 }) <= needs.budget)
    .sort((a, b) => a.inputPrice - b.inputPrice)[0];
}
```

### Edge Function (Supabase/Vercel)

```typescript
import { lookup, exists, cost } from 'llm-zoo';

export async function validateRequest(model: string, tokens: number, tier: string) {
  if (!exists(model)) return { error: 'Unknown model' };

  const config = lookup(model)!;
  if (tier === 'free' && config.inputPrice > 1) {
    return { error: 'Upgrade for premium models' };
  }

  return {
    allowed: true,
    estimatedCost: cost(model, { input: tokens, output: 4000 })
  };
}
```

### Cost Dashboard

```typescript
import { cost, MODEL_CONFIGS } from 'llm-zoo';

const report = Object.entries(usage).map(([model, tokens]) => ({
  model,
  spent: cost(model, tokens),
  provider: MODEL_CONFIGS[model]?.provider,
}));
```

---

## Direct Access

```typescript
import { MODEL_CONFIGS, MODELS, ANTHROPIC_MODELS } from 'llm-zoo';

MODEL_CONFIGS['sonnet46'].inputPrice;
MODELS.forEach(name => console.log(name));
Object.keys(ANTHROPIC_MODELS);
```

---

## Open Source by texra-ai

This package is part of a growing collection of open-source projects by [texra-ai](https://github.com/texra-ai):

| Project | Description | Links |
|---------|-------------|-------|
| **llm-zoo** | 80+ LLM models — pricing, capabilities, and context windows in one package | [GitHub](https://github.com/texra-ai/llm-zoo) · [npm](https://www.npmjs.com/package/llm-zoo) |
| **mcp-server-mathematica** | MCP server that executes Mathematica code via `wolframscript` and verifies mathematical derivations | [GitHub](https://github.com/texra-ai/mcp-server-mathematica) |

---

## Contributing

Found incorrect pricing? Missing capability? New model released? **PRs welcome!**

Model data lives in `src/providers/`. Just update the relevant file and submit a PR.

## License

MIT
