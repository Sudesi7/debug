import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,        // <-- this makes `test`, `describe`, `expect` global
    environment: 'jsdom', // <-- simulates browser environment
    setupFiles: './src/setupTests.js', // optional, for jest-dom matchers
  },
});
