import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', () => {
  const domainName = ref('')

  return { domainName }
})
