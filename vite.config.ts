
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      port: 8080,
      host: "::",
      clientPort: 8080
    },
    proxy: {
      '/strom-api': {
        target: 'https://strom-api.forbrukerradet.no',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/strom-api/, '')
      }
    }
  },
  define: {
    __WS_TOKEN__: JSON.stringify(""),
    global: "globalThis",
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
}));
