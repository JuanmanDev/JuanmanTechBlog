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
  <header class="border-b border-gray-200 dark:border-gray-800 -mb-px fixed top-0 z-50 lg:!border-transparent bg-gray-50/75 dark:bg-gray-950/75 backdrop-blur backdrop-blur w-full">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between gap-3 h-[--header-height]">
      <NuxtLink :to="localePath('/')" 
        class="router-link-active router-link-exact-active flex-shrink-0 font-bold text-xl text-gray-900 dark:text-white flex items-end gap-1.5"
        aria-label="Juanman Tech 👨🏻‍💻">
        Juanman Tech 👨🏻‍💻 
      </NuxtLink>

      <ul class="items-center ring-1 ring-gray-200 dark:ring-gray-800 px-3 gap-x-0 rounded-full hidden lg:flex">
        <li v-for="link in links" :key="link.to" class="relative">
          <NuxtLink 
            :to="link.to"
            :class="[
              'text-sm/6 flex items-center gap-1 py-2 px-4 font-medium transition-colors relative after:absolute after:-bottom-px after:inset-x-2 after:h-px after:rounded-full after:opacity-0 after:bg-gray-900 dark:after:bg-white after:transition-opacity',
              link.active 
                ? 'text-gray-900 dark:text-white after:opacity-100' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            ]"
          >
            <span v-if="link.icon" :class="link.icon"></span>
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>

      <LanguageSwitcher class="ml-4 hidden lg:block" />
      
      <UPopover overlay class="lg:hidden">
        <UButton 
          color="white" 
          variant="ghost"
          icon="i-heroicons-bars-3" 
          class="h-10 w-10"
        />

        <template #panel>
          <div class="p-4 w-64">
            <nav class="space-y-2">
              <NuxtLink 
                v-for="link in links" 
                :key="link.to"
                :to="link.to"
                class="flex items-center gap-2 p-2 rounded-md transition-colors"
                :class="[
                  link.active 
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' 
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                ]"
              >
                <span v-if="link.icon" :class="link.icon"></span>
                {{ link.label }}
              </NuxtLink>
            </nav>

            <UDivider class="my-4" />
            
            <div class="px-2">
              <LanguageSwitcher />
            </div>
          </div>
        </template>
      </UPopover>
    </div>
  </header>
</template>
