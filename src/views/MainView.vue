<script setup>
import { useGlobalStore } from '@/stores/global'

const store = useGlobalStore()

const certs = store.certs
</script>

<template>
  <main class="container">
    <h1>{{ $t('ui.main_header') }}</h1>
    <hr />
    <div class="row">
      <DomainNameField />
      <DownloadFullChain />
    </div>
    <CertificateItem v-for="cert in certs" :key="cert.id" :cert="cert"></CertificateItem>
  </main>
</template>

<style lang="scss" scoped>
.row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 2rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
  }
}
</style>
