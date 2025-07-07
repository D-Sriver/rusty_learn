import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import { mdxQCMPlugin } from './src/vite-mdx-plugin'

export default defineConfig({  
  plugins: [
    tailwindcss(),
    mdxQCMPlugin(),
    mdx({
      jsxImportSource: 'react',
      providerImportSource: '@mdx-js/react'
    }),
  ],})