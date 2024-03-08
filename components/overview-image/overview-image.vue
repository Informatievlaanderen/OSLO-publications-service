<template>
  <a :href="imageHref" target="_blank">
    <img :src="imageSrc" @error="onImageError" alt="Overview model" />
  </a>
</template>

<script setup lang="ts" name="overviewImage">
const { params } = useRoute()
const rootPath = import.meta.env.VITE_ROOT_PATH

const imageHref = ref(`${rootPath}/${params.slug[0]}/overview.svg`)
const imageSrc = ref(`${rootPath}/${params.slug[0]}/overview.svg`)

const onImageError = () => {
  imageHref.value = `${rootPath}/${params.slug[0]}/overview.jpg`
  imageSrc.value = `${rootPath}/${params.slug[0]}/overview.jpg`
}
</script>
