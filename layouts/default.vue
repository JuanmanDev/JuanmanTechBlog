<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UMain>
      <h1 class="text-5xl font-bold text-center my-10">{{ post.title }}</h1>
      <div class="prose dark:prose-invert">
        <slot />
      </div>
    </UMain>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const { data: post } = await useAsyncData(() => queryContent(route.path).findOne())
</script>