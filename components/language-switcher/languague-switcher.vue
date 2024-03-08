<template>
  <a
    v-for="locale in availableLocales"
    :key="locale?.code"
    @click="setLocale(locale.code)"
  >
    {{ locale?.name }}
  </a>
  {{ locale }}
</template>

<script setup lang="ts" name="languageSwitcher">
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value)
})
</script>

<!-- <template>
  <a
    href="#"
    v-for="locale in availableLocales"
    :key="locale.code"
    @click.prevent.stop="setLocale(locale.code)"
  >
    {{ locale.name }}
  </a>
</template>

<script setup lang="ts" name="languageSwitcher">
const { locale, locales, setLocale } = useI18n()
const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value)
})
</script> -->
