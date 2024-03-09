import { defineStore } from 'pinia'
import { isAriaInvalidDomainName } from '@/lib/customValidators'
import certsData from '@/data/certs.yaml'

export const useGlobalStore = defineStore('global', () => {
  const domainName = ref('')
  const certs = ref(certsData)

  const checkAriaInvalidDomainName = computed(() => {
    return isAriaInvalidDomainName(domainName.value)
  })

  const getCertById = computed(() => {
    return certId => certs.find((cert) => cert.id === certId)
  })

  return { domainName, checkAriaInvalidDomainName, certs, getCertById }
})
