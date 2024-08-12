<template>
  <content-header :hide-banner="true" />
  <vl-region>
    <vl-layout>
      <languague-switcher />
      <div class="head">
        <Meta :metadata="metadata" :stakeholders="stakeholders" />
      </div>
      <vl-grid class="content">
        <vl-column width="9" width-s="12">
          <vl-region>
            <introduction id="introduction">
              <VlTypography
                v-if="markdown?.introduction"
                v-html="markdown?.introduction"
                class="typography"
              >
              </VlTypography>
              <VlTypography v-else class="typography">
                <p
                  v-html="
                    $t('content.introduction.ap', {
                      title: metadata?.title,
                    })
                  "
                ></p>
              </VlTypography>
            </introduction>
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" id="summary" class="subtitle">{{
              $t('summary')
            }}</vl-title>
            <VlTypography v-html="markdown?.summary" class="typography" />
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" id="sotd" class="subtitle">{{
              $t('documentState')
            }}</vl-title>
            <VlTypography
              v-if="markdown?.status"
              v-html="markdown?.status"
              class="typography"
            />
            <VlTypography
              v-else
              class="typography"
              v-html="
                $t('content.status.ap', {
                  status: metadata?.status,
                  statuslabel: metadata?.statuslabel,
                  issued: metadata?.issued,
                })
              "
            >
            </VlTypography>
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" id="license" class="subtitle">{{
              $t('license')
            }}</vl-title>
            <VlTypography
              v-if="markdown?.license"
              v-html="markdown?.license"
              class="typography"
            />
            <VlTypography v-else v-html="$t('content.license.ap')" />
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" id="conformance" class="subtitle">{{
              $t('conformance')
            }}</vl-title>
            <VlTypography
              v-if="markdown?.conformance"
              v-html="markdown?.conformance"
              class="typography"
            />
            <VlTypography
              v-else
              class="typography"
              v-html="$t('content.conformance.ap')"
            />
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" id="overview" class="subtitle">{{
              $t('overview')
            }}</vl-title>
            <vl-region>
              <p>{{ $t('entitiesOverview') }}:</p>
              <links-overview
                :links="entitiesToNavigation(entities, locale, AP)"
              />
            </vl-region>
            <vl-region>
              <p>{{ $t('dataTypesOverview') }}:</p>
              <links-overview
                :links="entitiesToNavigation(scopedDataTypes, locale, AP)"
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
              :language="locale"
              :type="AP"
            />
          </vl-region>
          <vl-title tag-name="h2" class="subtitle">{{
            $t('dataTypes')
          }}</vl-title>
          <entity-region
            v-for="item in scopedDataTypes"
            :item="item"
            :language="locale"
            :type="AP"
          />
          <example-files :metadata="metadata" />
        </vl-column>
        <vl-column width="3" width-s="12">
          <side-navigation :links="getNavigationLinks()"></side-navigation>
        </vl-column>
      </vl-grid>
    </vl-layout>
  </vl-region>
  <content-footer />
</template>

<script setup lang="ts" name="ApplicationProfile">
import { AP } from '~/constants/constants'
import Meta from '~/components/meta/meta.vue'
import type { Configuration } from '~/types/configuration'
import type { Stakeholders } from '~/types/stakeholder'
import type { Content } from '~/types/content'
import type { Metadata } from '~/types/metadata'
import type { NavigationLink } from '~/types/navigationLink'
import { validateLocaleCookie } from '~/utils/i18n'
import { entitiesToNavigation } from '~/utils/publication-filter'

const { locale, defaultLocale, availableLocales, t } = useI18n()

const props = defineProps({
  ap: {
    type: Object as PropType<Configuration>,
  },
  metadata: {
    type: Object as PropType<Metadata>,
  },
  stakeholders: {
    type: Object as PropType<Stakeholders>,
  },
  markdown: {
    type: Object as PropType<Content>,
  },
})

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

const { entities = [], scopedDataTypes = [] } = props?.ap ?? {}
</script>
