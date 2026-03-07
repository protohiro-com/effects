import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/effects/',
  plugins: [react()],
  server: {
    port: 4173,
  },
  preview: {
    host: true,
    port: 4173,
    allowedHosts: true,
  },
});
