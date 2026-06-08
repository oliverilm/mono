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
      "@api": path.resolve(__dirname, "./src/api"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@mocks": path.resolve(__dirname, "./src/mocks"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@utils": path.resolve(__dirname, "./src/utils"),
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
