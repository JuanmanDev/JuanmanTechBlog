<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute();

const page = {
  "hero": {
    "title": "Hello! I'm Juanma :)",
    "description": "Tech Blog Projects",
    "lastBlogsPosts": "Last blog posts",
    "projects": "Projects", // Added key for projects section
    "links": [
      {
        "label": "Go to the Blog",
        "icon": "i-heroicons-arrow-right-20-solid",
        "trailing": true,
        "to": localePath("/blog"),
        "size": "xl"
      },
      {
        "label": "Check this project on github",
        "icon": "i-simple-icons-github",
        "size": "xl",
        "color": "gray",
        "to": "https://github.com/JuanmanDev/JuanmanTechBlog?ref=juanman.tech",
        "target": "_blank"
      }
    ]
  },
  "logos": {
    "title": "This web has been created with:",
    "icons": [
      "i-simple-icons-vuedotjs",
      "i-simple-icons-nuxtdotjs",
      "i-simple-icons-vercel",
      "i-simple-icons-javascript",
      "i-simple-icons-typescript"
    ]
  },
};

// Example projects array
let projects = [
  {
    title: "720 Degiro",
    subtitle: "Create Model 720 for the Spanish tax declaration.",
    path: "https://720degiro.juanman.tech/"
  },
  {
    title: "Bus Salamanca Alexa Skill",
    subtitle: "Alexa Skill to get time to arrive next buses on Salamanca.",
    path: "https://www.amazon.es/Juan-Manuel-B%C3%A9c-Bus-Salamanca/dp/B0F59TDK93/"
  }
];

if (locale.value === 'es') {
  page.hero.title = "¡Hola! Soy Juanma :)";
  page.hero.description = "Web, blog y proyectos";
  page.hero.lastBlogsPosts = "Lo último en el blog";
  page.hero.links[0].label = "Ir al Blog";
  page.hero.links[1].label = "Ver este proyecto en github";
  page.logos.title = "Está web está hecha con:";
  page.hero.projects = "Proyectos"; // Spanish translation

  projects = [
    {
      title: "720 Degiro",
      subtitle: "Genera el Modelo 720 para la presentación desde DeGiro.",
      path: "https://720degiro.juanman.tech/"
    },
    {
      title: "Bus Salamanca Alexa Skill",
      subtitle: "Skill de Alexa para saber los tiempos de llegada de los autbuses urbanos de Salamanca.",
      path: "https://www.amazon.es/Juan-Manuel-B%C3%A9c-Bus-Salamanca/dp/B0F59TDK93/"
    }
  ];
}



const { data: blogs3 } = await useAsyncData('p-' + route.path,
  () => queryCollection('content')
    .select(
      'path',
      'title',
    )
    .where('path', 'LIKE', localePath(`/blog/`) + '%' )
    .order('updated', 'DESC')
    .limit(3)
    .all()
  )

useSeoMeta({
  title: "Juanman Tech - Welcome!",
  ogTitle: "Juanman Tech - Welcome!",
  description: "This is my website",
  ogDescription: "This is my website"
})

defineOgImageScreenshot({
  // wait 2 seconds
  delay: 2000
})
</script>
<template>
  <div class="relative w-full h-full min-h-dvh">
    <div class="absolute -z-10 max-h-screen max-w-screen h-full w-full">
      <div class="min-h-80 max-h-screen max-w-screen h-full w-full">
        <ClientOnly>
          <DecorationTresjs class="min-h-80 max-h-screen max-w-screen h-full w-full" />
        </ClientOnly>
      </div>
    </div>

    <div class="py-10 sm:py-32 md:py-20 relative 2xl:pt-[22vh] xl:pt-[12vh] pt-[17vh]">
      <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl gap-16 sm:gap-y-24 flex flex-col">
        <div class="text-center">
          <h1 class="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
            {{ page.hero.title }}
          </h1>
          <div class="mt-6 text-lg tracking-tight text-gray-600 dark:text-gray-300">
            {{ page.hero.description }}
          </div>
          <div class="mt-10 flex flex-wrap gap-x-6 gap-y-3 justify-center">
            <NuxtLink
              v-for="link in page.hero.links"
              :key="link.to"
              :href="localePath(link.to)"
              :target="link.target || '_self'"
              :class="[
                'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-base gap-x-2.5 px-3.5 py-2.5 shadow-sm inline-flex items-center',
                link.color === 'gray'
                  ? 'ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700/50'
                  : 'text-white dark:text-gray-900 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100',
              ]"
            >
              <UIcon v-if="link.icon" :name="link.icon"></UIcon>
              <span>{{ link.label }}</span>
          </NuxtLink>
          </div>
        </div>


      </div>
    </div>

    <div class="bg-primary-50/70 dark:bg-primary-40/70 backdrop-blur py-5 px-3 gap-0 lg:mx-10">
      <div class="max-w-6xl mx-auto">
        <div class="flex justify-between m-2">
          <h2 class="dark:text-slate-950 pt-2">{{ page.hero.lastBlogsPosts }}</h2>
          <NuxtLink class="focus:outline-none" tabindex="-1" :to="localePath('/blog')">
            <UButton
              :label="page.hero.links[0].label"
              icon="i-heroicons-arrow-right-20-solid"
              :trailing="true"
              size="xl"
            />
          </NuxtLink>
        </div>

        <div class="flex flex-wrap place-items-stretch items-stretch text-gray-900 dark:text-white" v-if="blogs3">
          <template v-for="(article, index) in blogs3" :key="article.path">
            <NuxtLink :to="article.path" class="flex-1 min-w-[200px] font-semibold m-2 h-full" v-if="index < 3">
              <UCard :to="article.path">
                <h2>{{ article.title }}</h2>
              </UCard>
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
    
    <div class="bg-primary-50/70 dark:bg-primary-40/70 backdrop-blur py-5 px-3 gap-0 lg:mx-10 mt-20">
      <div class="max-w-6xl mx-auto">
        <div class="flex justify-between m-2">
          <h2 class="dark:text-slate-950 pt-2">{{ page.hero.projects }}</h2>
        </div>

        <div class="flex flex-wrap place-items-stretch items-stretch text-gray-900 dark:text-white" >
          <template v-for="(article, index) in projects" :key="article.title">
            <NuxtLink :to="article.path" class="flex-1 min-w-[200px] font-semibold m-2 h-full" v-if="index < 3">
              <UCard :to="article.path">
                <h2>{{ article.title }}</h2>
                <h3 class="font-light">{{ article.subtitle }}</h3>
              </UCard>
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css">
/* Style the image */
.zoom-image {
  object-fit: cover;
  transition: transform 0.5s ease, opacity 0.5s ease;
  overflow: hidden;
}
.zoom-image:hover {
  transform: scale(3) rotateY(360deg); /* Scale up and rotate 3 full spins (360deg * 3) */
  opacity: 0.8;
  transition: transform 1.2s ease-in-out, opacity 0.5s ease;
}
</style>