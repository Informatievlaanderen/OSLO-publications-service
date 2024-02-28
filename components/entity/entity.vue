<template>
  <vl-title tag-name="h3" :id="href"
    ><a :href="vocHref" v-vl-tooltip.right="vocHref">{{ title }}</a></vl-title
  >
  <dl>
    <template v-if="description">
      <dt>Beschrijving</dt>
      <dd>{{ description }}</dd>
    </template>
    <template v-if="usage">
      <dt>Gebruik</dt>
      <dd>{{ usage }}</dd>
    </template>
    <dt>Eigenschappen</dt>
    <dd v-if="properties?.length">
      Voor deze entiteit zijn de volgende eigenschappen gedefinieerd:
      <template v-for="(property, index) in properties">
        <a :href="property?.id">{{ getLabel(property, 'nl') }}</a>
        <template v-if="index < properties?.length - 1">&#44;&nbsp;</template>
        <template v-else>&#46;</template>
      </template>
    </dd>
    <dd v-else>Voor deze entiteit zijn geen eigenschappen gedefinieerd.</dd>
  </dl>
</template>

<script setup lang="ts" name="entity">
import type { Entity } from '~/types/entity'
defineProps<Entity>()
</script>
