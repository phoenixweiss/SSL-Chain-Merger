<script setup>
import { certsData } from '@/data/certs.js'

const certs = certsData
</script>

<template>
  <main class="container">
    <h2>Merge SSL certificate chain for domain</h2>

    <hr />

    <DomainNameField />

    <CertificateItem v-for="cert in certs" :key="cert.id" :cert="cert"></CertificateItem>
  </main>
</template>

<style lang="scss" scoped></style>
