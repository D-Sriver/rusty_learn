import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'

export default defineConfig({  
  plugins: [
    tailwindcss(),  
    mdx(),
  ],})