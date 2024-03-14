<template>
  <p>{{ cardinality }}</p>
</template>

<script lang="ts" setup name="cardinality">
import type { Cardinality } from '~/types/cardinality'
const props = defineProps<Cardinality>()

const cardinality =
  props.min === props.max ? props.min : `${props.min}..${props.max}`
</script>
