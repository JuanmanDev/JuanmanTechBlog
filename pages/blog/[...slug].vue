<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 mt-36">
      <UMain class="mx-1">
        <h1 class="text-5xl font-bold text-center my-10">{{ post.title }}</h1>
        <div class="prose dark:prose-invert">
          <ContentRenderer
            v-if="post"
            :value="post"
          />
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
  
  const localePath = useLocalePath()
  const route = useRoute()
  
  // Redirect if URL doesn't end with /
  if (!route.path.endsWith('/')) {
    navigateTo(route.path + '/', { replace: true })
  }
  
  const { data: posts } = await useAsyncData('index', () => queryCollection('/blog/' + route.path).findOne())
  
  const path = route.path // Remove the trailing slash removal logic
  
  const { data: post } = await useAsyncData('page-' + path, () => {
    return queryCollection('content').path(path).first()
  })
  
  if (!post.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  }
  
  const disqusConfig = ref({
    identifier: route.path,
    title: post.value?.title,
  });
  
  
  defineOgImageComponent('Pergel', {
    title: 'Juanman Tech! 👨🏻‍💻',
    description: "Blog",
    headline: post.title,
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