// Import required Node.js modules for path resolution
import { readFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'

// Import Vite's configuration function
import { defineConfig } from 'vite'

// Import Vue plugin to handle .vue files
import Vue from '@vitejs/plugin-vue'

// Import SVG loader to inline SVGs as Vue components
import svgLoader from 'vite-svg-loader'

// Import content plugin for handling static assets
import viteContent from '@originjs/vite-plugin-content'

const appVersion = readFileSync(new URL('./VERSION', import.meta.url), 'utf8').trim()

// https://vitejs.dev/config/
export default defineConfig({
  // Repo name
  base: '/SSL-Chain-Merger/',
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(appVersion)
  },
  // Plugins to load
  plugins: [
    // Vue plugin for handling .vue files
    Vue(),
    // SVG loader to inline SVGs as Vue components
    svgLoader(),
    // Content plugin to handle various static content
    viteContent()
  ],
  resolve: {
    alias: {
      // Alias '@' to point to the 'src' directory
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
