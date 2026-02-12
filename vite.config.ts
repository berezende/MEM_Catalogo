import path from "path"
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
    },
  },
  base: "/",

  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },

  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  server: {
    host: true, // Important: Listen on all addresses for development
    port: 5173,
  },
});