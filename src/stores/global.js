import { defineStore } from 'pinia'
import { isAriaInvalidDomainName } from '@/lib/customValidators'

export const useGlobalStore = defineStore('global', () => {
  const domainName = ref('')

  const checkAriaInvalidDomainName = computed(() => {
    return isAriaInvalidDomainName(domainName.value)
  })

  return { domainName, checkAriaInvalidDomainName }
})
