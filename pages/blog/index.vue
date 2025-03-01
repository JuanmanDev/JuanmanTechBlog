<template>
  <UContainer>
    <Placeholder class="h-32" />
    <h1 class="md:pt-28 md:pb-12 pt-20 pb-2 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
      Blog
    </h1>
    <div class="flex flex-wrap mb-8">
      <template v-for="article in data" :key="article.path">
        <div class="w-full sm:w-1/2 my-2">
          <NuxtLink :to="article.path">
            <ULandingCard
              color="primary"
              orientation="vertical"
              class="m-2 h-full"
            >
              <div class="rounded-xl flex-1 flex flex-col flex flex-col lg:flex-row lg:items-stretch">
                <div class="flex-grow flex flex-col">
                  <p class="text-gray-900 dark:text-white text-base font-bold">
                    {{ article.title }}
                  </p>
                  <div class="text-[15px] text-gray-500 dark:text-gray-400 mt-1">
                    {{ article.short }}
                  </div>
                  <div class="text-[15px] text-gray-500 dark:text-gray-400 mt-auto py-2">
                    {{ formatDate(article.updated) }}
                  </div>
                </div>
                <img
                  v-if="article.image"
                  :src="article.image"
                  class="w-full h-48 lg:h-auto lg:w-1/3 rounded-md object-cover lg:order-last lg:ml-4"
                />
              </div>
            </ULandingCard>
          </NuxtLink>
        </div>
      </template>
    </div>
  </UContainer>
</template>

<script setup>
const localePath = useLocalePath();
const { data: a } = await useAsyncData(localePath(`/blog/`), () =>
  queryCollection('blog') // Changed collection from 'content' to 'blog'
    .without(['body'])
    .sort({ updated: -1 })
    .find()
);


const route = useRoute();

const { data } = await useAsyncData(() => queryCollection('content')
  //.where({ path: { "$startsWith": route.path } }) // filter documents with _path starting with currentPath
  .select(
    'path',
    'title',
    'short',
    'updated',
    'image',
  )
  .where('path', 'LIKE', route.path + '%' )
  .order('updated', 'DESC')
  .all()
)

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};
</script>
