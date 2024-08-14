<template>
  <Vocabulary
    :locales="data?.locales ?? [defaultLocale]"
    :voc="data?.voc"
    :stakeholders="data?.stakeholders"
    :metadata="data?.metadata"
    :markdown="data?.markdown"
  />
</template>

<script setup lang="ts">
import type { Metadata } from '~/types/metadata'
import type { Configuration } from '~/types/configuration'
import type { Stakeholders } from '~/types/stakeholder'
import type { Content } from '~/types/content'

const { defaultLocale, availableLocales, locale, setLocale } = useI18n()
const { params, query } = useRoute()

// Check to see if query paramaters are set for lang and set the locale accordingly
// Dont make this code reactive so that it only runs once
const lang: string = query.lang?.toString() ?? defaultLocale

await setLocale(
  lang
    ? validateLocaleCookie(lang, defaultLocale, availableLocales)
    : defaultLocale,
)

// Multiple queryContents require to await them all at the same time: https://github.com/nuxt/content/issues/1368
const { data } = await useAsyncData(
  'data',
  async () => {
    const basePath = `${params?.slug?.[0]}/${locale?.value}`
    const jsonQuery = { _extension: 'json' }
    const mdQuery = { _extension: 'md' }

    const [locales, voc, stakeholders, metadata, content] = await Promise.all([
      queryContent(`${params?.slug?.[0]}`).only(['_dir']).find(),
      queryContent<Configuration>(`${basePath}/configuration`)
        .where(jsonQuery)
        .find(),
      queryContent<Stakeholders>(`${basePath}/stakeholders`)
        .where(jsonQuery)
        .find(),
      queryContent<Metadata>(`${basePath}/metadata-voc`)
        .where(jsonQuery)
        .find(),
      queryContent<Content>(`${basePath}/content-voc`).where(mdQuery).find(),
    ])

    return {
      locales: Array.from(new Set(locales.map((dir: any) => dir._dir))),
      voc: voc[0],
      stakeholders: stakeholders[0],
      metadata: metadata[0],
      markdown: content[0],
    }
  },
  {
    watch: [locale],
  },
)

if (!data?.value?.voc) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}
</script>
