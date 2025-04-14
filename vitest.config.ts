import tsconfigPaths from 'vite-tsconfig-paths';
import { defaultExclude, defineConfig, Plugin } from 'vitest/config';

const tsconfigPathsPlugin = tsconfigPaths() as Plugin;

export default defineConfig({
  plugins: [tsconfigPathsPlugin],
  test: {
    alias: {
      '@lib/core': new URL('./packages/libraries/core/src/index.ts', import.meta.url).pathname,
    },
    globals: true,
    exclude: [
      ...defaultExclude,
      'integration-tests',
      'packages/migrations/test',
      'docker/.hive-dev',
    ],
    setupFiles: ['./scripts/serializer.ts'],
  },
});
