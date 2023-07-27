<template>
  <div>
    <LanguageSwitcher />
      
      POSTS:
      
    <ContentList :path="localePath(`/blog`)" v-slot="{ list }">
      <div v-for="article in list" :key="article._path">
        <a :href="article._path"><h2>{{ article.title }}</h2></a>
        <p>{{ article.short }}</p>
      </div>
    </ContentList>
    __
    {{ posts }}
    </div>
  </template>
  
  <script>
  export default {
    name: 'BlogOverview',
    async asyncData({ $content, app, error }) {
      const posts = await $content(app.i18n.locale, 'blog')
        .only(['short', 'path'])
        .sortBy('createdAt', 'asc')
        .fetch()
        .catch(() => {
          error({ statusCode: 404, message: 'Page not found' })
        })
  
      return {
        posts: posts.map((posts) => ({
          ...posts,
          path: posts.path.replace(`/${app.i18n.locale}`, ''),
        }))
      }
    },
  }
  </script>