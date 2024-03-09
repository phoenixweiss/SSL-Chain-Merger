<script setup>
import { downloadFile } from '@/lib/fileHandlingFunctions'
import { useGlobalStore } from '@/stores/global'

const store = useGlobalStore()

defineProps({
  cert: {
    type: Object,
    required: true
  }
})

const certContent = ref('')

</script>

<template>
  <div class="cert_item">
    <h3>{{ cert.title }}</h3>
    <p v-if="cert.required">
      <em>This field is required to merge complete chain.</em>
    </p>
    <div class="row">
      <div class="cert_content">
        <textarea
          class="monospaced"
          v-model="certContent"
          :name="cert.name"
          :id="cert.id"
          rows="4"
          :placeholder="cert.placeholder"
          :required="cert.required"
          :aria-invalid="store.checkAriaInvalidCertContent(certContent, cert.type)"
        ></textarea>
        <small v-if="store.checkAriaInvalidCertContent(certContent, cert.type) === true">Please enter valid data.</small>
      </div>
      <div class="cert_download">
        <button
          @click="downloadFile(certContent, `${store.domainName}.${cert.name}`, cert.format)"
          :disabled="store.checkAriaInvalidCertContent(certContent, cert.type) === true || store.checkAriaInvalidCertContent(certContent, cert.type) == undefined"
        >
          Download in .{{ cert.format }} format
        </button>
        <div class="caption" v-if="store.checkAriaInvalidCertContent(certContent, cert.type) === false">
          Expected filename:
          <br />
          <code>{{ `${store.domainName}.${cert.name}.${cert.format}` }}</code>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cert_item {
  margin-bottom: 2rem;

  .row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    @media (max-width: 640px) {
      flex-direction: column;
      align-items: center;
    }

    .cert_content {
      width: 100%;
    }

    .cert_download {
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

      .caption {
        margin-top: 0.5rem;
      }
    }
  }
}
</style>
