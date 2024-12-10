import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css'

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      include: ['lib']
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './lib'),
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  },
  build: {
    copyPublicDir: false,
    cssMinify: "esbuild",
    minify: "esbuild",
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: '[name].js',
      }
    }
  },
})
