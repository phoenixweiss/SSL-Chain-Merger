<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { loadMarkdownContent } from '@/lib/markdownLoader'
import { useGlobalStore } from '@/stores/global'

const parsedMarkdown = ref({ html: '', headings: [] })
const activeHeadingId = ref('')
const isDesktop = ref(false)
const tocOpen = ref(false)
const route = useRoute()
const globalStore = useGlobalStore()
let loadRequestId = 0
let desktopMediaQuery

const markdownFile = computed(() => route.meta.markdownFile || route.params.file || 'about')

const loadMarkdown = async (fileName, language) => {
  const requestId = ++loadRequestId
  const content = await loadMarkdownContent(fileName, language)

  if (requestId === loadRequestId) {
    parsedMarkdown.value = content
  }
}

const headingLocation = (headingId) => ({
  path: route.path,
  query: { ...route.query, section: headingId }
})

const scrollToHeading = async (headingId) => {
  if (!headingId) {
    return
  }

  await nextTick()
  document.getElementById(headingId)?.scrollIntoView({ block: 'start' })
}

const updateActiveHeading = () => {
  const headings = parsedMarkdown.value.headings

  if (headings.length === 0) {
    activeHeadingId.value = ''
    return
  }

  const activationOffset = 160
  let activeHeading = headings[0]

  for (const heading of headings) {
    const headingElement = document.getElementById(heading.id)

    if (!headingElement || headingElement.getBoundingClientRect().top > activationOffset) {
      break
    }

    activeHeading = heading
  }

  activeHeadingId.value = activeHeading.id
}

const updateTocLayout = (mediaQuery) => {
  isDesktop.value = mediaQuery.matches
  tocOpen.value = mediaQuery.matches
}

const handleTocToggle = (event) => {
  if (isDesktop.value) {
    event.currentTarget.open = true
    tocOpen.value = true
    return
  }

  tocOpen.value = event.currentTarget.open
}

const handleTocSummaryClick = (event) => {
  if (isDesktop.value) {
    event.preventDefault()
  }
}

watch(
  [markdownFile, () => globalStore.currentLanguage],
  ([fileName, language]) => loadMarkdown(fileName, language),
  { immediate: true }
)

watch(
  [() => parsedMarkdown.value.headings, () => route.query.section],
  async ([, section]) => {
    await scrollToHeading(section)
    updateActiveHeading()
  },
  { flush: 'post' }
)

onMounted(() => {
  desktopMediaQuery = window.matchMedia('(min-width: 1024px)')
  updateTocLayout(desktopMediaQuery)
  desktopMediaQuery.addEventListener('change', updateTocLayout)
  window.addEventListener('scroll', updateActiveHeading, { passive: true })
})

onBeforeUnmount(() => {
  desktopMediaQuery?.removeEventListener('change', updateTocLayout)
  window.removeEventListener('scroll', updateActiveHeading)
})
</script>

<template>
  <main class="container markdown_page">
    <div class="markdown_content" v-html="parsedMarkdown.html"></div>

    <details
      v-if="parsedMarkdown.headings.length > 0"
      class="markdown_toc"
      :open="tocOpen"
      @toggle="handleTocToggle"
    >
      <summary @click="handleTocSummaryClick">{{ $t('pages.on_this_page') }}</summary>
      <nav class="markdown_toc_navigation" :aria-label="$t('pages.on_this_page')">
        <ul>
          <li
            v-for="heading in parsedMarkdown.headings"
            :key="heading.id"
            :class="`toc_level_${heading.level}`"
          >
            <RouterLink
              :to="headingLocation(heading.id)"
              :aria-current="activeHeadingId === heading.id ? 'location' : undefined"
            >
              {{ heading.text }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </details>
  </main>
</template>

<style lang="scss">
.markdown_page {
  display: grid;
  grid-template-columns: minmax(14rem, 18rem) minmax(0, 1fr);
  gap: 3rem;
  align-items: start;
}

.markdown_content {
  grid-column: 2;
  min-width: 0;

  > :first-child {
    margin-top: 0;
  }

  h2,
  h3,
  h4 {
    scroll-margin-top: 2rem;
  }
}

.markdown_toc {
  position: sticky;
  grid-column: 1;
  grid-row: 1;
  top: 1rem;
  max-height: calc(100vh - 2rem);
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0;
  padding: 0 0 0 1rem;
  border-left: 1px solid var(--pico-muted-border-color);

  summary {
    font-weight: 600;
  }
}

@media (min-width: 1024px) {
  .markdown_toc summary {
    pointer-events: none;
    cursor: default;
    list-style: none;
    color: var(--pico-muted-color);
    font-size: 0.875rem;
    font-weight: 500;

    &::-webkit-details-marker {
      display: none;
    }

    &::marker {
      content: '';
    }

    &::after {
      display: none;
    }
  }
}

.markdown_toc_navigation {
  display: block;
  margin-top: 0;
  padding-top: 0.75rem;

  ul {
    display: block;
    margin: 0 !important;
    padding: 0;
  }

  li {
    display: block;
    margin: 0 !important;
    padding: 0;
    list-style: none;
  }

  a {
    display: block;
    margin: 0 !important;
    padding: 0.3rem 0.5rem;
    border-left: 2px solid transparent;
    color: var(--pico-muted-color);
    text-decoration: none;

    &:hover,
    &[aria-current='location'] {
      border-left-color: var(--pico-primary);
      color: var(--pico-primary);
    }

    &[aria-current='location'] {
      font-weight: 700;
    }
  }

  .toc_level_3 {
    margin-left: 0.75rem;
    font-size: 0.9em;
  }

  .toc_level_4 {
    margin-left: 1.5rem;
    font-size: 0.85em;
  }
}

@media (max-width: 1023px) {
  .markdown_page {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.5rem;
  }

  .markdown_content {
    grid-column: 1;
    grid-row: 2;
  }

  .markdown_toc {
    position: static;
    grid-column: 1;
    grid-row: 1;
    max-height: min(50vh, 24rem);
    padding: 0.75rem 1rem;
    border: 1px solid var(--pico-muted-border-color);
    border-radius: var(--pico-border-radius);
  }
}
</style>
