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
    "description": "Here you will find all my projects and blog posts.",
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
  <div class="relative">
    <div class="w-full h-full absolute top-0 left-0 pointer-events-auto -z-10">
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
          class="w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0 text-gray-900 dark:text-white"
        />
      </ULandingLogos>
    </ULandingHero>
    

    <ULandingSection
      v-if="page.pricing"
      :title="page.pricing.title"
      :description="page.pricing.description"
      :headline="page.pricing.headline"
    >
      <UPricingGrid
        id="pricing"
        compact
        class="scroll-mt-[calc(var(--header-height)+140px+128px+96px)]"
      >
        <UPricingCard
          v-for="(plan, index) in page.pricing.plans"
          :key="index"
          v-bind="plan"
        />
      </UPricingGrid>
    </ULandingSection>

    <ULandingSection
      v-if="page.testimonials"
      :headline="page.testimonials.headline"
      :title="page.testimonials.title"
      :description="page.testimonials.description"
    >
      <UPageColumns
        id="testimonials"
        class="xl:columns-4 scroll-mt-[calc(var(--header-height)+140px+128px+96px)]"
      >
        <div
          v-for="(testimonial, index) in page.testimonials.items"
          :key="index"
          class="break-inside-avoid"
        >
          <ULandingTestimonial v-bind="testimonial" />
        </div>
      </UPageColumns>
    </ULandingSection>

    <div class="bg-primary-50 dark:bg-primary-400 dark:bg-opacity-10 py-5 px-3 gap-0">
      <div class="max-w-6xl mx-auto"> 
        <div class="flex justify-between m-2">
          <h2> {{ page.hero.lastBlogsPosts }} </h2>
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
