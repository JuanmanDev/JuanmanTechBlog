<template>
  <UContainer>
    <Placeholder class="h-32" />
    <h1 class="my-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
      Blog
    </h1>
    <UPageGrid>
      <ContentList :query="query" v-slot="{ list }">
        <template v-for="article in list" :key="article._path">
          <NuxtLink :to="article._path">
            <ULandingCard
              :title="article.title"
              :description="article.short"
              color="primary"
              :orientation="article.image ? 'horizontal' : 'vertical'"
            >
              <img
                v-if="!article.image"
                :src="article.image"
                class="w-full rounded-md"
              />
            </ULandingCard>
          </NuxtLink>
        </template>
      </ContentList>
    </UPageGrid>
  </UContainer>
</template>

<script setup>
const localePath = useLocalePath();


const name = 'BlogOverview';
const query = { path: localePath(`/blog`), limit: 25, sort: [{ updated: -1 }] }

</script>
