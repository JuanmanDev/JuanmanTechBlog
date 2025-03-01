<!-- <script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
  />
</template> -->

<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 mt-36">
      <UMain class="mx-1">
        <h1 class="text-5xl font-bold text-center my-10">{{ post.title }}</h1>
        <div class="prose dark:prose-invert">
          <ContentRenderer
            v-if="post"
            :value="post"
          />
        </div>
  
        <UContainer class="flex  items-center justify-center my-4 flex-wrap">
          <UBadge
            icon="heroicons:calendar"
            color="white"
            variant="solid"
            class="m-1"
          >{{ post.created }}</UBadge>
          <UBadge
            icon="heroicons:calendar-days"
            color="white"
            variant="solid"
            class="m-1"
          >{{ post.updated }}</UBadge>
          <template v-for="tag in post.tags" :key="tag">
            <UBadge
              icon="heroicons:tag"
              color="white"
              variant="solid"
              class="m-1"
            >{{ tag }}</UBadge>
          </template>
          
        </UContainer>
  
        <UContainer>
          <DisqusComments  :config="disqusConfig" />
        </UContainer>
      </UMain>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  import { ref } from 'vue'
  
  const localePath = useLocalePath()
  const route = useRoute()
  
  
  const { data: posts } = await useAsyncData('index', () => queryCollection('/blog/' + route.path).findOne())
  
  let path = route.path;
  if (path.endsWith("/")) {
    path = path.slice(0, -1);
  }
  
  // const { data: post } = await useAsyncData(localePath(`/blog/`), () => queryContent()
  //   .where({ _path: {  $eq: path } }) 
  //   .findOne()
  // );
  
  
//   const { data: post } = await useAsyncData(() => queryCollection('content')
//     .path(path)
//     // .select(
//     //   '_path',
//     //   'title',
//     //   'short',
//     //   'updated',
//     //   'image',
//     // )
//     .all()
//   )
  
  
//   const { data: page } = await useAsyncData(route.path, () => {
//     return queryCollection().find()
//   })

  // const route = useRoute()

  const { data: post } = await useAsyncData('page-' + route.path, () => {
    return queryCollection('content').path(route.path).first()
  })

  if (!post.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  }
  
  const disqusConfig = ref({
    identifier: route.path,
    title: post.value?.title,
  });
  
  
  defineOgImageComponent('Pergel', {
    title: 'Juanman Tech! 👨🏻‍💻',
    description: "Blog",
    headline: post.title,
  })
  </script>
  
  <style>
  :root {
    color-scheme: light dark;
  }
  
  iframe {
    color-scheme: light;
  }
  </style>