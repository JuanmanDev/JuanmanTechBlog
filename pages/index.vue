<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute();

const page = {
  "hero": {
    "title": "Hello! I'm Juanma :)",
    "description": "Here i share some things about tech and me.",
    "lastBlogsPosts": "Last blog posts",
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

if (locale.value === 'es') {
  page.hero.title = "¡Hola! Soy Juanma :)";
  page.hero.description = "Web, blog y proyectos";
  page.hero.lastBlogsPosts = "Lo último en el blog";
  page.hero.links[0].label = "Ir al Blog";
  page.hero.links[1].label = "Ver este proyecto en github";
  page.logos.title = "Está web está hecha con:";
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
    <div class="absolute -z-10 max-h-screen max-w-screen h-full  w-full h-full">
      <div class="min-h-80 max-h-screen max-w-screen h-full  w-full h-full">
        <ClientOnly>
          <DecorationTresjs class="min-h-80 max-h-screen max-w-screen h-full w-full h-full" />
        </ClientOnly>
      </div>
    </div>
    
    <ULandingHero
      :title="page.hero.title"
      :description="page.hero.description"
      :links="page.hero.links"
      class="2xl:pt-[35vh] xl:pt-[25vh] pt-[15vh]"
    >
      <ULandingLogos
        :title="page.logos.title"
        align="center"
      >
        <UIcon
          v-for="icon in page.logos.icons"
          :key="icon"
          :name="icon"
          class="w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0 text-gray-900 dark:text-white zoom-image"
        />
      </ULandingLogos>
    </ULandingHero> 

    <div class="bg-primary-50 dark:bg-primary-40 bg-opacity-70 backdrop-blur py-5 px-3 gap-0 lg:mx-10">
      <div class="max-w-6xl mx-auto"> 
        <div class="flex justify-between m-2">
          <h2 class="dark:text-slate-950"> {{ page.hero.lastBlogsPosts }} </h2>
          <NuxtLink
            class="focus:outline-none"
            tabindex="-1"
            :to="localePath('/blog')"
          >
            <UButton
              :label="page.hero.links[0].label"
              icon="i-heroicons-arrow-right-20-solid"
              :trailing="true"
              size="xl"
            />
          </NuxtLink>
        </div>
        
        <div class="flex flex-wrap place-items-stretch items-stretch" v-if="blogs3">
          <template v-for="(article, index) in blogs3" :key="article.path">
            <NuxtLink :to="article.path" class="flex-1 min-w-[200px] font-semibold m-2 h-full" v-if="index < 3">
              <UCard
                :to="article.path"
              >
                <h2>
                  {{ article.title }}
                </h2>
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
}
.zoom-image:hover {
  transform: scale(3); /* Adjust the zoom level */
  opacity: 0.8; /* Optional: Add a slight fade effect */
}
</style>