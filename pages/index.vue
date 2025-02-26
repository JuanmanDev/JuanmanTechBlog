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
  page.hero.description = "Aquí encontrarás todos mis proyectos y posts de blog.";
  page.hero.lastBlogsPosts = "Lo último en el blog";
  page.hero.links[0].label = "Ir al Blog";
  page.hero.links[1].label = "Ver este proyecto en github";
  page.logos.title = "Está web está hecha con:";
}


const { data: blogs }  = await useAsyncData(localePath(`/blog/`), () => queryContent(localePath(`/blog/`))
  .without('body')
  .sort({'updated': -1})
  .limit(3)
  .find());

defineOgImageScreenshot({
  // wait 2 seconds
  delay: 2000
})
</script>

<template>
  <div class="">
    <div class="w-full h-full absolute top-0 left-0 pointer-events-auto -z-10 min-h-80">
      <DecorationTresjs />
    </div>
    <ULandingHero
      :title="page.hero.title"
      :description="page.hero.description"
      :links="page.hero.links"
    >
      <template #headline>
        <UBadge
          v-if="page.hero.headline"
          variant="subtle"
          size="lg"
          class="relative rounded-full font-semibold"
        >
          <NuxtLink
            :to="localePath(page.hero.headline.to)"
            target="_blank"
            class="focus:outline-none"
            tabindex="-1"
          >
            <span
              class="absolute inset-0"
              aria-hidden="true"
            />
          </NuxtLink>

          {{ page.hero.headline.label }}

          <UIcon
            v-if="page.hero.headline.icon"
            :name="page.hero.headline.icon"
            class="ml-1 w-4 h-4 pointer-events-none"
          />
        </UBadge>
      </template>

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

    <div class="bg-primary-50 dark:bg-primary-40 bg-opacity-70 backdrop-blur py-5 px-3 gap-0">
      <div class="max-w-6xl mx-auto"> 
        <div class="flex justify-between m-2">
          <h2 class="dark:text-slate-950"> {{ page.hero.lastBlogsPosts }} </h2>
          <NuxtLink
            class="focus:outline-none"
            tabindex="-1"
          >
            <UButton
              :label="page.hero.links[0].label"
              icon="i-heroicons-arrow-right-20-solid"
              :trailing="true"
              :to="localePath('/blog')"
              size="xl"
            />
          </NuxtLink>
        </div>
        
        <div class="flex flex-wrap">
          <template v-for="article in blogs" :key="article._path">
            <NuxtLink :to="article._path" class="flex-1 min-w-[200px] font-semibold m-2"  >
              <UCard
                :to="article._path"
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