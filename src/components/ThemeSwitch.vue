<script setup>
import MoonIcon from '@/assets/svg/icons/MoonIcon.svg'
import SunIcon from '@/assets/svg/icons/SunIcon.svg'
import { ref, computed, onMounted } from 'vue'

const THEME_STORAGE_KEY = 'ssl-chain-merger-theme'
const LIGHT_THEME = 'light'
const DARK_THEME = 'dark'

const isDarkTheme = ref(false)

const iconClass = computed(() => {
  return isDarkTheme.value ? DARK_THEME : LIGHT_THEME
})

const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme)
  isDarkTheme.value = theme === DARK_THEME
}

const getStoredTheme = () => {
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)

    return [LIGHT_THEME, DARK_THEME].includes(storedTheme) ? storedTheme : null
  } catch {
    return null
  }
}

const storeTheme = (theme) => {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Keep theme switching available when browser storage is unavailable.
  }
}

const toggleTheme = () => {
  const nextTheme = isDarkTheme.value ? LIGHT_THEME : DARK_THEME
  applyTheme(nextTheme)
  storeTheme(nextTheme)
}

onMounted(() => {
  const storedTheme = getStoredTheme()
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  applyTheme(storedTheme || (prefersDark ? DARK_THEME : LIGHT_THEME))
})
</script>

<template>
  <button
    class="theme_switcher"
    @click="toggleTheme"
    :aria-label="$t(isDarkTheme ? 'ui.theme_switch_to_light' : 'ui.theme_switch_to_dark')"
    :title="$t(isDarkTheme ? 'ui.theme_switch_to_light' : 'ui.theme_switch_to_dark')"
  >
    <SunIcon :class="iconClass" v-if="isDarkTheme" />
    <MoonIcon :class="iconClass" v-else />
  </button>
</template>

<style lang="scss">
button.theme_switcher {
  background: none;
  border: none;
  outline: none;
  padding: 4px;
  cursor: pointer;
  max-width: 48px;
  max-height: 48px;
  box-shadow: none;

  svg {
    min-width: 24px;
    min-height: 24px;
    width: 100%;
    height: 100%;

    &.dark {
      fill: yellow;
    }

    &.light {
      fill: grey;
    }
  }
}
</style>
