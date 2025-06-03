<template>
  <vl-region id="mappingext">
    <vl-title tag-name="h2" class="subtitle">
      {{ t('externalTerminology') }}
    </vl-title>

    <vl-typography>
      <p>{{ t('content.externalTerminology.description') }}</p>

      <p>{{ t('content.externalTerminology.inDomainNamespaces') }}:</p>
      <ul>
        <li v-for="ns in metadata?.inDomainNamespaces" :key="ns">
          <a :href="ns">{{ ns }}</a>
        </li>
      </ul>

      <p>
        {{
          t('content.externalTerminology.mappingExplanation', {
            uriDomain: metadata?.uridomain,
          })
        }}
      </p>
      <p>{{ t('content.externalTerminology.definitionAgreement') }}</p>
      <p>{{ t('content.externalTerminology.mappingChoice') }}</p>
      <p>{{ t('content.externalTerminology.semanticChanges') }}</p>
    </vl-typography>

    <data-table
      :headers="[t('term'), 'URI']"
      :rows="externalTermsRows"
      class="external"
    />
  </vl-region>
</template>

<script setup lang="ts" name="externalTerms">
import { computed } from 'vue'
import type { Configuration } from '~/types/configuration'
import type { Metadata } from '~/types/metadata'

const { t, locale } = useI18n()

const props = defineProps<{
  ap?: Configuration
  metadata?: Metadata
}>()

const externalTermsRows = computed(() => {
  const rows: (string | { text: string; url: string })[][] = []
  const language = locale.value
})
</script>

<style scoped lang="scss">
.external {
  .definition {
    width: 100%;

    th,
    td {
      padding: 8px;
      text-align: left;
    }

    code {
      font-family: monospace;
      background-color: #f5f5f5;
      padding: 2px 4px;
      border-radius: 3px;
    }
  }
}
</style>
