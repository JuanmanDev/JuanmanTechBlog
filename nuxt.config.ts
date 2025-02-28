// https://nuxt.com/docs/guide/directory-structure/nuxt.config#nuxt-config-file
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],

  modules: [// '@nuxtjs/tailwindcss',
    'nuxt-content-assets',
    '@nuxtjs/seo',
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@nuxt/eslint',
    // '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/ui',
    'nuxt-disqus',
    '@tresjs/nuxt',
    'nuxt-llms',
  ],

  content: {
    documentDriven: true,
    navigation: {
      fields: ['title', 'description', 'image', '_path', 'updated']
    }
  },

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
      //css: false,
      // onBeforeEnter: () => {
      //   window.scrollTo(0, 0);
      // }
     }
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
    langDir: '../locales/',
    vueI18n: 'en',
    lazy: true
  },

  tailwindcss: {
    config: {
      darkMode: 'class'
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
      autoprefixer: {}
    }
  },

  disqus: {
    shortname: 'juanmantech'
  },

  // ogImage: {
  //   strictNuxtContentPaths: true
  // },

  compatibilityDate: '2024-11-15',

  devtools: {
    enabled: true
  },

  tres: {
    devtools: true
  },

  llms: {
    domain: 'https://juanman.tech',
    title: 'Juanman Tech',
    full: {
      title: 'Juanman Tech',
      description: 'Juanman Tech is a blog about web development, programming, and technology by Juan Manuel Béc.',
    },
  },
})
