import MarkdownIt from 'markdown-it'

/**
 * Initializes the MarkdownIt parser with options to allow HTML,
 * automatically convert links, and enhance typography.
 */
const md = new MarkdownIt({
  html: true, // Enable HTML tags in markdown
  linkify: true, // Automatically convert URLs to clickable links
  typographer: true // Enable smart typographic replacements
})

/**
 * Parses the given markdown text into HTML.
 *
 * @param {string} markdownText - The markdown content to be parsed.
 * @returns {string} - The parsed HTML string.
 */
export const parseMarkdown = (markdownText) => {
  return md.render(markdownText)
}
