---
title: "Bus Salamanca: De Alexa a la Web Interactiva"
short: "Cómo evolucionó el proyecto Bus Salamanca de una skill de Alexa a una web completa con mapa interactivo, seguimiento en tiempo real y caché predictiva de tiempos."
tags:
  - Nuxt
  - MapLibre
  - Real-Time
  - Transporte
created: 2026-03-01 20:50
updated: 2026-03-01 20:50
image: ./map-home.png
---

# Bus Salamanca: Un Nuevo Enfoque Visual

Hace un tiempo creé [Bus Salamanca Alexa](https://github.com/JuanmanDev/BusSalamancaAlexa), una skill orientada a consultar los tiempos de llegada usando comandos de voz. Aunque útil cuando estás en casa preparándote para salir, a veces la voz se queda corta.

¿Qué pasa si quieres ver el recorrido de la línea? ¿O si el autobús ha desaparecido de la API oficial y no sabes si viene o ha pasado de largo? Para resolver estos problemas y mejorar radicalmente la usabilidad, he creado la versión web: **[Bus Salamanca Web](https://bussalamanca.juanman.tech/)**.

![Vista global del mapa con todas las líneas](./map-home.png)

## Funcionalidades Clave

La nueva web, accesible tanto en móvil como en escritorio, incluye características que aportan mucho más que la simple estimación de tiempo de la parada.

### 🗺️ Mapa Global y Rutas Específicas
He implementado un mapa de fondo permanente impulsado por **MapLibre GL JS**, con un modo oscuro muy cuidado para que destaquen las posiciones de los autobuses. 

Ahora puedes:
- Ver **todos los autobuses** circulando por la ciudad en la vista principal.
- Seleccionar una **línea concreta** para aislar su ruta, viendo exactamenté por dónde va cada vehículo de esa línea.

![Vista de detalle de una línea](./map-line.png)

### ⏱️ Tiempos de Llegada y Caché Predictiva
El corazón de la aplicación sigue siendo saber cuándo llega tu bus. Al pulsar sobre cualquier parada, obtienes las próximas llegadas de forma clara.

Pero aquí está la **verdadera magia**: a veces, el sistema oficial de la ciudad sufre cortes o elimina temporalmente un autobús de la estimación, causando frustración ("¡desapareció de la pantalla y de repente apareció en mi parada!"). 

He diseñado un **sistema de caché y estimación predictiva**:
* Si un autobús estaba reportando su llegada a una parada, el sistema guarda esa estimación.
* Si por un microcorte el autobús deja de reportarse en la API oficial en la siguiente consulta, mi sistema asume que sigue en camino y calcula el tiempo restante basándose en el último dato conocido, en lugar de hacerlo desaparecer abruptamente.
* Gracias a la vista de mapa, el usuario puede corroborarlo visualmente viendo si el ícono del autobús sigue aproximándose.

![Próximas llegadas en una parada](./map-stop.png)

## Tecnologías Utilizadas

Esta web ha servido también como campo de pruebas para perfeccionar mi stack:
* **Nuxt 4 / Vue 3**: El motor principal del frontend.
* **MapLibre GL**: Para el renderizado de mapas vectoriales interactivos con un rendimiento espectacular.
* **TailwindCSS**: Para todo el estilizado, creando interfaces tipo "Glassmorphism" con transparencias y oscuros elegantes.
* **Docker**: Para el despliegue automático del backend que actúa como proxy hacia el sistema oficial SIRI de la ciudad.

El resultado es una web extremadamente rápida, que puedes añadir cómodamente a tu pantalla de inicio del móvil como si fuera una aplicación nativa, pero siempre actualizada y sin descargas iniciales pesadas.

¡Te invito a probarla la próxima vez que te muevas por Salamanca!  
👉 **[bussalamanca.juanman.tech](https://bussalamanca.juanman.tech/)**
