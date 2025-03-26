<template>
    <div class="min-h-screen mt-36 mb-30">
        <h1 class="text-5xl font-bold text-center my-10">{{ post.title }}</h1>
        <div class="prose">
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
          >{{ post.created || post.meta?.created }}</UBadge>
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
          <ClientOnly>
            <div class="disqus-container">
              <DisqusComments :identifier="route.path" :config="disqusConfig" />
            </div>
          </ClientOnly>
        </UContainer>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  import { ref } from 'vue'

  import { updateImageSources } from '~/utils/updateImageSources'
  
  const route = useRoute()
  
  const path = route.path // Remove the trailing slash removal logic

  const { data: post } = await useAsyncData('page-' + path, async () => {
    return queryCollection('content').path(path).first();
  }, {
    transform: (data) => {
      data.body.value = updateImageSources(data.body.value, data.path);
      return data;
    }
  })
  
  if (!post.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  }
  
  const disqusConfig = ref({
    identifier: route.path,
    title: post.value?.title,
  });
  
  useHead({
    title: post.value?.title,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: post.value?.short,
      },
    ],
  })
  
  defineOgImageComponent('Pergel', {
    title: 'Juanman Tech! 👨🏻‍💻',
    description: "Blog",
    headline: post.title,
  })

onMounted(() => {
  
// Save the original getComputedStyle function
const originalGetComputedStyle = window.getComputedStyle;

// Override getComputedStyle
window.getComputedStyle = function (element, pseudoElt) {
  const styles = originalGetComputedStyle(element, pseudoElt);

  // Return a proxy to intercept calls to getPropertyValue
  return new Proxy(styles, {
    get(target, prop) {
      if (prop === 'getPropertyValue') {
        return (property) => {
          const value = target.getPropertyValue(property);
          // Replace "oklch" values or handle them as needed
          console.log(property, value);
          if (value.includes('oklch')) {
            console.warn(`Property "${property}" contains "oklch", returning fallback value.`);
            if (document.documentElement.classList.contains("dark")) {
              return 'black';
            }
            return 'white';
          }
          return value;
        };
      }
      return target[prop];
    },
  });
};

})
  </script>
  
  <style>
  /* :root {
    color-scheme: light dark;
    
  }
  
  iframe {
    color-scheme: light;
  } */

  .disqus-container a {
    color: #000001;
  }

 .dark .min-h-screen.bg-neutral-50.dark:bg-neutral-900.mt-36 {
  color: block
 }
 
 /* #disqus_thread a {
  color: red;
} */

:root {
  color-scheme: light dark;
}

iframe {
  color-scheme: light;
}
</style>