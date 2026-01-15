import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  root: path.resolve(__dirname, "client"),

  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: true,
    allowedHosts: true,

    // Frontend (5000) proxies /api requests to backend (5011)
    proxy: {
      "/api": {
        target: "http://localhost:5011",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },

  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "client/src/assets"),
    },
  },

  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
}));
