/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  rules: {
    // 'no-unused-vars': 'off'
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
