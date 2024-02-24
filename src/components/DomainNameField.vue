<script setup>
import { useGlobalStore } from '@/stores/global.js'

const store = useGlobalStore()

import { isValidDomain } from '@/lib/customValidators.js'

const ariaInvalidDomainName = computed(() => {
  if (store.domainName.length === 0) {
    return undefined
  } else if (store.domainName.length > 1 && isValidDomain(store.domainName)) {
    return 'false'
  } else {
    return 'true'
  }
})
</script>

<template>
  <input
    class="monospaced"
    v-model="store.domainName"
    type="text"
    id="store.domainName"
    name="store.domainName"
    placeholder="Please enter your domain name"
    :aria-invalid="ariaInvalidDomainName"
  />
  <small v-if="ariaInvalidDomainName == 'true'">Please enter valid data.</small>
</template>
