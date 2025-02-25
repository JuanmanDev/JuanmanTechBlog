// https://nuxt.com/docs/guide/directory-structure/nuxt.config#nuxt-config-file
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],

  modules: [// '@nuxtjs/tailwindcss',
  'nuxt-content-assets', '@nuxt/content', '@nuxtjs/i18n', '@nuxt/eslint', // '@nuxt/image',
  '@nuxt/fonts', '@nuxt/ui', 'nuxt-disqus', 'nuxt-disqus', '@nuxtjs/seo', '@tresjs/nuxt'],

  content: {
    documentDriven: true,
  },

  i18n: {
    defaultLocale: 'en',
    locales: [{ 
      code: 'en',
      iso: 'en-US',
      file: 'en-US.json',
      name: 'English'
    },
    {
      code: 'es',
      iso: 'es-ES',
      file: 'es-ES.json',
      name: 'Español'
    }
    ],
    langDir: 'locales/',
    vueI18n: "en",
    lazy: true,
  },

  tailwindcss: {
    config: {
      darkMode: 'class',
    }
  },

  ui: {
    primary: 'blue',
    gray: 'neutral',
    icons: ['mdi', 'heroicons']
  },

  colorMode: {
    fallback: 'light',
    classSuffix: ''
  },

  css: [
    '~/assets/css/main.css'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  disqus: {
    shortname: "juanmantech",
  },

  ogImage: {
    strictNuxtContentPaths: true
  },

  compatibilityDate: '2024-11-15',

  devtools: {
    enabled: true,
  },

  tres: {
    devtools: true,
  },
})