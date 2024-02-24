<script setup>
import ThemeSwitch from '@/components/ThemeSwitch.vue'
</script>

<template>
  <header>
    <div class="container">
      <a class="logo" aria-label="SSL Certificate Chain Merger" href="/">
        <h1>SSL Certificate Chain Merger</h1>
      </a>
      <ThemeSwitch />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  a.logo {
    text-decoration: none;

    h1 {
      margin: 0;
    }
  }
}
</style>
