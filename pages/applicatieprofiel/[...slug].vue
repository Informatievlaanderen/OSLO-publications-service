<template>
  <content-header :hide-banner="true" />
  <vl-region>
    <vl-layout>
      <languague-switcher />
      <div class="head">
        <Meta :metadata="data?.metadata" :stakeholders="data?.stakeholders" />
      </div>
      <vl-grid class="content">
        <vl-column width="9" width-s="12">
          <vl-region>
            <introduction id="introduction">
              <VlTypography
                v-if="data?.markdown?.introduction"
                v-html="data?.markdown?.introduction"
                class="typography"
              >
              </VlTypography>
              <VlTypography v-else class="typography">
                <p
                  v-html="
                    $t('content.introduction', { title: data?.metadata?.title })
                  "
                ></p>
              </VlTypography>
            </introduction>
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" id="summary" class="subtitle">{{
              $t('summary')
            }}</vl-title>
            <VlTypography v-html="data?.markdown?.summary" class="typography" />
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" id="sotd" class="subtitle">{{
              $t('documentState')
            }}</vl-title>
            <VlTypography
              v-if="data?.markdown?.status"
              v-html="data?.markdown?.status"
              class="typography"
            />
            <VlTypography v-else class="typography">
              <p>
                Dit applicatieprofiel heeft status
                <a :href="data?.metadata?.status">{{
                  data?.metadata?.statuslabel
                }}</a>
                en werd uitgegeven op {{ data?.metadata.issued }}.
              </p>
              <p>
                Informatie over het gevolgde proces en de beslissingen om tot
                deze specificatie te komen zijn beschikbaar in het
                <a href="https://data.vlaanderen.be/standaarden"
                  >standaardenregister</a
                >.
              </p>
            </VlTypography>
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" id="license" class="subtitle">{{
              $t('license')
            }}</vl-title>
            <VlTypography
              v-if="data?.markdown?.license"
              v-html="data?.markdown?.license"
              class="typography"
            />
            <VlTypography v-else>
              Deze specificatie van
              <a
                href="https://overheid.vlaanderen.be/digitaal-vlaanderen/informatie-vlaanderen"
                >Informatie Vlaanderen</a
              >
              is gepubliceerd onder de
              <a
                href="https://overheid.vlaanderen.be/sites/default/files/documenten/ict-egov/licenties/hergebruik/modellicentie_gratis_hergebruik_v1_0.html"
                >"Modellicentie Gratis Hergebruik - v1.0"</a
              >.
            </VlTypography>
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" id="conformance" class="subtitle">{{
              $t('conformance')
            }}</vl-title>
            <VlTypography
              v-if="data?.markdown?.conformity"
              v-html="data?.markdown?.conformity"
              class="typography"
            />
            <VlTypography v-else class="typography">
              <p>
                De conformiteit voor applicatieprofielen is
                <a
                  href="https://data.vlaanderen.be/doc/begeleidend/applicatieprofielen/conformiteit/"
                  >hier</a
                >
                te vinden.
              </p>
            </VlTypography>
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" id="overview" class="subtitle">{{
              $t('overview')
            }}</vl-title>
            <vl-region>
              <p>{{ $t('entitiesOverview') }}:</p>
              <links-overview
                :links="entitiesToNavigation(entities, language, AP)"
              />
            </vl-region>
            <vl-region>
              <p>{{ $t('dataTypesOverview') }}:</p>
              <links-overview
                :links="entitiesToNavigation(scopedDataTypes, language, AP)"
              />
            </vl-region>
            <overview-image
              :language="
                validateLocaleCookie(locale, defaultLocale, availableLocales)
              "
            />
          </vl-region>

          <vl-region>
            <vl-title tag-name="h2" class="subtitle">{{
              $t('entities')
            }}</vl-title>
            <entity-region
              v-for="item in entities"
              :item="item"
              language="nl"
              :type="AP"
            />
          </vl-region>
          <vl-title tag-name="h2" class="subtitle">{{
            $t('dataTypes')
          }}</vl-title>
          <entity-region
            v-for="item in scopedDataTypes"
            :item="item"
            language="nl"
            :type="AP"
          />
          <example-files :metadata="data?.metadata" />
        </vl-column>
        <vl-column width="3" width-s="12">
          <side-navigation :links="getNavigationLinks()"></side-navigation>
        </vl-column>
      </vl-grid>
    </vl-layout>
  </vl-region>
  <content-footer />
</template>

<script setup lang="ts">
import { AP } from '~/constants/constants'
import Meta from '~/components/meta/meta.vue'
import type { Configuration } from '~/types/configuration'
import type { Stakeholders } from '~/types/stakeholder'
import type { Content } from '~/types/content'
import type { Metadata } from '~/types/metadata'
import type { NavigationLink } from '~/types/navigationLink'
import { validateLocaleCookie } from '~/utils/locale-validator'
import { entitiesToNavigation } from '~/utils/publication-filter'

import { Languages } from '~/enum/language'

const { locale, defaultLocale, availableLocales, t, setLocale } = useI18n()
const { params, query } = useRoute()

// Check to see if query paramaters are set for lang and set the locale accordingly
// Dont make this code reactive so that it only runs once
const lang: string | undefined = query.lang?.toString()

if (lang) {
  setLocale(validateLocaleCookie(lang, defaultLocale, availableLocales))
}

const getNavigationLinks = (): NavigationLink[] => {
  return [
    {
      href: '#introduction',
      title: t('introduction'),
    },
    {
      href: '#summary',
      title: t('summary'),
    },
    {
      href: '#sotd',
      title: t('documentState'),
    },
    {
      href: '#license',
      title: t('license'),
    },
    {
      href: '#conformance',
      title: t('conformance'),
    },
    {
      href: '#overview',
      title: t('overview'),
    },
    {
      href: '#jsonld',
      title: 'JSON-LD context',
    },
    {
      href: '#shacl',
      title: 'SHACL template',
    },
  ]
}

// Multiple queryContents require to await them all at the same time: https://github.com/nuxt/content/issues/1368
const { data } = await useAsyncData('data', async () => {
  const basePath = `${params?.slug?.[0]}/${locale?.value}`
  const jsonQuery = { _extension: 'json' }
  const mdQuery = { _extension: 'md' }

  const [ap, stakeholders, metadata, content] = await Promise.all([
    queryContent<Configuration>(`${basePath}/configuration`)
      .where(jsonQuery)
      .find(),
    queryContent<Stakeholders>(`${basePath}/stakeholders`)
      .where(jsonQuery)
      .find(),
    queryContent<Metadata>(`${basePath}/metadata-ap`).where(jsonQuery).find(),
    queryContent<Content>(`${basePath}/applicatieprofiel-content`)
      .where(mdQuery)
      .find(),
  ])

  return {
    ap: ap[0],
    stakeholders: stakeholders[0],
    metadata: metadata[0],
    markdown: content[0],
  }
})

const { entities = [], scopedDataTypes = [] } = data?.value?.ap ?? {}
const language: Languages = Languages.NL

if (!data?.value?.ap) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}
</script>
