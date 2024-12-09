<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UMain class="mx-1">
      <h1 class="text-5xl font-bold text-center my-10">{{ post.title }}</h1>
      <div class="prose dark:prose-invert">
        <slot />
      </div>

      
      <UContainer class="flex  items-center justify-center my-4 flex-wrap">
        <UBadge
          icon="heroicons:calendar"
          color="white"
          variant="solid"
          class="m-1"
        >{{ post.created }}</UBadge>
        <UBadge
          icon="heroicons:calendar-days"
          color="white"
          variant="solid"
          class="m-1"
        >{{ post.updated }}</UBadge>
        <template v-for="tag in post.tags" :key="tag">
          <UBadge
            icon="heroicons:tag"
            color="white"
            variant="solid"
            class="m-1"
          >{{ tag }}</UBadge>
        </template>
        
      </UContainer>

      <UContainer>
        <DisqusComments  :config="disqusConfig" />
      </UContainer>
    </UMain>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()

const { data: post } = await useAsyncData(() => queryContent(route.path).findOne())

const disqusConfig = ref({
  identifier: route.path,
  title: post.value?.title,
});


useSeoMeta({
  title: post.title,
  ogTitle: post.title,
  description: post.short,
  ogDescription: post.short,
  ogImage: post.image,
})
</script>

<style>
:root {
  color-scheme: light dark;
}

iframe {
  color-scheme: light;
}
</style>