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

const menu = ref(false);

// on change page hide menu
watch(() => route.path, () => {
  menu.value = false;
});

defineOgImageScreenshot();
</script>

<template>
  <header class="border-b border-neutral-200 dark:border-neutral-800 -mb-px fixed top-0 z-50 lg:!border-transparent bg-neutral-50/75 dark:bg-neutral-950/75 backdrop-blur w-full py-3">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between gap-3 h-[--header-height]">
      <NuxtLink :to="localePath('/')" 
        class="router-link-active router-link-exact-active flex-shrink-0 font-bold text-xl text-neutral-900 dark:text-white flex items-end gap-1.5"
        aria-label="Juanman Tech 👨🏻‍💻">
        Juanman Tech 👨🏻‍💻 
      </NuxtLink>

      <ul class="items-center ring-1 ring-neutral-200 dark:ring-neutral-800 px-3 gap-x-0 rounded-full hidden sm:flex">
        <li v-for="link in links" :key="link.to" class="relative">
          <NuxtLink 
            :to="link.to"
            :class="[
              'text-sm/6 flex items-center gap-1 py-2 px-4 font-medium transition-colors relative after:absolute after:-bottom-px after:inset-x-2 after:h-px after:rounded-full after:opacity-0 after:bg-neutral-900 dark:after:bg-white after:transition-opacity',
              link.active 
                ? 'text-neutral-900 dark:text-white after:opacity-100' 
                : 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'
            ]"
          >
            <span v-if="link.icon" :class="link.icon"></span>
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>

      <LanguageSwitcher class="ml-4 hidden sm:block" />
      
      <UPopover overlay class="block sm:hidden" v-model:open="menu">
        <UButton 
          color="neutral" variant="ghost"
          icon="i-heroicons-bars-3" 
          class="h-10 w-10 pt-2.5"
        />

        <template #content>
          <div class="p-4 w-64 sm:hidden">
            <nav class="space-y-2">
              <NuxtLink 
                v-for="link in links" 
                :key="link.to"
                :to="link.to"
                class="flex items-center gap-2 p-2 rounded-md transition-colors"
                :class="[
                  link.active 
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white' 
                    : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800'
                ]"
              >
                <span v-if="link.icon" :class="link.icon"></span>
                {{ link.label }}
              </NuxtLink>
            </nav>
            
            <LanguageSwitcher class="w-full mt-4" />
          </div>
        </template>
      </UPopover>
    </div>
  </header>
</template>
