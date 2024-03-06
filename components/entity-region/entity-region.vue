<template>
  <vl-region>
    <entity
      :title="getLabel(item, language, type)"
      :href="getLabel(item, language, type)"
      :description="getDefinition(item, language, type)"
      :usage="getUsage(item, language, type)"
      :properties="item?.properties"
      :vocHref="item?.id"
    />
    <div v-if="item?.properties?.length" class="content">
      <property-table :properties="item?.properties" />
    </div>
  </vl-region>
</template>

<script setup lang="ts" name="entityRegion">
import type { Class } from '~/types/class'
defineProps({
  item: {
    type: Object as () => Class,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
})
</script>
