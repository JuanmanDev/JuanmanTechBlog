<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute();

// State for background animation
const isSpinning = ref(false)

const triggerSpin = (event: Event, url?: string, isExternal = false) => {
  event.preventDefault()
  
  // Trigger the animation
  isSpinning.value = true
  
  if (isExternal) {
    // Navigate after 500ms for external links
    setTimeout(() => {
      isSpinning.value = false
      if (url) {
        window.open(url, '_blank')
      }
    }, 500)
  } else {
    // Navigate immediately for internal links
    if (url) {
      
      setTimeout(() => {
        navigateTo(url)
      }, 200)
    }
    setTimeout(() => {
      isSpinning.value = false
    }, 500)
  }
}

const page = {
  "hero": {
    "title": "Hello! I'm Juanma :)",
    "description": "Tech Blog Projects",
    "lastBlogsPosts": "Last blog posts",
    "projects": "Projects", // Added key for projects section
    "links": [
      {
        "label": "Go to the Blog",
        "icon": "i-heroicons-arrow-right-20-solid",
        "trailing": true,
        "to": localePath("/blog"),
        "size": "xl"
      },
      {
        "label": "Check this project on github",
        "icon": "i-simple-icons-github",
        "size": "xl",
        "color": "gray",
        "to": "https://github.com/JuanmanDev/JuanmanTechBlog?ref=juanman.tech",
        "target": "_blank"
      }
    ]
  },
  "logos": {
    "title": "This web has been created with:",
    "icons": [
      "i-simple-icons-vuedotjs",
      "i-simple-icons-nuxtdotjs",
      "i-simple-icons-vercel",
      "i-simple-icons-javascript",
      "i-simple-icons-typescript"
    ]
  },
};

// Example projects array
let projects = [
  {
    title: "Hotelier Tools",
    subtitle: "Improve Little Hotelier to automate hotel operations. Detect errors and inconsistencies. Improve the current Web page with new features. Detect errors and inconsistencies. Generate bulk invoices and download. Mark paid reservatiosns from external sources.",
    path: "https://hotelier.tools/",
    image: "/image/projects/hotelier-tools.png"
  },
  {
    title: "720 Degiro",
    subtitle: "Create Model 720 for the Spanish tax declaration in 5 minutes. Just Export your DeGiro data and upload it. Guide included.",
    path: "https://720degiro.juanman.tech/",
    image: "/image/projects/720degiro.png"
  },
  {
    title: "Bus Salamanca Alexa Skill",
    subtitle: "Alexa Skill to get time to arrive next buses on Salamanca. Configure your closest bus stops and ask Alexa for arrival times.",
    path: "https://www.amazon.es/Juan-Manuel-B%C3%A9c-Bus-Salamanca/dp/B0F59TDK93/",
    image: "/image/projects/bus-salamanca.png"
  }
];

if (locale.value === 'es') {
  page.hero.title = "¡Hola! Soy Juanma :)";
  page.hero.description = "Web, blog y proyectos";
  page.hero.lastBlogsPosts = "Lo último en el blog";
  page.hero.links[0].label = "Ir al Blog";
  page.hero.links[1].label = "Ver este proyecto en github";
  page.logos.title = "Está web está hecha con:";
  page.hero.projects = "Proyectos"; // Spanish translation

  projects = [
    {
      title: "Hotelier Tools",
      subtitle: "Herramientas para la gestión y operación hotelera. Automatiza Little Hotelier. Detecta errores e inconsistencias. Mejora la web actual con nuevas funcionalidades. Genera facturas masivas y descárgalas. Marca reservas pagadas de fuentes externas.",
      path: "https://hoteliertools.com/",
      image: "/image/projects/hotelier-tools.png"
    },
    {
      title: "720 Degiro",
      subtitle: "Genera el Modelo 720 para la presentación desde DeGiro. Exporta tus datos de DeGiro y súbelos. Guía incluida. En 5 minutos listo.",
      path: "https://720degiro.juanman.tech/",
      image: "/image/projects/720degiro.png"
    },
    {
      title: "Bus Salamanca Alexa Skill",
      subtitle: "Skill de Alexa para saber los tiempos de llegada de los autobuses urbanos de Salamanca. Configura tus paradas de autobús más cercanas y pregunta a Alexa por los tiempos de llegada.",
      path: "https://www.amazon.es/Juan-Manuel-B%C3%A9c-Bus-Salamanca/dp/B0F59TDK93/",
      image: "/image/projects/bus-salamanca.png"
    }
  ];
}

