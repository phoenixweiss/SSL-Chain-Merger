<script setup>
import { useGlobalStore } from '@/stores/global'

const store = useGlobalStore()

const certs = store.certs
</script>

<template>
  <main class="container">
    <h2>Merge SSL certificate chain for domain</h2>

    <hr />

    <DomainNameField />

    <CertificateItem
      v-for="cert in certs"
      :key="cert"
      :cert="cert"
    ></CertificateItem>
  </main>
</template>

<style scoped></style>
