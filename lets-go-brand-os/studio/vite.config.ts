import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// A studio vive em lets-go-brand-os/studio/. Ela lê os tokens (../tokens) e os
// dados de exemplo (../social/examples) diretamente da pasta pai para evitar
// duplicar a fonte da verdade da marca dentro da studio.
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [path.resolve(__dirname, '..')],
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
