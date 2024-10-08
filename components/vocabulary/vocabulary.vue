<template>
  <content-header :hide-banner="true" />

  <vl-region>
    <vl-layout>
      <LanguageSwitcher :locales="locales" />
      <div class="head">
        <Meta :stakeholders="stakeholders" :metadata="metadata" />
      </div>
      <vl-grid class="content">
        <vl-column width="9" width-s="12">
          <vl-region>
            <introduction id="inleiding">
              <Markdown v-if="introduction" :markdown="introduction" />
              <vl-typography
                v-else
                v-html="
                  $t('content.introduction.voc', {
                    title: metadata?.title,
                  })
                "
              />
            </introduction>
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" id="abstract" class="subtitle">{{
              $t('summary')
            }}</vl-title>
            <Markdown v-if="summary" :markdown="summary" />
            <vl-typography v-else class="typography">
              {{
                $t('content.summary.voc', {
                  title: metadata?.title,
                  lowercaseTitle: metadata?.title?.toLowerCase(),
                })
              }}
            </vl-typography>
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" id="sotd" class="subtitle">{{
              $t('documentState')
            }}</vl-title>
            <Markdown v-if="status" :markdown="status" />
            <vl-typography
              v-else
              class="typography"
              v-html="$t('content.status.voc')"
            />
          </vl-region>
          <ol>
            <li class="list__item">
              <vl-title tag-name="h2" id="license" class="subtitle">{{
                $t('license')
              }}</vl-title>
            </li>
            <vl-region>
              <Markdown v-if="license" :markdown="license" />
              <vl-typography v-else v-html="$t('content.license.voc')" />
            </vl-region>
            <li class="list__item">
              <vl-title tag-name="h2" id="conformance" class="subtitle">{{
                $t('conformance')
              }}</vl-title>
            </li>
            <vl-region>
              <Markdown v-if="conformance" :markdown="conformance" />
              <vl-typography
                v-else
                class="typography"
                v-html="$t('content.conformance.voc')"
              />
            </vl-region>
            <vl-region>
              <Markdown v-if="other" :markdown="other" />
            </vl-region>
            <li class="list__item">
              <vl-title tag-name="h2" id="overview" class="subtitle">{{
                $t('overview')
              }}</vl-title>
            </li>
            <vl-typography
              v-html="$t('content.overview.voc')"
              class="typography"
            />
            <vl-region>
              <vl-title tag-name="h3" class="subtitle"
                ><strong>{{ $t('classes') }}</strong></vl-title
              >
              <links-overview
                :links="entitiesToNavigation(inPackageMerged, locale, VOC)"
              />
            </vl-region>
            <vl-title tag-name="h3" class="subtitle">
              <strong>{{ $t('properties') }}</strong></vl-title
            >
            <vl-region>
              <links-overview
                :links="entitiesToNavigation(inPackageProperties, locale, VOC)"
              />
            </vl-region>
            <vl-title tag-name="h3" class="subtitle">
              <strong>{{ $t('externalTerminology') }}</strong></vl-title
            >
            <vl-region>
              <links-overview
                :links="entitiesToNavigation(externalProperties, locale, VOC)"
              />
            </vl-region>
            <!-- CLASSES -->
            <li class="list__item">
              <vl-title tag-name="h2" id="classes" class="subtitle">{{
                $t('classes')
              }}</vl-title>
            </li>
            <vl-typography v-html="$t('content.classes.voc')" />
            <!-- Take both the datatypes and classes for the voc -->
            <vl-region v-for="item in inPackageMerged">
              <vl-title
                tag-name="h3"
                :id="getAnchorTag(item, locale, VOC)"
                class="subtitle"
                >{{ $t('class') }}
                <i>{{ getLabel(item, locale, VOC) }}</i></vl-title
              >
              <data-table
                :headers="[$t('type'), $t('property.property')]"
                :rows="[
                  [$t('URI'), item?.id],
                  [$t('definition'), getDefinition(item, locale, VOC)],
                  [$t('usage'), getUsage(item, locale, VOC)],
                ]"
              />
            </vl-region>
            <!-- PROPERTIES -->
            <li class="list__item">
              <vl-title tag-name="h2" id="properties" class="subtitle">{{
                $t('entities')
              }}</vl-title>
            </li>
            <vl-typography v-html="$t('content.properties.voc')" />
            <vl-region v-for="item in inPackageProperties">
              <vl-title
                tag-name="h3"
                :id="getAnchorTag(item, locale, VOC)"
                class="subtitle"
                >{{ $t('property.property') }}
                {{ getLabel(item, locale, VOC) }}</vl-title
              >
              <data-table
                :headers="[$t('type'), $t('property.property')]"
                :rows="[
                  [$t('URI'), item?.id],
                  [$t('range'), item?.range.id],
                  [$t('domain'), item?.domain],
                  [$t('definition'), getDefinition(item, locale, VOC)],
                  [$t('usage'), getUsage(item, locale, VOC)],
                ]"
              />
            </vl-region>
            <!-- TERMINOLOGIES -->
            <li class="list__item">
              <vl-title tag-name="h2" id="external" class="subtitle">{{
                $t('externalTerminology')
              }}</vl-title>
            </li>
            <vl-typography v-html="$t('content.externalTerminology.voc')">
            </vl-typography>
          </ol>
          <vl-region v-for="item in externalProperties">
            <vl-title
              tag-name="h3"
              :id="getLabel(item, locale, VOC)"
              class="subtitle"
              >{{ getLabel(item, locale, VOC) }}</vl-title
            >
            <data-table :headers="[]" :rows="[[$t('URI'), item?.id]]" />
          </vl-region>
        </vl-column>
        <vl-column width="3" width-s="12">
          <side-navigation :links="overview?.links"></side-navigation>
        </vl-column>
      </vl-grid>
    </vl-layout>
  </vl-region>
  <content-footer />
</template>

<script setup lang="ts">
import Meta from '~/components/meta/meta.vue'
import Introduction from '~/components/introduction/introduction.vue'
import { VOC } from '~/constants/constants'
import type { Metadata } from '~/types/metadata'
import type { Configuration } from '~/types/configuration'
import type { Stakeholders } from '~/types/stakeholder'
import type { Markdown } from '~/types/markdown'
import type { OverviewLinks } from '~/types/linksOverview'
import {
  entitiesToNavigation,
  getUsage,
  getDefinition,
  getAnchorTag,
  getLabel,
} from '~/utils/publication-filter'

const { t, locale } = useI18n()

const props = defineProps<{
  locales: {
    required: true
    type: Array<string>
  }
  voc: Configuration
  metadata: Metadata
  stakeholders: Stakeholders
  markdown: Array<Markdown>
}>()

const introduction = findMarkdownByTitle('Introduction', props.markdown)
const summary = findMarkdownByTitle('Summary', props.markdown)
const license = findMarkdownByTitle('License', props.markdown)
const status = findMarkdownByTitle('Status', props.markdown)
const conformance = findMarkdownByTitle('Conformance', props.markdown)
const other = findMarkdownByTitle('Other', props.markdown)

const overview: OverviewLinks = {
  links: [
    {
      href: '#abstract',
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
      href: '#classes',
      title: t('classes'),
    },
    {
      href: '#properties',
      title: t('properties'),
    },
    {
      href: '#external',
      title: t('externalTerminology'),
    },
  ],
}

const {
  inPackageMerged = [],
  inPackageProperties = [],
  externalProperties = [],
} = props.voc ?? {}
</script>
