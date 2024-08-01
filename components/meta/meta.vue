<template>
  <vl-title tag-name="h1" class="title">{{ metadata?.title }}</vl-title>
  <dl>
    <dt>Status</dt>
    <a :href="metadata?.status">{{ metadata?.status }}</a>
    <dt>Uitgegeven op</dt>
    <p>{{ metadata?.issued }}</p>
    <dt>Laatste versie</dt>
    <a :href="metadata?.uri">{{ metadata?.uri }}</a>
    <role-list :role="'authors'" :stakeholders="stakeholders?.authors" />
    <role-list :role="'editors'" :stakeholders="stakeholders?.editors" />
    <role-list
      :role="'contributors'"
      :stakeholders="stakeholders?.contributors"
    />
  </dl>
</template>

<script setup lang="ts" name="meta">
import type { Metadata } from '~/types/metadata'
import type { Stakeholders } from '~/types/stakeholder'
defineProps({
  stakeholders: {
    type: Object as PropType<Stakeholders>,
  },
  metadata: {
    type: Object as PropType<Metadata>,
  },
})
</script>
