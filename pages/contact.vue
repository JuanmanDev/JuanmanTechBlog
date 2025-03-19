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
  <div class="relative w-full h-full min-h-dvh -mb-36">
    <DecorationMessages class=" absolute -z-10 min-h-80 max-h-screen max-w-screen h-full w-full h-full" />
    <div class="pt-[10vh] invisible"></div>
    <div class="mx-[10vw]">
      <div class="py-[10vh] flex flex-col h-full w-full mt-20 bg-primary-50/25 dark:bg-primary-40/25 backdrop-blur px-3 gap-0 center items-center text-center">
        <h1 class="text-5xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-7xl">
          {{ page.hero.title }}
        </h1>
        <p class="mt-6 text-lg tracking-tight text-neutral-600 dark:text-neutral-300">
          {{ page.hero.description }}
        </p>

        <UButton
          icon="i-simple-icons-linkedin"
          size="xl"
          color="neutral"
          variant="outline" 
          :trailing="false"
          :ui="{ rounded: 'rounded-full' }"
          class="mt-4 hover:bg-neutral-100 dark:hover:bg-neutral-900"
          :to="page.hero.links[0].to"
        >
          LinkedIn  
        </UButton>
        <UButton
          icon="i-heroicons-envelope"
          size="xl"
          color="neutral"
          variant="outline" 
          :trailing="false"
          :ui="{ rounded: 'rounded-full' }"
          class="mt-4 hover:bg-neutral-100 dark:hover:bg-neutral-900"
          to="mailto:JuanmaDeveloper+contactjuanmantech@outlook.com"
        >
          Email
        </UButton>
      </div>
    </div>
  </div>
</template>
