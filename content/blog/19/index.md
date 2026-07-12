---
title: "How to get free instances in Oracle Cloud (ARM and AMD)"
short: "A detailed guide on how to use Windows scripts to secure your OCI free tier instance by bypassing the out of host capacity error."
tags:
  - Oracle Cloud
  - OCI
  - PowerShell
  - Scripts
  - Automation
created: 2026-07-11 21:00
updated: 2026-07-11 21:00
image: ./oci-free-tier.png
---

# Getting your free VPS in Oracle Cloud

Oracle Cloud Infrastructure (OCI) offers one of the best free tiers in the market ("Always Free"), allowing you to create instances with AMD Micro architecture and up to 4 OCPUs and 24GB of RAM with ARM architecture. However, there is a recurring problem that many users experience: the lack of capacity or "Out of host capacity".

If you try to create the instance manually from the web console, it is very likely that you will run into this error. The solution is none other than persistence. Instead of trying manually every day, we can automate the process. In this post, I detail how I managed to get my instances from Windows using PowerShell.

![OCI Free Tier](./oci-free-tier.png)

## Preparing the Environment in Windows

For everything to work, we need to have the Oracle Command Line Interface (OCI CLI) installed and configured with our credentials.

1. **OCI CLI Installation**: On Windows, you can install it using PowerShell. Make sure you have Python installed and follow the [official Oracle guide](https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/cliinstall.htm).
2. **Configuration**: Run `oci setup config` to link your environment with your account ("Tenancy") and configure the API keys.
3. **Identifiers**: You will need to gather the OCID of your Tenancy, Availability Domain, your Subnet, and the Image you want to use.

## The Retry Process (PowerShell Scripts)

The idea is simple: an infinite loop that tries to launch the instance and, if it receives the `Out of host capacity` error, waits a few seconds and tries again.

I have used two main scripts: one for the ARM instance and another for the AMD. These scripts generate their own SSH key if necessary and configure the required options.

### Script for ARM (retry-launch-arm.ps1)

This script is configured for the powerful "VM.Standard.A1.Flex" instance. Since it requires defining the memory and CPUs, we use auxiliary JSON files (`shapeConfig.json` and `instanceOptions.json`) that the script itself generates automatically.

```powershell
# Key snippet of the ARM script
$output = & oci compute instance launch `
    --availability-domain $AD --compartment-id $Tenancy `
    --shape VM.Standard.A1.Flex --subnet-id $SubnetId `
    --assign-public-ip true --availability-config $availCfg `
    --display-name $DisplayName --image-id $ImageId `
    --instance-options $instOpts --shape-config $shapeCfg `
    --ssh-authorized-keys-file $SshPub 2>&1
```

### Script for AMD (retry-launch-amd.ps1)

For the AMD instance ("VM.Standard.E2.1.Micro"), the configuration is much simpler since the shape is fixed and does not require complex additional options.

```powershell
# Key snippet of the AMD script
$output = & oci compute instance launch `
    --availability-domain $AD --compartment-id $Tenancy `
    --shape VM.Standard.E2.1.Micro --subnet-id $SubnetId `
    --assign-public-ip true `
    --display-name $DisplayName --image-id $ImageIdAmd `
    --ssh-authorized-keys-file $SshPub 2>&1
```

In both cases, the script captures the output. If the exit code is `0`, we have had **SUCCESS!** and it proceeds to cyclically verify the public IP to display it in the console, leaving us ready to connect via SSH.

## How long does it take? My experience

Patience is key when it comes to the Oracle free tier. I left the scripts running on my Windows machine (with the help of variables and logs) and these were the results:

* **ARM Instance**: The process started on April 24, 2026. It successfully allocated the resources on May 6. It took about 12 days in total, restarting the process on several occasions (and adding up to **292 attempts** in the final successful streak).
* **AMD Instance**: This one was much tougher. It started iterating on May 6 and the loop finally succeeded almost a month and a half later, on June 17. There were a total of **700 actual attempts** of the request. The high demand for these small instances caused the process to take considerably longer.

It is worth noting that the scripts are designed defensively: at the beginning they check if the instance already exists and is in a `RUNNING` or `PROVISIONING` state before attempting to launch another one. This is ideal so you can resume the execution of the script after restarting your Windows computer, avoiding duplicates.

## Background Automation (Windows Scheduled Tasks)

If you want this process to run completely unattended, without having a terminal window open and even if you restart your computer, you can configure it as a Windows Scheduled Task.

### 1. Grant Execution Permissions in PowerShell
By default, Windows restricts the execution of unsigned scripts. You need to enable it by opening PowerShell as Administrator and running:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 2. Create the Scheduled Task
To create a task that runs your script in the background hidden from view when you log in, open PowerShell and run the following commands (change the script path to yours):

```powershell
$Action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-WindowStyle Hidden -File C:\oci-free\retry-launch-amd.ps1"
$Trigger = New-ScheduledTaskTrigger -AtLogOn
$Principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive
$Task = New-ScheduledTask -Action $Action -Trigger $Trigger -Principal $Principal
Register-ScheduledTask -TaskName "OCI AMD Retry" -InputObject $Task
```

With this, every time you turn on your PC and log in, the script will start and stay in the shadows trying to reserve your server.

### 3. Stop and Delete the Task
Once you verify in the log that you have been successful (your public IP will appear), it is important that you stop the loop so you don't keep sending requests to Oracle unnecessarily. To delete the task and clean your PC, simply run in PowerShell:

```powershell
Unregister-ScheduledTask -TaskName "OCI AMD Retry" -Confirm:$false
```

Sooner or later, Oracle will free up resources and the script will grab that capacity for you completely unattended. Lots of patience and good luck!
