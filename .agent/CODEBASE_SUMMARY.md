# JuanmanTechBlog - LLM Codebase Summary

## Stack
- **Framework**: Nuxt 4 + Vue 3
- **Content**: `@nuxt/content` v3 (markdown, collections)
- **i18n**: `@nuxtjs/i18n` (en default, es)
- **Styling**: Tailwind CSS 4 + `@nuxt/ui` v4
- **Deploy**: Cloudflare Pages via Wrangler

## Structure

```
/content/
├── blog/           # EN posts: [id].md (flat files)
├── es/blog/        # ES posts: [id]/index.md (folder + images)
└── about.md
/pages/blog/
├── index.vue       # Blog list
└── [...slug].vue   # Blog post renderer
/locales/
├── en-US.json
└── es-ES.json
/components/        # Vue components
/layouts/           # Layout templates
/public/            # Static assets
```

## Content Schema (Frontmatter)

```yaml
---
title: string       # Post title
short: string       # Description/excerpt
tags: string[]      # Tag array
image: string       # Cover image path
created: datetime   # Creation date (YYYY-MM-DD HH:MM)
updated: datetime   # Update date
---
```

## Blog Post Locations

| Language | Pattern | Image Storage |
|----------|---------|---------------|
| English | `content/blog/[id].md` | References ES folder: `../es/blog/[id]/image.png` |
| Spanish | `content/es/blog/[id]/index.md` | Colocated: `./image.png` |

## Adding New Blog Post

### Step 1: Create Spanish Version (source of images)

Create folder: `content/es/blog/[NEW_ID]/`

Files:
```
content/es/blog/[NEW_ID]/
├── index.md          # Spanish content
├── image.png         # Cover image
├── image-es.png      # (optional) ES-specific image
└── image-en.png      # (optional) EN-specific image
```

Spanish `index.md`:
```markdown
---
title: Título en Español
short: Descripción breve
tags:
  - Tag1
  - Tag2
created: 2024-12-21 12:00
updated: 2024-12-21 12:00
image: ./image.png
---

# Contenido

![alt](./image.png)
```

### Step 2: Create English Version

Create: `content/blog/[NEW_ID].md`

```markdown
---
title: English Title
short: Brief description
tags:
  - Tag1
  - Tag2
created: 2024-12-21 12:00
updated: 2024-12-21 12:00
image: ../es/blog/[NEW_ID]/image.png
---

# Content

![alt](../es/blog/[NEW_ID]/image.png)
```

## Image Reference Patterns

| Context | ES Post | EN Post |
|---------|---------|---------|
| Frontmatter `image` | `./image.png` or `image.png` | `../es/blog/[id]/image.png` |
| Markdown inline | `![](./image.png)` | `![](../es/blog/[id]/image.png)` |
| Video embed | `<video src="./file.mp4">` | `<video src="../../es/blog/[id]/file.mp4">` |

## Commands

```bash
npm install          # Install deps
npm run dev          # Dev server :3000
npm run build        # Build production
npm run generate     # Static generation
npm run deploy       # Deploy to Cloudflare
```

## Key Config Files

| File | Purpose |
|------|---------|
| `nuxt.config.ts` | Modules, i18n, content settings |
| `content.config.ts` | Content collections schema |
| `app.config.ts` | UI theme configuration |
| `tailwind.config.ts` | Tailwind customization |

## Numbering Convention

Posts use sequential numeric IDs. Next ID = max existing + 1. Current max: 15.

## Notes

- Images stored in ES folder, EN references via relative paths
- Content uses `documentDriven` mode
- SEO via `@nuxtjs/seo` + `nuxt-og-image`
- Comments via Disqus (`nuxt-disqus`)
