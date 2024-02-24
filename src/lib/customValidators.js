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

export { isValidDomain }
