# Fedora release lifecycle and upgrades

Use for Fedora release support, beta/rawhide status, Workstation/KDE Edition upgrades, dnf system upgrades, rpm-ostree rebases, and lifecycle checks.

## Verify first

Check official Fedora Docs and Fedora Magazine for the current stable release, upgrade notes, known blocker bugs, and lifecycle dates.

## Evidence commands

```bash
cat /etc/os-release 2>/dev/null | sed -n '1,20p'
uname -a
rpm -q fedora-release fedora-release-workstation fedora-release-kde fedora-release-identity-basic 2>/dev/null || true
command -v rpm-ostree >/dev/null && rpm-ostree status || true
dnf repolist --enabled 2>/dev/null | sed -n '1,120p'
```

## Decision rules

- Fedora releases move quickly; avoid unsupported releases.
- Use stable releases for daily workstations.
- Treat beta/rawhide as testing unless user explicitly accepts risk.
- For Atomic Desktops, prefer rpm-ostree rebase/update workflows.
- For package-based Fedora, use documented dnf upgrade flow.

## Upgrade safety

Before upgrades, check disk space, package health, third-party repos, layered packages, and current common issues.
