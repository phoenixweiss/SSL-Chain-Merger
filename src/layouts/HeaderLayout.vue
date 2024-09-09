<script setup>
import { useBaseUrl } from '@/helpers/useBaseUrl'

const baseUrl = useBaseUrl()
</script>

<template>
  <header>
    <nav>
      <ul>
        <li>
          <a class="logo" aria-label="SSL Chain Merger" :href="baseUrl"> SSL Chain Merger </a>
        </li>
      </ul>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
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
}

nav {
  flex-direction: row;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
  }
}
</style>
