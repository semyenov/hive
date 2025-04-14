import react from '@vitejs/plugin-react';
import type { UserConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const __dirname = new URL('.', import.meta.url).pathname;

export default {
  root: __dirname,
  plugins: [tsconfigPaths(), react()],
} satisfies UserConfig;
