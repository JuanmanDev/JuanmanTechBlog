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
    <div class="flex flex-col min-h-screen relative ">
      <NuxtLoadingIndicator/>
      
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>

      <Analytics/>
    </div>
</template>