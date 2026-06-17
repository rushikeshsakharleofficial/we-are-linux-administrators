# Kernel Expert — Kernel Debug Playbooks

## Scope

Linux kernel versioning, boot parameters, modules, taints, panic/oops/soft lockup, kdump, initramfs, grub, live patching, sysrq, dmesg/journal-k triage, and safe kernel update/rollback planning.

## Read-only first commands

```bash
uname -a
cat /proc/cmdline
cat /proc/version
cat /proc/sys/kernel/tainted 2>/dev/null || true
lsmod 2>/dev/null | head -80 || true
dkms status 2>/dev/null || true
journalctl -k -b --no-pager | tail -160 || true
dmesg -T 2>/dev/null | tail -160 || true
sysctl kernel.panic kernel.sysrq kernel.kptr_restrict kernel.dmesg_restrict 2>/dev/null || true
ls -lh /boot 2>/dev/null | tail -80 || true
systemctl status kdump kdump-tools 2>/dev/null || true
```

## Decision framework

1. Identify the controlling layer and config source.
2. Collect current state and recent logs.
3. Classify the operation as read-only, reload/restart, runtime-only change, persistent config change, boot-affecting change, or destructive repair.
4. Prefer the smallest reversible change.
5. Validate syntax/state before reload or reboot.
6. Include rollback commands and config backups.

## Common failure patterns

- Wrong controlling service or wrong config file.
- Runtime state differs from persistent config.
- Distro-specific defaults differ from upstream examples.
- Time, boot, mount, or filesystem changes interact with systemd ordering.
- Repair commands are run before evidence collection.

## Professional answer shape

- Detected stack
- Evidence
- Root-cause hypothesis
- Safe plan
- Commands to preview/test
- Exact change
- Rollback
- Validation
