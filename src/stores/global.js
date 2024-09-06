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

  // Return state and functions for use in components
  return { domainName, checkAriaInvalidDomainName, checkAriaInvalidCertContent, certs, getCertById }
})
