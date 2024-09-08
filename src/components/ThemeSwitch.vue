<script setup>
import MoonIcon from '@/assets/svg/icons/MoonIcon.svg'
import SunIcon from '@/assets/svg/icons/SunIcon.svg'
import { ref, computed, onMounted } from 'vue'

const isDarkTheme = ref(false)

const iconClass = computed(() => {
  return isDarkTheme.value ? 'dark' : 'light'
})

const toggleTheme = () => {
  const html = document.querySelector('html')
  if (isDarkTheme.value) {
    html.setAttribute('data-theme', 'light')
  } else {
    html.setAttribute('data-theme', 'dark')
  }
  isDarkTheme.value = !isDarkTheme.value
}

// Detect user's system theme preference
onMounted(() => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDarkTheme.value = prefersDark

  // Set the initial theme based on user's preference
  const html = document.querySelector('html')
  html.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
})
</script>

<template>
  <button class="theme_switcher" @click="toggleTheme">
    <SunIcon :class="iconClass" v-if="isDarkTheme" />
    <MoonIcon :class="iconClass" v-else />
  </button>
</template>

<style lang="scss" scoped>
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
