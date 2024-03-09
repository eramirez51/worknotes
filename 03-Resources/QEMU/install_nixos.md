---
id: install_nixos
aliases: []
tags: []
---

Guide
https://dev.to/64j0/starting-with-nixos-using-qemu-2ngh


```bash
# download the minimal image:
wget https://channels.nixos.org/nixos-21.05/latest-nixos-minimal-x86_64-linux.iso
# it will download a file named: latest-nixos-minimal-x86_64-linux.iso

# config the image
# cmd template -> qemu-img create -f qcow2 NOME.img XG
qemu-img create -f qcow2 nixos-test.img 20G
# command used to create, convert and modify disk images
# -f:
#   Stands for format option. qcow2 stands for copy on write 2nd generation.


# bootstrap the machine
# cmd template -> qemu-system-x86_64 -boot d -cdrom image.iso -m 512 -hda mydisk.img
qemu-system-x86_64 -enable-kvm -boot d \
-cdrom latest-nixos-minimal-x86_64-linux.iso \
-m 2G -cpu host -smp 2 -hda nixos-test.img
# command used to boot an image
# to get the help use the -h flag
# -enable-kvm:
#   Enable KVM full virtualization support. This option is only available if KVM support
#   is enabled when compiling.
# -boot
#   Specify boot order drives as a string of drive letters. Valid drive letters depend on
#   the target architechture. The x86 PC uses: a, b (floppy 1 and 2), c (first hard disk)
#   d (first CD-ROM), n-p (Etherboot from network adapter 1-4), hard disk boot is the default.
# -cdrom
#   Use file as CD-ROM image (you cannot use -hdc and -cdrom at the same time). You can use
#   the host CD-ROM by using /dev/cdrom as filename.
# -m
#   Set the quantity of RAM.
# -hda
#   Use file as hard disk 0, 1, 2 or image.

# start the vm after closing it
qemu-system-x86_64 -enable-kvm -boot d \
-m 2G -cpu host -smp 2 -hda nixos-test.img

```
