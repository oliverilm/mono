import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://vite.dev/config/
export default defineConfig({
  mode: "production",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
    },
  },
  plugins: [react(), vanillaExtractPlugin()],
})
