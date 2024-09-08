<script setup>
import { useBaseUrl } from '@/helpers/useBaseUrl'

const baseUrl = useBaseUrl()
</script>

<template>
  <header>
    <nav>
      <ul>
        <li>
          <a class="logo" aria-label="SSL Chain Merger" :href="baseUrl">
            <h1>SSL Chain Merger</h1>
          </a>
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
}
</style>
