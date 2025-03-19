<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'
</script>

<template>
  <div class="flex flex-col min-h-screen relative">
    <NuxtLoadingIndicator/>
    <AppHeader class="z-50" />
    
    <div class="min-h-dvh">
      <NuxtPage />
    </div>
    
    <AppFooter/>
    
    <UNotifications />
    <Analytics/>
  </div>
</template>