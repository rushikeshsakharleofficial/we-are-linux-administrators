# OS upgrade and server clone playbook

## In-place OS upgrade

Use only when vendor supports the exact source and target path. Requirements:

- full backup or VM snapshot
- boot/console access
- package/repo compatibility
- third-party repo review
- kernel/driver support
- SELinux/AppArmor/security mode review
- application compatibility
- pre-upgrade report if vendor provides one
- post-upgrade validation and rollback decision window

## Side-by-side rebuild / clone

Prefer for old/unknown/unsupported systems.

1. Build target OS cleanly.
2. Install packages from manifest, not blind disk copy.
3. Migrate configs with diff review.
4. Sync data using dry-run rsync first.
5. Preserve UID/GID only where identity matters.
6. Recreate systemd units, timers, cron, firewall, users, keys.
7. Test service start and health on target.
8. Cut over DNS/LB/IP after final delta sync.

## Full repo/package sync

Capture:

```bash
rpm -qa | sort
apt-mark showmanual | sort
dnf repolist -v
apt-cache policy
```

Do not copy package DBs blindly across major OS versions.
