# 2026-06 Linux Admin Skill Refresh

This document tracks the June 2026 refresh applied to the Linux Admin skill set. It is a shared reference for future per-skill improvements so every skill stays current, evidence-first, and production-safe.

## Upstream signals reviewed

- Linux kernel: mainline/stable 7.1 series and longterm 6.18, 6.12, 6.6, 6.1, 5.15, and 5.10 support windows.
- systemd: v261 changes affecting service manager behavior, Varlink exposure, pressure-watch settings, CPUSetPartition, DHCP relay, nspawn option rename, sysupdate API transition, and future removals.
- OpenSSH: 10.x release notes, including SHA1 SSHFP future deprecation, 10.0 version-string compatibility risk, and PAM/account handling fixes in newer 10.x stable releases.
- nftables/firewalld: nftables maps, verdict maps, metering, flowtables, and firewalld policy/policy-set documentation.
- Docker: rootless daemon model, UID/GID subordinate mapping requirements, daemon socket exposure, nftables documentation, and modern logging/resource controls.
- Podman: Quadlet/systemd unit integration, rootful/rootless unit search paths, generator debugging, cgroup v2 requirement, and network dependency behavior.
- Kubernetes: current supported branches 1.36, 1.35, 1.34, current patch support model, and version skew rules.

## Universal skill improvements

Every Linux Admin skill should now follow this minimum contract:

1. Detect runtime context first:
   - distro and version
   - kernel version and whether it is a vendor kernel
   - init system
   - package manager
   - container/VM/cloud context
   - remote-access risk
   - SELinux/AppArmor status where relevant
2. Prefer bounded evidence:
   - use `--no-pager`, `-n`, `--since`, exact unit/container/interface names
   - avoid full unbounded logs unless explicitly needed
   - capture timestamps and command context
3. Separate layers:
   - user request symptom
   - controlling component
   - dependency layer
   - data plane vs control plane
   - local host vs network vs external provider
4. Avoid stale assumptions:
   - do not assume iptables where nftables/firewalld may be controlling the host
   - do not assume cgroup v1 where cgroup v2 is common
   - do not assume Docker rootful only
   - do not assume systemd is absent/present without detection
   - do not assume Kubernetes minor versions are upgrade-compatible without skew check
   - do not assume OpenSSH defaults are safe or unchanged across major releases
5. Always include:
   - issue class
   - safety level
   - read-only command set
   - interpretation guide
   - likely causes with evidence needed
   - minimal fix path
   - validation
   - rollback
   - prevention notes

## Router improvements needed across skills

The main router should route modern incidents to specific experts when available:

| Symptom / domain | Preferred route |
|---|---|
| Unknown Linux issue | `diagnose` |
| systemd unit / timer / socket / service hardening | `systemd-expert` |
| SSH hardening / OpenSSH config / lockout risk | `ssh-hardening-expert` |
| RDP / XRDP / Linux GUI remote desktop | `rdp-expert` |
| nftables / firewalld / iptables / NAT | `firewall-expert`, `natting-expert` |
| TCP / UDP behavior | `tcp-expert`, `udp-expert` |
| Docker / Podman / rootless / cgroups | `docker-expert`, `containers`, `kubernetes-node-expert` |
| Podman systemd units | `docker-expert` plus `systemd-expert` |
| Kubernetes node/version skew | `kubernetes-node-expert` |
| Kernel crash / vendor kernel / LTS planning | `kernel-expert` |
| SELinux / AppArmor | `selinux-expert`, `apparmor-expert` |
| Package update / repo / security patching | `package-manager-expert`, `patching-expert` |
| Capacity / pressure / cgroup limits | `capacity-planning-expert`, `memory-expert`, `cpu-expert`, `io-wait-expert`, `systemd-expert` |

## Immediate gaps fixed in this phase

- Added a shared 2026 refresh standard.
- Updated `diagnose` to route RDP, load balancer, Kubernetes, Docker/Podman, nftables/firewalld, systemd v261, OpenSSH 10.x, kernel 7.x/6.18 LTS, and cgroup v2 style incidents.
- Updated `systemd-expert` with current v261 awareness, modern read-only diagnostics, pressure-watch/cgroup-v2 checks, and Varlink/daemon-reload counters.
- Updated `ssh-hardening-expert` with OpenSSH 10.x notes, SHA1 SSHFP deprecation awareness, version-string compatibility checks, and PAM/account safety.
- Updated `docker-expert` with Docker rootless, subordinate UID/GID, cgroup v2, nftables interaction, and Podman Quadlet debugging.

## Future sweep checklist

Run this checklist in batches until all 107 skills have been touched:

1. Read current `SKILL.md`.
2. Identify stale assumptions.
3. Add modern evidence commands.
4. Add environment/version detection.
5. Add safety gates for remote/prod systems.
6. Add rollback/validation output.
7. Add token-saving evidence requests.
8. Add route-to-specialist hints.
9. Add distro differences.
10. Update README/release notes after each batch.
