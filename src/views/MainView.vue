<script setup>
import { useGlobalStore } from '@/stores/global'

const store = useGlobalStore()

const certs = store.certs
</script>

<template>
  <main class="container">
    <h1>{{ $t('ui.main_header') }}</h1>
    <aside class="privacy_notice" role="note">
      <strong>{{ $t('ui.privacy_notice_title') }}</strong>
      <span>{{ $t('ui.privacy_notice_body') }}</span>
    </aside>
    <hr />
    <div class="row">
      <DomainNameField />
      <DownloadFullChain />
    </div>
    <CertificateItem v-for="cert in certs" :key="cert.id" :cert="cert"></CertificateItem>
  </main>
</template>

<style lang="scss">
.privacy_notice {
  padding: 1rem;
  border-left: 0.25rem solid var(--pico-primary);

  strong,
  span {
    display: block;
  }

  strong {
    margin-bottom: 0.25rem;
  }
}

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
