
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths()
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
    cssMinify: true,
  },
  server: {
    port: 5173,
    strictPort: true
  },
  css: {
    postcss: './postcss.config.cjs'
  }
})
