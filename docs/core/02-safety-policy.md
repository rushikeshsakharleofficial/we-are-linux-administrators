# Safety Policy

## Risk classes

### Class 0: Read-only diagnostics
Allowed by default.

Examples:

```bash
systemctl status <unit>
journalctl -u <unit> -b --no-pager
ip -br addr
ip route
ss -lntup
lsblk -f
findmnt
df -hT
free -h
ps aux
rpm -V <pkg>
dpkg --audit
```

### Class 1: Low-risk reversible actions
Require confirmation if production or unclear.

Examples:

```bash
systemctl reload <noncritical-unit>
restorecon -Rv /bounded/path
setfacl -m u:<user>:rX /bounded/path
```

### Class 2: Disruptive actions
Always require explicit confirmation and rollback.

Examples:

```bash
systemctl restart sshd
systemctl restart network NetworkManager systemd-networkd
firewall-cmd --reload
nft -f ruleset.nft
dnf history rollback <id>
apt-get install/remove <pkg>
update-initramfs -u
dracut -f
grub2-mkconfig -o <path>
reboot
```

### Class 3: Destructive/high-risk actions
Deny by default unless the user explicitly asks, confirms risk, and there is backup/snapshot/console context.

Examples:

```bash
mkfs.* /dev/*
fsck -y /dev/*
xfs_repair /dev/*
lvreduce
pvremove
mdadm --zero-superblock
rm -rf /
rm -rf /var/lib/docker
chmod -R 777 /
chown -R user:user /
iptables -F
nft flush ruleset
setenforce 0 as a permanent fix
```

## Remote host network safety

Before changing network, firewall, SSH, PAM, sudo, or resolver config on a remote host, check or ask:

- Is there console/iDRAC/IPMI/cloud serial access?
- Is there an active root shell or second SSH session kept open?
- Is there a rollback timer?
- Is the new config syntax validated?
- Is the change limited to one interface/zone/file?

Use rollback timers when possible:

```bash
# Example pattern only; requires user confirmation.
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak.$(date +%F-%H%M%S)
sshd -t && systemctl reload sshd
```

## Firewall safety pattern

Never flush production firewall rules as a first fix. Prefer:

1. Show active rules and counters.
2. Identify the rule blocking traffic.
3. Add a narrow allow rule.
4. Set a timed rollback if possible.
5. Validate from another session.

## Filesystem safety pattern

Do not run filesystem repair against mounted filesystems unless the tool explicitly supports online operation for that filesystem and use case. Prefer:

1. Backup/snapshot.
2. Read-only evidence: `dmesg`, `lsblk`, `findmnt`, `smartctl`, `mdadm`, `lvs`.
3. Maintenance window.
4. Unmount or boot rescue/live environment.
5. Repair with documented tool.
6. Validate and remount.

## SELinux/AppArmor safety pattern

Do not disable MAC globally as a fix. Preferred order:

1. Verify POSIX ownership/mode/path traversal.
2. Verify ACL.
3. Inspect AVC/AppArmor denial.
4. Check expected labels/profile state.
5. Restore labels or adjust known booleans/ports if appropriate.
6. Only then consider custom policy.

## Package rollback safety pattern

Rollback is not always safe if the system state has diverged. Preferred order:

1. Inspect package history.
2. Validate config syntax.
3. Check service logs.
4. Check file drift.
5. Simulate where possible.
6. Snapshot/backup.
7. Confirm rollback.
8. Validate service and dependency health.
