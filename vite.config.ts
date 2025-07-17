import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import { mdxQCMPlugin } from './src/vite-mdx-plugin'
import path from 'path';

export default defineConfig({  
  plugins: [
    tailwindcss(),
    mdxQCMPlugin(),
    mdx({
      jsxImportSource: 'react',
      providerImportSource: '@mdx-js/react'
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})