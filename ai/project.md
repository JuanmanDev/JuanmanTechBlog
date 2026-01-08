# Project Analysis: JuanmanTechBlog

## Overview
This project is a personal technical blog built with **Nuxt 4.1.0**. It utilizes a modern stack focusing on performance, SEO, and developer experience. The content is managed via Markdown files using **@nuxt/content**, and the site is fully localized for English and Spanish.

## Technology Stack
- **Framework**: [Nuxt 4](https://nuxt.com)
- **Content Management**: [@nuxt/content v3](https://content.nuxt.com)
- **UI Framework**: [@nuxt/ui](https://ui.nuxt.com) & [TailwindCSS](https://tailwindcss.com)
- **Localization**: [@nuxtjs/i18n](https://i18n.nuxtjs.org)
- **3D Graphics**: [@tresjs/nuxt](https://tresjs.org) (Three.js integration)
- **LLM Integration**: `nuxt-llms` (Custom or specific module for LLM features)
- **Deployment**: Configured for Cloudflare Pages (`wrangler` present in scripts)

## Key Directories

### `content/`
Manages the blog's content. The structure supports internationalization:
- **`content/blog/`**: Contains the default language (English) blog posts as markdown files (e.g., `1.md`, `16.md`).
- **`content/es/`**: Contains the Spanish localization content.
    - **`content/es/blog/`**: Spanish versions of the blog posts.
- **`about.md`**: Content for the "About" page.

### `components/`
Contains Vue components used building the UI. Key components include:
- `AppHeader.vue`: The main site header.
- `AppFooter.vue`: The site footer.
- `LanguageSwitcher.vue`: Component for toggling between locales.
- `content/`: Likely contains custom components used within Markdown files (MDC).

### `layouts/`
- **`default.vue`**: The main layout wrapper for pages.

### `server/`
Nuxt server-side logic.
- Likely contains API routes or server middleware, though detailed contents weren't fully explored, the `nitro` config suggests plugins like `copy-content-images`.

### `locales/`
Contains i18n JSON files:
- `en-US.json`
- `es-ES.json`

## Configuration Highlights (`nuxt.config.ts`)
- **Modules**: Extensive list including `nuxt-content`, `nuxt-ui`, `nuxt-i18n`, `nuxt-seo`.
- **i18n**: Configured for `en` (default) and `es` with lazy loading from `locales/` directory.
- **Content**: `documentDriven` mode is enabled. Navigation uses `title`, `description`, `image`, `_path`, `updated`, and `created`.
- **SSR/Prerendering**: Site is configured for static hosting (Cloudflare Pages) with `prerender` enabled for all routes.

## Development Workflow
- **Run Dev Server**: `npm run dev` (or `nuxt dev`)
- **Build**: `npm run build`
- **Deploy**: `npm run deploy` (deploys to Cloudflare Pages)

## Notes
- The project uses numerical filenames for blog posts (e.g., `16.md`), likely for easy ordering or migration from a previous system.
- `nuxt-llms` suggests an AI-aware feature set, possibly for generating summaries or chat integration.

## Adding a Blog Post

To add a new blog post, follow these steps to ensure proper internationalization and structure.

### 1. Choose an ID
Assign a unique numerical ID for the post (e.g., `17`). This ID must be used for both the English and Spanish versions.

### 2. Directory & File Structure
The project uses a specific structure where assets (images) are often co-located with the Spanish version, and the English version references them.

**Spanish (Source/Bundle):**
Create a directory with the ID: `content/es/blog/[ID]/`
Inside this directory, place:
- `index.md`: The Spanish blog post content.
- `image.png`: The featured image for the post.

**English:**
Create a file with the ID: `content/blog/[ID].md`

### 3. Frontmatter & Content

**Spanish (`content/es/blog/[ID]/index.md`)**
```yaml
---
title: Título del Post
short: Breve descripción para la lista de posts.
tags:
  - Tag1
  - Tag2
created: YYYY-MM-DD HH:MM
updated: YYYY-MM-DD HH:MM
image: ./image.png
---

# Título del Post (H1)

Contenido del post...
```

**English (`content/blog/[ID].md`)**
```yaml
---
title: Post Title
short: Short description for the post list.
tags:
  - Tag1
  - Tag2
created: YYYY-MM-DD HH:MM
updated: YYYY-MM-DD HH:MM
image: ../es/blog/[ID]/image.png
---

# Post Title (H1)

Post content...
```

### Key Rules
- **IDs MUST match**: The filename in `content/blog/` must match the directory name in `content/es/blog/`.
- **Images**: Store the image in the Spanish directory (`content/es/blog/[ID]/`) and reference it relatively from both files as shown above.
- **Dates**: Ensure `created` and `updated` fields match the format `YYYY-MM-DD HH:MM`.

