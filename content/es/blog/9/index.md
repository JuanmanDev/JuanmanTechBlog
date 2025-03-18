---
title: Exportaciones Modernas en Package.json - Una Guía Completa
short: Entendiendo exportaciones múltiples y typeExports en paquetes modernos de Node.js
# image: ../es/blog/10/exports.png
tags:
  - Node.js
  - TypeScript
  - npm
  - Módulos
  - Desarrollo de Paquetes
created: 2025-03-18 18:00
updated: 2025-03-18 18:00
---

El desarrollo moderno de paquetes en Node.js ha evolucionado significativamente con la introducción de mapas de exportación e integración con TypeScript. Esta guía cubre todo lo que necesitas saber sobre la configuración de exportaciones en tu package.json.

## Requisitos de Versión

Para usar estas características, necesitarás:
- Node.js >= 12.7.0 (exportaciones básicas)
- Node.js >= 14.13.0 (exportaciones con patrones)
- TypeScript >= 4.7 (para `typeExports` y resolución adecuada de módulos)

## Configuración Básica de Exportaciones

El campo exports en package.json define los puntos de entrada para tu paquete:

```json
{
  "name": "my-package",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    }
  }
}
```

## Exportaciones Avanzadas de Subrutas

Puedes exponer múltiples puntos de entrada con condiciones específicas:

```json
{
  "name": "my-package",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    },
    "./utils": {
      "types": "./dist/utils/index.d.ts",
      "import": "./dist/utils/index.mjs",
      "require": "./dist/utils/index.cjs"
    },
    "./components/*": {
      "types": "./dist/components/*.d.ts",
      "import": "./dist/components/*.mjs",
      "require": "./dist/components/*.cjs"
    }
  }
}
```

## Integración con TypeScript

TypeScript 4.7+ introdujo soporte mejorado para exportaciones de paquetes:

```json
{
  "name": "my-package",
  "exports": {
    ".": {
      "types": "./types/index.d.ts",
      "import": {
        "types": "./types/index.d.mts",
        "default": "./dist/index.mjs"
      },
      "require": {
        "types": "./types/index.d.cts",
        "default": "./dist/index.cjs"
      }
    }
  }
}
```

## Beneficios del Tree Shaking

Los mapas de exportación modernos permiten un mejor tree shaking:

```javascript
// Antes (potencialmente incluye todas las utilidades)
import { specific } from 'my-package/utils';

// Después (con exportaciones apropiadas)
import { specific } from 'my-package/utils/specific';
```

Ejemplo de una configuración compatible con tree shaking:

```json
{
  "exports": {
    "./utils/*": {
      "types": "./dist/utils/*.d.ts",
      "import": "./dist/utils/*.mjs"
    }
  }
}
```

## Consideraciones de Compatibilidad

Para mantener compatibilidad con versiones anteriores de Node.js, mantén los campos tradicionales:

```json
{
  "name": "my-package",
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    // ... configuración moderna de exportaciones
  }
}
```

## Problemas Comunes

1. **Incompatibilidad de Versiones**: Siempre documenta los requisitos mínimos de versión
2. **Herramientas de Build**: Asegúrate de que tu empaquetador soporte mapas de exportación
3. **Resolución de Tipos**: Algunos IDEs podrían necesitar configuración adicional

## Recomendaciones

1. Comienza con exportaciones básicas para el punto de entrada principal
2. Añade exportaciones de subrutas gradualmente
3. Prueba exhaustivamente en diferentes versiones de Node.js
4. Documenta claramente los requisitos de versión
5. Considera proporcionar alternativas para entornos más antiguos

Los mapas de exportación son poderosos pero requieren una consideración cuidadosa del entorno de tus usuarios. Al implementar estas características, asegúrate siempre de realizar pruebas en diferentes versiones de Node.js y TypeScript.
