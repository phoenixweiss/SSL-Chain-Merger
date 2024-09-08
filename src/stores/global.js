// Import Pinia's defineStore function to create the store
import { defineStore } from 'pinia'

// Import custom validation functions
import { isAriaInvalidDomainName, isAriaInvalidCertContent } from '@/lib/customValidators'

// Import certificate data from a YAML file
import certsData from '@/data/certs.yaml'

// Import Vue's ref and computed for reactive state and computed properties
import { ref, computed } from 'vue'

export const useGlobalStore = defineStore('global', () => {
  // Reactive reference for the domain name
  const domainName = ref('')

  // Reactive reference for certificates data
  const certs = ref(certsData)

  // Computed property to validate the domain name
  const checkAriaInvalidDomainName = computed(() => {
    return isAriaInvalidDomainName(domainName.value)
  })

  // Function to validate the certificate content based on its type
  function checkAriaInvalidCertContent(certContent, certType) {
    return isAriaInvalidCertContent(certContent, certType)
  }

  // Function to get a certificate by its ID
  function getCertById(certId) {
    return certs.value.find((cert) => cert.id === certId)
  }

  // Function to check if all required certificates are filled
  function areRequiredCertsFilled() {
    return certs.value.every((cert) => {
      if (cert.required) {
        return cert.content !== null && cert.content.trim() !== ''
      }
      return true
    })
  }

  // Function to check if all required certificates are filled and valid, and the domain name is valid
  function areCertsValid() {
    // Check if the domain name is valid
    if (isAriaInvalidDomainName(domainName.value) || domainName.value.trim() === '') {
      return false
    }

    // Check if all required certificates are valid and filled
    return certs.value.every((cert) => {
      if (cert.required) {
        return (
          cert.content &&
          cert.content.trim() !== '' &&
          !isAriaInvalidCertContent(cert.content, cert.type)
        )
      }
      if (cert.content && cert.content.trim() !== '') {
        return !isAriaInvalidCertContent(cert.content, cert.type)
      }
      return true
    })
  }

  // Function to get invalid certificates and domain name for error messages
  function getInvalidCerts() {
    const invalidCerts = certs.value
      .filter((cert) => {
        if (cert.required && (!cert.content || cert.content.trim() === '')) {
          return true
        }
        if (
          cert.content &&
          cert.content.trim() !== '' &&
          isAriaInvalidCertContent(cert.content, cert.type)
        ) {
          return true
        }
        return false
      })
      .map((cert) => cert.title)

    // Check if the domain name is invalid
    if (isAriaInvalidDomainName(domainName.value) || domainName.value.trim() === '') {
      invalidCerts.unshift('Domain name')
    }

    return invalidCerts
  }

  // Return state and functions for use in components
  return {
    domainName,
    checkAriaInvalidDomainName,
    checkAriaInvalidCertContent,
    certs,
    getCertById,
    areRequiredCertsFilled,
    areCertsValid,
    getInvalidCerts
  }
})
