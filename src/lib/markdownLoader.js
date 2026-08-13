import { parseMarkdown } from '@/lib/markdownParser'
import { DEFAULT_LANGUAGE } from '@/constants'

const warnInDevelopment = (...args) => {
  if (import.meta.env.DEV) {
    console.warn(...args)
  }
}

/**
 * Attempts to load and parse a markdown file based on the filename and language.
 * Tries to load the localized version first, and if not found, tries to load the universal file.
 * All filenames are converted to lowercase to avoid case-sensitivity issues.
 * @param {string} fileName - The base name of the markdown file to load
 * @param {string} [language=DEFAULT_LANGUAGE] - The selected interface language
 * @returns {Promise<{html: string, headings: Array<{id: string, text: string, level: number}>}>}
 * Returns the parsed Markdown content and its heading structure.
 */
export const loadMarkdownContent = async (fileName, language = DEFAULT_LANGUAGE) => {
  const currentLanguage = language.toLowerCase()
  const fileNameLower = fileName.toLowerCase()

  // Define file variants, prioritize language-specific files
  const fileVariants = [
    `${fileNameLower}_${currentLanguage}.md` // e.g., about_en.md
  ]

  // If current language is default, also try loading the file without a language suffix
  if (currentLanguage === DEFAULT_LANGUAGE.toLowerCase()) {
    fileVariants.push(`${fileNameLower}.md`) // e.g., about.md
  }

  for (const variant of fileVariants) {
    const fileUrl = `${import.meta.env.BASE_URL}pages/${variant}`

    try {
      const response = await fetch(fileUrl)

      if (response.ok) {
        // Ensure the content-type is markdown before parsing
        const contentType = response.headers.get('Content-Type')
        if (contentType && contentType.includes('text/markdown')) {
          const markdownText = await response.text()
          return parseMarkdown(markdownText) // Parse and return HTML content
        } else {
          warnInDevelopment(`Unexpected content-type for ${variant}: ${contentType}`)
          continue // Try the next variant if the content is not markdown
        }
      } else if (response.status === 404) {
        warnInDevelopment(`Markdown file not found: ${variant} (404)`)
        continue // Continue to next variant if file is not found
      } else {
        warnInDevelopment(`Failed to load ${variant}. Response status: ${response.status}`)
      }
    } catch (error) {
      warnInDevelopment(`Error loading ${variant}:`, error)
    }
  }

  // If no file was found, return an error message
  return {
    html: '<p>Error: No content available for this page.</p>',
    headings: []
  }
}
