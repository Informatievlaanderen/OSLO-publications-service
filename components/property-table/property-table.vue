<template>
  <div class="vl-u-table-overflow">
    <vl-data-table mod-zebra>
      <thead>
        <tr>
          <th>Eigenschap</th>
          <th>Verwacht Type</th>
          <th>Kardinaliteit</th>
          <th>Beschrijving</th>
          <th>Gebruik</th>
          <th>Codelijst</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="property in properties">
          <td>
            <a :href="property?.id" v-vl-tooltip.right="property?.id">{{
              getLabel(property, 'nl', 'AP')
            }}</a>
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
import type { Class } from '~/types/class'
defineProps({
  properties: {
    type: Array<Class>,
  },
})
</script>
