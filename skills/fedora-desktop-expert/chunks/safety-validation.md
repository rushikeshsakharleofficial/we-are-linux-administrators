# Fedora safety and validation

Use for all Fedora Desktop remediation plans.

## Safety checklist

- Identify Fedora release, desktop flavor, session type, package model, kernel, and third-party repos first.
- Prefer read-only diagnostics before changes.
- Warn before restarting display manager, replacing desktop packages, removing drivers, rebasing Atomic desktops, or changing SELinux mode.
- Preserve a rollback path: Timeshift/Btrfs snapshot, VM snapshot, rpm-ostree rollback, backup of config files, or known-good kernel boot entry depending on system type.

## Minimal backup commands

```bash
mkdir -p "$HOME/fedora-desktop-debug-$(date +%Y%m%d-%H%M%S)"
cp -a "$HOME/.config" "$HOME/fedora-desktop-debug-$(date +%Y%m%d-%H%M%S)/config-copy" 2>/dev/null || true
command -v rpm-ostree >/dev/null && rpm-ostree status || true
```

## Validation commands

```bash
systemctl --failed --no-pager
journalctl -b -p warning..alert --no-pager -n 120
loginctl show-session "${XDG_SESSION_ID:-self}" -p Type -p Desktop -p State 2>/dev/null || true
getenforce 2>/dev/null || true
```

## Rollback guidance

For Atomic Desktops, use deployment rollback semantics. For package-based Fedora, keep a bootable older kernel and avoid removing working desktop/session packages until the replacement path is validated.
