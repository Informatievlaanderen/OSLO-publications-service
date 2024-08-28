<template>
  <vl-title tag-name="h1" class="title">{{ metadata?.title }}</vl-title>
  <dl>
    <dt>{{ $t('status') }}</dt>
    <a :href="metadata?.status">{{ metadata?.status }}</a>
    <dt>{{ $t('issued') }}</dt>
    <p>{{ metadata?.issued }}</p>
    <dt>{{ $t('thisVersion') }}</dt>
    <a :href="metadata?.uri">{{ metadata?.uri }}</a>
    <role-list :role="$t('authors')" :stakeholders="stakeholders?.authors" />
    <role-list :role="$t('editors')" :stakeholders="stakeholders?.editors" />
    <role-list
      :role="$t('contributors')"
      :stakeholders="stakeholders?.contributors"
    />
  </dl>
</template>

<script setup lang="ts" name="meta">
import type { Metadata } from '~/types/metadata'
import type { Stakeholders } from '~/types/stakeholder'

defineProps<{
  stakeholders: Stakeholders,
  metadata: Metadata
}>()
</script>
