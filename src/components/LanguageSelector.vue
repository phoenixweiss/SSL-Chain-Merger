<script setup>
import { ref, computed } from 'vue'
import i18next from 'i18next'

const currentLanguage = ref(i18next.language)
const availableLanguages = computed(() => i18next.options.locales || ['en', 'ru'])

const changeLanguage = (lang) => {
  i18next.changeLanguage(lang).then(() => {
    currentLanguage.value = lang
  })
}
</script>

<template>
  <details class="dropdown">
    <summary role="button" class="outline secondary">{{ currentLanguage.toUpperCase() }}</summary>
    <ul>
      <li v-for="lang in availableLanguages" :key="lang">
        <a href="#" @click.prevent="changeLanguage(lang)">{{ lang.toUpperCase() }}</a>
      </li>
    </ul>
  </details>
</template>

<style lang="scss" scoped></style>
