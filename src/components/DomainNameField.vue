<script setup>
const domainName = ref('')

import { isValidDomain } from '@/lib/customValidators.js'

const ariaInvalid = computed(() => {
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
    v-model="domainName"
    type="text"
    id="domainName"
    name="domainName"
    placeholder="Please enter your domain name"
    :aria-invalid="ariaInvalid"
  />
</template>
