import { defineConfig } from 'tsup';

const shared = {
  dts: true,
  splitting: false,
  sourcemap: true,
  treeshake: true,
  minify: false,
  target: 'node18',
} as const;

export default defineConfig([
  {
    ...shared,
    entry: {
      index: 'src/index.ts',
      'providers/index': 'src/providers/index.ts',
    },
    format: ['esm', 'cjs'],
  },
  // `effect` 4 is ESM-only, so the schemas entry is too. A CommonJS caller
  // loads it through require(esm), unflagged from Node 20.19 and 22.12.
  {
    ...shared,
    entry: { schemas: 'src/schemas.ts' },
    external: ['effect'],
    format: ['esm'],
  },
]);
