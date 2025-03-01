import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      // Load every file inside the `content` directory
      source: '**/*.md',
      // Specify the type of content in this collection
      type: 'page',
      
      schema: z.object({
        title: z.string(),
        short: z.string(),
        tags: z.array(z.string()),
        image: z.string(),
        date: z.date(),
        updated: z.date(),
      })

    }),
    
    blog: defineCollection({
        // Load every file inside the `content` directory
        source: '**/*.md',
        // Specify the type of content in this collection
        type: 'page',
        schema: z.object({
            title: z.string(),
            short: z.string(),
            tags: z.array(z.string()),
            image: z.string(),
            date: z.date(),
            updated: z.date(),
          })
    })
  }
})
