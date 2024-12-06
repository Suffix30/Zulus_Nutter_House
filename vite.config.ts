import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Zulus_Nutter_House/',
  plugins: [react()],
  publicDir: 'public',
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    assetsDir: 'assets',
    sourcemap: true,
  },
});