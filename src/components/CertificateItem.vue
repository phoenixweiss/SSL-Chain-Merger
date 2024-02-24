<script setup>
import { useGlobalStore } from '@/stores/global.js'

const store = useGlobalStore()

const props = defineProps({
  cert: {
    type: Object,
    required: true
  }
})

const certContent = ref('')

import { isValidCertItemText } from '@/lib/customValidators.js'

const ariaInvalidCertContent = computed(() => {
  if (certContent.value.length === 0) {
    return undefined
  } else if (
    certContent.value.length > 1 &&
    isValidCertItemText(certContent.value, props.cert.type)
  ) {
    return 'false'
  } else {
    return 'true'
  }
})

function downloadFile(content, fileName, fileExt) {
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${fileName}.${fileExt}`
  link.click()
  URL.revokeObjectURL(url)
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
          v-model="certContent"
          :name="cert.name"
          :id="cert.id"
          rows="4"
          :placeholder="cert.placeholder"
          :required="cert.required"
          :aria-invalid="ariaInvalidCertContent"
        ></textarea>
        <small v-if="ariaInvalidCertContent == 'true'">Please enter valid data.</small>
      </div>
      <div class="cert_download">
        <button
          @click="downloadFile(certContent, `${store.domainName}.${cert.name}`, cert.format)"
          :disabled="ariaInvalidCertContent == 'true' || ariaInvalidCertContent == undefined"
        >
          Download in .{{ cert.format }} format
        </button>
        <div class="caption" v-if="ariaInvalidCertContent == 'false'">
          Expected filename:
          <br />
          <code>{{ `${store.domainName}.${cert.name}.${cert.format}` }}</code>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cert_item {
  margin-bottom: 2rem;

  .row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    .cert_content {
      width: 100%;
    }

    .cert_download {
      margin-left: 1rem;

      button {
        min-width: max-content;
        padding: 1rem 2rem;
      }

      .caption {
        margin-top: 0.5rem;
      }
    }
  }
}

@media screen and (max-width: 640px) {
  .cert_item {
    .row {
      flex-direction: column;
      align-items: center;

      .cert_download {
        margin: 0 auto;

        button {
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
