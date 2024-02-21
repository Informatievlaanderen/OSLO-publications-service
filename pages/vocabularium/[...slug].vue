<template>
  <content-header :hide-banner="true" />
  <vl-region>
    <vl-layout>
      <div class="head">
        <vl-title tag-name="h1" class="title">{{ data?.title }}</vl-title>
        <vl-title tag-name="h2" class="subtitle"
          >Uitgegeven op {{ data?.datePublished }}</vl-title
        >
        <dl>
          <dt>Laatste aanpasing</dt>
          <dd>{{ data?.dateModified }}</dd>
          <dt>Laatste versie</dt>
          <a :href="data?.lastVersion">{{ data?.lastVersion }}</a>
          <template v-if="data?.authors">
            <dt>Auteurs</dt>
            <dd v-for="author in data?.authors">
              <contributor
                :firstName="author?.firstName"
                :lastName="author.lastName"
                :email="author?.email"
                :workplace="author?.workplace"
              />
            </dd>
          </template>
          <template v-if="data?.editors">
            <dt>Editoren</dt>
            <dd v-for="editor in data?.editors">
              <contributor
                :firstName="editor?.firstName"
                :lastName="editor.lastName"
                :email="editor?.email"
                :workplace="editor?.workplace"
              />
            </dd>
          </template>
          <template v-if="data?.contributors">
            <dt>Medewerkers</dt>
            <dd v-for="contributor in data?.contributors">
              <contributor
                :firstName="contributor?.firstName"
                :lastName="contributor.lastName"
                :email="contributor?.email"
                :workplace="contributor?.workplace"
              />
            </dd>
          </template>
        </dl>
      </div>
      <vl-grid class="content">
        <vl-column width="9" width-s="12">
          <vl-region>
            <vl-title tag-name="h2" class="subtitle" id="abstract"
              >Samenvatting</vl-title
            >
            <VlTypography class="typography" v-html="data?.summary" />
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" class="subtitle" id="sotd"
              >Status van dit document</vl-title
            >
            <VlTypography class="typography" v-html="data?.status" />
          </vl-region>
          <ol>
            <li class="list__item">
              <vl-title
                tag-name="h2"
                class="subtitle"
                id="license-and-liability"
                >Licentie</vl-title
              >
            </li>
            <VlTypography class="typography" v-html="data?.license" />
            <li class="list__item">
              <vl-title
                tag-name="h2"
                class="subtitle"
                id="conformance-statement"
                >Conformiteit</vl-title
              >
            </li>
            <VlTypography class="typography" v-html="data?.conformance" />
            <li class="list__item">
              <vl-title tag-name="h2" class="subtitle" id="overview"
                >Overzicht</vl-title
              >
            </li>
            <VlTypography class="typography" v-html="data?.overview" />
            <vl-title tag-name="h3" class="subtitle">Klassen</vl-title>
            <vl-region>
              <links-overview :links="data?.classes" />
            </vl-region>
            <vl-title tag-name="h3" class="subtitle">Eigenschappen</vl-title>
            <vl-region>
              <links-overview :links="data?.properties" />
            </vl-region>
            <!-- CLASSES -->
            <li class="list__item">
              <vl-title tag-name="h2" class="subtitle" id="classes"
                >Klassen</vl-title
              >
            </li>
            <vl-region v-for="item in data?.classes">
              <vl-title tag-name="h3" class="subtitle" :id="item?.href"
                >Klasse {{ item?.title }}</vl-title
              >
              <data-table :headers="item?.headers" :rows="item?.rows" />
            </vl-region>
            <!-- PROPERTIES -->
            <li class="list__item">
              <vl-title tag-name="h2" class="subtitle" id="properties"
                >Eigenschappen</vl-title
              >
            </li>
            <vl-region v-for="item in data?.properties">
              <vl-title tag-name="h3" class="subtitle" :id="item?.href"
                >Eigenschap {{ item?.title }}</vl-title
              >
              <data-table
                v-for="item in data?.properties"
                :headers="item?.headers"
                :rows="item?.rows"
              />
            </vl-region>
            <!-- TERMINOLOGIES -->
            <li class="list__item">
              <vl-title tag-name="h2" class="subtitle" id="external"
                >Externe terminologie</vl-title
              >
            </li>
          </ol>
          <vl-region v-for="item in data?.terminologies">
            <vl-title tag-name="h3" class="subtitle" :id="item?.href">{{
              item?.title
            }}</vl-title>
            <data-table :headers="item?.headers" :rows="item?.rows" />
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
import type { Configuration } from '~/types/configuration'
import type { OverviewLinks } from '~/types/linksOverview'

const { params } = useRoute()

const overview: OverviewLinks = {
  links: [
    {
      href: '#abstract',
      title: 'Samenvatting',
    },
    {
      href: '#sotd',
      title: 'Status van dit document',
    },
    {
      href: '#license-and-liability',
      title: '1. Licentie',
    },
    {
      href: '#conformance-statement',
      title: '2. Conformiteit',
    },
    {
      href: '#overview',
      title: '3. Overzicht',
    },
    {
      href: '#classes',
      title: '4. Klassen',
    },
    {
      href: '#properties',
      title: '5. Eigenschappen',
    },
    {
      href: '#external',
      title: '6. Externe terminologie',
    },
  ],
}

// Multiple queryContents require to await them all at the same time: https://github.com/nuxt/content/issues/1368
const { data } = await useAsyncData('data', async () => {
  const [nsData] = await Promise.all([
    queryContent<Configuration>(`ns/${params?.slug?.[0]}/configuration`).find(),
  ])

  return nsData[0]
})

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}
</script>
