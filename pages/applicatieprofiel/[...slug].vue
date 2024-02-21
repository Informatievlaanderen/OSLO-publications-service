<template>
  <content-header :hide-banner="true" />
  <vl-region>
    <vl-layout>
      <div class="head">
        <vl-title tag-name="h1" class="title">{{ data?.ap?.title }}</vl-title>
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
              >
              </VlTypography>
              <VlTypography v-else>
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
            <vl-title tag-name="h2" class="subtitle" id="summary"
              >Samenvatting</vl-title
            >
            <VlTypography class="typography" v-html="data?.markdown?.summary" />
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" class="subtitle" id="status"
              >Status van dit document</vl-title
            >
            <VlTypography
              class="typography"
              v-if="data?.markdown?.status"
              v-html="data?.markdown?.status"
            />
            <VlTypography class="typography" v-else>
              <p>
                Dit applicatieprofiel dient om het specifieke gebruik van de
                entiteiten relevant voor de beschreven applicatie te
                verduidelijken.
              </p>
              <p>
                Dit document werd als Kandidaat-standaard gepubliceerd door de
                werkgroep semantiek en bevindt zich in een evaluatieperiode.
                Indien de evaluatie positief beoordeeld wordt door het
                stuurorgaan Vlaams Informatie- en ICT-beleid op basis van een
                aantal referentie implementaties en het behandelen van eventuele
                feedback wordt dit document gepromoot tot Standaard in het
                beschreven domein.
              </p>
              <p>
                Feedback op deze specificatie kan gegeven worden via de
                <a href="mailto:oslo@kb.vlaanderen.be">mailing lijst</a> of als
                een topic in onze
                <a
                  href="https://github.com/Informatievlaanderen/OSLO-Public-Discussion"
                  >publieke reviewdiscussielijst</a
                >.
              </p>
            </VlTypography>
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" class="subtitle" id="license"
              >Licentie</vl-title
            >
            <div>
              <VlTypography
                v-if="data?.markdown?.license"
                v-html="data?.markdown?.license"
                class="typography"
              />
              <p v-else>
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
            <vl-title tag-name="h2" class="subtitle" id="overzicht"
              >Overzicht</vl-title
            >
            <vl-title tag-name="h3" class="subtitle">Entiteiten</vl-title>
            <vl-region>
              <links-overview :links="data?.ap?.entities" />
            </vl-region>
            <vl-title tag-name="h3" class="subtitle">Datatypes</vl-title>
            <vl-region>
              <links-overview :links="data?.ap?.datatypes" />
            </vl-region>
            <a target="_blank" :href="`/doc/${params?.slug?.[0]}/overview.jpg`">
              <img
                :src="`${rootPath}/${params?.slug?.[0]}/overview.jpg`"
                alt="Overview model"
              />
            </a>
          </vl-region>
          <vl-title tag-name="h2" class="subtitle">Entiteiten</vl-title>
          <template v-for="entity in data?.ap?.entities">
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
            <template v-for="datatype in data?.ap?.datatypes">
              <property-table :properties="datatype?.properties" />
            </template>
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" class="subtitle" id="jsonld-context"
              >JSON-LD context</vl-title
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
