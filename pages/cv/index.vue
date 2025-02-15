<template>
  <section class="mx-auto w-full max-w-2xl space-y-8 print:space-y-4 mt-8 mb-36">
    <!-- Header Section -->
    <header class="flex items-center justify-between">
      <div class="flex-1 space-y-1.5">
        <h1 class="text-2xl font-bold">{{ cv.basics.name }}</h1>
        <p class="max-w-md text-pretty font-mono text-sm text-foreground/80">
          {{ cv.basics.label }}
        </p>
        <p class="max-w-md items-center text-pretty font-mono text-xs text-foreground">
          <a class="inline-flex gap-x-1.5 align-baseline leading-none hover:underline" 
             href="https://www.google.com/maps/place/Salamanca" 
             target="_blank"
             rel="noopener noreferrer"
             aria-label="Location">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                 fill="none" stroke="currentColor" stroke-width="2" class="lucide lucide-globe size-3">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
              <path d="M2 12h20"/>
            </svg>
            {{ cv.basics.location.city }}, {{ cv.basics.location.country }}
          </a>
        </p>
        
        <!-- Contact Links -->
        <div class="flex gap-x-1 pt-1 font-mono text-sm text-foreground/80 print:hidden space-x-2">
          <a v-for="profile in cv.basics.profiles" 
             :key="profile.network"
             :href="profile.url"
             target="_blank"
             rel="noopener noreferrer"
             >
            <Icon :name="'uil:' + profile.icon" />
          </a>
        </div>
        
        <!-- Print Contact Info -->
        <div class="hidden gap-x-2 font-mono text-sm print:flex print:text-[12px]">
          <a :href="cv.basics.url" class="underline hover:text-foreground/70">{{ cv.basics.url }}</a>
          <span aria-hidden="true">/</span>
          <a :href="`mailto:${cv.basics.email}`" class="underline hover:text-foreground/70">{{ cv.basics.email }}</a>
          <span aria-hidden="true">/</span>
          <a :href="`tel:${cv.basics.phone}`" class="underline hover:text-foreground/70">{{ cv.basics.phone }}</a>
        </div>
      </div>
      <UAvatar :src="cv.basics.image" alt="Profile photo" size="xl" class="rounded-xl"/>
    </header>

    <!-- About Section -->
    <section class="flex min-h-0 flex-col gap-y-3 print:gap-y-1">
      <h2 class="text-xl font-bold">Sobre mí</h2>
      <div class="text-pretty font-mono text-sm text-foreground/80">
        {{ cv.basics.summary }}
      </div>
    </section>

    <!-- Work Experience -->
    <section class="flex min-h-0 flex-col gap-y-3 print:gap-y-1">
      <h2 class="text-xl font-bold">Experiencia Laboral</h2>
      <div class="space-y-4" role="feed">
        <article v-for="(job, index) in cv.work" :key="index" class="rounded-lg bg-card py-1">
          <div class="flex flex-col space-y-1.5">
            <div class="flex items-center justify-between gap-x-2 text-base">
              <h3 class="font-semibold leading-none">
                {{ job.position }}
                <span class="text-gray-400">@ {{ job.name }}</span>
              </h3>
              <div class="text-sm tabular-nums text-gray-500">
                {{ formatDate(job.startDate) }} - {{ job.endDate ? formatDate(job.endDate) : 'Presente' }}
              </div>
            </div>
            <p class="text-pretty font-mono text-sm text-foreground/80">
              {{ job.summary }}
            </p>
            <ul class="list-inside list-disc pl-4 text-xs text-foreground/80">
              <li v-for="(highlight, hi) in job.highlights" :key="hi">{{ highlight }}</li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <!-- Projects -->
    <section class="flex min-h-0 flex-col gap-y-3 print:gap-y-1">
      <h2 class="text-xl font-bold">Proyectos Destacados</h2>
      <div class="-mx-3 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-1">
        <article v-for="project in cv.projects" :key="project.name" class="rounded-lg border p-3 print:flex-row print:border-none">
          <div class="space-y-1">
            <div class="print:flex print:flex-row print:justify-between">
              <h3 class="font-semibold tracking-tight text-base">
                <a :href="project.url" target="_blank" class="hover:underline">
                  {{ project.name }}
                </a>
              </h3>
              
              <!-- Print -->
              <div class="hidden gap-x-2 font-mono text-sm print:flex print:text-[12px]">
                <a :href="cv.basics.url" class="underline hover:text-foreground/70">{{ project.url }}</a>
              </div>
            </div>
            <p class="text-pretty font-mono text-xs">{{ project.description }}</p>
            <ul class="mt-2 flex flex-wrap gap-1">
              <li v-for="(highlight, hi) in project.highlights" :key="hi"
                  class="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-mono bg-secondary text-secondary-foreground">
                {{ highlight }}
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <!-- Skills -->
    <section class="flex min-h-0 flex-col gap-y-3 print:gap-y-1">
      <h2 class="text-xl font-bold">Habilidades Técnicas</h2>
      <ul class="flex flex-wrap gap-1">
        <template v-for="skillgroup in cv.skills" :key="skillgroup.name">
          <li v-for="skill in skillgroup.keywords"
            class="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-mono bg-primary/80 text-primary-foreground bg-opacity-40"
            :style="'background-color: ' + skillgroup.color + 20"
            >
            {{ skill }}
          </li>
        </template>
      </ul>
    </section>

    <!-- Education -->
        <!-- Education -->
        <section class="flex min-h-0 flex-col gap-y-3 print:gap-y-1">
      <h2 class="text-xl font-bold">Educación</h2>
      <article v-for="edu in cv.education" :key="edu.institution" class="rounded-lg bg-card py-1">
        <div class="flex items-center justify-between gap-x-2 text-base">
          <h3 class="font-semibold leading-none">{{ edu.institution }}</h3>
          <div class="text-sm tabular-nums text-gray-500">
            {{ formatDate(edu.startDate) }} - {{ formatDate(edu.endDate) }}
          </div>
        </div>
        <p class="text-pretty font-mono text-sm text-foreground/80">
          {{ edu.studyType }} en {{ edu.area }}
        </p>
        <!-- Add Project Section -->
        <div v-if="edu.project" class="mt-2 border-t pt-2">
          <div class="flex items-center gap-x-2">
            <h4 class="font-medium text-sm">Proyecto Final: {{ edu.project.name }}</h4>
            <a v-if="edu.project.video" 
               :href="edu.project.video" 
               target="_blank"
               class="text-xs text-primary hover:underline"
               rel="noopener noreferrer">
              <Icon name="uil:video" class="inline-block" /> Ver Video
            </a>
          </div>
          <p class="text-pretty font-mono text-xs text-foreground/80 mt-1">
            {{ edu.project.description }}
          </p>
        </div>
      </article>
    </section>
  </section>
