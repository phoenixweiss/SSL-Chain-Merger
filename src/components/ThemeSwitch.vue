<script setup>
import MoonIcon from '@/assets/svg/icons/MoonIcon.svg'
import SunIcon from '@/assets/svg/icons/SunIcon.svg'
import { ref, computed } from 'vue'

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
