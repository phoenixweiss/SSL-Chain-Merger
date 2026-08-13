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

const createHeadingId = (headingText) => {
  return (
    headingText
      .normalize('NFKD')
      .toLowerCase()
      .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
      .replace(/^-+|-+$/g, '') || 'section'
  )
}

const getHeadingText = (inlineToken) => {
  return (
    inlineToken.children?.map((childToken) => childToken.content).join('') || inlineToken.content
  )
}

/**
 * Parses the given markdown text into HTML.
 *
 * @param {string} markdownText - The markdown content to be parsed.
 * @returns {{html: string, headings: Array<{id: string, text: string, level: number}>}}
 * The parsed HTML and its heading structure.
 */
export const parseMarkdown = (markdownText) => {
  const environment = {}
  const tokens = md.parse(markdownText, environment)
  const headings = []
  const headingIdCounts = new Map()

  tokens.forEach((token, tokenIndex) => {
    if (token.type !== 'heading_open') {
      return
    }

    const inlineToken = tokens[tokenIndex + 1]

    if (!inlineToken || inlineToken.type !== 'inline') {
      return
    }

    const headingText = getHeadingText(inlineToken)
    const baseHeadingId = createHeadingId(headingText)
    const headingIdCount = headingIdCounts.get(baseHeadingId) || 0
    const headingId =
      headingIdCount === 0 ? baseHeadingId : `${baseHeadingId}-${headingIdCount + 1}`
    const headingLevel = Number(token.tag.slice(1))

    headingIdCounts.set(baseHeadingId, headingIdCount + 1)
    token.attrSet('id', headingId)

    if (headingLevel >= 2 && headingLevel <= 4) {
      headings.push({ id: headingId, text: headingText, level: headingLevel })
    }
  })

  return {
    html: md.renderer.render(tokens, md.options, environment),
    headings
  }
}
