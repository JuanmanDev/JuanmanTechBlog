<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UHeader :links="headerLinks" class="border-b border-gray-200 dark:border-gray-800">
      <template #logo>
        <ULink to="/" class="font-bold text-xl">Juanman Tech</ULink>
      </template>
      <template #right>
        <LanguageSwitcher class="ml-4" />
        <UColorMode class="ml-4" />
      </template>
    </UHeader>

    <UMain>
      <UContainer>
        <slot />
      </UContainer>
    </UMain>

    <UFooter class="border-t border-gray-200 dark:border-gray-800">
      <template #left>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          © {{ new Date().getFullYear() }} Juanman Tech
        </div>
      </template>
    </UFooter>
  </div>
</template>

<script setup>
const headerLinks = [
  {
    label: 'Home',
    to: '/'
  },
  {
    label: 'Blog', 
    to: '/blog'
  },
  {
    label: 'About',
    to: '/about'
  }
]
</script>