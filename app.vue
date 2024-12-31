<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'
// useHead({
//   meta: [
//     { name: 'viewport', content: 'width=device-width, initial-scale=1' }
//   ],
//   link: [
//     { rel: 'icon', href: '/favicon.ico' }
//   ],
//   // htmlAttrs: {
//   //   lang: 'en'
//   // }
// })



</script>

<template>
  <AppHeader />

  <UMain>
    <NuxtPage />
  </UMain>

  <AppFooter />

  <UNotifications />
  <Analytics/>
</template>