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
    <div class="grid">
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

  textarea {
    font-family: 'Courier New', Courier, monospace;
  }
}
</style>
