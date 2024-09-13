<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { loadMarkdownContent } from '@/lib/markdownLoader'
import { useGlobalStore } from '@/stores/global'

const parsedMarkdown = ref('')
const route = useRoute()
const globalStore = useGlobalStore()

/**
 * Load the markdown file based on the route and language
 */
const loadMarkdown = async (fileName) => {
  parsedMarkdown.value = await loadMarkdownContent(fileName)
}

// Load the markdown file on component mount
onMounted(() => {
  const file = route.params.file || 'about' // Default to 'About.md' if no file is specified
  loadMarkdown(file)

  // Watch for language changes in the global store and reload content when the language changes
  watch(
    () => globalStore.currentLanguage,
    () => {
      const file = route.params.file || 'about'
      loadMarkdown(file)
    }
  )
})

// Watch for route changes and load the new markdown file
watch(
  () => route.params.file,
  (newFile) => {
    loadMarkdown(newFile)
  }
)
</script>

<template>
  <main class="container">
    <!-- Render parsed markdown content -->
    <div v-html="parsedMarkdown"></div>
  </main>
</template>

<style lang="scss" scoped></style>
