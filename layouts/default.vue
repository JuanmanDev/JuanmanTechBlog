<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'
</script>

<template>
  <div class="flex flex-col min-h-screen relative">
    <NuxtLoadingIndicator/>
    <AppHeader class="z-50" />
    
    <div class="min-h-dvh pb-36">
      <NuxtPage />
    </div>
    
    <AppFooter class="absolute bottom-0 w-full z-50 lg:!border-transparent bg-neutral-50/75 dark:bg-neutral-950/75 backdrop-blur backdrop-blur w-full" />
    
    <UNotifications />
    <Analytics/>
  </div>
</template>