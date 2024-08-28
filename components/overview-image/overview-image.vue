<template>
  <a :href="imageSrc" target="_blank">
    <img :src="imageSrc" @error="onImageError" alt="Overview model" />
  </a>
</template>

<script setup lang="ts" name="overviewImage">

const props = defineProps({
  language: {
    type: String,
    required: true,
  },
})
const rootPath = import.meta.env.VITE_ROOT_PATH
const { params } = useRoute()

const getImageHref = () => {
  return `${rootPath}/${params?.slug?.[0]}/${props?.language}/overview.svg`
}

const onImageError = () => {
  imageSrc.value = `${rootPath}/${params?.slug?.[0]}/${props?.language}/overview.jpg`
}

let imageSrc = ref(getImageHref())

watch(props, () => {
  imageSrc = ref(getImageHref())
})
</script>
