import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const __dirname = new URL('.', import.meta.url).pathname;

export default defineConfig({
  root: __dirname,
  plugins: [tsconfigPaths(), react()],
});
