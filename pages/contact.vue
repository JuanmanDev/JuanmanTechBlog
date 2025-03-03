<script setup lang="ts">
useSeoMeta({
  title: "Juanman Tech - Welcome!",
  ogTitle: "Juanman Tech - Welcome!",
  description: "This is my website",
  ogDescription: "This is my website"
})

const { locale } = useI18n()
const localePath = useLocalePath()

const page = {
  "hero": {
    "title": "Wanna Chat? 💬",
    "description": "Find me here:",
    "links": [
      {
        "label": "LinkedIn",
        "icon": "i-simple-icons-linkedin",
        "size": "xl",
        "color": "gray",
        "to": "https://www.linkedin.com/in/jbecares/?ref=juanman.tech",
        "target": "_blank"
      }
    ]
  },
};

if (locale.value === 'es') {
  page.hero.title = "¿Hablamos? 💬";
  page.hero.description = "Encuéntrame aquí:";
}

</script>

<template>
    <div class="w-full h-full absolute top-0 left-0 pointer-events-auto -z-10">
      <DecorationMessages />
    </div>
    <div class="py-[10vh] mt-[20vh] flex flex-col h-full w-full mt-20 bg-primary-50 dark:bg-primary-40 bg-opacity-25 backdrop-blur px-3 gap-0 center items-center">
      <h1 class="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
        {{ page.hero.title }}
      </h1>
      <p class="mt-6 text-lg tracking-tight text-gray-600 dark:text-gray-300">
        {{ page.hero.description }}
      </p>

      <UButton
        icon="i-simple-icons-linkedin"
        size="xl"
        color="black"
        variant="outline" 
        :trailing="false"
        :ui="{ rounded: 'rounded-full' }"
        class="mt-4 hover:bg-gray-100 dark:hover:bg-gray-900"
      >
        LinkedIn  
      </UButton>
<!-- 

      <a
        class="mt-6 focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-base gap-x-2.5 px-3.5 py-2.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 aria-disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 dark:aria-disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
        href="https://www.linkedin.com/in/jbecares/?ref=juanman.tech"
        rel="noopener noreferrer"
        target="_blank"
      >
        <span class="iconify i-simple-icons:linkedin flex-shrink-0 h-6 w-6" aria-hidden="true"></span>
        <span class="">
          LinkedIn
        </span>
      </a> -->
      
      <!-- <ULandingHero
        :title="page.hero.title"
        :description="page.hero.description"
        :links="page.hero.links"
        class="bg-primary-50 dark:bg-primary-40 bg-opacity-25 backdrop-blur px-3 gap-0"
      >
        <template #headline 
          class="bg-primary-50 dark:bg-primary-40 bg-opacity-25 backdrop-blur px-3 gap-0"
          >
          <UBadge
            v-if="page.hero.headline"
            variant="subtle"
            size="lg"
            class="relative rounded-full font-semibold"
          >

            {{ page.hero.headline.label }}

          </UBadge>
        </template>
      </ULandingHero> -->
  </div>
</template>
