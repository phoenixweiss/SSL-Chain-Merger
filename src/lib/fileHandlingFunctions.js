/**
 * Downloads a file with the given content, file name, and file extension.
 *
 * @param {*} content - The content of the file to be downloaded.
 * @param {string} fileName - The name of the file to be downloaded.
 * @param {string} fileExt - The extension of the file to be downloaded.
 */
function downloadFile(content, fileName, fileExt) {
  const mimeType = fileExt === 'zip' ? 'application/zip' : 'application/x-pem-file'
  const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  let link
  let started = false

  try {
    link = document.createElement('a')
    link.href = url
    link.download = `${fileName}.${fileExt}`
    document.body.appendChild(link)
    link.click()
    started = true
  } finally {
    link?.remove()
    // Give the browser time to consume the URL before releasing its Blob.
    if (started) {
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } else {
      URL.revokeObjectURL(url)
    }
  }
}

export { downloadFile }
