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
 * Checks if a given text is a valid SSL certificate, CSR request or private key.
 *
 * @param {string} text - The text to check.
 * @param {string} [type='cert'] - The type of item to check. Possible values: 'cert', 'cert_chain', 'csr', 'key'.
 * @returns {boolean} - True if the text is valid, false otherwise.
 */
function isValidCertItemText(text, type = 'cert') {
  let pattern

  switch (type) {
    case 'cert_chain': {
      const certificateBlockPattern =
        /-----BEGIN CERTIFICATE-----\r?\n[\s\S]+?\r?\n-----END CERTIFICATE-----/g
      const certificateBlocks = [...text.matchAll(certificateBlockPattern)]
      let previousBlockEnd = 0

      if (certificateBlocks.length === 0) {
        return false
      }

      for (const certificateBlock of certificateBlocks) {
        const separator = text.slice(previousBlockEnd, certificateBlock.index)

        if (separator.trim() !== '') {
          return false
        }

        previousBlockEnd = certificateBlock.index + certificateBlock[0].length
      }

      return text.slice(previousBlockEnd).trim() === ''
    }
    case 'csr':
      pattern = /^-----BEGIN CERTIFICATE REQUEST-----\n[\s\S]+?\n-----END CERTIFICATE REQUEST-----$/
      break
    case 'key':
      pattern = /^-----BEGIN RSA PRIVATE KEY-----\n[\s\S]+?\n-----END RSA PRIVATE KEY-----$/
      break
    case 'cert':
    default:
      pattern = /^-----BEGIN CERTIFICATE-----\n[\s\S]+?\n-----END CERTIFICATE-----$/
      break
  }

  return pattern.test(text)
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
