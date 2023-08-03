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
    </div>
  </template>
  
  <script>
  export default {
    name: 'BlogOverview',
    async asyncData({ $content, app, error }) {
    },
  }
  </script>