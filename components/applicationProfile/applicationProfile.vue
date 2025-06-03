<template>
  <div></div>
  <content-header :hide-banner="true" />
  <vl-region>
    <vl-layout>
      <vl-grid>
        <!-- <LanguageSwitcher :locales="locales" /> -->
        <vl-column class="head">
          <Meta :metadata="metadata" :stakeholders="stakeholders" />
        </vl-column>
      </vl-grid>
      <vl-grid class="content">
        <vl-column width="9" width-s="12">
          <vl-region>
            <introduction id="introduction">
              <Markdown v-if="introduction" :markdown="introduction">
              </Markdown>
              <vl-typography v-else class="typography">
                <p
                  v-html="
                    $t('content.introduction.ap', {
                      title: metadata?.title,
                    })
                  "
                ></p>
              </vl-typography>
            </introduction>
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" id="summary" class="subtitle">{{
              $t('summary')
            }}</vl-title>
            <Markdown v-if="summary" :markdown="summary" />
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" id="sotd" class="subtitle">{{
              $t('documentState')
            }}</vl-title>
            <Markdown v-if="status" :markdown="status" />
            <vl-typography
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
            </vl-typography>
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" id="license" class="subtitle">{{
              $t('license')
            }}</vl-title>
            <Markdown v-if="license" :markdown="license" />
            <vl-typography v-else v-html="$t('content.license.ap')" />
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" id="conformance" class="subtitle">{{
              $t('conformance')
            }}</vl-title>
            <Markdown v-if="conformance" :markdown="conformance" />
            <vl-typography
              v-else
              class="typography"
              v-html="$t('content.conformance.ap')"
            />
          </vl-region>
          <vl-region>
            <Markdown v-if="other" :markdown="other" />
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" id="overview" class="subtitle">{{
              $t('overview')
            }}</vl-title>
            <vl-region>
              <p>{{ $t('entitiesOverview') }}:</p>
              <links-overview
                :links="entitiesToNavigation(classes, locale, AP)"
              />
            </vl-region>
            <vl-region>
              <p>{{ $t('dataTypesOverview') }}:</p>
              <links-overview
                :links="entitiesToNavigation(datatypes, locale, AP)"
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
              v-for="item in classes"
              :item="item"
              :language="locale"
              :type="AP"
            />
          </vl-region>
          <vl-title tag-name="h2" class="subtitle">{{
            $t('dataTypes')
          }}</vl-title>
          <entity-region
            v-for="item in datatypes"
            :item="item"
            :language="locale"
            :type="AP"
          />
          <example-files :metadata="metadata" />
          <external-terms
            v-if="metadata?.inDomainNamespaces"
            :ap="props.ap"
            :metadata="metadata"
          />
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
import Introduction from '~/components/introduction/introduction.vue'
import type { Configuration } from '~/types/configuration'
import type { Stakeholders } from '~/types/stakeholder'
import type { Markdown } from '~/types/markdown'
import type { Metadata } from '~/types/metadata'
import type { NavigationLink } from '~/types/navigationLink'
import { validateLocaleCookie } from '~/utils/i18n'
import { entitiesToNavigation } from '~/utils/publication-filter'

const { locale, defaultLocale, availableLocales, t } = useI18n()

const props = defineProps<{
  ap?: Configuration
  metadata?: Metadata
  stakeholders?: Stakeholders
  markdown: Array<Markdown>
}>()

const introduction = findMarkdownByTitle('Introduction', props.markdown)
const summary = findMarkdownByTitle('Summary', props.markdown)
const license = findMarkdownByTitle('License', props.markdown)
const status = findMarkdownByTitle('Status', props.markdown)
const conformance = findMarkdownByTitle('Conformance', props.markdown)
const other = findMarkdownByTitle('Other', props.markdown)

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
    { href: '#mappingext', title: 'Externe terminologie' },
  ]
}

const { classes = [], datatypes = [] } = props?.ap ?? {}
</script>
