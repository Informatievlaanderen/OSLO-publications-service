<template>
  <content-header :hide-banner="true" />
  <vl-region>
    <vl-layout>
      <div class="head">
        <vl-title tag-name="h1" class="title"
          >Vocabularium {{ data?.voc?.title }}</vl-title
        >
        <vl-title tag-name="h2" class="subtitle"
          >Uitgegeven op {{ data?.voc?.datePublished }}</vl-title
        >
        <dl>
          <dt>Laatste aanpasing</dt>
          <dd>{{ data?.voc?.dateModified }}</dd>
          <dt>Laatste versie</dt>
          <a :href="data?.voc?.lastVersion">{{ data?.voc?.lastVersion }}</a>
          <role-list :role="'authors'" :contributors="data?.voc?.authors" />
          <role-list :role="'editors'" :contributors="data?.voc?.editors" />
          <role-list
            :role="'contributors'"
            :contributors="data?.voc?.contributors"
          />
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
                <p>
                  Dit document beschrijft een <strong>vocabularium</strong>, in
                  dit geval <strong>{{ data?.voc?.title }}</strong
                  >. Een vocabularium is een verzameling van herbruikbare
                  termen, namelijk klassen en eigenschappen, waarvan hun
                  betekenis is vastgelegd door middel van een label en
                  definitie. Voor termen gedefinieerd in dit domein zijn er nog
                  bijkomende formele afspraken beschikbaar. Voor externe termen
                  worden de formele afspraken overgenomen van de externe bron.
                </p>
              </VlTypography>
            </introduction>
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" id="abstract" class="subtitle"
              >Samenvatting</vl-title
            >
            <VlTypography
              v-if="data?.markdown?.summary"
              v-html="data?.markdown?.summary"
              class="typography"
            />
            <VlTypography v-else class="typography">
              Het {{ data?.voc?.title }} vocabularium specificeert een aantal
              klassen en eigenschappen om een
              {{ data?.voc?.title?.toLowerCase() }} te beschrijven.
            </VlTypography>
          </vl-region>
          <vl-region>
            <vl-title tag-name="h2" id="sotd" class="subtitle"
              >Status van dit document</vl-title
            >
            <VlTypography
              v-if="data?.markdown?.status"
              v-html="data?.markdown?.status"
              class="typography"
            />
            <VlTypography v-else class="typography">
              <p>
                <em
                  >Deze sectie beschrijft de status van dit document op het
                  moment van publicatie. Het kan zijn dat er ondertussen al
                  nieuwere versies zijn uitgebracht.</em
                >
              </p>
              <br />
              <p>
                Een lijst van de recentste vocabularia is terug te vinden op
                <a href="https://data.vlaanderen.be/ns"
                  >https://data.vlaanderen.be/ns</a
                >
              </p>
              <p>
                Dit document is een offici&#235;le specificatie van een
                vocabularium en biedt een gedeeld begrippenkader voor bepaalde
                concepten. Deze specificatie dient om de definitie, gebruik,
                domein en bereik van de RDF termen binnen dit domein te
                verduidelijken. De termen gedefinieerd in dit vocabularium zijn
                persistent en zullen bijgevolg nooit verdwijnen, noch zullen de
                definities veranderen behalve dan om een bestaande definitie
                verder te verduidelijken. Termen kunnen echter wel als verouderd
                worden bestempeld en vervangen worden in nieuwere versies van
                deze specificatie.
              </p>
            </VlTypography>
          </vl-region>
          <ol>
            <li class="list__item">
              <vl-title
                tag-name="h2"
                id="license-and-liability"
                class="subtitle"
                >Licentie</vl-title
              >
            </li>
            <vl-region>
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
            <li class="list__item">
              <vl-title
                tag-name="h2"
                id="conformance-statement"
                class="subtitle"
                >Conformiteit</vl-title
              >
            </li>
            <vl-region>
              <VlTypography
                v-if="data?.markdown?.conformity"
                v-html="data?.markdown?.conformity"
                class="typography"
              />
              <VlTypography v-else class="typography">
                <p>
                  Een uitwisseling van gegevens, op welke manier deze
                  uitwisseling ook gebeurt, is conform aan dit vocabularium
                  wanneer het de terminologie (klassen en eigenschappen)
                  gebruikt op een manier die consistent is met de semantiek
                  zoals opgesteld in de nieuwste versie van de specificatie
                  (domein, bereik, definitie en gebruik) en het geen
                  terminologie gebruikt uit andere vocabularia als alternatief
                  voor de voorgestelde terminologie opgenomen in dit
                  vocabularium.
                </p>
              </VlTypography>
            </vl-region>
            <li class="list__item">
              <vl-title tag-name="h2" id="overview" class="subtitle"
                >Overzicht</vl-title
              >
            </li>
            <VlTypography
              >Deze sectie somt alle klassen en eigenschappen van het
              vocabularium op.</VlTypography
            >
            <vl-region>
              <vl-title tag-name="h3" class="subtitle"
                ><strong>Klassen</strong></vl-title
              >
              <links-overview
                :links="filterClasses(data?.voc?.classes ?? [], 'nl')"
              />
            </vl-region>
            <vl-title tag-name="h3" class="subtitle">
              <strong>Eigenschappen</strong></vl-title
            >
            <vl-region>
              <links-overview :links="filterClasses(properties, 'nl')" />
            </vl-region>
            <!-- CLASSES -->
            <li class="list__item">
              <vl-title tag-name="h2" id="classes" class="subtitle"
                >Klassen</vl-title
              >
            </li>
            <VlTypography
              >Deze sectie geeft een formele definitie aan elke
              klasse.</VlTypography
            >
            <vl-region v-for="item in data?.voc?.classes">
              <vl-title tag-name="h3" :id="getAnchorTag(item)" class="subtitle"
                >Klasse <i>{{ item?.vocabularyLabel['nl'] }}</i></vl-title
              >
              <data-table
                :headers="['Type', 'Klasse']"
                :rows="filterClassValues(item, 'nl')"
              />
            </vl-region>
            <!-- PROPERTIES -->
            <li class="list__item">
              <vl-title tag-name="h2" id="properties" class="subtitle"
                >Eigenschappen</vl-title
              >
            </li>
            <VlTypography
              >Deze sectie geeft een formele definitie aan elke eigenschap.
            </VlTypography>
            <vl-region v-for="item in filterInScopeClasses(properties, 'nl')">
              <vl-title tag-name="h3" :id="getAnchorTag(item)" class="subtitle"
                >Eigenschap {{ item?.vocabularyLabel['nl'] }}</vl-title
              >
              <data-table
                :headers="['Type', 'Eigenschap']"
                :rows="filterPropertyValues(item, 'nl')"
              />
            </vl-region>
            <!-- TERMINOLOGIES -->
            <li class="list__item">
              <vl-title tag-name="h2" id="external" class="subtitle"
                >Externe terminologie</vl-title
              >
            </li>
            <VlTypography
              >Deze sectie geeft een overzicht van terminologie uit andere
              vocabularia die relevant is voor dit domeinmodel samen met hun
              Nederlandstalige labels en definities.
            </VlTypography>
          </ol>
          <vl-region v-for="item in filterExternalClasses(properties, 'nl')">
            <vl-title tag-name="h3" :id="getAnchorTag(item)" class="subtitle">{{
              item?.vocabularyLabel['nl']
            }}</vl-title>
            <data-table
              :headers="[]"
              :rows="filterExternalTerminologies(item)"
            />
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
import type { VlTypography } from '@govflanders/vl-ui-design-system-vue3'
import type { Class } from '~/types/class'
import type { Configuration } from '~/types/configuration'
import type { Content } from '~/types/content'
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
  const [voc, content] = await Promise.all([
    queryContent<Configuration>(`${params?.slug?.[0]}/configuration`).find(),
    queryContent<Content>(`${params?.slug?.[0]}/vocabularium-content`)
      .where({ _extension: 'md' })
      .find(),
  ])

  return {
    voc: voc[0],
    markdown: content[0],
  }
})

const properties: Class[] =
  data?.value?.voc?.classes?.flatMap((entity: Class) => entity?.properties) ??
  []

if (!data?.value?.voc) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}
</script>
