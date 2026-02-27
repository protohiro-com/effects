import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      '@protoeffects/core': fileURLToPath(new URL('./packages/core/src/index.ts', import.meta.url)),
      '@protoeffects/react': fileURLToPath(new URL('./packages/react/src/index.ts', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['packages/**/*.test.ts', 'packages/**/*.test.tsx'],
  },
});
