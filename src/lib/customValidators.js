/**
 * Checks if a given domain is valid.
 *
 * @param {string} domain - The domain to check.
 * @returns {boolean} - True if the domain is valid, false otherwise.
 */
function isValidDomainName(domain) {
  const domainPattern = /^[a-zA-Z0-9]+([-.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/

  if (domain.match(domainPattern)) {
    return true
  } else {
    return false
  }
}

/**
 * Checks if a given domain is an invalid for ARIA-attributes.
 *
 * @param {string} domain - The domain to check.
 * @returns {boolean|undefined} - True if the domain is an invalid ARIA domain, false if it is a valid, undefined if the domain is empty.
 */
function isAriaInvalidDomainName(domain) {
  if (typeof domain != 'string' || domain.length === 0) {
    return undefined
  } else if (domain.length > 1 && isValidDomainName(domain)) {
    return false
  } else {
    return true
  }
}

/**
 * Checks PEM boundaries for a certificate, CSR or private key, without parsing its payload.
 *
 * @param {string} text - The text to check.
 * @param {string} [type='cert'] - The type of item to check. Possible values: 'cert', 'cert_chain', 'csr', 'key'.
 * @returns {boolean} - True if the PEM wrappers are supported and complete, false otherwise.
 */
function isValidCertItemText(text, type = 'cert') {
  if (typeof text !== 'string' || !text.trim()) {
    return false
  }

  const labels =
    type === 'key'
      ? ['RSA PRIVATE KEY', 'PRIVATE KEY', 'ENCRYPTED PRIVATE KEY', 'EC PRIVATE KEY']
      : type === 'csr'
        ? ['CERTIFICATE REQUEST', 'NEW CERTIFICATE REQUEST']
        : ['CERTIFICATE']
  // Inspect a copy only: downloads retain the content stored by the form.
  const lines = text.trim().split(/\r?\n/)
  let blockCount = 0
  let index = 0

  while (index < lines.length) {
    if (!lines[index].trim()) {
      index += 1
      continue
    }

    const label = labels.find((label) => lines[index] === `-----BEGIN ${label}-----`)
    if (!label || (blockCount > 0 && type !== 'cert_chain')) {
      return false
    }

    index += 1
    let hasContent = false
    while (index < lines.length && lines[index] !== `-----END ${label}-----`) {
      // Reject nested or mismatched boundaries without claiming DER validation.
      if (/-----(?:BEGIN|END) /.test(lines[index]) || lines[index].includes('\r')) {
        return false
      }
      hasContent ||= Boolean(lines[index].trim())
      index += 1
    }

    if (!hasContent || index === lines.length) {
      return false
    }

    blockCount += 1
    index += 1
  }

  return blockCount > 0
}

/**
 * Checks if a given text is an invalid SSL certificate, CSR request or private key for ARIA-attributes.
 *
 * @param {string} text - The text to check.
 * @param {string} [type=null] - The type of item to check. Possible values: 'cert', 'cert_chain', 'csr', 'key'.
 * @returns {boolean|undefined} - True if the text is an invalid ARIA 'cert', 'csr' or 'key', false if it is a valid, undefined if the text is empty.
 */
function isAriaInvalidCertContent(text, type = null) {
  if (typeof text != 'string' || text.length === 0) {
    return undefined
  } else if (text.length > 1 && isValidCertItemText(text, type)) {
    return false
  } else {
    return true
  }
}

export { isValidDomainName, isValidCertItemText, isAriaInvalidDomainName, isAriaInvalidCertContent }
