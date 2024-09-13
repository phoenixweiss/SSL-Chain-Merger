import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import i18next from 'i18next'
import { DEFAULT_LANGUAGE } from '@/constants'
import { isAriaInvalidDomainName, isAriaInvalidCertContent } from '@/lib/customValidators'
import certsData from '@/data/certs.yaml'

export const useGlobalStore = defineStore('global', () => {
  const domainName = ref('')
  const certs = ref(certsData)
  const currentLanguage = ref(i18next.language || DEFAULT_LANGUAGE)

  function setLanguage(lang) {
    currentLanguage.value = lang
    i18next.changeLanguage(lang)
  }

  i18next.on('languageChanged', (lang) => {
    currentLanguage.value = lang
  })

  const checkAriaInvalidDomainName = computed(() => {
    return isAriaInvalidDomainName(domainName.value)
  })

  function checkAriaInvalidCertContent(certContent, certType) {
    return isAriaInvalidCertContent(certContent, certType)
  }

  function getCertById(certId) {
    return certs.value.find((cert) => cert.id === certId)
  }

  function areRequiredCertsFilled() {
    return certs.value.every((cert) => {
      if (cert.required) {
        return cert.content !== null && cert.content.trim() !== ''
      }
      return true
    })
  }

  function areCertsValid() {
    if (isAriaInvalidDomainName(domainName.value) || domainName.value.trim() === '') {
      return false
    }
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

    if (isAriaInvalidDomainName(domainName.value) || domainName.value.trim() === '') {
      invalidCerts.unshift('Domain name')
    }

    return invalidCerts
  }

  return {
    domainName,
    currentLanguage,
    setLanguage,
    checkAriaInvalidDomainName,
    checkAriaInvalidCertContent,
    certs,
    getCertById,
    areRequiredCertsFilled,
    areCertsValid,
    getInvalidCerts
  }
})
