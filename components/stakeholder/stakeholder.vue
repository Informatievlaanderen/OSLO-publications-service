<template>
  <span v-if="lastName">{{ lastName }}&comma;&nbsp;</span>
  <span v-if="firstName">{{ firstName }}</span>
  &#45;
  <a v-if="affiliation" :href="affiliation?.homepage">{{ affiliation?.affiliationName }}</a>
  &#45;
  <a v-if="email" :href="'mailto:' + email">{{ email }}</a>
</template>

<script setup lang="ts" name="stakeholder">
import type { Stakeholder } from '~/types/stakeholder'
defineProps<Stakeholder>()
</script>
