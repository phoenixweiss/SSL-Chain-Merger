<script setup></script>

<template>
  <footer>
    <small>
      &copy; {{ new Date().getFullYear() }} {{ $t('ui.footer.made_with') }}
      <a href="https://vuejs.org/" target="_blank">Vue</a>,
      <a href="https://picocss.com/" target="_blank">Pico</a>,
      <a href="https://sass-lang.com/" target="_blank">Sass</a>,
      <a href="https://pinia.vuejs.org/" target="_blank">Pinia</a>,
      <a href="https://stuk.github.io/jszip/" target="_blank">JSZip</a>
      {{ $t('ui.footer.made_by') }}
      <a href="https://phoenixweiss.me" target="_blank"><em>phoenixweiss</em></a
      >.
    </small>
  </footer>
</template>

<style lang="scss" scoped></style>
