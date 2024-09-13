<script setup>
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '@/constants'
import { useGlobalStore } from '@/stores/global'
import { computed } from 'vue'
import { useTranslation } from 'i18next-vue'

const globalStore = useGlobalStore()

const currentLanguage = computed(() => globalStore.currentLanguage || DEFAULT_LANGUAGE)
const availableLanguages = computed(() => SUPPORTED_LANGUAGES)
const { t } = useTranslation()

const changeLanguage = (lang) => {
  globalStore.setLanguage(lang)
}
</script>

<template>
  <details class="dropdown">
    <summary role="button" class="outline secondary">
      {{ t('ui.language_selector', { language: currentLanguage.toUpperCase() }) }}
    </summary>
    <ul>
      <li v-for="lang in availableLanguages" :key="lang">
        <a href="#" @click.prevent="changeLanguage(lang)">{{ lang.toUpperCase() }}</a>
      </li>
    </ul>
  </details>
</template>

<style lang="scss" scoped></style>
