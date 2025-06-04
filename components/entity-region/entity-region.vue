<template>
  <vl-region>
    <entity
      :title="getLabel(item, language, type)"
      :href="
        generateAnchorTag({ entity: item, language: language as Languages })
      "
      :description="getDefinition(item, language, type)"
      :usage="getUsage(item, language, type)"
      :properties="item?.properties"
      :parents="item?.parents"
      :vocHref="item?.id"
      :language="language ?? 'nl'"
      :type="type"
    />
    <div v-if="item?.properties?.length" class="content">
      <property-table
        :properties="item.properties"
        :parentHref="
          generateAnchorTag({ entity: item, language: language as Languages })
        "
        :language="language ?? 'nl'"
        :type="type"
      />
    </div>
  </vl-region>
</template>

<script setup lang="ts" name="entityRegion">
import { getLabel, getDefinition, getUsage } from '~/utils/publication-filter'
import type { Class } from '~/types/class'
import { Languages } from '~/enum/language'
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
