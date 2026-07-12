---
title: "Cómo conseguir instancias gratuitas en Oracle Cloud (ARM y AMD)"
short: "Una guía detallada sobre cómo usar scripts en Windows para asegurar tu instancia gratuita de OCI sorteando la falta de capacidad."
tags:
  - Oracle Cloud
  - OCI
  - PowerShell
  - Scripts
  - Automatización
created: 2026-07-11 21:00
updated: 2026-07-11 21:00
image: ./oci-free-tier.png
---

# Consiguiendo tu VPS gratuito en Oracle Cloud

Oracle Cloud Infrastructure (OCI) ofrece uno de los mejores niveles gratuitos del mercado ("Always Free"), permitiendo crear instancias con arquitectura AMD Micro y hasta 4 OCPUs y 24GB de RAM con arquitectura ARM. Sin embargo, hay un problema recurrente que muchos usuarios experimentan: la falta de capacidad o "Out of host capacity".

Si intentas crear la instancia manualmente desde la consola web, es muy probable que te topes con este error. La solución no es otra que la persistencia. En lugar de intentarlo a mano todos los días, podemos automatizar el proceso. En este post, te detallo cómo logré conseguir mis instancias desde Windows usando PowerShell.

![OCI Free Tier](./oci-free-tier.png)

## Preparando el Entorno en Windows

Para que todo funcione, necesitamos tener instalada la interfaz de línea de comandos de Oracle (OCI CLI) y configurada con nuestras credenciales. 

1. **Instalación de OCI CLI**: En Windows, puedes instalarlo usando PowerShell. Asegúrate de tener Python instalado y sigue la [guía oficial de Oracle](https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/cliinstall.htm).
2. **Configuración**: Ejecuta `oci setup config` para enlazar tu entorno con tu cuenta ("Tenancy") y configurar las claves API.
3. **Identificadores**: Necesitarás reunir los OCID de tu Tenancy, el Dominio de Disponibilidad (`Availability Domain`), tu Subred y la Imagen que deseas usar.

## El Proceso de Reintento (Scripts en PowerShell)

La idea es simple: un bucle infinito que intenta lanzar la instancia y, si recibe el error de falta de capacidad (`Out of host capacity`), espera unos segundos y vuelve a intentarlo.

He utilizado dos scripts principales: uno para la instancia ARM y otro para la AMD. Estos scripts generan su propia clave SSH de ser necesario y configuran las opciones requeridas.

### Script para ARM (retry-launch-arm.ps1)

Este script está configurado para la instancia potente "VM.Standard.A1.Flex". Como requiere definir la memoria y las CPUs, utilizamos archivos JSON auxiliares (`shapeConfig.json` e `instanceOptions.json`) que el propio script genera de manera automática.

```powershell
# Fragmento clave del script ARM
$output = & oci compute instance launch `
    --availability-domain $AD --compartment-id $Tenancy `
    --shape VM.Standard.A1.Flex --subnet-id $SubnetId `
    --assign-public-ip true --availability-config $availCfg `
    --display-name $DisplayName --image-id $ImageId `
    --instance-options $instOpts --shape-config $shapeCfg `
    --ssh-authorized-keys-file $SshPub 2>&1
```

### Script para AMD (retry-launch-amd.ps1)

Para la instancia AMD ("VM.Standard.E2.1.Micro"), la configuración es mucho más sencilla ya que la forma es fija y no requiere opciones adicionales complejas. 

```powershell
# Fragmento clave del script AMD
$output = & oci compute instance launch `
    --availability-domain $AD --compartment-id $Tenancy `
    --shape VM.Standard.E2.1.Micro --subnet-id $SubnetId `
    --assign-public-ip true `
    --display-name $DisplayName --image-id $ImageIdAmd `
    --ssh-authorized-keys-file $SshPub 2>&1
```

En ambos casos, el script captura la salida. Si el código de salida es `0`, hemos tenido **¡ÉXITO!** y procede a verificar cíclicamente la IP pública para mostrarla por consola, dejándonos listos para conectarnos por SSH.

## ¿Cuánto tiempo tarda? Mi experiencia

La paciencia es la clave cuando se trata de la capa gratuita de Oracle. Dejé los scripts corriendo en mi máquina Windows (con la ayuda de variables y logs) y estos fueron los resultados:

* **Instancia ARM**: El proceso comenzó el 24 de abril de 2026. Logró asignar los recursos exitosamente el 6 de mayo. Tomó unos 12 días en total, reiniciando el proceso en varias ocasiones (y sumando al final unos **292 intentos** en la última racha exitosa).
* **Instancia AMD**: Esta fue mucho más dura. Comenzó a iterar el 6 de mayo y el bucle finalmente tuvo éxito casi un mes y medio después, el 17 de junio. Fueron un total de **700 intentos** reales de la petición. La alta demanda de estas instancias pequeñas provocó que el proceso se alargara considerablemente.

Cabe destacar que los scripts están diseñados de forma defensiva: al principio verifican si la instancia ya existe y está en estado `RUNNING` o `PROVISIONING` antes de intentar lanzar otra. Esto es ideal para que puedas reanudar la ejecución del script tras reiniciar tu equipo con Windows, evitando duplicidades.

## Automatización en Segundo Plano (Tareas Programadas de Windows)

Si quieres que este proceso corra de manera completamente desatendida, sin tener una ventana de terminal abierta e incluso si reinicias el ordenador, puedes configurarlo como una Tarea Programada en Windows.

### 1. Dar Permisos de Ejecución en PowerShell
Por defecto, Windows restringe la ejecución de scripts no firmados. Necesitas habilitarlo abriendo PowerShell como Administrador y ejecutando:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 2. Crear la Tarea Programada
Para crear una tarea que ejecute tu script en segundo plano de forma oculta al iniciar sesión, abre PowerShell y ejecuta los siguientes comandos (cambia la ruta del script por la tuya):

```powershell
$Action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-WindowStyle Hidden -File C:\oci-free\retry-launch-amd.ps1"
$Trigger = New-ScheduledTaskTrigger -AtLogOn
$Principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive
$Task = New-ScheduledTask -Action $Action -Trigger $Trigger -Principal $Principal
Register-ScheduledTask -TaskName "OCI AMD Retry" -InputObject $Task
```

Con esto, cada vez que enciendas tu PC y entres a tu usuario, el script arrancará y se quedará en las sombras intentando reservar tu servidor.

### 3. Detener y Eliminar la Tarea
Una vez que en el log compruebes que has tenido éxito (aparecerá tu IP pública), es importante que detengas el bucle para no seguir lanzando peticiones a Oracle innecesariamente. Para eliminar la tarea y limpiar tu PC, simplemente ejecuta en PowerShell:

```powershell
Unregister-ScheduledTask -TaskName "OCI AMD Retry" -Confirm:$false
```

Tarde o temprano, Oracle liberará recursos y el script atrapará esa capacidad para ti de forma totalmente desatendida. ¡Mucha paciencia y suerte!
