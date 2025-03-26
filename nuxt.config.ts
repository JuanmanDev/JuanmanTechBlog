import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/guide/directory-structure/nuxt.config#nuxt-config-file
export default defineNuxtConfig({
  // extends: ['@nuxt/ui-pro'],

  modules: [
    'nuxt-disqus',
    'nuxt-llms',
    '@nuxtjs/seo',
    '@nuxtjs/i18n',
    '@nuxt/ui',
    '@nuxt/ui-pro',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@tresjs/nuxt',
    'nuxt-og-image',
  ],

  content: {
    documentDriven: true,
    navigation: {
      fields: ['title', 'description', 'image', '_path', 'updated', 'created']
    },
    
    build: {
      markdown: {
        toc: {
          searchDepth: 1
        }
      }
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
    colorMode: true,
    // theme: {
    //   colors: ['primary', 'error']
    // },
    // gray: 'slate',
    icons: ['mdi', 'heroicons'],
    // colors: {
    //   primary: '#FF0000',
    // },
  },
  uiPro: {
    content: true
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
      '@tailwindcss/postcss': {}, // Updated to use the new package
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
    plugins: ['~/scripts/copy-content-images'],
    // preset: 'cloudflare_pages',
    // ssr: false,
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      ignore: [
        // Add paths that cause prerender errors
        '/api',
        '/admin'
      ],
      failOnError: false, // Prevents build failure on prerender errors
    },
    
    // Optional: Add more static routes that need prerendering
    routeRules: {
      '/**': { prerender: true }
    }
  },

  site: {
    url: "https://juanman.tech",
    name: 'JuanmanTech - its Me Juanman!' 
  },

  
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})