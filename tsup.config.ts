import { defineConfig } from 'tsup';

const shared = {
  dts: true,
  splitting: false,
  sourcemap: true,
  treeshake: true,
  minify: false,
  target: 'node18',
  external: ['effect'],
} as const;

const root = {
  index: 'src/index.ts',
  'providers/index': 'src/providers/index.ts',
};

// `effect` 4 is ESM-only, so the schemas entry is too: it is built with the
// ESM entries alone (one build, so their declarations share one copy of the
// enums), and a CommonJS caller loads it through require(esm), unflagged from
// Node 20.19 and 22.12.
export default defineConfig([
  { ...shared, entry: { ...root, schemas: 'src/schemas.ts' }, format: ['esm'] },
  { ...shared, entry: root, format: ['cjs'] },
]);
