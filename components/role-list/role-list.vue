<template>
  <dt>{{ role }}</dt>
  <dd v-for="stakeholder in stakeholders">
    <stakeholder
      :firstName="stakeholder.firstName"
      :lastName="stakeholder.lastName"
      :email="stakeholder.email"
      :affiliation="stakeholder.affiliation"
    />
  </dd>
</template>

<script setup lang="ts">
import type { Stakeholder } from '~/types/stakeholder'

defineProps<{
  role: String
  stakeholders: Array<Stakeholder>
}>()
</script>
