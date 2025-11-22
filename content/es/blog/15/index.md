---
title: Creando enlaces de instalación para tus extensiones de Tampermonkey
short: Aprende a crear enlaces de instalación directa para tus userscripts de Tampermonkey, facilitando a los usuarios su instalación con un solo clic.
tags:
  - Tampermonkey
  - UserScript
  - JavaScript
  - Extensión de Navegador
  - Automatización
  - Tips
created: 2025-11-22 20:00
updated: 2025-11-22 20:00
image: ./image-es.png
---

# Creando enlaces de instalación para tus extensiones de Tampermonkey

¿Alguna vez has creado un userscript de Tampermonkey y has querido compartirlo con otros de la forma más sencilla posible? En este consejo rápido, te mostraré cómo crear enlaces de instalación directa que permiten a los usuarios instalar tu extensión con solo un clic.

---

## El Problema

Cuando creas un userscript de Tampermonkey, normalmente necesitas:
1. Compartir el archivo del script
2. Pedir a los usuarios que abran Tampermonkey manualmente
3. Crear un nuevo script
4. Copiar y pegar tu código

Este proceso es engorroso y puede desanimar a los usuarios de probar tu script.

---

## La Solución: Enlaces de Instalación Directa

Tampermonkey proporciona un esquema de URL simple que permite a los usuarios instalar scripts directamente desde un enlace:

```
https://www.tampermonkey.net/script_installation.php#url=[URL_DE_TU_SCRIPT]
```

Simplemente reemplaza `[URL_DE_TU_SCRIPT]` con la URL donde está alojado tu userscript.

---

## Cómo Funciona

### Ejemplo 1: Archivo Raw de GitHub

Si alojas tu script en GitHub, puedes usar la URL del archivo raw:

```
https://www.tampermonkey.net/script_installation.php#url=https://raw.githubusercontent.com/usuario/repo/main/script.user.js
```

### Ejemplo 2: Desarrollo Local

¡Esto incluso funciona con proyectos locales! Si estás ejecutando un servidor de desarrollo local:

```
https://www.tampermonkey.net/script_installation.php#url=http://localhost:3000/mi-script.user.js
```

### Ejemplo 3: Cualquier Servidor Web

Cualquier URL públicamente accesible funciona:

```
https://www.tampermonkey.net/script_installation.php#url=https://ejemplo.com/scripts/mi-userscript.user.js
```

---

## Guía Paso a Paso

1. **Aloja tu userscript** en algún lugar accesible vía URL (GitHub, tu sitio web, Gist, etc.)

2. **Obtén el enlace directo** al archivo raw del script (debe terminar en `.user.js`)

3. **Crea el enlace de instalación** usando el formato:
   ```
   https://www.tampermonkey.net/script_installation.php#url=URL_DE_TU_SCRIPT
   ```

4. **Comparte el enlace** con tus usuarios

Cuando los usuarios hagan clic en el enlace, Tampermonkey:
- Detectará el script
- Mostrará el diálogo de instalación
- Les permitirá instalarlo con un clic

---

## Mejores Prácticas

### 1. Usa la Extensión de Archivo Correcta
Tu archivo de script debe terminar con `.user.js` para que Tampermonkey lo reconozca como un userscript.

### 2. Incluye Metadatos
Asegúrate de que tu script incluya los encabezados de metadatos apropiados:

```javascript
// ==UserScript==
// @name         Mi Script Increíble
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Hace algo genial
// @author       Tu Nombre
// @match        https://ejemplo.com/*
// @grant        none
// ==/UserScript==
```

### 3. Control de Versiones
Mantén tu script versionado para que los usuarios puedan actualizar cuando publiques nuevas versiones:

```javascript
// @version      1.0.1
// @updateURL    https://raw.githubusercontent.com/usuario/repo/main/script.user.js
// @downloadURL  https://raw.githubusercontent.com/usuario/repo/main/script.user.js
```

---

## Ejemplo del Mundo Real: Hotelier Tools

Utilizo esta técnica en mi propio proyecto [Hotelier Tools](https://hotelier.tools/es/tools/ui/add-button-check-front-desk), donde creé una extensión de Tampermonkey para añadir un botón de "Check Front Desk" para Little Hotelier.

El script está alojado en GitHub en:
```
https://github.com/JuanmanDev/TampermonkeyLittleHotelier/blob/main/directBooking/addButtonCheckOnFrontDesk.user.js
```

La URL raw es:
```
https://github.com/JuanmanDev/TampermonkeyLittleHotelier/raw/main/directBooking/addButtonCheckOnFrontDesk.user.js
```

El enlace de instalación se convierte en:
```
https://www.tampermonkey.net/script_installation.php#url=https://github.com/JuanmanDev/TampermonkeyLittleHotelier/raw/main/directBooking/addButtonCheckOnFrontDesk.user.js
```

¡Esto hace que sea increíblemente fácil para los usuarios instalar la extensión con solo un clic!

---

## ¡Pruébalo Tú Mismo!

¿Quieres ver esto en acción? Puedes probar el enlace de instalación con mi userscript real:

**[📥 Instalar Script de Ejemplo](https://www.tampermonkey.net/script_installation.php#url=https://github.com/JuanmanDev/TampermonkeyLittleHotelier/raw/main/directBooking/addButtonCheckOnFrontDesk.user.js)**

> **Nota:** Necesitas tener [Tampermonkey](https://www.tampermonkey.net/) instalado en tu navegador para que este enlace funcione.

Cuando hagas clic en el enlace, Tampermonkey se abrirá y te mostrará el diálogo de instalación. ¡Bastante genial, verdad?

---

## Consejos Adicionales

### Crea un Enlace Acortado
Para mejor legibilidad, usa un acortador de URL:
```
https://bit.ly/mi-userscript
```

### Añade una Insignia de Instalación
Hazlo visual en tu README:
```markdown
[![Instalar con Tampermonkey](https://img.shields.io/badge/Instalar%20con-Tampermonkey-00485B?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://www.tampermonkey.net/script_installation.php#url=URL_DE_TU_SCRIPT)
```

---

## Solución de Problemas

### El Enlace No Funciona
- Asegúrate de que la URL del script sea públicamente accesible
- Verifica que el archivo termine con `.user.js`
- Comprueba que la URL esté correctamente codificada (sin caracteres especiales)

### El Script No Se Instala
- Verifica que Tampermonkey esté instalado en el navegador
- Asegúrate de que el script tenga los encabezados de metadatos apropiados
- Verifica que los patrones `@match` o `@include` sean correctos

---

## Conclusión

Crear enlaces de instalación para tus extensiones de Tampermonkey las hace mucho más accesibles para los usuarios. Este simple truco elimina la fricción del proceso de instalación y anima a más personas a probar tus scripts.

¡Pruébalo con tu próximo proyecto de userscript!

---

## Crédito

¡Gracias al proyecto [Stacks](https://github.com/zelestcarlyone/stacks) por este útil consejo!

---

## Recursos Adicionales

- [Documentación de Tampermonkey](https://www.tampermonkey.net/documentation.php)
- [Greasy Fork](https://greasyfork.org/) - Repositorio popular de userscripts
- [OpenUserJS](https://openuserjs.org/) - Plataforma alternativa de userscripts
