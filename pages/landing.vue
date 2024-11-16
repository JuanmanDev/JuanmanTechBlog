
<script setup lang="ts">
// const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())
// const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())

// useSeoMeta({
//   title: page.value.title,
//   ogTitle: page.value.title,
//   description: page.value.description,
//   ogDescription: page.value.description
// })


const { locales, locale, setLocale } = useI18n()


const t = useI18n().t;

const links =  t('start');

let page = {
  "title": "Nuxt UI Pro - Landing template",
  "description": "Nuxt UI Pro is a collection of premium Vue components built on top of Nuxt UI to create beautiful & responsive Nuxt applications in minutes.",
  "hero": {
    "title": "Build your landing in seconds",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    // "headline": {
    //   "label": "Made with Nuxt UI Pro",
    //   "to": "https://ui.nuxt.com/pro",
    //   "icon": "i-heroicons-arrow-top-right-on-square-20-solid"
    // },
    "links": [
      {
        "label": "Go to the Blog",
        "icon": "i-heroicons-arrow-right-20-solid",
        "trailing": true,
        "to": "/blog",
        "size": "xl"
      },
      {
        "label": "Use this template",
        "icon": "i-simple-icons-github",
        "size": "xl",
        "color": "gray",
        "to": "https://github.com/nuxt-ui-pro/landing",
        "target": "_blank"
      }
    ]
  },
  "logos": {
    "title": "Trusted by the world's best",
    "icons": [
      "i-simple-icons-amazonaws",
      "i-simple-icons-heroku",
      "i-simple-icons-netlify",
      "i-simple-icons-vercel",
      "i-simple-icons-cloudflare"
    ]
  },
  "features": {
    "headline": "Features",
    "title": "Why choose our service?",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "items": [
      {
        "title": "Easy to use",
        "description": "Id laborum laboris duis nostrud excepteur ut velit nulla magna Lorem proident non.",
        "icon": "i-heroicons-cog"
      },
      {
        "title": "Reliable",
        "description": "Magna Lorem ex cillum fugiat ad enim aute irure sit duis minim.",
        "icon": "i-heroicons-check"
      },
      {
        "title": "Secure",
        "description": "Proident nostrud excepteur sint ut culpa consectetur aute adipisicing non anim ullamco.",
        "icon": "i-heroicons-lock-closed"
      },
      {
        "title": "Fast",
        "description": "Qui reprehenderit nostrud dolore nisi ad fugiat labore eiusmod sint aliquip nisi voluptate.",
        "icon": "i-heroicons-rocket-launch"
      },
      {
        "title": "Affordable",
        "description": "Reprehenderit fugiat elit in do ipsum ut pariatur.",
        "icon": "i-heroicons-currency-dollar"
      },
      {
        "title": "Scalable",
        "description": "Lorem deserunt et eiusmod. Ea in consectetur minim officia ullamco enim deserunt est.",
        "icon": "i-heroicons-chart-bar"
      }
    ]
  },
  "pricing": {
    "headline": "Pricing",
    "title": "A plan for every need",
    "description": "Pariatur laborum dolor ea commodo sit aute aliquip qui et cillum excepteur.",
    "plans": [
      {
        "title": "Basic",
        "description": "A basic plan for individuals.",
        "price": "$9.99",
        "align": "top",
        "button": {
          "label": "Get Started",
          "color": "gray"
        },
        "features": [
          "1 GB Storage",
          "1 Email Account",
          "1 Domain",
          "1 Website",
          "1 Database",
          "1 SSL Certificate",
          "1 Support Ticket"
        ]
      },
      {
        "title": "Standard",
        "description": "A standard plan for small teams.",
        "price": "$19.99",
        "highlight": true,
        "scale": true,
        "align": "top",
        "button": {
          "label": "Get Started"
        },
        "features": [
          "10 GB Storage",
          "10 Email Accounts",
          "10 Domains",
          "10 Websites",
          "10 Databases",
          "10 SSL Certificates",
          "10 Support Tickets"
        ]
      },
      {
        "title": "Premium",
        "description": "A premium plan for large teams.",
        "price": "$29.99",
        "align": "top",
        "button": {
          "label": "Get Started",
          "color": "gray"
        },
        "features": [
          "100 GB Storage",
          "100 Email Accounts",
          "100 Domains",
          "100 Websites",
          "100 Databases",
          "100 SSL Certificates",
          "100 Support Tickets"
        ]
      }
    ]
  },
  "testimonials": {
    "headline": "Testimonials",
    "title": "What our customers are saying.",
    "description": "Proident sunt exercitation minim laborum enim laboris labore esse.",
    "items": [
      {
        "quote": "Nostrud tempor sunt fugiat. Dolor in sint dolore labore non occaecat adipisicing Lorem labore ullamco enim excepteur. In fugiat Lorem sit velit id veniam esse eiusmod non ea voluptate cupidatat reprehenderit ullamco dolore. Mollit laborum occaecat aliquip.",
        "author": {
          "name": "Rose Roberson",
          "description": "CEO at Company",
          "avatar": {
            "src": "https://i.pravatar.cc/120?img=1",
            "loading": "lazy"
          }
        }
      },
      {
        "quote": "Eiusmod dolor aute ut nulla pariatur officia consequat aute amet exercitation.",
        "author": {
          "name": "Chace Rodgers",
          "description": "CEO at Company",
          "avatar": {
            "src": "https://i.pravatar.cc/120?img=7",
            "loading": "lazy"
          }
        }
      },
      {
        "quote": "Id duis velit enim officia ad nisi incididunt magna ex dolor minim deserunt dolor. Esse incididunt cillum nostrud esse do quis amet labore amet nulla eiusmod amet nulla Lorem. Incididunt ex voluptate irure officia laboris ea proident est qui.",
        "author": {
          "name": "Cornelius Sheppard",
          "description": "CEO at Company",
          "avatar": {
            "src": "https://i.pravatar.cc/120?img=3",
            "loading": "lazy"
          }
        }
      },
      {
        "quote": "Velit consectetur in adipisicing culpa eiusmod commodo eu ex dolore. Officia irure nisi dolor dolore velit fugiat. Aliqua sint aliqua aute elit eu sunt.",
        "author": {
          "name": "Destinee Woods",
          "description": "CEO at Company",
          "avatar": {
            "src": "https://i.pravatar.cc/120?img=5",
            "loading": "lazy"
          }
        }
      },
      {
        "quote": "Proident quis deserunt qui ex exercitation veniam id Lorem est cupidatat ipsum irure aliquip ad.",
        "author": {
          "name": "Kaleb Mccormick",
          "description": "CEO at Company",
          "avatar": {
            "src": "https://i.pravatar.cc/120?img=8",
            "loading": "lazy"
          }
        }
      },
      {
        "quote": "Magna officia quis ea ea in officia non voluptate ipsum culpa do labore sunt. Aute est dolore commodo sint officia ad laboris dolor magna aliquip exercitation tempor commodo.",
        "author": {
          "name": "Jazmin Mccall",
          "description": "CEO at Company",
          "avatar": {
            "src": "https://i.pravatar.cc/120?img=9",
            "loading": "lazy"
          }
        }
      }
    ]
  },
  "cta": {
    "title": "Get started today",
    "description": "Nisi mollit id aliquip sunt est laborum sit sit.",
    "links": [
      {
        "label": "Sign up for free",
        "size": "xl"
      }
    ]
  },
  "faq": {
    "title": "Frequently asked questions",
    "description": "Culpa consectetur dolor pariatur commodo aliqua amet tempor nisi enim deserunt elit cillum.",
    "items": [
      {
        "label": "Is this a secure service?",
        "content": "Qui sunt nostrud aliquip reprehenderit enim proident veniam magna aliquip velit occaecat eiusmod nisi deserunt sunt.",
        "defaultOpen": true
      },
      {
        "label": "How can I cancel my subscription?",
        "content": "Consectetur irure Lorem nostrud adipisicing aliqua mollit Lorem sit officia magna eiusmod cupidatat."
      },
      {
        "label": "How does the free trial work?",
        "content": "Quis officia commodo magna eu qui aliquip duis."
      },
      {
        "label": "Can I switch plans later?",
        "content": "Dolore irure ullamco dolore eu occaecat magna eiusmod dolor aliqua culpa labore."
      },
      {
        "label": "Do you offer refunds?",
        "content": "Duis mollit nostrud voluptate mollit Lorem dolore commodo veniam incididunt eiusmod."
      },
      {
        "label": "Do you offer support?",
        "content": "Aliqua sit nisi consequat pariatur Lorem minim irure qui."
      }
    ]
  }
};
</script>

