<template>
  <vl-region v-if="metadata?.filename">
    <vl-title tag-name="h2" id="jsonld" class="subtitle"
      >JSON-LD context</vl-title
    >
    <p>
      {{ $t('jsonldContext') }}:
      <a
        :href="`${rootPath}/${params?.slug?.[0]}/${locale}/${metadata.filename}.jsonld`"
      >
        {{
          `${rootPath}/${params?.slug?.[0]}/${locale}/${metadata.filename}.jsonld`
        }}
      </a>
    </p>
  </vl-region>
  <vl-region v-if="metadata?.filename">
    <vl-title tag-name="h2" id="shacl" class="subtitle"
      >SHACL template</vl-title
    >
    <p>
      {{ $t('shaclTemplate') }}:
      <a
        :href="`${rootPath}/${params?.slug?.[0]}/${locale}/${metadata.filename}-SHACL.ttl`"
        >{{
          `${rootPath}/${params?.slug?.[0]}/${locale}/${metadata.filename}-SHACL.ttl`
        }}</a
      >
    </p>
  </vl-region>
</template>

<script setup lang="ts" name="example-files">
const rootPath = import.meta.env.VITE_ROOT_PATH
const { params } = useRoute()

const { locale } = useI18n()
import type { Metadata } from '~/types/metadata'
defineProps({
  metadata: {
    type: Object as PropType<Metadata>,
  },
})
</script>