</template>

  
<script setup>
  const cv = ref(
    {
  "basics": {
    "name": "Juan Manuel Bécares",
    "label": "Senior Software Engineer",
    "email": "JuanmaDeveloper@outlook.com",
    "url": "https://juanman.tech/",
    "summary": "Computer scientist passionate about creating impactful projects. Focus on frontend and interested in everything.",
    "phone": "+34 679 94 96 54",
    "location": {
      "city": "Salamanca",
      "region": "Castilla y León",
      "country": "Spain",
      "countryCode": "ES"
    },
    "profiles": [
      {
        "network": "LinkedIn",
        "url": "www.linkedin.com/in/becares",
        "icon": "linkedin",
      },
      {
        "network": "Github",
        "url": "https://github.com/JuanmanDev",
        "icon": "github",
      },
      {
        "network": "Mail",
        "url": "mailto:JuanmaDeveloper+cvjuanmantech@outlook.com",
        "icon": "envelope",
      },
      {
        "network": "Phone",
        "url": "tel:+34679949654",
        "icon": "phone",
      }
    ]
  },
  "work": [
    {
      "name": "TUI",
      "position": "Senior Software Engineer",
      "startDate": "2025-01",
      "endDate": null,
      "summary": "Leading frontend data projects, ensuring integration between frontends, data lakes, and AI solutions. Tech stack: Vue, Nuxt, TypeScript, AWS, GitLab CI/CD.",
      "highlights": [
        "Developed framework-independent libraries and managed Node.js compatibility.",
        "Implemented GitLab CI/CD pipelines and utilized AWS services (Firehose, Lambda).",
        "Optimized data flow and scalability for AI-driven solutions like chatbots.",
      ]
    },
    {
      "name": "TUI",
      "position": "Ingeniero de Software",
      "startDate": "2022-04",
      "endDate": "2025-01",
      "summary": "Frontend development with Vue/Nuxt, TypeScript, and Node.js.",
      "highlights": [
        "Developer pure native libraries and integrations with vue 2-3 and microfrontends.",
        "Main developer for data analytics and AI connections.",
        "Managed NPM registries and unit testing with Jest."
      ]
    },
    {
      "name": "ExperiencelT",
      "position": "Frontend Sofware Egnineer",
      "startDate": "2021-10",
      "endDate": "2022-04",
      "summary": "Working on HCIS web system for the medical sector in Spain Frontend mainly with pure native solutions.",
      "highlights": [
        "Creating standard ways to develop software, priciples SOLID and new featrues from ES6.",
        "Develop native web componentes to improve jsp applications.",
        "Reviwing all code project from MR of Junior to ensure eveyrthing is correct using TortoiseSVN."
      ]
    },
    {
      "name": "Grupo Global Exchange",
      "position": "Full stack software Engineer",
      "startDate": "2016-07",
      "endDate": "2020-04",
      "summary": "Developed frontend solutions with Freemarker, Vue, SignalR and .net.",
      "highlights": [
        "Creating full stack web aplications with .net and angularJS.",
        "Managing connection on Microsoft SQL Server with storage procedures.",
        "Leading projects using real time experiences like a tablet to support the money exchange on the customer side with a multi language chat with voice."
      ]
    }
  ],
  "education": [
    {
      "institution": "Universidad de Salamanca",
      "area": "Ingeniería Informática",
      "studyType": "Grado",
      "startDate": "2012",
      "endDate": "2017",
      "project": {
        "name": "JOME",
        "description": "A Home Automation system to automate light, doors, covers and more, using cable with the protocol RS485 using a Raspberry Pi and Arduino. All the configuration is done using a modern web with vue and Parse server inclusding a basic debuger with web.",
        "video": "https://youtu.be/_qTuDBq7LUA"
      } 
    }
  ],
  "certificates": [
    {
      "name": "Cloud Computing",
      "issuer": "[Please specify issuer]"
    },
    {
      "name": "Especialista en Desarrollo de Aplicaciones Web",
      "issuer": "[Please specify issuer]"
    },
    {
      "name": "Experto en Desarrollo FullStack",
      "issuer": "[Please specify issuer]"
    }
  ],
  "skills": [
    {
      "name": "Frontend Development",
      "keywords": ["Vue", "Nuxt", "Pinia", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind", "SocketIO", "NPM"],
      "color": "#FFC107",
    },
    {
      "name": "Cloud & DevOps",
      "keywords": ["AWS", "GitLab CI/CD", "Lambda", "Node.js", "Vercel", "Docker"],
      "color": "#2196F3",
    },
    {
      "name": "Backend",
      "keywords": ["Node.js", "Supabase", "PostgreSQL", "Traefik", "Python", "Home Assistant"],
      "color": "#4CAF50",
    },
    {
      "name": "Data & AI",
      "keywords": ["Data Analytics", "Snowflake", "Datadog", "AI Integration", "SQL", "AWS Firehose", "AWS Kinesis", "MongoDB"],
      "color": "#9C27B0",
    }
  ],
  "languages": [{
    "language": "Spanish",
    "fluency": "Native speaker"
  },{
    "language": "English",
    "fluency": "Advanced"
  },],
  
  "projects": [
    {
      "name": "720 DeGiro",
      "startDate": "2025-01-20",
      "endDate": "2025-02-12",
      "description": "Generates the Model 720 to present on the Spain Goberment easly.",
      "highlights": [
        "Supabase",
        "Nuxt UI 3 Alpha",
        "Vercel",
        "Resend"
      ],
      "url": "https://720degiro.juanman.tech/"
    },
    {
      "name": "Hostel Manager Tool (Removed)",
      "startDate": "2018-01-01",
      "endDate": "2020-02-01",
      "description": "Using a photo of id/passport send it to the spanish police official web.",
      "highlights": [
        "Puppeteer",
        "OCR",
        "Strapi",
        "Typescript"
      ],
    },
    {
      "name": "Taps!",
      "startDate": "2014-06-01",
      "endDate": "2015-02-01",
      "description": "A basic game to tap the screen asap in 10s.",
      "highlights": [
        "Lua",
        "Marmalade",
        "Blackberry",
        "Android"
      ],
      "url": "https://720degiro.juanman.tech/"
    },
  ]
}

  )
  
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const options = { year: 'numeric', month: 'short' }
    return new Date(dateString).toLocaleDateString('es-ES', options)
  }
  
  const getProfileIcon = (network) => {
    const icons = {
      'GitHub': 'i-mdi-github',
      'LinkedIn': 'i-mdi-linkedin',
      'X': 'i-mdi-twitter'
    }
    return icons[network] || 'i-mdi-link'
  }
  </script>
  
  <style>
  .container {
    max-width: 1200px;
  }

  @media print {
    header, footer {
      display: none;
    }
    body {
      /* color: black; */
      --ui-background: var(--color-gray-50);
      --ui-foreground: var(--color-gray-700);
    }
  }

</style>