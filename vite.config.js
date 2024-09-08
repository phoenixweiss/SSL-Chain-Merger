// Import required Node.js modules for path resolution
import { fileURLToPath, URL } from 'node:url'

// Import Vite's configuration function
import { defineConfig } from 'vite'

// Import Vue plugin to handle .vue files
import Vue from '@vitejs/plugin-vue'

// Import SVG loader to inline SVGs as Vue components
import svgLoader from 'vite-svg-loader'

// Import content plugin for handling static assets
import viteContent from '@originjs/vite-plugin-content'

// https://vitejs.dev/config/
export default defineConfig({
  // Repo name
  base: '/SSL-Chain-Merger/',
  // Plugins to load
  plugins: [
    // Vue plugin for handling .vue files
    Vue(),
    // SVG loader to inline SVGs as Vue components
    svgLoader(),
    // Content plugin to handle various static content
    viteContent(),
  ],
  resolve: {
    alias: {
      // Alias '@' to point to the 'src' directory
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
