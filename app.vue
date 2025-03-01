<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'

useHead({
  script: [
    {
      src: "https://analytics.ahrefs.com/analytics.js",
      "data-key": "FoqN66VqlpHlCmDxNoP9jQ",
      async: true
    }
  ]
})


</script>

<template>
  <NuxtLoadingIndicator/>
  <AppHeader />

  <div class="min-h-dvh">
    <NuxtPage />
  </div>

  <AppFooter />

  <UNotifications />
  <Analytics/>
</template>