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
    assetsInlineLimit: 0,

    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
      },
    },

    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
      mangle: {
        toplevel: true,
      },
      format: {
        comments: false,
      },
    },
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia'],
  },
});
