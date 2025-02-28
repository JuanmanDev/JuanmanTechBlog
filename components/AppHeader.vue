<script setup lang="ts">
const nuxtApp = useNuxtApp()

const route = useRoute()

const localePath = useLocalePath()
const t = useI18n().t;

const links = computed(() => [{
  label: t('start'),
  to: localePath('/'),
  icon: 'i-heroicons-cube-transparent',
  active: route.path === localePath('/'),
}, {
  label: t('blog'),
  to: localePath('/blog'),
  icon: 'i-heroicons-credit-card',
  active: route.path.startsWith(localePath('/blog')),
}, {
  label: t('contact'),
  to: localePath('/contact'),
  icon: 'i-heroicons-academic-cap',
  active: route.path === localePath('/contact'),
}])

</script>

<template>
  <Header class="border-b border-gray-200 dark:border-gray-800 -mb-px fixed top-0 z-50 lg:!border-transparent bg-gray-50/75 dark:bg-gray-950/75 backdrop-blur backdrop-blur w-full">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between gap-3 h-[--header-height]">
      <!-- <template #left> -->
        <NuxtLink :to="localePath('/')" 
        class="router-link-active router-link-exact-active flex-shrink-0 font-bold text-xl text-gray-900 dark:text-white flex items-end gap-1.5"
        aria-label="Juanman Tech 👨🏻‍💻">
        Juanman Tech 👨🏻‍💻 
      </NuxtLink>

      
    <ul class="items-center ring-1 ring-gray-200 dark:ring-gray-800 px-3 gap-x-0 rounded-full hidden lg:flex">
      <li class="relative">
        <a class="text-sm/6 flex items-center gap-1 py-2 px-4 font-medium transition-colors relative after:absolute after:-bottom-px after:inset-x-2 after:h-px after:rounded-full after:opacity-0 after:bg-gray-900 dark:after:bg-white after:transition-opacity text-gray-900 dark:text-white after:opacity-100" href="/es">
        Inicio
        </a>
      </li>
      <li class="relative">
        <a class="text-sm/6 flex items-center gap-1 py-2 px-4 font-medium transition-colors relative after:absolute after:-bottom-px after:inset-x-2 after:h-px after:rounded-full after:opacity-0 after:bg-gray-900 dark:after:bg-white after:transition-opacity text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" href="/es/blog">
        Blog
        </a>
      </li>
      <li class="relative">
        <a class="text-sm/6 flex items-center gap-1 py-2 px-4 font-medium transition-colors relative after:absolute after:-bottom-px after:inset-x-2 after:h-px after:rounded-full after:opacity-0 after:bg-gray-900 dark:after:bg-white after:transition-opacity text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" href="/es/contact">
        Contacto
        </a>
      </li>
    </ul>

    <!-- </template> -->
      <LanguageSwitcher class="ml-4" />
    </div>

    <!-- <template #right> -->
    <!-- </template> -->


    <!-- <template #panel> -->
      <!-- <UAsideLinks :links="links" /> -->

      <!-- <UDivider class="my-6" /> -->

      <!-- <UButton
        label="Sign in"
        color="white"
        block
        class="mb-3"
      />
      <UButton
        label="Get started"
        block
      /> -->
    <!-- </template> -->
  </Header>
</template>
