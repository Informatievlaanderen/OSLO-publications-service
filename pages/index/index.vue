<template>
  <content-header title="OSLO" subtitle="Frontend template" />
  <vl-region>
    <vl-layout>
      <language-switcher />
      <p>{{ $t('welcome') }}</p>
      <vl-region>
        <vl-grid>
          <vl-column width="10" width-s="12">
            <vl-title tag-name="h2" id="OSLO-Frontend">OSLO frontend</vl-title>
            <vl-region v-html="data?.about" />
          </vl-column>
        </vl-grid>
      </vl-region>
    </vl-layout>
    <content-footer />
  </vl-region>
</template>

<script setup lang="ts">
import languageSwitcher from '~/components/language-switcher/languague-switcher.vue'
import type { Index } from '~/types/index'

// Multiple queryContents require to await them all at the same time: https://github.com/nuxt/content/issues/1368
const { data } = await useAsyncData('data', async () => {
  const [data] = await Promise.all([
    queryContent<Index>('/configuration').find(),
  ])
  return data[0]
})
</script>
