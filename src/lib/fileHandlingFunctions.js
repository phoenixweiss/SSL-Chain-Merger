/**
 * Downloads a file with the given content, file name, and file extension.
 *
 * @param {*} content - The content of the file to be downloaded.
 * @param {string} fileName - The name of the file to be downloaded.
 * @param {string} fileExt - The extension of the file to be downloaded.
 */
function downloadFile(content, fileName, fileExt) {
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${fileName}.${fileExt}`
  link.click()
  URL.revokeObjectURL(url)
}

export { downloadFile }
