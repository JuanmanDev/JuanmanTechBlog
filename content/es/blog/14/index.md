---
title: Automatización de reenvío de mensajes de WhatsApp a canal con n8n, Docker y WAHA
short: Cómo automatizar la gestión de grupos y canales de WhatsApp para viajes compartidos en Zamora y Salamanca usando n8n y Docker.
tags:
  - Automatización
  - WhatsApp
  - n8n
  - Docker
  - WAHA
  - Viajes
  - Zamora
  - Salamanca
created: 2025-05-31 15:00
updated: 2025-05-31 15:00
image: ./image.png
---

# Automatización de reenvío de mensajes de WhatsApp a canal con n8n, Docker y WAHA

En este post comparto cómo he automatizado el reenvío de mensajes de un grupo de WhatsApp a un canal, usando n8n, Docker y la librería WAHA. Todo esto lo he montado en un portátil viejo que uso como servidor local. El objetivo es facilitar la gestión de un grupo de viajes compartidos entre Zamora y Salamanca, que había llegado al límite de participantes.

---

## Resumen del reto

- El grupo de WhatsApp "Zamora-Salamanca" conecta conductores y pasajeros para compartir trayectos entre Zamora y Salamanca.
- Al llegar al límite de 1000 participantes, se creó un canal de WhatsApp, pero el reenvío de mensajes era manual y laborioso.
- El reto: automatizar el filtrado y reenvío de publicaciones de viajes, incluyendo el número de teléfono, y marcar los mensajes reenviados.

---

## Solución técnica

### Arquitectura general

- **WAHA**: expone una API de WhatsApp en Docker para recibir mensajes automáticamente.
- **n8n**: orquesta el flujo, filtra mensajes y los reenvía al canal.
- **Google Gemini**: IA gratuita para distinguir publicaciones de viajes de otros mensajes.

---

### Flujo automatizado

1. **Recepción de mensajes**  
   WAHA recibe los mensajes del grupo y los envía a un webhook de n8n.

2. **Filtrado inteligente**  
   n8n consulta a Google Gemini para decidir si el mensaje es una publicación de viaje o no.  
   Además, descarta automáticamente mensajes con palabras clave como "alguien" o "busco".

3. **Enriquecimiento**  
   Si falta el número de teléfono, el sistema lo añade automáticamente.

4. **Reenvío**  
   El mensaje se publica en el canal de WhatsApp.

5. **Confirmación visual**  
   El bot añade una reacción de robot 🤖 al mensaje original para indicar que ha sido reenviado correctamente.

---

## Problemas y aprendizajes

- **Desconexión de WAHA**  
  El servidor se reiniciaba los sábados de madrugada y WAHA dejaba de enviar mensajes. Lo solucioné con una rutina de reinicio automático del contenedor Docker.

- **Filtrado de mensajes incorrectos**  
  Al principio se reenviaban preguntas o respuestas. Añadí un filtro de palabras clave y mejoré el prompt de la IA para reducir falsos positivos.

---

## Capturas de pantalla

![Grupo de WhatsApp](./whatsapp-group.png)
![Canal de WhatsApp](./whatsapp-channel.png)
![Flujo en n8n](./image.png)

---

## Código y configuración

### Ejemplo de docker-compose.yml

```yaml
# filepath: ./docker-compose.yml
version: '3'
services:
  waha:
    image: devlikeapro/whatsapp-http-api
    restart: always
    ports:
      - "3000:3000"
    environment:
      - WHATSAPP_API_KEY=XXXX
      - WAHA_DASHBOARD_USERNAME=XXXX
      - WAHA_DASHBOARD_PASSWORD=XXXX
      - WHATSAPP_DEFAULT_ENGINE=WEBJS
      - WAHA_PRINT_QR=False
      - WAHA_MEDIA_STORAGE=LOCAL
      - WHATSAPP_FILES_LIFETIME=0
      - WHATSAPP_FILES_FOLDER=/app/.media
      - WHATSAPP_RESTART_ALL_SESSIONS=True
      - WAHA_AUTO_START_DELAY_SECONDS=0
      - WHATSAPP_HOOK_URL=https://MY-DOMAIN/webhook/22ad9ac5-be66-XXXX-XXXX-XXXXXXXXX/waha
      - WHATSAPP_HOOK_EVENTS=message,state.change
  n8n:
    image: n8nio/n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      # ...otras variables necesarias...
    volumes:
      - ./n8n-data:/home/node/.n8n
```

---

## Consideraciones técnicas

- El servidor es un portátil antiguo con Linux y Docker.
- El flujo es robusto ante reinicios y errores de red.
- El filtrado se puede mejorar añadiendo nuevas palabras clave o ajustando el prompt de la IA.

---

## Mejoras futuras

- Mejorar el filtrado usando IA y feedback de los usuarios.
- Añadir logs y alertas en caso de fallo del bot.
- Automatizar la actualización de la lista de palabras clave.

---

## Reflexión final

Esta automatización ha reducido el esfuerzo manual y ha hecho el grupo mucho más útil para todos. Si tienes un grupo grande y necesitas automatizar tareas repetitivas, te animo a probar n8n y Docker.

---

¿Te gustaría ver el flujo completo de n8n o necesitas ayuda para configurar WAHA? Déjame tus dudas en los comentarios.

---

## Recursos útiles

- [WAHA: WhatsApp HTTP API + n8n (tutorial)](https://waha.devlike.pro/blog/waha-n8n/)
- [n8n (web oficial)](https://n8n.io/)
- [Google Gemini API (precios y documentación)](https://ai.google.dev/gemini-api/docs/pricing?hl=es-419)
