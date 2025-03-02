<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 mt-36">
      <pre>
        {{ post.path }}
      </pre>
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
  
  const route = useRoute()
  
  const path = route.path // Remove the trailing slash removal logic
  

  const { data: post } = await useAsyncData('page-' + path, async () => {
    return queryCollection('content').path(path).first();
    // if (r.fixed) return r;
    // console.log("r.path", r.path);
    // r.body = updateImageSources(r.body, path, r.path);
    // r.fixed = true;
    // return r;
  }, {
    transform: (data) => {
          
      const joinPaths = (...parts) => {
        // return parts.join("___");
        console.log("joinPaths", parts);
        // Remove empty parts and trim slashes
        const cleanParts = parts
            .map(part => part.trim().replace(/^\/+|\/+$/g, ''))
            .filter(Boolean);

        let part1 = parts[0];
        let part2 = parts[1];

        if (part2.startsWith('../')) {
          part1 = part1.split('/');
          part1.pop();
          parts[0] = part1.join('/');
        }

        const x = parts.join("/").split("/");

        let finalPath = [];

        for (let i = 0; i < x.length; i++) {
          const element = x[i];
          if (element === '') continue;
          if (element === '..') {
              finalPath.pop();
            }
          else if (element === '.') {
            continue;
            // finalPath.pop();
          } else {
            finalPath.push(element);
          }
        }

        return "/" + finalPath.join('/');
    }

      function updateImageSources(arr, postPath) {
        console.log("postPath", postPath);
        if (!Array.isArray(arr)) {
            return arr;
        }

        // Process current array
        if (arr[0] === 'img' && typeof arr[1] === 'object') {
            // Update src attribute if it exists and is relative
            if (arr[1].src && !arr[1].src.startsWith('http') && !arr[1].src.startsWith('//')) {
              //  __  /blog/2/../es/blog/2/image-1.png  
              //  __  content\blog\2.md
              //  __ ../es/blog/2/image.png
              // if (arr[1].src.startsWith('..')){
              //   while (arr[1].src.startsWith('../')) {

              //   }
              // } else {
              // }
              // console.log("PRE__" + arr[1].src, postPath, routePath);
              // arr[1].src =k `${postPath}${arr[1].src}`;
              arr[1].src = joinPaths(postPath, arr[1].src);
              // console.log("POS__" + arr[1].src);
            }
        }

        // Recursively process remaining elements
        for (let i = 2; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                arr[i] = updateImageSources(arr[i], postPath);
            }
        }

        return arr;
      }

      data.body.value = updateImageSources(data.body.value, data.path);
      return data;
    }
  })
  
  if (!post.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  }


  //updateImageSources(post.value.body.value, path, post.value.path);
  
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
  </script>
  
  <style>
  :root {
    color-scheme: light dark;
  }
  
  iframe {
    color-scheme: light;
  }
  </style>