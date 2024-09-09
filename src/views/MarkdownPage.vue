<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { parseMarkdown } from '@/lib/markdownParser'

const parsedMarkdown = ref('') // Holds the HTML after markdown is parsed
const route = useRoute() // Accesses current route parameters

/**
 * Loads and parses a markdown file based on the filename.
 * @param {string} fileName - The markdown file to load
 */
const loadMarkdown = async (fileName) => {
  try {
    const fileUrl = `${import.meta.env.BASE_URL}pages/${fileName}.md` // Build file URL
    const response = await fetch(fileUrl) // Fetch the markdown file
    const markdownText = await response.text() // Get file content as text
    parsedMarkdown.value = parseMarkdown(markdownText) // Parse and set HTML content
  } catch (error) {
    console.error('Error loading markdown file:', error) // Log any errors
  }
}

// Load the markdown file on component mount
onMounted(() => {
  const file = route.params.file || 'About' // Default to 'About.md' if no file is specified
  loadMarkdown(file)
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
