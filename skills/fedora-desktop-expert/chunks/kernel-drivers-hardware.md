# Fedora kernel, drivers, and hardware

Use for Fedora kernel updates, graphics drivers, Mesa, firmware, Wi-Fi, Bluetooth, printing, audio, suspend/resume, docking, and laptop hardware behavior.

## Evidence

```bash
uname -a
rpm -qa 'kernel*' 'mesa*' 'linux-firmware*' 'pipewire*' 'wireplumber*' 2>/dev/null | sort | sed -n '1,220p'
lspci -nnk | grep -EA4 'VGA|3D|Display|Network|Audio' || true
lsusb 2>/dev/null | sed -n '1,120p'
systemctl status bluetooth NetworkManager cups power-profiles-daemon pipewire wireplumber --no-pager 2>/dev/null | sed -n '1,220p'
fwupdmgr get-devices 2>/dev/null | sed -n '1,160p' || true
```

## Driver source rule

Prefer Fedora repositories and official Fedora guidance. If RPM Fusion or vendor packages are involved, verify current compatibility with the installed Fedora release and kernel before recommending changes.

## Kernel rule

Keep a known-good kernel installed. Avoid random kernel builds unless the user explicitly needs a bounded hardware test and accepts the recovery path.
