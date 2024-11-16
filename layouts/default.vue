<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UMain>
      <h1 class="text-5xl font-bold text-center my-10">{{ 123 }}</h1>
      <div class="prose dark:prose-invert">
        <slot />
      </div>

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
</script>

<style>
:root {
  color-scheme: light dark;
}

iframe {
  color-scheme: light;
}
</style>