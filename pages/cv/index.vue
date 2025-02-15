<template>
  <section class="mx-auto w-full max-w-2xl space-y-8 print:space-y-4 mt-8 mb-36" v-if="cv?.basics?.name">
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
      <UAvatar :src="cv.basics.image" alt="Profile photo" size="3xl" class="rounded-full bg-white"/>
    </header>

    <!-- About Section -->
    <section class="flex min-h-0 flex-col gap-y-3 print:gap-y-1">
      <h2 class="text-xl font-bold">{{ $t('cv.about') }}</h2>
      <div class="text-pretty font-mono text-sm text-foreground/80">
        {{ cv.basics.summary }}
      </div>
    </section>

    <!-- Work Experience -->
    <section class="flex min-h-0 flex-col gap-y-3 print:gap-y-1">
      <h2 class="text-xl font-bold">{{ $t('cv.work_experience') }}</h2>
      <div class="space-y-4" role="feed">
        <article v-for="(job, index) in cv.work" :key="index" class="rounded-lg bg-card py-1">
          <div class="flex flex-col space-y-1.5">
            <div class="flex items-center justify-between gap-x-2 text-base">
              <h3 class="font-semibold leading-none">
                {{ job.position }}
                <span class="text-gray-400">@ {{ job.name }}</span>
              </h3>
              <div class="text-sm tabular-nums text-gray-500">
                {{ formatDate(job.startDate) }} - {{ job.endDate ? formatDate(job.endDate) : $t('cv.present') }}
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

    <!-- Education -->
    <section class="flex min-h-0 flex-col gap-y-3 print:gap-y-1">
      <h2 class="text-xl font-bold">{{ $t('cv.education') }}</h2>
      <article v-for="edu in cv.education" :key="edu.institution" class="rounded-lg bg-card">
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
        <div v-if="edu.project" class="mt-2">
          <div class="flex items-center gap-x-2 justify-between">
            <h4 class="font-medium text-sm">{{ $t('cv.final_project') }}: {{ edu.project.name }}</h4>
            <a v-if="edu.project.video"
              :href="edu.project.video" 
              target="_blank"
              class="text-xs text-primary hover:underline print:hidden"
              rel="noopener noreferrer">
              <Icon name="uil:video" class="inline-block" /> {{ $t('cv.view_video') }}
            </a>
          </div>
          <p class="text-pretty font-mono text-xs text-foreground/80 mt-1">
            {{ edu.project.description }}
          </p>
        </div>
      </article>
    </section>

    <!-- Projects -->
    <section class="flex min-h-0 flex-col gap-y-3 print:gap-y-1">
      <h2 class="text-xl font-bold">{{ $t('cv.projects') }}</h2>
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
      <h2 class="text-xl font-bold">{{ $t('cv.skills') }}</h2>
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
  </section>
</template>
  
<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const cv = ref({})

const loadCvData = async (lang) => {
  const data = await import(`../../content/cv/cv_${lang}.json`)
  cv.value = data.default
}

// Load initial data
loadCvData(locale.value)

// Watch for language changes
watch(locale, (newLocale) => {
  loadCvData(newLocale)
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  const options = { year: 'numeric', month: 'short' }
  return new Date(dateString).toLocaleDateString('es-ES', options)
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