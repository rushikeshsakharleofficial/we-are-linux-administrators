# Ubuntu kernel, drivers, and hardware chunk

Use this chunk for Ubuntu Desktop kernel selection, HWE/OEM/GA kernels, graphics drivers, firmware, Secure Boot/DKMS/MOK, laptops, docking, suspend/resume, audio hardware, Wi-Fi, Bluetooth, printers, webcams, and touchpad issues.

## Kernel rule

Prefer Ubuntu archive kernels and vendor-supported OEM/HWE stacks. Do not recommend random mainline kernels unless the user explicitly needs a bounded hardware-enablement test and accepts rollback risk.

## Evidence commands

```bash
uname -r
cat /proc/version_signature 2>/dev/null || true
apt list --installed 'linux-image*' 'linux-modules*' 'linux-generic*' 'linux-oem*' 'linux-lowlatency*' 2>/dev/null | sed -n '1,220p'
mokutil --sb-state 2>/dev/null || true
dkms status 2>/dev/null || true
```

## Graphics and drivers

```bash
printf '== gpu ==\n'; lspci -nnk | grep -EA4 'VGA|3D|Display' || true
printf '== renderer ==\n'; glxinfo -B 2>/dev/null | sed -n '1,80p' || vulkaninfo --summary 2>/dev/null | sed -n '1,80p' || true
printf '== ubuntu drivers ==\n'; ubuntu-drivers devices 2>/dev/null | sed -n '1,160p' || true
printf '== graphics packages ==\n'; apt list --installed 'nvidia*' 'mesa*' 'xserver-xorg-video*' 2>/dev/null | sed -n '1,220p'
```

## Firmware and laptop devices

```bash
printf '== firmware ==\n'; fwupdmgr get-devices 2>/dev/null | sed -n '1,160p' || true
printf '== microcode ==\n'; dpkg -l intel-microcode amd64-microcode linux-firmware 2>/dev/null | sed -n '1,120p'
printf '== power ==\n'; systemctl status power-profiles-daemon upower thermald --no-pager 2>/dev/null | sed -n '1,160p'
printf '== input/audio/network ==\n'; systemctl status bluetooth NetworkManager cups pipewire wireplumber pipewire-pulse --no-pager 2>/dev/null | sed -n '1,220p'
```

## Secure Boot and DKMS

- If Secure Boot is enabled, unsigned third-party modules may fail to load until MOK enrollment is completed.
- Do not disable Secure Boot as a first fix; prove module-signing failure first.
- NVIDIA, VirtualBox, and some Wi-Fi drivers often involve DKMS/MOK.

## Graphics failure route

1. Identify GPU and active driver.
2. Check kernel and Secure Boot state.
3. Check DKMS build status.
4. Check whether the issue appears only on Wayland or only on Xorg.
5. Keep previous known-good kernel installed.

## Rollback

Kernel rollback:

```text
Reboot -> GRUB -> Advanced options for Ubuntu -> choose previous known-good kernel.
After boot, investigate before removing the bad kernel.
```

Driver rollback:

```bash
sudo apt install <previous-driver-package-version>
sudo apt-mark hold <driver-package>
```
