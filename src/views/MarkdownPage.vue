<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { parseMarkdown } from '@/lib/markdownParser'

const parsedMarkdown = ref('')
const route = useRoute()

const loadMarkdown = async (fileName) => {
  try {
    const fileUrl = `${import.meta.env.BASE_URL}pages/${fileName}.md` // Учитываем базовый URL
    const response = await fetch(fileUrl) // Загружаем файл
    const markdownText = await response.text()
    parsedMarkdown.value = parseMarkdown(markdownText) // Парсим markdown
  } catch (error) {
    console.error('Error load Markdown file:', error)
  }
}

onMounted(() => {
  const file = route.params.file || 'About'
  loadMarkdown(file)
})

watch(
  () => route.params.file,
  (newFile) => {
    loadMarkdown(`@/pages/${newFile}.md`)
  }
)
</script>

<template>
  <main class="container">
    <div v-html="parsedMarkdown"></div>
  </main>
</template>

<style lang="scss" scoped></style>
