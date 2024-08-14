<template>
  <vl-action-group mod-bordered v-if="configuredLocales.length > 1">
    <vl-link
      className="link"
      href="#"
      v-for="locale in configuredLocales"
      :key="locale.code"
      @click.prevent.stop="changeLocale(locale.code)"
    >
      {{ locale.name }}
    </vl-link>
  </vl-action-group>
</template>

<script setup lang="ts" name="languageSwitcher">
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const { setLocale, locales: availableLocales } = useI18n()

const props = defineProps({
  locales: {
    required: true,
    type: Array<string>,
  },
})

const configuredLocales = computed(() => {
  return availableLocales.value.filter((locale) =>
    props.locales.includes(locale.code),
  )
})

const changeLocale = async (code: string) => {
  router.push({ query: { ...route.query, lang: code } })
  await setLocale(code)
}
</script>

<style scoped lang="scss" src="./style.scss" />
