# Fedora security updates

Use for Fedora desktop patching, SELinux, dnf updates, rpm-ostree updates, Flatpak updates, browser updates, and current vulnerability-fix workflows.

## Verify current sources

Check Fedora Project advisories, Fedora package metadata, Fedora common issues, Fedora Docs, and upstream project advisories before recommending version-specific patch actions.

## Evidence

```bash
cat /etc/os-release 2>/dev/null | sed -n '1,20p'
uname -a
getenforce 2>/dev/null || true
sestatus 2>/dev/null | sed -n '1,120p' || true
dnf check-update --security 2>/dev/null | sed -n '1,160p' || true
command -v rpm-ostree >/dev/null && rpm-ostree status || true
flatpak remote-list 2>/dev/null; flatpak list --app 2>/dev/null | sed -n '1,120p'
```

## Patch guidance

- Package-based Fedora: verify enabled repositories and package health before update guidance.
- Atomic Fedora: use rpm-ostree status and deployment model; prefer documented update/rebase behavior.
- SELinux: inspect denials and fix narrow causes. Do not disable SELinux as a default troubleshooting step.
- Third-party graphics/codecs: verify compatibility for the active Fedora release and kernel.

## Validation

Check reboot-needed state, failed units, graphical login, browser launch, Flatpak app launch, and SELinux denials after patching.
