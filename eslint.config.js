// Import global variables for different environments
import globals from 'globals'

// Import ESLint core plugin for JavaScript
import pluginJs from '@eslint/js'

// Import ESLint plugin for Vue
import pluginVue from 'eslint-plugin-vue'

export default [
  {
    // Specify file types to apply linting rules
    files: ['**/*.{js,mjs,cjs,vue}'],
  },
  {
    // Define directories or files to ignore during linting
    ignores: ['**/dist/*']
  },
  {
    // Set language options and include globals for browser and Node.js environments
    languageOptions: { globals: { ...globals.browser, ...globals.node } }
  },
  // Use recommended ESLint rules for JavaScript
  pluginJs.configs.recommended,
  // Apply essential Vue rules from the flat config
  ...pluginVue.configs['flat/essential']
]
