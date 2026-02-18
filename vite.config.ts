import path from "path"
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ssr from 'vike/plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ssr()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
    },
  },
  base: "/",

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-ui': ['framer-motion', 'lucide-react'],
        },
      },
    },
  },

  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  server: {
    host: true, // Important: Listen on all addresses for development
    port: 5173,
  },
});