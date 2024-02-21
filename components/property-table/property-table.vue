<template>
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
          <a :href="property?.link?.href">{{ property?.link?.title }}</a>
        </td>
        <td>
          <a :href="property?.type?.href">{{ property?.type?.title }}</a>
        </td>
        <td>
          {{ property?.cardinality }}
        </td>
        <td>
          {{ property?.description }}
        </td>
        <td>
          {{ property?.usage }}
        </td>
        <td>
          <a :href="property?.codeList?.href">{{
            property?.codeList?.title
          }}</a>
        </td>
      </tr>
    </tbody>
  </vl-data-table>
</template>

<script setup lang="ts" name="propertyTable">
import type { Properties } from '~/types/entity'
defineProps<Properties>()
</script>
