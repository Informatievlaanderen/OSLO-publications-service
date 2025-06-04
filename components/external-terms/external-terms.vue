<template>
  <vl-region id="mappingext">
    <vl-typography v-html="$t('content.externalTerminology.description')" />
    <ul>
      <li v-for="ns in metadata?.inDomainNamespaces" :key="ns">
        <a :href="ns">{{ ns }}</a>
      </li>
    </ul>

    <vl-typography
      v-html="
        $t('content.externalTerminology.mappingExplanation', {
          uriDomain: metadata?.uridomain,
        })
      "
    />
    <vl-data-table mod-zebra>
      <thead>
        <tr>
          <th>{{ $t('Term') }}</th>
          <th>URI</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in externalTermsRows">
          <td>
            <a :href="row[0].url" v-vl-tooltip.right>{{ row[0].text }}</a>
          </td>
          <td>
            <p>{{ row[1].text }}</p>
          </td>
        </tr>
      </tbody>
    </vl-data-table>
  </vl-region>
</template>

<script setup lang="ts" name="externalTerms">
import { computed } from 'vue'
import { generateExternalTermsTable } from '~/utils/external-filter'
import type { Configuration } from '~/types/configuration'

import type { Metadata } from '~/types/metadata'
import { ExternalTermRow } from '~/types/externalRow'

const { locale } = useI18n()

const props = defineProps<{
  ap?: Configuration
  metadata?: Metadata
}>()

const externalTermsRows: ComputedRef<ExternalTermRow[][]> = computed(() => {
  if (!props.ap) return []
  return generateExternalTermsTable(props.ap, locale.value as any)
})
</script>
