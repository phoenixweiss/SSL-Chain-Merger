<script setup>
import { ref, computed } from 'vue'

const domainName = ref('')

const ariaInvalid = computed(() => {
  if (domainName.value.length === 0) {
    return undefined
  } else if (domainName.value.length > 1 && isValidDomain(domainName.value)) {
    return 'false'
  } else {
    return 'true'
  }
})

function isValidDomain(domain) {
  var domainPattern = /^[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/

  if (domain.match(domainPattern)) {
    return true
  } else {
    return false
  }
}
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
