---
name: "boot"
description: "Troubleshoot Linux boot failures, emergency mode, initramfs, fstab, crypttab, GRUB, root device discovery, and systemd boot target failures."
argument-hint: "[boot symptom]"
effort: "high"
allowed-tools: "Read Grep Glob Bash"
---
# boot skill

Use this plugin skill for: $ARGUMENTS

Important: begin read-only; require explicit confirmation before disruptive/destructive changes; include validation and rollback.

Supporting docs are available under `${CLAUDE_SKILL_DIR}/../../docs/`.

# Task: Boot Failures, Emergency Mode, initramfs, fstab, GRUB

## When to use

Use this when the user reports:

- System boots into emergency/rescue mode.
- “Cannot find root filesystem.”
- initramfs/dracut shell.
- GRUB/kernel selection problems.
- Mount failure during boot.
- Bad `/etc/fstab`, `/etc/crypttab`, root UUID, LVM/RAID/encryption boot issue.

## Mental model

Boot failures usually sit in one of four layers:

1. Bootloader/kernel command line.
2. initramfs/initrd root discovery.
3. Filesystem/mount/fstab/crypttab.
4. systemd target dependency failure.

Do not jump directly to rebuilding GRUB or initramfs. First identify which layer failed.

## Read-only first commands

```bash
cat /etc/os-release 2>/dev/null || true
uname -a
cat /proc/cmdline
systemctl --failed 2>/dev/null || true
journalctl -b -p err..alert --no-pager 2>/dev/null | tail -200 || true
journalctl -b -1 -p err..alert --no-pager 2>/dev/null | tail -200 || true
systemd-analyze blame 2>/dev/null | head -40 || true
systemd-analyze critical-chain 2>/dev/null || true
lsblk -f
blkid 2>/dev/null || true
findmnt -o TARGET,SOURCE,FSTYPE,OPTIONS
grep -Ev '^\s*#|^\s*$' /etc/fstab 2>/dev/null || true
grep -Ev '^\s*#|^\s*$' /etc/crypttab 2>/dev/null || true
pvs 2>/dev/null || true; vgs 2>/dev/null || true; lvs -a 2>/dev/null || true
cat /proc/mdstat 2>/dev/null || true
```

## Branch interpretation

| Signal | Meaning | Next action |
|---|---|---|
| UUID in `/etc/fstab` not in `blkid` | stale fstab entry | Propose fstab correction with backup and `mount -a` validation |
| Failed `.mount` unit blocks `local-fs.target` | boot reaches systemd but mount dependency failed | Inspect mount unit, fstab line, device availability |
| initramfs/dracut cannot locate root | early userspace/root discovery issue | Check `/proc/cmdline`, LVM/RAID/encryption modules, initramfs generation only after confirmation |
| Kernel panic before systemd | kernel/driver/root device issue | Switch to `tasks/kernel-panic-lockup.md` |
| Boot succeeds with older kernel | kernel regression or module/initramfs mismatch | Compare package history and initramfs for new kernel |

## Safe remediation patterns

### fstab correction

Confirmation required before editing:

```bash
cp -a /etc/fstab /etc/fstab.bak.$(date +%F-%H%M%S)
# edit carefully
findmnt --verify 2>/dev/null || true
mount -a
systemctl daemon-reload
```

Validation:

```bash
findmnt -o TARGET,SOURCE,FSTYPE,OPTIONS
systemctl --failed
journalctl -b -p err..alert --no-pager | tail -100
```

Rollback:

```bash
cp -a /etc/fstab.bak.<timestamp> /etc/fstab
systemctl daemon-reload
```

### initramfs rebuild

High-risk if remote-only or root storage is complex. Require confirmation.

Debian/Ubuntu:

```bash
update-initramfs -u -k all
```

RHEL-like:

```bash
dracut -f --regenerate-all
```

### GRUB config regeneration

Require distro-specific path and confirmation. Never guess blindly.

RHEL BIOS-style common path:

```bash
grub2-mkconfig -o /boot/grub2/grub.cfg
```

RHEL UEFI common path:

```bash
grub2-mkconfig -o /boot/efi/EFI/redhat/grub.cfg
```

Debian/Ubuntu:

```bash
update-grub
```

## Escalation

Escalate or ask for console access if:

- Remote-only host has no out-of-band console.
- Encrypted root, multipath, LVM-on-RAID, or SAN boot is involved.
- Kernel panic occurs before logs persist.
- Storage health signals show disk/controller errors.
