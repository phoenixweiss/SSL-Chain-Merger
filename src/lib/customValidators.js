/**
 * Checks if a given domain is valid.
 *
 * @param {string} domain - The domain to check.
 * @returns {boolean} - True if the domain is valid, false otherwise.
 */
function isValidDomain(domain) {
  const domainPattern = /^[a-zA-Z0-9]+([-.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/

  if (domain.match(domainPattern)) {
    return true
  } else {
    return false
  }
}

/**
 * Checks if a given text is a valid SSL certificate, CSR request or private key.
 *
 * @param {string} text - The text to check.
 * @param {string} [type='cert'] - The type of item to check. Possible values: 'cert', 'csr', 'key'.
 * @returns {boolean} - True if the text is valid, false otherwise.
 */
function isValidCertItemText(text, type = 'cert') {
  let pattern

  switch (type) {
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

export { isValidDomain, isValidCertItemText }
