import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import viteContent from '@originjs/vite-plugin-content'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    Components({
      dirs: ['src/components', 'src/layouts', 'src/views']
    }),
    svgLoader(),
    AutoImport({
      imports: ['vue'],
      dirs: ['src/stores'],
      vueTemplate: true,
      eslintrc: {
        enabled: true
      }
    }),
    viteContent(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
