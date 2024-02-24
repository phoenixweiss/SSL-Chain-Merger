<script setup>
defineProps({
  cert: {
    type: Object,
    required: true
  }
})

const certContent = ref('')

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
      <em>This field is required.</em>
    </p>
    <!-- <small>{{ domainName }}</small> -->
    <div class="row">
      <textarea
        v-model="certContent"
        :name="cert.name"
        :id="cert.id"
        rows="10"
        :placeholder="cert.placeholder"
        :required="cert.required"
      ></textarea>
      <button @click="downloadFile(certContent, cert.name, cert.format)">
        Download in .{{ cert.format }} format
      </button>
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

    textarea {
      font-family: 'Courier New', Courier, monospace;
    }

    button {
      min-width: fit-content;
      margin-left: 1rem;
    }
  }
}

@media screen and (max-width: 640px) {
  .cert_item {
    .row {
      flex-direction: column;
      align-items: center;

      button {
        margin: 0 auto;
      }
    }
  }
}
</style>
