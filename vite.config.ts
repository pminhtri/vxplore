import path from 'path';
import { defineConfig } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [vue(), vueJsx(), viteTsconfigPaths(), tailwindcss()],
  clearScreen: false,
  server: {
    port: 4000,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    terserOptions: {
      compress: {
        keep_fargs: false,
        passes: 2,
        drop_console: true,
        drop_debugger: true,
        unsafe: true,
        unsafe_arrows: true,
        unsafe_methods: true,
        unsafe_undefined: true,
        ecma: 2020,
      },
      format: {
        comments: false,
      },
      mangle: {
        toplevel: true,
        properties: {
          regex: /^_/,
        },
      },
    },
  },
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.webp', '**/*.svg', '**/*.ttf'],
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia'],
  },
});
