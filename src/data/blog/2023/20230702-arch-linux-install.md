---
title: Installing Arch Linux
slug: arch-linux-install
description: One of many ways...
pubDatetime: 2023-07-02T00:00:00.00Z
draft: false
tags: ["life"]
---

## Yet another guide?

Well yes, you could just use the ArchWiki for a guided install and I definitely recommend reading [their guide](https://wiki.archlinux.org/title/Installation_guide) in case it missed something.

This guide focuses on doing some additional things like switching to dracut, setting up Secure Boot and using the TPM-Chip for decrypting the root partition.

## Is this guide done yet?

No, this post will probably evolve as time goes on.

## Something broke or doesn't work

Refer to the [ArchWiki](https://wiki.archlinux.org/title/Installation_guide) or the [Documentation](https://github.com/0xk1f0/dotfiles/tree/main/docs) in my `dotfiles` repository, which I update more frequently.

You can find that [here](https://github.com/0xk1f0/dotfiles).

## Preparations

I assume you know how to flash the Arch Linux ISO onto a USB stick and boot from it, so that's where we'll start.

Below are some commands to get started:

```bash
# Load Key Layout
loadkeys <keymap>
# Make sure we have Internet
ip a
ping 1.1.1.1
nslookup archlinux.org
# WiFI Connection (if needed)
iwctl
> device list
> station device scan
> station <dev> get-networks
> station <dev> connect <ssid>
```

## Partition Setup

One tool you'll definitely need for partitioning is `fdisk`. Below are some commands we'll use.

As long as your drive doesn't contain anything important, you can try stuff out as you like.

```bash
# list all disks
fdisk -l
# edit the target disk
fdisk </dev/disk>
# We need a root and a boot Partition:
# boot: Type 1 (EFI System), max 550M
# root: Type 20 (Linux filesystem)
# Swap Partition is optional, Swap File is prefered:
# swap: Type 19 (Linux swap)
# fdisk commands:
> d #delete partition
> t #change partition type
> w #write changes to disk
> g #create new GPT partition table
> q #quit WITHOUT saving
> m #print help
> n #add new partition
```

In case you did something wrong, just wipe the disk and start over:

```bash
# wipe the disk clean
#
# !WARNING!
# THIS WILL WIPE THE ENTIRE DISK
# NO QUESTIONS ASKED
#
wipefs -af </dev/disk>
```

## Full Disk Encryption

We don't want stuff laying around unencrypted these days, so we go for FDE!

Below is an illustration how our finished partitioning will look like:

```sh
# +-----------------------+------------------------+
# | Boot partition        | LUKS2 encrypted system |
# |                       | partition              |
# |                       |                        |
# | /boot                 | /                      |
# |                       |                        |
# |                       | /dev/mapper/root       |
# |                       |------------------------|
# | /dev/disk1            | /dev/disk2             |
# +-----------------------+------------------------+
```

Now let's see how we can accomplish this:

```bash
# new LUKS for root
# Make sure to use a strong password
cryptsetup -y -v luksFormat </dev/root_part>
cryptsetup open </dev/root_part> root
# EXT4 for encrypted root
mkfs.ext4 /dev/mapper/root
# FAT32 for boot (UEFI)
mkfs.fat -F32 </dev/boot_part>
# Mount root
mount /dev/mapper/root /mnt
# Mount boot (UEFI)
# We mount directly to /boot because the unencrypted
# boot partition will need to house our kernel
mkdir /mnt/boot
mount </dev/boot_part> /boot
```

You're free to use any other file system like XFS or ZFS, but I'll stick with EXT-4 for now.

## Installing the base System

Our partitioning is done, let's run `pacstrap`!

This will install the base system files on our newly created system:

```bash
# Run pacstrap to install Base Packages
pacstrap /mnt base linux linux-headers linux-firmware nano git base-devel
# Generate initial fstab
genfstab -U /mnt >> /mnt/etc/fstab
# chroot into your New System
arch-chroot /mnt
```

## Configuring the New System

Cool we're in, what now?

Configure some basic things:

```bash
# Set a Password
passwd
# Set Timezone
ln -sf /usr/share/zoneinfo/<Region>/<City> /etc/localtime
# Set Hardware Clock
hwclock --systohc
# Choose Locales
nano /etc/locale.gen
> [locale].UTF-8 UTF-8
# Generate
locale-gen
# Set Keymap
nano /etc/vconsole.conf
> KEYMAP=<keymap>
# Set Hostname
nano /etc/hostname
> <hostname>
# Edit hosts file
nano /etc/hosts
> 127.0.0.1     localhost
> 127.0.1.1     <hostname>.localdomain    <hostname>
> ::1           localhost
# Network Setup
pacman -S networkmanager
systemctl enable NetworkManager
```

## Adding a New User

We don't want to work as root, that would be weird, so let's create a user:

```bash
# add a new user
useradd -m <username>
# set his password
passwd <username>
# some base groups
usermod -aG wheel,audio,video,uucp <username>
```

## Making "wheel" Members Superusers

I prefer using `doas` as it's simple, but feel free to do it the `sudo` way.

```bash
#
# With doas
# (beware the trailing empty line)
#
pacman -S opendoas
nano /etc/doas.conf
> permit persist :wheel
>
#
# With sudo
#
pacman -S sudo
EDITOR=nano visudo
> %wheel ALL=(ALL) ALL #uncomment this
```

## Installing the Bootloader

To actually boot the system, we'll now setup our boot-loader.

I've seen `systemd-boot` to be quite reliable these days, so we'll use it instead of `grub`.

While we're at it, let's also replace mkinitcpio with dracut:

```bash
# install dracut
pacman -S dracut
# edit configuration
# !IMPORTANT! root UUID must be specified or initrd will fail
nano /etc/dracut.conf.d/flags.conf
> uefi="yes"
> compress="lz4"
> omit_dracutmodules+=" brltty network-legacy network nfs "
> stdloglvl="3"
> show_modules="yes"
> kernel_cmdline="quiet root=<UUID> rd.luks.options=<UUID>=tpm2-device=auto rd.luks.name=<UUID>=root"
# regenerate
dracut --regenerate-all --force
# yeet mkinitcpio
pacman -Rs mkinitcpio
# edit crypttab, so systemd knows what to do
nano /etc/crypttab
> # <name>    <device>          <password>
> root        UUID=<UUID>       -
# install systemd-boot
bootctl install
# update systemd-boot
bootctl update
```

If all this goes through without error, we should be good to go!

## Finishing Up

Let's close everything gently and prepare for our first boot.

Don't forget to unplug your installation media!

```bash
# Exit chroot
exit
# Properly unmount the New System
umount -l /mnt
# If running encryted setup
cryptsetup close root
# Reboot
reboot
```

## After First-Boot

Once we're inside our new system, we can do some additional configuration to improve our system.

### _paru First-Time Install_

If you're on Archlinux, you will use the AUR pretty often. So let's install `paru`, an AUR helper.

```bash
# make sure build tools are installed
pacman -S base-devel
# clone
git clone https://aur.archlinux.org/paru-bin
cd paru-bin/
# build
makepkg -si
```

### _SSD performance_

Edit the file `/etc/fstab` and search for your root partition entry. Add the parameter `noatime` to leverage the full SSD speed.

```bash
# root
UUID=<UUID>    /    ext4    rw,noatime  0 1
```

### _LUKS2 SSD performance_

Decrypting can be slow, let's make it faster in `/etc/crypttab`

Add `no-read-workqueue,no-write-workqueue` to the options of the root partition:

```bash
# disable read-workqueue and write-workqueue for root
# <name>    <device>          <password>      <options>
root        UUID=<UUID>       -               no-read-workqueue,no-write-workqueue
```

### _TPM 2.0 Auto-Decryption_

`systemd` allows us to decrypt our root partition automatically using the system's TPM chip.

It only auto-decrypts, if specific conditions are met. This ensures that someone can't just swap your SSD into their system and have it automatically decrypt the partition.

```bash
# all systemd things should already be installed
# bind against platform conf and secure boot
systemd-cryptenroll --tpm2-device=auto --tpm2-pcrs=1+2+3+5+6+7 </dev/disk>
# check if it worked
# it should show a new key
cryptsetup luksDump </dev/disk>
# edit /etc/crypttab and add "tpm2-device=auto"
nano /etc/crypttab
> # <name>    <device>          <password>      <options>
> root        UUID=<UUID>       -               no-read-workqueue,no-write-workqueue,tpm2-device=auto
# add Kernel parameters
"rd.luks.options=<UUID>=tpm2-device=auto rd.luks.name=<UUID>=root"
# configure and regenerate dracut
nano /etc/dracut.conf.d/flags.conf
> add_dracutmodules+=" tpm2-tss "
dracut --regenerate-all --force
```

### _Add a Swap File_

Even though most computers have enough RAM today, a swap file still can be beneficial in some cases:

```bash
# generate 2G file
dd if=/dev/zero of=/swapfile bs=1M count=<size> status=progress
# set permssions
chmod 0600 /swapfile
# format to swap
mkswap /swapfile
# enable swap
swapon /swapfile
# add to /etc/fstab
/swapfile   none    swap    defaults    0 0
```

## Final Words

As I said above, this guide may not be complete and will likely change as time goes on.

I may also do some followup posts where I go into more detail on some things.

~ k1f0
