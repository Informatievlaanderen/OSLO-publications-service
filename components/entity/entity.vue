<template>
  <vl-title tag-name="h3" :id="href"
    ><a :href="vocHref" v-vl-tooltip.right="vocHref">{{ title }}</a></vl-title
  >
  <dl>
    <template v-if="description">
      <dt>{{ $t('entity.description') }}</dt>
      <dd>{{ description }}</dd>
    </template>
    <template v-if="usage">
      <dt>{{ $t('entity.usage') }}</dt>
      <dd>{{ usage }}</dd>
    </template>
    <template v-if="parents?.length">
      <dt>{{ $t('entity.subClassOf') }}</dt>
      <template v-for="(parent, index) in parents">
        <a :href="parent.id">{{ getLabel(parent, language, type) }}</a>
        <span v-if="index < parents?.length - 1">, </span>
        <span v-else>.</span>
      </template>
    </template>
    <dt>{{ $t('properties') }}</dt>
    <dd v-if="properties?.length">
      {{ $t('entity.properties') }}
      <template v-for="(property, index) in properties">
        <span v-html="generateLink(property, index, properties?.length)"></span>
      </template>
    </dd>
    <dd v-else>{{ $t('entity.noProperties') }}</dd>
  </dl>
</template>

<script setup lang="ts" name="entity">
import { getLabel, getAnchorTag } from '~/utils/publication-filter'
import type { Class } from '~/types/class'
import type { Entity } from '~/types/entity'
const props = defineProps<Entity>()

const generateLink = (property: Class, index: number, length?: number) => {
  const href = `#${props.href}.${getAnchorTag(property, props.language, props.type)}`
  const label = getLabel(property, props.language, props.type)
  const separator = index < (length ?? 0) - 1 ? ', ' : '.'

  return `<span><a href="${href}">${label}</a>${separator}</span>`
}
</script>
