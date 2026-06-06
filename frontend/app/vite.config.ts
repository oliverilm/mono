import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
   server: {
    host: "0.0.0.0",
    port: 5173, // Add explicit port
    strictPort: false, // Allow fallback if port is taken
    hmr: {
      overlay: true, // Show errors in browser
    },
    watch: {
      usePolling: false, // Set to false to use native file system events
    },
  },
  
  // Optimize build performance
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@mantine/core',
      '@mantine/hooks',
      '@mantine/form',
      '@tabler/icons-react',
      'axios',
      'dayjs',
      'zustand',
    ],
    exclude: ['@vanilla-extract/css'],
  },
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
  
  plugins: [
    react(),
    vanillaExtractPlugin(),
  ],
  
  // Development-specific optimizations
  esbuild: {
    // Only in development, not production
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
});
