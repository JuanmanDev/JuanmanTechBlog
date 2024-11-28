---
title: Persianas inteligentes con ESP Home
short: Cómo conectar esp home a tus persianas electricas sin romper nada
tags:
  - ESP HOME
  - Home assistant
  - ESP32
  - Cables electricos
  - Relé
  - Relé quemado
created: 2023-08-03 23:00
updated: 2023-08-03 23:00
---

# Cómo controlar una persiana electrica

Al comprar una persiana eléctrica, si no tiene control de velocidad, tendrá 4 cables.
- Verde-Amarillo: Tierra
- Azul: Neutro (Retorno de electricidad)
- Negro: Línea para subir la persiana
- Marrón: Línea para bajar la persiana

_Revisa el manual de instruccione de tu persiana para verificar el código de colores_


## Cómo controlar una persiana eléctrica con ESP Home

Para controlar un circuito eléctrico tan sencillo, podemos utilizar dos relés para encender la subida de la persiana o la bajada de la persiana.

Existen dos maneras de conectar los relés:
- Conectar un relé de Fase a la subida y un relé de la Fase a la bajada de la persiana.  
Esto puede ser peligroso ya que ambos relés pueden activarse por software y quemar el motor de la persiana
- Conectar un relé a la fase, y ese mismo relé al otro relé.  
Desde el segundo relé, conectar la salida del primer rele y conectar las dos salidas del relé a la subida y bajada.  
De esta manera se puede controlar con el primer relé si la persiana recibe electricidad, y con el segundo se controlar si sube o baja.

_En ambas opciones es necesario conectar el cable neutro de la persiana al neutro de la casa y el cable de tierra de la persiana al de la casa._

Utilizaremos la segunda opción debido a que si hay problemas software o hardware no habrá problemas con el motor de la persiana al activarse tanto la fase de subida como de bajada.


## Código para ESP Home 

```yaml
cover:
  - platform: time_based
    name: "Time-Based Cover"

    open_action:
      - switch.turn_on: power_cover_switch
      - switch.turn_on: direction_cover_switch
    open_duration: 18s

    close_action:
      - switch.turn_on: power_cover_switch 
      - switch.turn_off: direction_cover_switch
    close_duration: 17.5s

    stop_action:
      - switch.turn_off: power_cover_switch
      - switch.turn_off: direction_cover_switch

switch:
  - platform: gpio
    name: "power_cover_switch"
    id: "power_cover_switch"
    pin: GPIO23
    inverted: True
        
  - platform: gpio
    name: "direction_cover_switch"
    id: "direction_cover_switch"
    pin: GPIO22
    inverted: True
```

En este código se utilizan los pines GPIO 22 y 23 para controlar los 2 relés.
Cámbialos para poner el que tu quieras.  
Tambien deberas cambiar los tiempos de subida y bajada.

Fuente: https://esphome.io/components/cover/time_based.html


## El relé se quema a los pocos usos 🔥

Si al cabo del tiempo la persiana solo sube o baja, es posible que se haya quemado el relé que cambia la dirección.

Esto se debe a que los motores, cuando se detienen de golpe, provocan un efecto de pico de tensión, llegando entre 4 y 10 veces la tensión habitual.  
En Europa serían hasta 2500 Voltios.

![Grafico pico de tensión](https://incompliancemag.com/wp-content/uploads/2019/01/1902_ECE_fig15.png)

Más info en: https://passive-components.eu/rc-snubber-design-for-smps-protection/


Para ello, existen los circuitos de amortigución RC o snubber RC. R de Resistencia y C de Condensador.

Se deben poner alrededor del relé más cercano a la carga, en este caso a motor de la persiana.
Debido a que tenemos 2 posibles circuitos de carga, tanto de subida como de bajada, se deben poner dos circuitos de amortiguación.
Los dos estarán conectados del lado de la resistencia a la conexión entre el primer relé de activación y el segun relé de dirección.

El otro extremo estará conectado entre cada extremo del segundo relé de dirección.

He probado a poner el relé entre ambos relés y aún así se quemó el segundo relé.

![](https://ae01.alicdn.com/kf/HTB1SnK6OyLaK1RjSZFxq6ymPFXae/M-dulo-de-circuito-de-absorci-n-Snubber-RC-rel-de-protecci-n-de-contacto-resistencia.jpg)

Aquí puedes comprarlos en Aliexpres:
https://s.click.aliexpress.com/e/_DeBu6tN

Y en Amazon:
https://www.amazon.es/dp/B091FL19WV?psc=1&ref=ppx_yo2ov_dt_b_product_details


## Pruebas 

Una vez que lo configures todo, puedes conectarlo a Home Assistant.

Y así hacer que las persianas se suban por la mañana, y se bajen al mediodía en verano o cuando tu quieras.


Para no sobrecargar los cables, recomiendo que las persianas se vayan subiendo o bajando una a una, además, así parecerá que hay una persona haciendolo y siempre es bueno simular presencia.

Espero poder hacer detalles sobre ello próximamente. Si quieres que siga haciendo esto, hazmelo saber con un algo de interacción.



<!-- https://www.circuito.io/ -->