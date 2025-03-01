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
  <div class="h-dvh relative">
    <div class="w-full h-full absolute top-0 left-0 pointer-events-auto -z-10">
      <DecorationMessages />
    </div>
    <div>
      <div class="w-full pb-48" />
    </div>
    <ULandingHero
      :title="page.hero.title"
      :description="page.hero.description"
      :links="page.hero.links"
      class="bg-primary-50 dark:bg-primary-40 bg-opacity-25 backdrop-blur px-3 gap-0"
    >
      <template #headline 
      class="bg-primary-50 dark:bg-primary-40 bg-opacity-25 backdrop-blur px-3 gap-0">
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
    </ULandingHero>

    <ULandingSection
      v-if="page.features"
      :title="page.features.title"
      :description="page.features.description"
      :headline="page.features.headline"
    >
      <UPageGrid
        id="features"
        class="scroll-mt-[calc(var(--header-height)+140px+128px+96px)]"
      >
        <ULandingCard
          v-for="(item, index) in page.features.items"
          :key="index"
          v-bind="item"
        />
      </UPageGrid>
    </ULandingSection>
  </div>
</template>
