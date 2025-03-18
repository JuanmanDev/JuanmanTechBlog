<template>
  <div>
    <ClientOnly>
      <LazyDecorationCursor />
    </ClientOnly>
    <UContainer>
      <h1 class="md:pt-28 md:pb-12 pt-20 pb-2 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Blog
      </h1>
      <div class="flex flex-wrap mb-8">
        <template v-for="article in data" :key="article.path">
          <div class="w-full sm:w-1/2 my-2 z-0 hover:z-10">
            <NuxtLink :to="article.path">
              <div
                color="primary"
                orientation="vertical"
                class="m-2 p-5 h-full
                rounded-xl ring-gray-200
                dark:ring-gray-800
                divide-gray-200 dark:divide-gray-800 ring-1
                ring-gray-200 dark:ring-gray-800 shadow
                bg-white/75 dark:bg-gray-900/75
                bg-opacity-25 backdrop-blur
                flex-1 flex flex-col flex flex-col lg:flex-row lg:items-stretch
                transition-transform duration-300 ease-in-out hover:scale-[1.15]
                transform-gpu
                "
              >
                <div class="flex-grow flex flex-col">
                  <p class="text-gray-900 dark:text-white text-base font-bold">
                    {{ article.title }}
                  </p>
                  <div class="text-[15px] text-gray-500 dark:text-gray-400 mt-1">
                    {{ article.short }}
                  </div>
                  <div class="text-[15px] text-gray-500 dark:text-gray-400 mt-auto">
                    {{ formatDate(article.updated) }}
                  </div>
                </div>
                <img
                  v-if="article.image"
                  :src="article.image"
                  class="w-full h-48 lg:h-auto lg:w-1/3 rounded-md object-cover lg:order-last lg:ml-4"
                />
              </div>
            </NuxtLink>
          </div>
        </template>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

import { updateImagePosts } from '~/utils/updateImageSources'

const localePath = useLocalePath();
const route = useRoute()

const { data } = await useAsyncData(
  'blog-post.list', 
  () => queryCollection('content')
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
    .all(),
  {
    transform: updateImagePosts,
  }  
)

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};
</script>
