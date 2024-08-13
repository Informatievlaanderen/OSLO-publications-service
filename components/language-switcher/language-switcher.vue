<template>
  <a
    v-for="locale in availableLocales"
    :key="locale?.code"
    @click="updateLocale(locale.code)"
  >
    {{ locale?.name }}
  </a>
  {{ locale }}
</template>

<script setup lang="ts" name="languageSwitcher">
import { useRouter, useRoute } from 'vue-router'
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value)
})

const router = useRouter()
const route = useRoute()

const updateLocale = (lang: string) => {
  setLocale(lang)
  locale.value = lang
  router.push({ query: { ...route.query, lang } })
}
</script>
