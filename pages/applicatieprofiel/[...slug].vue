<template>
  <content-header :banner="false" />
  <vl-region>
    <vl-layout>
      <div class="head">
        <vl-title tag-name="h1" class="title">{{ data?.title }}</vl-title>
        <dl>
          <dt>Laatste aanpasing</dt>
          <dd>{{ data?.dateModified }}</dd>
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
            <introduction id="introduction">
              <p>
                Dit document beschrijft een <strong>applicatieprofiel</strong>,
                in dit geval <strong>{{ data?.title }}</strong
                >. Dit applicatieprofiel beantwoordt de vraag over hoe het
                corresponderende domeinmodel in de praktijk kan toegepast
                worden. Daarbij worden de beperkingen (kardinaliteit,
                codelijsten) toegelicht en de overeenkomstige (RDF) termen
                opgelijst.
              </p>
            </introduction>
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" class="subtitle" id="summary"
              >Samenvatting</vl-title
            >
            <VlTypography class="typography" v-html="data?.summary" />
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" class="subtitle" id="status"
              >Status van dit document</vl-title
            >
            <VlTypography class="typography" v-html="data?.status" />
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" class="subtitle" id="license"
              >Licentie</vl-title
            >
            <div>
              <p>
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
              </p>
            </div>
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" class="subtitle" id="conformance"
              >Confirmiteit</vl-title
            >
            <VlTypography class="typography" v-html="data?.conformance" />
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" class="subtitle" id="overview"
              >Overzicht</vl-title
            >
            <vl-title tag-name="h3" class="subtitle">Entiteiten</vl-title>
            <vl-region>
              <links-overview :links="data?.entities" />
            </vl-region>
            <vl-title tag-name="h3" class="subtitle">Datatypes</vl-title>
            <vl-region>
              <links-overview :links="data?.datatypes" />
            </vl-region>
            <a  target="_blank" :href="`/doc/${params?.slug?.[0]}/overview.jpg`">
              <img
                :src="`${rootPath}/${params?.slug?.[0]}/overview.jpg`"
                alt="Overview model"
              />
            </a>
          </vl-region>
          <vl-title tag-name="h2" class="subtitle">Entiteiten</vl-title>
          <template v-for="entity in data?.entities">
            <entity
              :title="entity?.title"
              :href="entity?.href"
              :description="entity?.description"
              :usage="entity?.usage"
              :properties="entity?.properties"
              :vocHref="entity?.vocHref"
            />
            <vl-region>
              <property-table :properties="entity?.properties" />
            </vl-region>
          </template>
          <vl-region>
            <vl-title tag-name="h2" class="subtitle">Datatypes</vl-title>
            <template v-for="datatype in data?.datatypes">
              <property-table :properties="datatype?.properties" />
            </template>
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" class="subtitle" id="jsonld"
              >JSON-LD context</vl-title
            >
            <p v-if="data?.jsonLD">
              Een herbruikbare JSON-LD context definitie voor dit
              applicatieprofiel is terug te vinden op:
              <a :href="data?.jsonLD">{{ data?.jsonLD }}</a>
            </p>
          </vl-region>
        </vl-column>
        <vl-column width="3" width-s="12">
          <side-navigation :links="links"></side-navigation>
        </vl-column>
      </vl-grid>
    </vl-layout>
  </vl-region>
  <content-footer />
</template>

<script setup lang="ts">
import type { VlTypography } from '@govflanders/vl-ui-design-system-vue3'
import type { Configuration } from '~/types/configuration'
import type { NavigationLink } from '~/types/navigationLink'

const { params } = useRoute()
const rootPath = import.meta.env.VITE_ROOT_PATH;

const links: NavigationLink[] = [
  {
    href: '#introduction',
    title: 'Inleiding',
  },
  {
    href: '#summary',
    title: 'Samenvatting',
  },
  {
    href: '#status',
    title: 'Status van dit document',
  },
  {
    href: '#license',
    title: 'Licentie',
  },
  {
    href: '#conformance',
    title: 'Conformiteit',
  },
  {
    href: '#overview',
    title: 'Overzicht',
  },
  {
    href: '#jsonld',
    title: 'JSON-LD context',
  },
]

// Multiple queryContents require to await them all at the same time: https://github.com/nuxt/content/issues/1368
const { data } = await useAsyncData('data', async () => {
  const [data] = await Promise.all([
    queryContent<Configuration>(`${params?.slug?.[0]}/configuration`).find(),
  ])
  return data[0]
})
if (!data?.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}
</script>
