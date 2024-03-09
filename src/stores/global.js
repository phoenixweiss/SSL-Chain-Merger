import { defineStore } from 'pinia'
import { isAriaInvalidDomainName, isAriaInvalidCertContent } from '@/lib/customValidators'
import certsData from '@/data/certs.yaml'

export const useGlobalStore = defineStore('global', () => {
  const domainName = ref('')
  const certs = ref(certsData)

  const checkAriaInvalidDomainName = computed(() => {
    return isAriaInvalidDomainName(domainName.value)
  })

  function checkAriaInvalidCertContent(certContent, certType) {
    return isAriaInvalidCertContent(certContent, certType)
  }

  function getCertById(certId) {
    return certs.value.find(cert => cert.id === certId);
  }

  return { domainName, checkAriaInvalidDomainName, checkAriaInvalidCertContent, certs, getCertById }
})
