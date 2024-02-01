---
layout: default
title: Running docker engine inside WSL2
categories: docker wsl2 linux 
---

# Running docker engine inside WSL2

## Prerequisites
- Windows 11 23H2 OS Build 22631.3007 [How to check](#checking-windows-version)
- UEFI / BIOS with virtualization enabled [How to check](#checking-virtualization)

## Steps:
### Installing MS Store version of WSL2

Even if you've installed WSL2 before using one of the distributions listed in the Microsoft Store, there is a separate Store Product by Microsoft called [Windows Subsystem for Linux](https://www.microsoft.com/store/productId/9P9TQF7MRM4R?ocid=pdpshare) that supports a crucial feature, called initd.

Go ahead and install that package. If you have existing distributions, they will be kept. The installation of this store product will only update WSL2 itself, and won't mess with your distributions.

You can also install the package using WinGet within PowerShell:

{% highlight powershell %}
winget install 9P9TQF7MRM4R --source msstore
{% endhighlight %}

You can check your install by running `wsl --version` in PowerShell or Cmd. The expected output should be similar to this:

{% highlight plaintext %}
WSL version: 2.0.14.0
Kernel version: 5.15.133.1-1
WSLg version: 1.0.59
MSRDC version: 1.2.4677
Direct3D version: 1.611.1-81528511
DXCore version: 10.0.25131.1002-220531-1700.rs-onecore-base2-hyp
Windows version: 10.0.22631.3007
{% endhighlight %}

### Installing Ubuntu distro
Similar steps might work in other distros as well, but I have verified these steps only for the Ubuntu distro, so that's what this tutorial will be focused on.

In powershell, run the following to install a new Ubuntu instance:

{% highlight powershell %}
wsl --install -d Ubuntu-22.04
{% endhighlight %}

This command should land you in the account creation. Create your local account for the distro. After that you should be greeted with the MOTD and a bash. Go ahead and update all packages:

{% highlight bash %}
sudo apt-get update & sudo apt-get upgrade -y
{% endhighlight %}

### Verify systemd

While still in bash inside the WSL2 Ubuntu instance, run:

{% highlight bash %}
cat /etc/wsl.conf
{% endhighlight %}

This should output

{% highlight plaintext %}
[boot]
systemd=true
{% endhighlight %}

In the file does not exist or contains something else, refer to [these steps](#configuring-systemd-inside-wsl).

### Install docker

Inside the Ubuntu bash, execute:

{% highlight bash %}
sudo bash -c 'apt-get install -y apt-transport-https ca-certificates curl software-properties-common && \
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add - && \
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" && \
apt-get update -y && apt-get install -y docker-ce && usermod -aG docker $USER && newgrp docker && exit'
{% endhighlight %}

### Use docker

{% highlight bash %}
sudo docker ps
{% endhighlight %}

Done! You can now use Docker inside your WSL2 Ubuntu 22.04!


## Details & Troubleshooting

### Checking Windows Version
1. Open the "Run" prompt of Windows by pressing `Win` + `R`
2. Type in "winver" into the prompt and submit the command
3. A window should open

### Checking virtualization
1. Open Task Manager
2. Navigate to the performance "tab"
3. Navigate to the CPU details
4. The details should display "Virtualization: Enabled"

### Configuring systemd inside WSL

Replace `/etc/wsl.conf` inside the distro with the following:

{% highlight plaintext %}
[boot]
systemd=true
{% endhighlight %}

In Windows, use PowerShell to power-cycle the distro:

{% highlight powershell %}
wsl --shutdown
wsl -d Ubuntu-22.04
{% endhighlight %}
