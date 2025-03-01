// https://nuxt.com/docs/guide/directory-structure/nuxt.config#nuxt-config-file
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],

  modules: [
    'nuxt-llms',
    '@nuxtjs/seo',
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/ui',
    'nuxt-disqus',
    '@tresjs/nuxt',
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
    },
    
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
        { rel: 'manifest', href: '/favicon/site.webmanifest' },
      ],
    },
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

  nitro: {
    plugins: ['~/scripts/copy-content-images']
  }
})
