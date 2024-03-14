<template>
  <vl-region>
    <entity
      :title="getLabel(item, language, type)"
      :href="getAnchorTag(item, language, type)"
      :description="getDefinition(item, language, type)"
      :usage="getUsage(item, language, type)"
      :properties="item?.properties"
      :vocHref="item?.id"
      :language="language ?? 'nl'"
      :type="type"
    />
    <div v-if="item?.properties?.length" class="content">
      <property-table
        :properties="sortClasses(item?.properties, language, type)"
        :parentHref="getAnchorTag(item, language, type)"
        :language="language ?? 'nl'"
        :type="type"
      />
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
