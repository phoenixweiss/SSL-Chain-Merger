<script setup>
import { useGlobalStore } from '@/stores/global'

const store = useGlobalStore()
</script>

<template>
  <input
    class="monospaced"
    v-model="store.domainName"
    type="text"
    id="domain_name"
    name="domain_name"
    placeholder="Please enter your domain name"
    :aria-invalid="store.checkAriaInvalidDomainName"
  />
  <small v-if="store.checkAriaInvalidDomainName === true">Please enter valid data.</small>
</template>
