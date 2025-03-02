---
title: Migrando de Nuxt Content Assets a Nuxt Content V3
short: Resolviendo desafíos de gestión de assets al actualizar a Nuxt Content V3
tags:
  - Nuxt Content
  - Nuxt.js
  - Guía de Migración
  - Gestión de Assets
created: 2025-03-01 22:00
updated: 2025-03-02 10:00
---

# El Desafío

Al migrar a Nuxt Content V3 para compatibilidad con LLM, nos enfrentamos a dos desafíos principales:
1. Pérdida de la gestión de assets de Nuxt Content Assets
2. Problemas con rutas relativas de imágenes en archivos markdown, especialmente con URLs que terminan con o sin barras diagonales

## Entendiendo los Problemas

### Gestión de Assets
En Nuxt Content V2, los assets se manejaban automáticamente dentro de las carpetas de contenido. V3 requiere gestión manual de assets.

### Problemas de Resolución de Rutas
Las URLs con o sin barras diagonales al final pueden causar problemas con las rutas relativas de imágenes, especialmente en entornos de producción como Vercel. Necesitamos manejar estos casos específicamente.

## Implementación

### 1. Configuración de Copia de Assets

Primero, actualiza tu `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  nitro: {
    plugins: ['~/scripts/copy-content-images']
  }
})
```

### 2. Middleware del Servidor para Desarrollo

Crea un middleware del servidor para manejar el servicio de imágenes en desarrollo:

```ts
// server/middleware/serve-images.ts
import { join } from 'node:path'
import { readFileSync, existsSync } from 'node:fs'
import { defineEventHandler } from 'h3'

// ... código del middleware ...
```

Este middleware:
- Intercepta peticiones de imágenes
- Las sirve directamente desde el directorio de contenido
- Maneja múltiples formatos de imagen
- Funciona perfectamente en desarrollo

### 3. Solución para la Resolución de Rutas

Para manejar correctamente las rutas relativas, implementamos una función de transformación al obtener contenido:

```ts
const { data: post } = await useAsyncData('page-' + path, async () => {
  return queryCollection('content').path(path).first();
}, {
  transform: (data) => {
    data.body.value = updateImageSources(data.body.value, data.path);
    return data;
  }
})
```

La función de transformación procesa recursivamente el array de contenido markdown y convierte las rutas relativas en absolutas.

## Cómo Funciona

1. El plugin Nitro maneja la copia de assets durante la compilación
2. La función de transformación procesa el contenido markdown para corregir las rutas
3. Manejo especial para despliegues en Vercel a través de comprobaciones de entorno

## Beneficios

- Mantiene la estructura organizada del contenido
- Copia automática de assets durante la compilación
- Compatible con Nuxt Content V3 y Nuxt LLM
- Sin sobrecarga en tiempo de ejecución

## Limitaciones Actuales

- La resolución de rutas puede necesitar atención manual en algunos casos extremos
- Los entornos de desarrollo y producción pueden comportarse de manera diferente
- Los despliegues en Vercel requieren configuración adicional
- Se necesita recompilar manualmente cuando cambia el contenido

## Mejores Prácticas

1. Usar siempre formatos de ruta consistentes en archivos markdown
2. Probar tanto con como sin barras diagonales al final
3. Verificar rutas de imágenes tanto en desarrollo como en producción
4. Considerar usar rutas absolutas cuando sea posible

## Mejoras Futuras

- Implementar una resolución de rutas más robusta
- Crear un comportamiento unificado entre desarrollo y producción
- Añadir pruebas automatizadas para resolución de rutas
- Considerar implementar una capa de caché
- Usar un transformador de nuxt content

## Recursos

- [Documentación de Nuxt Content V3](https://content.nuxt.com/)
- [Módulo Nuxt LLM](https://nuxt.com/modules/llms)
- [Nuxt Content Assets (Legacy)](https://nuxt.com/modules/content-assets)
