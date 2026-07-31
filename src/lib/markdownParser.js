import MarkdownIt from 'markdown-it'

/**
 * Initializes the MarkdownIt parser with raw HTML disabled,
 * automatic link conversion, and enhanced typography.
 */
const md = new MarkdownIt({
  html: false, // Keep tracked Markdown content inside the parser's safe output boundary
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
