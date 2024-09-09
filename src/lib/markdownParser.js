import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

export const parseMarkdown = (markdownText) => {
  return md.render(markdownText)
}
