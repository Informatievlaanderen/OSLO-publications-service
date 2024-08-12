<template>
  <div class="vl-u-table-overflow">
    <vl-data-table mod-zebra>
      <thead>
        <tr>
          <th>{{ $t('property.property') }}</th>
          <th>{{ $t('property.expectedType') }}</th>
          <th>{{ $t('property.cardinality') }}</th>
          <th>{{ $t('property.usage') }}</th>
          <th>{{ $t('property.codelist') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="property in properties">
          <td>
            <a
              :href="property?.id"
              :id="`${parentHref}.${getAnchorTag(property, language, type)}`"
              v-vl-tooltip.right="property?.id"
              >{{ getLabel(property, 'nl', 'AP') }}</a
            >
          </td>
          <td>
            <a :href="`#${getLabel(property?.range, 'nl', 'AP')}`">{{
              getLabel(property?.range, 'nl', 'AP')
            }}</a>
          </td>
          <td>
            <!-- "CARDINALITY TO ADD" -->
            <cardinality :min="property?.minCount" :max="property?.maxCount" />
          </td>
          <td>
            {{ getDefinition(property, 'nl', 'AP') }}
          </td>
          <td>
            {{ getUsage(property, 'nl', 'AP') }}
          </td>
          <td>
            <a v-if="property?.codelist" :href="property.codelist">LINK</a>
          </td>
        </tr>
      </tbody>
    </vl-data-table>
  </div>
</template>

<script setup lang="ts" name="propertyTable">
import {
  getLabel,
  getAnchorTag,
  getDefinition,
  getUsage,
} from '~/utils/publication-filter'
import type { Class } from '~/types/class'
defineProps({
  properties: {
    type: Array<Class>,
  },
  language: {
    type: String,
    required: true,
  },
  parentHref: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
})
</script>
