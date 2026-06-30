---
name: "kernel"
description: "Troubleshoot Linux kernel panic, soft lockup, hard lockup, hung tasks, call traces, kdump, driver failures, reboot crash evidence, kernel versioning, boot parameters, modules, taints, initramfs, grub, live patching, sysrq, and safe kernel update/rollback planning."
argument-hint: "[panic/lockup/module/boot/taint/update symptom]"
effort: "high"
allowed-tools: "Read Grep Glob Bash"
---
# kernel skill

Use this plugin skill for: $ARGUMENTS

Important: begin read-only; require explicit confirmation before disruptive/destructive changes; include validation and rollback.

Supporting docs are available under `${CLAUDE_SKILL_DIR}/../../docs/`.

# Task: Kernel Panic, Soft Lockup, Hard Lockup, kdump

## When to use

Use for kernel panic, call trace, soft lockup, hard lockup, hung tasks, spontaneous reboot, vmcore, driver/firmware crash, panic under load.

## Mental model

Kernel incidents prioritize evidence capture over immediate fix. Do not tune random sysctls or change kernels before preserving logs/crash data.

Classify:

1. Panic with call trace.
2. Soft/hard lockup.
3. Hung task / blocked for more than N seconds.
4. OOM panic or memory corruption.
5. Device/driver reset before panic.
6. Hardware/firmware/storage controller path.

## Read-only first commands

```bash
uname -a
uptime
last -x | head -30
journalctl -k -b --no-pager | tail -200
journalctl -k -b -1 --no-pager | tail -300
journalctl -b -1 -p err..alert --no-pager | tail -300
coredumpctl list 2>/dev/null || true
systemctl status kdump 2>/dev/null || true
kdumpctl status 2>/dev/null || true
cat /proc/cmdline
grep -R "crashkernel" /etc/default/grub /etc/sysconfig/grub /boot/grub* 2>/dev/null || true
cat /proc/sys/kernel/sysrq 2>/dev/null || true
cat /proc/sys/kernel/panic 2>/dev/null || true
dmesg -T | grep -Ei 'panic|lockup|hung|blocked|call trace|BUG:|Oops|mce|I/O error|reset|nvme|scsi|xfs|ext4' | tail -200
```

## Branch interpretation

| Signal | Meaning | Next action |
|---|---|---|
| `kernel panic` with call trace | kernel crash path | preserve full logs/vmcore; identify module/function |
| `soft lockup`/`hard LOCKUP` | CPU stuck/interrupt/watchdog issue | collect workload, kernel, driver, hardware data |
| `blocked for more than` with `D` tasks | storage/NFS/driver wait | switch to storage/network storage workflow |
| MCE/hardware error | CPU/RAM/hardware | vendor/hardware diagnostics |
| I/O reset before panic | storage controller/disk/driver | storage workflow and vendor escalation |
| panic after kernel update | kernel regression | compare previous kernel; rollback boot entry only with console/confirmation |

## kdump enablement pattern

High-risk if it requires bootloader changes or reboot. Require confirmation.

RHEL-like typical checks:

```bash
systemctl status kdump
kdumpctl status
```

If not configured, propose:

1. Confirm memory reservation strategy.
2. Add/validate `crashkernel=`.
3. Enable kdump.
4. Reboot in maintenance window.
5. Trigger safe test only in nonproduction or with explicit approval.

## Validation

```bash
journalctl -k -b --since '10 minutes ago' --no-pager
systemctl status kdump 2>/dev/null || true
ls -lah /var/crash 2>/dev/null || true
```

## Escalation

Escalate to vendor/kernel/hardware when:

- vmcore indicates proprietary driver.
- panic repeats under I/O or backup load.
- MCE/ECC/firmware errors are present.
- Storage HBA/NVMe resets occur.
- Multiple hosts panic after same kernel update.

## Kernel versioning, modules, and update/rollback

Use `kernel-expert-audit` for automated evidence gathering.

```bash
uname -a
cat /proc/version
cat /proc/sys/kernel/tainted 2>/dev/null || true
lsmod 2>/dev/null | head -80 || true
dkms status 2>/dev/null || true
ls -lh /boot 2>/dev/null | tail -80 || true
```

- **Modules/DKMS**: `lsmod`, `modinfo`, DKMS status, Secure Boot signing.
- **Taint**: read `/proc/sys/kernel/tainted`; explain proprietary/out-of-tree/forced module implications.
- **Boot args**: `/proc/cmdline`; know whether change belongs in GRUB/kernelopts/cloud-init.
- **Update/rollback**: keep known-good kernel, check `/boot` space, initramfs generation, bootloader entries, console access.
- **Routing to other experts**: sysctl tuning → `sysctl-expert`; kernel package updates → `package-manager-expert`; systemd-boot/grub issues → `systemd-expert`.

Do not rebuild initramfs, change GRUB, unload storage/network modules, or alter boot-critical kernel parameters without rollback and console access.
