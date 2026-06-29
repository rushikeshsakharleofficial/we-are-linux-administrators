# Release 1.17.24

## Package

- NPM package version: `1.17.21`
- Plugin metadata version: `1.17.24`
- Skill count: `107`
- Package name: `linux-admin`

## Updated

- `skills/network/SKILL.md` — added Enterprise Linux 10 networking guidance: NetworkManager replaces legacy `network-scripts`, `ifup` and `ifdown` should not be used on Rocky/RHEL-like 10, Kea DHCP replaces old ISC DHCP server workflows, NIC teaming should be migrated to bonding, and modern `systemd-networkd` DHCP relay guidance should avoid deprecated relay keys.
- `skills/packages/SKILL.md` — added `dnf5` and Alpine `apk` detection and diagnostics, documented Enterprise Linux 10 DNF modularity deprecation, added `rpmsort` guidance for RPM version ordering, and clarified DNF filelist metadata behavior.
- `skills/ssh-hardening-expert/SKILL.md` — added OpenSSH 10.3+ hardening notes for SSH certificate empty-principal behavior, `authorized_keys` principal validation, `ProxyJump` command-line input safety, allow/deny precedence, and `ForceCommand` forwarding review.

## Reviewed

- Rocky Linux 10 release notes for architecture, networking, DNF, RPM, security, virtualization, desktop/RDP, and storage changes.
- AlmaLinux 10.0 release notes for x86-64-v2 deviation, OpenSSH 9.9, frame pointers, SPICE, KVM on IBM POWER, and extended hardware support.
- Arch Linux official news feed for manual-intervention notices.
- systemd 261 release notes for incompatible changes and DHCP relay deprecations.
- OpenSSH release notes, Kubernetes releases, and firewalld release sources for possible skill-impacting changes.

## Deferred

- `package.json` still shows `1.17.21` while plugin metadata shows `1.17.24`. This should be aligned in a separate metadata-only cleanup if npm package version parity with plugin metadata is required.
