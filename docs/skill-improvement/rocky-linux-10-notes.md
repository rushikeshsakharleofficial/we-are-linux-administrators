# Rocky Linux 10 skill notes

Use this reference when any skill handles Rocky Linux 10, RHEL 10-compatible systems, or migrations from Rocky 8/9 to Rocky 10.

## Key Rocky Linux 10 differences

- Major-version upgrade is not supported by Rocky Linux. Move from 8.x or 9.x to 10 with a fresh install and migration plan.
- x86_64 baseline is now x86-64-v3. Older x86-64-v2 and earlier CPUs are not supported.
- 32-bit compatibility for x86_64 is removed. Use 64-bit libraries or containers for old 32-bit dependency cases.
- Supported architectures include x86-64-v3, riscv64, aarch64, ppc64le, and s390x.
- Default out-of-box kernel is 6.12.0.
- Anaconda graphical remote install access changed from VNC to RDP.
- Wayland replaces the X.Org Server. Xwayland remains for many X11 clients.
- TigerVNC is removed from Rocky Linux 10. GNOME Remote Desktop using RDP replaces TigerVNC for desktop sharing, remote login, and headless sessions.
- GNOME desktop applications changed: GNOME Terminal is replaced by ptyxis, PulseAudio daemon is replaced by PipeWire, and several apps moved to Flatpak/upstream sources.
- Infrastructure service changes include redis being replaced by valkey, sendmail migration recommendation to Postfix, and spamassassin moving to EPEL.

## Skill behavior changes required

### diagnose

When `/etc/os-release` shows Rocky Linux 10 or RHEL-compatible version 10:

- Ask whether the target is an installed system, installer environment, headless server, or desktop workstation.
- Check CPU feature compatibility before advising install/upgrade on x86_64.
- Never suggest in-place major upgrade from Rocky 8/9 to Rocky 10.
- Route remote GUI issues to `rdp-expert`, not VNC/TigerVNC assumptions.
- Route kernel issues to `kernel-expert` with kernel 6.12 and vendor backport awareness.
- Route Redis issues to a Valkey/Redis migration path where package names differ.

### rdp-expert

Rocky Linux 10 remote desktop handling must separate:

1. **Installer remote access**: Anaconda uses RDP instead of VNC.
2. **GNOME desktop sharing/remote login/headless sessions**: GNOME Remote Desktop using RDP replaces TigerVNC.
3. **Third-party XRDP**: do not assume old Rocky 9 Xorg/XRDP behavior because Wayland replaced X.Org Server.

Safe first checks:

```bash
cat /etc/os-release
uname -r
rpm -qa | grep -Ei 'xrdp|xorgxrdp|gnome-remote-desktop|pipewire|wayland|xwayland|tigervnc'
loginctl list-sessions
systemctl status gdm gnome-remote-desktop xrdp xrdp-sesman --no-pager 2>/dev/null
journalctl -u gdm -u gnome-remote-desktop -u xrdp -u xrdp-sesman --no-pager -n 200
```

Decision rules:

- If the goal is Rocky 10 GNOME remote desktop, prefer GNOME Remote Desktop/RDP first.
- If the user installed XRDP and gets black screen, check whether `xorgxrdp` exists and whether an Xorg backend is actually available.
- Do not recommend TigerVNC server on Rocky 10 as a default path.
- For audio, assume PipeWire first, not PulseAudio daemon.
- For legacy GUI apps, account for Xwayland rather than full X.Org Server.

### package-manager-expert / patching-expert

- Treat EPEL as required for some packages that were previously in base/AppStream.
- Do not assume 32-bit x86_64 packages are available.
- Check package rename/replacement cases before telling the user a package is missing.
- Use `dnf repoquery`, `dnf provides`, and `dnf module list` instead of fixed package-name guesses.

### networking/firewall skills

- Keep NetworkManager-first logic.
- Prefer firewalld/nftables evidence before iptables assumptions.
- For remote access, preserve SSH/RDP connectivity before changing zones, policies, or services.

### migration-expert

Rocky 8/9 to Rocky 10 must be a fresh-install migration:

1. Inventory packages, services, users, ports, storage, SELinux contexts, cron/timers, systemd units, firewall rules, and app data.
2. Build Rocky 10 target host.
3. Validate CPU architecture support.
4. Reinstall packages using Rocky 10 repositories and EPEL where needed.
5. Migrate data/config with backups.
6. Validate services.
7. Cut over DNS/load balancer.
8. Preserve rollback to old host until validation passes.

## Commands for CPU compatibility on x86_64

```bash
lscpu | sed -n '1,80p'
grep -m1 '^flags' /proc/cpuinfo | tr ' ' '\n' | grep -E 'avx|avx2|bmi1|bmi2|fma|movbe|xsave' | sort -u
/lib64/ld-linux-x86-64.so.2 --help 2>/dev/null | grep -A40 'Subdirectories of glibc-hwcaps' || true
```

## Output note for Rocky Linux 10

When Rocky Linux 10 is detected, include this block:

```text
Rocky Linux 10 notes:
- Major upgrade from Rocky 8/9 is not supported; use fresh install/migration.
- x86_64 requires x86-64-v3 CPU compatibility.
- Remote desktop defaults changed: RDP replaces VNC paths, Wayland replaces X.Org Server, TigerVNC server is removed.
- Validate package replacements and EPEL availability before assuming old Rocky 9 package names.
```
