<template>
  <UContainer>
    <Placeholder class="h-32" />
    <h1 class="my-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
      Blog
    </h1>
    <UPageGrid>
      <template v-for="article in data" :key="article._path">
        <NuxtLink :to="article._path">
          <ULandingCard
            :title="article.title"
            :description="article.short"
            color="primary"
            orientation="vertical"
          >
            <img
              v-if="article.image"
              :src="article.image"
              class="w-full rounded-md"
            />
          </ULandingCard>
        </NuxtLink>
      </template>
    </UPageGrid>
  </UContainer>
</template>

<script setup>
const localePath = useLocalePath();

const { data }  = await useAsyncData(localePath(`/blog/`), () => queryContent(localePath(`/blog/`))
  .without('body')
  .sort({'updated': -1})
  .find());


</script>
