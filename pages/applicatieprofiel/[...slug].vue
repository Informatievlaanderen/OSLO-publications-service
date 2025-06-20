<template>
  <ApplicationProfile
    :locales="data?.locales ?? [defaultLocale]"
    :ap="data?.ap"
    :stakeholders="data?.stakeholders"
    :metadata="data?.metadata"
    :markdown="data?.markdown ?? []"
  />
</template>

<script setup lang="ts">
import type { Configuration } from '~/types/configuration'
import type { Stakeholders } from '~/types/stakeholder'
import type { Metadata } from '~/types/metadata'
import type { Markdown } from '~/types/markdown'

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

    const [locales, ap, stakeholders, metadata, markdown] = await Promise.all([
      queryContent(`${params?.slug?.[0]}`).only(['_dir']).find(),
      queryContent<Configuration>(`${basePath}/ap/configuration`)
        .where(jsonQuery)
        .find(),
      queryContent<Stakeholders>(`${basePath}/stakeholders`)
        .where(jsonQuery)
        .find(),
      queryContent<Metadata>(`${basePath}/ap/metadata`).where(jsonQuery).find(),
      queryContent<Markdown>(`${basePath}/markdown/ap/`).where(mdQuery).find(),
    ])

    return {
      locales: Array.from(new Set(locales.map((dir: any) => dir._dir))),
      ap: ap[0],
      stakeholders: stakeholders[0],
      metadata: metadata[0],
      markdown,
    }
  },
  {
    watch: [locale],
  },
)

if (!data?.value?.ap) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}
</script>
