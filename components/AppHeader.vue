<script setup lang="ts">
const nuxtApp = useNuxtApp()

const route = useRoute()

const localePath = useLocalePath()
const t = useI18n().t;

const isActive = (to) => {
  return route.path === to
}

const links = computed(() => [{
  label: t('start'),
  to: localePath('/'),
  icon: 'i-heroicons-cube-transparent',
  active: route.path === localePath('/'),
}, {
  label: t('blog'),
  to: localePath('/blog'),
  icon: 'i-heroicons-credit-card',
  active: isActive('/blog'),
}, {
  label: t('contact'),
  to: localePath('/contact'),
  icon: 'i-heroicons-academic-cap',
  active: isActive('/contact'),
}])

</script>

<template>
  <UHeader :links="links">
    <template #left>
      <a aria-current="page" :href="localePath('/')" 
        class="router-link-active router-link-exact-active flex-shrink-0 font-bold text-xl text-gray-900 dark:text-white flex items-end gap-1.5"
        aria-label="Juanman Tech 👨🏻‍💻">
        Juanman Tech 👨🏻‍💻 
      </a>
    </template>

    <template #right>
      <LanguageSwitcher class="ml-4" />
    </template>

    <template #panel>
      <UAsideLinks :links="links" />

      <UDivider class="my-6" />

      <UButton
        label="Sign in"
        color="white"
        block
        class="mb-3"
      />
      <UButton
        label="Get started"
        block
      />
    </template>
  </UHeader>
</template>
