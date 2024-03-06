<template>
  <dt>{{ role }}</dt>
  <dd v-for="contributor in contributors">
    <contributor
      :firstName="contributor?.firstName"
      :lastName="contributor.lastName"
      :email="contributor?.email"
      :workplace="contributor?.workplace"
    />
  </dd>
</template>

<script setup lang="ts">
import type { Contributor } from '~/types/contributor'

defineProps({
  role: String,
  contributors: Array<Contributor>,
})
</script>
