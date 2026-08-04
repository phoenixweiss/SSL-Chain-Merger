<script setup>
import JSZip from 'jszip'
import { useGlobalStore } from '@/stores/global'
import { downloadFile } from '@/lib/fileHandlingFunctions'
import { computed, ref } from 'vue'

const store = useGlobalStore()

// Computed property to check if all required certificates and domain name are valid
const isDownloadButtonEnabled = computed(() => store.areCertsValid())

// Computed property to get a list of invalid fields (certificates and domain name)
const invalidCerts = computed(() => store.getInvalidCerts())

// Checkbox state for merging certificates
const mergeCertificates = ref(false)

async function downloadFullSSLChain() {
  if (!isDownloadButtonEnabled.value) {
    return
  }

  const zip = new JSZip()

  if (mergeCertificates.value) {
    // Keep certificate order explicit: domain, intermediate certificate(s), optional root.
    const fullChainContent = `${store.certs
      .filter((cert) => Number.isInteger(cert.chainOrder) && cert.content?.trim())
      .sort((firstCert, secondCert) => firstCert.chainOrder - secondCert.chainOrder)
      .map((cert) => cert.content.trim())
      .join('\n')}\n`

    const fullChainFileName = `${store.domainName}.fullchain.crt`
    zip.file(fullChainFileName, fullChainContent)
  } else {
    // Add each certificate individually using names from YAML file
    store.certs.forEach((cert) => {
      if (cert.content && cert.content.trim() !== '') {
        const filename = `${store.domainName}.${cert.name}.${cert.format}`
        zip.file(filename, cert.content)
      }
    })
  }

  const privateKey = store.certs.find((cert) => cert.id === 'private_key')
  if (privateKey && privateKey.content && privateKey.content.trim() !== '') {
    const privateKeyFileName = `${store.domainName}.${privateKey.name}.key`
    zip.file(privateKeyFileName, privateKey.content)
  }

  const csrRequest = store.certs.find((cert) => cert.id === 'csr_code')
  if (csrRequest && csrRequest.content && csrRequest.content.trim() !== '') {
    const csrFileName = `${store.domainName}.${csrRequest.name}.csr`
    zip.file(csrFileName, csrRequest.content)
  }

  const content = await zip.generateAsync({ type: 'blob' })

  const sanitizedDomainName = store.domainName.replace(/\./g, '_')
  downloadFile(content, `${sanitizedDomainName}_ssl_chain`, 'zip')
}
</script>

<template>
  <div class="chain_download">
    <button @click="downloadFullSSLChain" :disabled="!isDownloadButtonEnabled">
      {{ $t('ui.chain_download_button') }}
    </button>
    <label>
      <input type="checkbox" v-model="mergeCertificates" />
      {{ $t('ui.chain_merge_checkbox') }}
    </label>
    <div v-if="invalidCerts.length > 0" class="error-messages">
      <p>{{ $t('ui.chain_invalid_list') }}</p>
      <ul>
        <li v-for="certKey in invalidCerts" :key="certKey">{{ $t(certKey) }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.chain_download {
  margin-left: 1rem;

  @media (max-width: 640px) {
    margin: 0 auto;
  }

  button {
    min-width: max-content;
    padding: 1rem 2rem;

    @media (max-width: 640px) {
      margin: 0 auto;
    }
  }

  label {
    display: block;
    margin-top: 1rem;
  }

  .error-messages {
    margin-top: 1rem;
  }
}
</style>