// Add UTM parameter to project links
const addUTMToUrl = (url: string) => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}utm_source=juanman.tech`;
};



const { data: blogs3 } = await useAsyncData('p-' + route.path,
  () => queryCollection('content')
    .select(
      'path',
      'title',
      'image',
      'short',
    )
    .where('path', 'LIKE', localePath(`/blog/`) + '%' )
    .order('updated', 'DESC')
    .limit(3)
    .all()
  )

useSeoMeta({
  title: "Juanman Tech - Welcome!",
  ogTitle: "Juanman Tech - Welcome!",
  description: "This is my website",
  ogDescription: "This is my website"
})

defineOgImageScreenshot({
  // wait 2 seconds
  delay: 2000
})
</script>
<template>
  <div class="relative w-full h-full min-h-dvh">
    <div class="fixed -z-10 inset-0 w-full h-full">
      <div class="w-full h-full">
        <ClientOnly>
          <DecorationTresjs 
            class="w-full h-full"
            :is-spinning="isSpinning"
          />
        </ClientOnly>
      </div>
    </div>

    <div class="py-10 sm:py-32 md:py-20 relative 2xl:pt-[22vh] xl:pt-[12vh] pt-[17vh]">
      <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl gap-16 sm:gap-y-24 flex flex-col">
        <div class="text-center">
          <h1 class="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
            {{ page.hero.title }}
          </h1>
          <div class="mt-6 text-lg tracking-tight text-gray-600 dark:text-gray-300">
            {{ page.hero.description }}
          </div>
          <div class="mt-10 flex flex-wrap gap-x-6 gap-y-3 justify-center">
            <a
              v-for="link in page.hero.links"
              :key="link.to"
              :href="localePath(link.to)"
              :target="link.target || '_self'"
              :class="[
                'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-base gap-x-2.5 px-3.5 py-2.5 shadow-sm inline-flex items-center cursor-pointer',
                link.color === 'gray'
                  ? 'ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700/50'
                  : 'text-white dark:text-gray-900 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100',
              ]"
              @click="triggerSpin($event, localePath(link.to), !!link.target)"
            >
              <UIcon v-if="link.icon" :name="link.icon" />
              <span>{{ link.label }}</span>
          </a>
          </div>
        </div>


      </div>
    </div>

    <div class="bg-primary-50/70 dark:bg-primary-40/70 backdrop-blur py-5 px-3 gap-0 lg:mx-10 mt-20">
      <div class="max-w-6xl mx-auto">
        <div class="flex justify-between m-2">
          <h2 class="dark:text-slate-950 pt-2">{{ page.hero.projects }}</h2>
        </div>

        <div class="flex flex-col gap-4 text-gray-900 dark:text-white">
          <template v-for="project in projects" :key="project.title">
            <a
              :href="addUTMToUrl(project.path)"
              target="_blank"
              rel="noopener noreferrer"
              class="project-card w-full block cursor-pointer"
              @click="triggerSpin($event, addUTMToUrl(project.path), true)"
            >
              <UCard class="project-card-inner h-full overflow-hidden">
                <div class="flex flex-col md:flex-row gap-4 items-center min-w-0">
                  <div v-if="project.image" class="w-full md:w-48 h-48 flex-shrink-0">
                    <img
                      :src="project.image"
                      :alt="project.title"
                      class="w-full h-full object-cover rounded-lg"
                    >
                  </div>
                  <div class="flex-1 min-w-0 max-w-full overflow-hidden">
                    <h2 class="text-xl font-bold mb-2 overflow-hidden text-ellipsis whitespace-nowrap">{{ project.title }}</h2>
                    <p class="font-light text-gray-600 dark:text-gray-300 mb-3 overflow-hidden text-ellipsis line-clamp-3">{{ project.subtitle }}</p>
                    <div class="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 max-w-full">
                      <UIcon name="i-heroicons-link" class="w-4 h-4 flex-shrink-0" />
                      <span class="overflow-hidden text-ellipsis whitespace-nowrap block min-w-0 flex-shrink">{{ project.path }}</span>
                      <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4 flex-shrink-0" />
                    </div>
                  </div>
                </div>
              </UCard>
            </a>
          </template>
        </div>
      </div>
    </div>

    <div class="bg-primary-50/70 dark:bg-primary-40/70 backdrop-blur py-5 px-3 gap-0 lg:mx-10 mt-20">
      <div class="max-w-6xl mx-auto">
        <div class="flex justify-between m-2">
          <h2 class="dark:text-slate-950 pt-2">{{ page.hero.lastBlogsPosts }}</h2>
          <a
            class="focus:outline-none cursor-pointer"
            tabindex="-1"
            :href="localePath('/blog')"
            @click="triggerSpin($event, localePath('/blog'), false)"
          >
            <UButton
              :label="page.hero.links[0].label"
              icon="i-heroicons-arrow-right-20-solid"
              :trailing="true"
              size="xl"
            />
          </a>
        </div>

        <div v-if="blogs3" class="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-900 dark:text-white">
          <template v-for="(article, index) in blogs3" :key="article.path">
            <a
              v-if="index < 3"
              :href="article.path"
              class="blog-card block h-full cursor-pointer"
              @click="triggerSpin($event, article.path, false)"
            >
              <UCard class="blog-card-inner h-full flex flex-col">
                <div v-if="article.image" class="w-full h-48 mb-4 flex-shrink-0">
                  <img
                    :src="article.image"
                    :alt="article.title"
                    class="w-full h-full object-cover rounded-lg"
                  >
                </div>
                <div class="flex-1 flex flex-col min-w-0">
                  <h2 class="font-bold mb-2 overflow-hidden text-ellipsis">{{ article.title }}</h2>
                  <p v-if="article.short" class="text-sm text-gray-600 dark:text-gray-400 mt-auto overflow-hidden text-ellipsis line-clamp-3">
                    {{ article.short }}
                  </p>
                </div>
              </UCard>
            </a>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css">
/* Style the image */
.zoom-image {
  object-fit: cover;
  transition: transform 0.5s ease, opacity 0.5s ease;
  overflow: hidden;
}
.zoom-image:hover {
  transform: scale(3) rotateY(360deg); /* Scale up and rotate 3 full spins (360deg * 3) */
  opacity: 0.8;
  transition: transform 1.2s ease-in-out, opacity 0.5s ease;
}

/* Project card animations */
.project-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: scale(1.02);
}

.project-card:active {
  transform: scale(0.98);
  transition: transform 0.1s ease;
}

.project-card-inner {
  transition: box-shadow 0.3s ease;
}

.project-card:hover .project-card-inner {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

/* Blog card animations */
.blog-card {
  transition: transform 0.3s ease;
}

.blog-card:hover {
  transform: scale(1.02);
}

.blog-card:active {
  transform: scale(0.98);
  transition: transform 0.1s ease;
}

.blog-card-inner {
  transition: box-shadow 0.3s ease;
}

.blog-card:hover .blog-card-inner {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}
</style>