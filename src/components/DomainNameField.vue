<script setup>
const domainName = ref('')

import { isValidDomain } from '@/lib/customValidators.js'

const ariaInvalidDomainName = computed(() => {
  if (domainName.value.length === 0) {
    return undefined
  } else if (domainName.value.length > 1 && isValidDomain(domainName.value)) {
    return 'false'
  } else {
    return 'true'
  }
})
</script>

<template>
  <input
    class="monospaced"
    v-model="domainName"
    type="text"
    id="domainName"
    name="domainName"
    placeholder="Please enter your domain name"
    :aria-invalid="ariaInvalidDomainName"
  />
  <small v-if="ariaInvalidDomainName == 'true'">Please enter valid data.</small>
</template>
