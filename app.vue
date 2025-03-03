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
  <div class="flex flex-col min-h-screen relative">
    <NuxtLoadingIndicator/>
    <AppHeader />
    
    <div class="min-h-dvh pb-36">
      <NuxtPage />
    </div>
    
    <AppFooter class="absolute bottom-0 w-full z-50 lg:!border-transparent bg-gray-50/75 dark:bg-gray-950/75 backdrop-blur backdrop-blur w-full" />
    
    <UNotifications />
    <Analytics/>
  </div>
</template>