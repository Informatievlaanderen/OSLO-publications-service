<template>
  <content-header :hide-banner="true" />
  <vl-region>
    <vl-layout>
      <div class="head">
        <vl-title tag-name="h1" class="title"
          >Applicatieprofiel {{ data?.ap?.title }}</vl-title
        >
        <dl>
          <dt>Laatste aanpasing</dt>
          <dd>{{ data?.ap?.dateModified }}</dd>
          <template v-if="data?.ap?.authors">
            <dt>Auteurs</dt>
            <dd v-for="author in data?.ap?.authors">
              <contributor
                :firstName="author?.firstName"
                :lastName="author.lastName"
                :email="author?.email"
                :workplace="author?.workplace"
              />
            </dd>
          </template>
          <template v-if="data?.ap?.editors">
            <dt>Editoren</dt>
            <dd v-for="editor in data?.ap?.editors">
              <contributor
                :firstName="editor?.firstName"
                :lastName="editor.lastName"
                :email="editor?.email"
                :workplace="editor?.workplace"
              />
            </dd>
          </template>
          <template v-if="data?.ap?.contributors">
            <dt>Medewerkers</dt>
            <dd v-for="contributor in data?.ap?.contributors">
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
            <introduction id="inleiding">
              <VlTypography
                v-if="data?.markdown?.introduction"
                v-html="data?.markdown?.introduction"
                class="typography"
              >
              </VlTypography>
              <VlTypography v-else class="typography">
                Dit document beschrijft een <strong>applicatieprofiel</strong>,
                in dit geval <strong>{{ data?.ap?.title }}</strong
                >. Dit applicatieprofiel beantwoordt de vraag over hoe het
                corresponderende domeinmodel in de praktijk kan toegepast
                worden. Daarbij worden de beperkingen (kardinaliteit,
                codelijsten) toegelicht en de overeenkomstige (RDF) termen
                opgelijst.
              </VlTypography>
            </introduction>
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" id="summary" class="subtitle"
              >Samenvatting</vl-title
            >
            <VlTypography v-html="data?.markdown?.summary" class="typography" />
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" id="status" class="subtitle"
              >Status van dit document</vl-title
            >
            <VlTypography
              v-if="data?.markdown?.status"
              v-html="data?.markdown?.status"
              class="typography"
            />
            <VlTypography v-else class="typography">
              <p>
                Dit applicatieprofiel heeft status
                {{ data?.markdown?.status }} en werd uitgegeven op
                {{ data?.ap?.datePublished }}.
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
            <vl-title tag-name="h2" id="license" class="subtitle"
              >Licentie</vl-title
            >
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
            <vl-title tag-name="h2" id="conformance" class="subtitle"
              >Confirmiteit</vl-title
            >
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
            <vl-title tag-name="h2" id="overzicht" class="subtitle"
              >Overzicht</vl-title
            >
            <vl-region>
              <p>
                In dit document wordt correct gebruik van de volgende entiteiten
                toegelicht:
              </p>
              <links-overview
                :links="filterClasses(data?.ap?.classes ?? [], 'nl', AP)"
              />
            </vl-region>
            <vl-region>
              <p>In dit document worden de volgende datatypes toegelicht:</p>
              <links-overview
                :links="filterDatatypes(data?.ap?.dataTypes ?? [], 'nl', AP)"
              />
            </vl-region>
            <a target="_blank" :href="`/doc/${params?.slug?.[0]}/overview.jpg`">
              <img
                :src="`${rootPath}/${params?.slug?.[0]}/overview.jpg`"
                alt="Overview model"
              />
            </a>
          </vl-region>
          <vl-title tag-name="h2" class="subtitle">Entiteiten</vl-title>
          <template
            v-for="item in filterInScopeClasses(data?.ap?.classes ?? [], 'nl')"
          >
            <vl-region>
              <entity
                :title="getLabel(item, 'nl', AP)"
                :href="getLabel(item, 'nl', AP)"
                :description="getDefinition(item, 'nl', AP)"
                :usage="getUsage(item, 'nl', AP)"
                :properties="item?.properties"
                :vocHref="item?.id"
              />
              <vl-region v-if="item?.properties?.length">
                <property-table :properties="item?.properties" />
              </vl-region>
            </vl-region>
          </template>
          <vl-title tag-name="h2" class="subtitle">Datatypes</vl-title>
          <template
            v-for="item in filterInScopeClasses(
              data?.ap?.dataTypes ?? [],
              'nl',
            )"
          >
            <vl-region>
              <entity
                :title="getLabel(item, 'nl', AP)"
                :href="getLabel(item, 'nl', AP)"
                :description="getDefinition(item, 'nl', AP)"
                :usage="getUsage(item, 'nl', AP)"
                :properties="item?.properties"
                :vocHref="item?.id"
              />
            </vl-region>
            <vl-region v-if="item?.properties?.length">
              <property-table :properties="item?.properties" />
            </vl-region>
          </template>
          <vl-region>
            <vl-title tag-name="h2" id="jsonld-context" class="subtitle"
              >JSON-LD context</vl-title
            >
            <p v-if="data?.ap?.jsonLD">
              Een herbruikbare JSON-LD context definitie voor dit
              applicatieprofiel is terug te vinden op:
              <a :href="data?.ap?.jsonLD">{{ data?.ap?.jsonLD }}</a>
            </p>
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" id="jsonld-context" class="subtitle"
              >SHACL template</vl-title
            >
            <p v-if="data?.ap?.jsonLD">
              Een herbruikbare JSON-LD context definitie voor dit
              applicatieprofiel is terug te vinden op:
              <a :href="data?.ap?.jsonLD">{{ data?.ap?.jsonLD }}</a>
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
import { getLabel } from '~/utils/publication-filter'
import { AP } from '~/constants/constants'
import type { Configuration } from '~/types/configuration'
import type { Content } from '~/types/content'
import type { NavigationLink } from '~/types/navigationLink'

const { params } = useRoute()
const rootPath = import.meta.env.VITE_ROOT_PATH

const links: NavigationLink[] = [
  {
    href: '#inleiding',
    title: 'Inleiding',
  },
  {
    href: '#samenvatting',
    title: 'Samenvatting',
  },
  {
    href: '#status-van-dit-document',
    title: 'Status van dit document',
  },
  {
    href: '#licentie',
    title: 'Licentie',
  },
  {
    href: '#conformiteit',
    title: 'Conformiteit',
  },
  {
    href: '#overzicht',
    title: 'Overzicht',
  },
  {
    href: '#jsonld-context',
    title: 'JSON-LD context',
  },
]

// Multiple queryContents require to await them all at the same time: https://github.com/nuxt/content/issues/1368
const { data } = await useAsyncData('data', async () => {
  const [ap, content] = await Promise.all([
    queryContent<Configuration>(`${params?.slug?.[0]}/configuration`).find(),
    queryContent<Content>(`${params?.slug?.[0]}/applicatieprofiel-content`)
      .where({ _extension: 'md' })
      .find(),
  ])

  return {
    ap: ap[0],
    markdown: content[0],
  }
})
if (!data?.value?.ap) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}
</script>
```
