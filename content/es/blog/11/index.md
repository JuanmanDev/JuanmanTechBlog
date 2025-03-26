---
title: Solución para Nuxt Disqus y Tailwind v4 con OKLCH
short: Cómo arreglar la compatibilidad de Nuxt Disqus y Disqus iframe con Tailwind v4 y sus colores OKLCH
tags:
  - Nuxt
  - Disqus
  - TailwindCSS
  - JavaScript
  - Soluciones
created: 2025-03-25 10:00
updated: 2025-03-25 10:00
---

Recientemente me encontré con un problema al usar Nuxt Disqus y el iframe de Disqus en un proyecto que utiliza TailwindCSS v4. Este problema surge porque Tailwind v4 utiliza colores en formato `oklch`, lo que rompe el análisis de estilos en JavaScript y genera excepciones.

## El Problema

Disqus utiliza `getComputedStyle` para determinar si debe renderizar la versión clara u oscura del iframe. Sin embargo, con Tailwind v4, los colores en formato `oklch` no son compatibles con el análisis de estilos de JavaScript, lo que provoca errores.

## La Solución

Gracias a la flexibilidad de JavaScript, podemos sobrescribir el método `getComputedStyle` para manejar los valores `oklch` y evitar que se generen excepciones. Aquí está el código que utilicé para solucionar el problema:

```javascript
// Guardar la función original de getComputedStyle
const originalGetComputedStyle = window.getComputedStyle;

// Sobrescribir getComputedStyle
window.getComputedStyle = function (element, pseudoElt) {
  const styles = originalGetComputedStyle(element, pseudoElt);

  // Devolver un proxy para interceptar llamadas a getPropertyValue
  return new Proxy(styles, {
    get(target, prop) {
      if (prop === 'getPropertyValue') {
        return (property) => {
          const value = target.getPropertyValue(property);
          // Reemplazar valores "oklch" o manejarlos según sea necesario
          if (value.includes('oklch')) {
            return ''; // Devolver un valor alternativo
          }
          return value;
        };
      }
      return target[prop];
    },
  });
};
```

## Alternativas

Existen otras soluciones para este problema, como cambiar manualmente los colores de fondo en el iframe de Disqus. Puedes encontrar más información en estos enlaces:

- [Workaround para colores OKLCH en Disqus](https://jamesauble.com/blog/oklch-colors-workaround-for-disqus-embed-js/)
- [Problema reportado en Nuxt Disqus](https://github.com/modbender/nuxt-disqus/issues/5)
- [Problema reportado en Disqus React](https://github.com/disqus/disqus-react/issues/153)

## Conclusión

Esta solución me permitió mantener la compatibilidad con Tailwind v4 sin necesidad de modificar los colores de fondo directamente. Espero que esta alternativa sea útil para otros desarrolladores que enfrenten el mismo problema.

Si tienes alguna pregunta o sugerencia, no dudes en dejar un comentario. ¡Espero que esta solución te ayude!
