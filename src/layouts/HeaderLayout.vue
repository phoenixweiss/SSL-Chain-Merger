<script setup>
import { APP_NAME } from '@/constants'
import { useBaseUrl } from '@/helpers/useBaseUrl'

const baseUrl = useBaseUrl()
</script>

<template>
  <header>
    <nav>
      <ul>
        <li>
          <a class="logo" :aria-label="APP_NAME" :href="baseUrl">{{ APP_NAME }}</a>
        </li>
      </ul>
      <ul>
        <li>
          <LanguageSelector />
        </li>
      </ul>
      <ul>
        <li>
          <router-link to="/">{{ $t('pages.home') }}</router-link>
        </li>
        <li>
          <router-link to="/about">{{ $t('pages.about') }}</router-link>
        </li>
        <li>
          <ThemeSwitch />
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
a.logo {
  text-decoration: none;
  font-size: xx-large;
  font-weight: bolder;

  @media (max-width: 640px) {
    font-size: x-large;
    text-align: center;
  }
}

nav {
  flex-direction: row;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
  }
}
</style>