<template>
  <div>
    <ULandingHero
      :title="page.hero.title"
      :description="page.hero.description"
      :links="page.hero.links"
    >
      <template #headline>
        <UBadge
          v-if="page.hero.headline"
          variant="subtle"
          size="lg"
          class="relative rounded-full font-semibold"
        >
          <NuxtLink
            :to="page.hero.headline.to"
            target="_blank"
            class="focus:outline-none"
            tabindex="-1"
          >
            <span
              class="absolute inset-0"
              aria-hidden="true"
            />
          </NuxtLink>

          {{ page.hero.headline.label }}

          <UIcon
            v-if="page.hero.headline.icon"
            :name="page.hero.headline.icon"
            class="ml-1 w-4 h-4 pointer-events-none"
          />
        </UBadge>
      </template>

      <ImagePlaceholder />

      <ULandingLogos
        :title="page.logos.title"
        align="center"
      >
        <UIcon
          v-for="icon in page.logos.icons"
          :key="icon"
          :name="icon"
          class="w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0 text-gray-900 dark:text-white"
        />
      </ULandingLogos>
    </ULandingHero>

    <ULandingSection
      :title="page.features.title"
      :description="page.features.description"
      :headline="page.features.headline"
    >
      <UPageGrid
        id="features"
        class="scroll-mt-[calc(var(--header-height)+140px+128px+96px)]"
      >
        <ULandingCard
          v-for="(item, index) in page.features.items"
          :key="index"
          v-bind="item"
        />
      </UPageGrid>
    </ULandingSection>

    <ULandingSection
      :title="page.pricing.title"
      :description="page.pricing.description"
      :headline="page.pricing.headline"
    >
      <UPricingGrid
        id="pricing"
        compact
        class="scroll-mt-[calc(var(--header-height)+140px+128px+96px)]"
      >
        <UPricingCard
          v-for="(plan, index) in page.pricing.plans"
          :key="index"
          v-bind="plan"
        />
      </UPricingGrid>
    </ULandingSection>

    <ULandingSection
      :headline="page.testimonials.headline"
      :title="page.testimonials.title"
      :description="page.testimonials.description"
    >
      <UPageColumns
        id="testimonials"
        class="xl:columns-4 scroll-mt-[calc(var(--header-height)+140px+128px+96px)]"
      >
        <div
          v-for="(testimonial, index) in page.testimonials.items"
          :key="index"
          class="break-inside-avoid"
        >
          <ULandingTestimonial v-bind="testimonial" />
        </div>
      </UPageColumns>
    </ULandingSection>

    <ULandingSection class="bg-primary-50 dark:bg-primary-400 dark:bg-opacity-10">
      <ULandingCTA
        v-bind="page.cta"
        :card="false"
      />
    </ULandingSection>

    <ULandingSection
      id="faq"
      :title="page.faq.title"
      :description="page.faq.description"
      class="scroll-mt-[var(--header-height)]"
    >
      <ULandingFAQ
        multiple
        :items="page.faq.items"
        :ui="{
          button: {
            label: 'font-semibold',
            trailingIcon: {
              base: 'w-6 h-6'
            }
          }
        }"
        class="max-w-4xl mx-auto"
      />
    </ULandingSection>
  </div>
</template>
