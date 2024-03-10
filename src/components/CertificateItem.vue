<script setup>
import { downloadFile } from '@/lib/fileHandlingFunctions'
import { useGlobalStore } from '@/stores/global'

const store = useGlobalStore()

const props = defineProps({
  cert: {
    type: Object,
    required: true
  }
})

function validateCert() {
  return store.checkAriaInvalidCertContent(
    store.getCertById(props.cert.id).content,
    props.cert.type
  )
}
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
          v-model="store.getCertById(cert.id).content"
          :name="cert.name"
          :id="cert.id"
          rows="4"
          :placeholder="cert.placeholder"
          :required="cert.required"
          :aria-invalid="validateCert()"
        ></textarea>
        <small v-if="validateCert() === true">Please enter valid data.</small>
      </div>
      <div class="cert_download">
        <button
          @click="
            downloadFile(
              store.getCertById(cert.id).content,
              `${store.domainName}.${cert.name}`,
              cert.format
            )
          "
          :disabled="validateCert() === true || validateCert() === undefined"
        >
          Download in .{{ cert.format }} format
        </button>
        <div class="caption" v-if="validateCert() === false">
          Filename:
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
