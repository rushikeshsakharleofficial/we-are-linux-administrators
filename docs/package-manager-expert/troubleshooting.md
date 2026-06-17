# Package Manager Expert — Troubleshooting Matrix

| Symptom | Evidence | Likely cause | Safer fix path |
|---|---|---|---|
| `Could not get lock` | `ps`, lock file owner | active apt/dpkg/unattended process | wait or stop owner cleanly; do not delete lock blindly |
| `dpkg was interrupted` | `dpkg --audit` | interrupted configure phase | `dpkg --configure -a`, then `apt-get -f install` |
| APT wants to remove many packages | `apt-get -s dist-upgrade` | repo mix, broken dependency, release change | inspect `apt-cache policy`, fix repo/pin first |
| Package held back | `apt-mark showhold`, simulation | hold or new deps required | explain hold/new deps; targeted upgrade |
| 404 during apt update | sources + suite | stale mirror/suite/EOL/release moved | verify distro release, mirror, suite codename |
| GPG signature error | apt/dnf repo config and keyring | expired/missing key or MITM/mirror issue | verify official key source; do not disable checks |
| DNF protected package removal | transaction output | dependency solver wants core removal | do not use allowerasing until root cause found |
| Duplicate RPM packages | `dnf repoquery --duplicates` | interrupted update or repo mix | `dnf distro-sync` only after repo source of truth defined |
| RPMDB corruption | rpm errors | database issue or disk corruption | backup rpmdb, check disk, then `rpm --rebuilddb` if justified |
| Yum/DNF cannot find package | repoquery/repolist | disabled repo/module stream/name mismatch | use scoped repo/module enable, not broad repo enable |
| Kernel update pending | package list + running kernel | boot-required update | plan reboot and keep previous kernel |

## Solver-output reading rules

- Count packages installed, upgraded, removed, downgraded.
- List removals explicitly in plan.
- Explain repository/vendor/source for important packages.
- Flag any essential/protected/boot/network/SSH/firewall packages.
- Convert vague output into a clear change summary.

## Community research triggers

Research before recommending a fix when:

- Error references a specific package maintainer script.
- A third-party repo is involved: EPEL, Remi, Docker, Kubernetes, PostgreSQL, MariaDB, NGINX, Elastic, Cloudflare, NVIDIA, etc.
- Distribution release is EOL or near EOL.
- DNF5 behavior differs from DNF4/YUM.
- The package has known bugs/regressions.
- The command touches bootloader, kernel, initramfs, OpenSSL, glibc, libc, systemd, SSH, firewall, package database, or DB engine packages.

Preferred sources:

1. Official distro docs/man pages.
2. Package upstream release notes and bug tracker.
3. Vendor docs for third-party repos.
4. Distro community pages: Debian Wiki/Reference, Ubuntu Community/AskUbuntu, Fedora Docs/Discussion, Red Hat KB, Rocky/Alma forums.
5. Unix & Linux StackExchange for symptoms, but verify against official docs before applying.
