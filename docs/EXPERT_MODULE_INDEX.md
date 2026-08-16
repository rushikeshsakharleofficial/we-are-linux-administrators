# Expert Module Index

85 top-level skills.

Canonical routing map: [`skills/using-linux-admin/SKILL.md`](../skills/using-linux-admin/SKILL.md).

Do not maintain a second full routing matrix here. `using-linux-admin` selects the parent/specialist; each parent owns its condition-to-chunk table.

## Routing model

```text
using-linux-admin
  -> one parent/specialist
    -> bounded evidence
      -> one matching chunk
```

Load a second chunk only when evidence proves a cross-layer issue. Unknown conditions stay in the parent baseline flow until the failing layer is known.

## Entry points

| Need | Skill |
|---|---|
| Choose the correct Linux domain | `using-linux-admin` |
| Unknown Linux problem | `diagnose` |
| Broad senior execution | `linux-admin-chief-engineer` |
| Active incident response | `incident-response-expert` |
| Incident Word/Excel/PDF/PowerPoint report | `incident-report-creator-expert` |
| Production change safety | `change-safety-expert` |
| Optimisation/tuning gate | `optimization-guardian-expert` |
| Universal safety contract | `universal-contract-guardian-expert` |
| AI client/model selection | `agent-model-dispatcher-expert` |

## Parent domains

| Domain | Parent skill |
|---|---|
| Boot | `boot` |
| Kernel | `kernel` |
| Services | `service` |
| Performance | `performance` |
| Storage | `storage` |
| Permissions | `permissions` |
| Authentication/identity | `auth` |
| Networking | `network` |
| Timekeeping | `time` |
| Load balancing | `load-balancer-expert` |
| Security | `security-expert` |
| Containers | `containers` |
| Logging | `logs` |
| Migration | `migration-expert` |
| Incident response | `incident-response-expert` |

## Consolidation status

### Network
- TCP -> `skills/network/chunks/tcp.md`
- UDP -> `skills/network/chunks/udp.md`
- packet capture -> `skills/network/chunks/packet-capture.md`
- VLAN/bond/LACP -> `skills/network/chunks/vlan-bonding.md`

### Timekeeping
- Chrony/NTP -> `skills/time/chunks/chrony.md`
- timezone/RTC/system clock -> `skills/time/chunks/system-clock.md`

### Storage
- mounts/fstab -> `skills/storage/chunks/mounts.md`
- filesystem health/capacity -> `skills/storage/chunks/filesystem-health.md`
- SMART/media risk -> `skills/storage/chunks/smart.md`

LVM, RAID, iSCSI, multipath, NFS, Samba, quota and backup remain distinct pending review.

### Performance
- CPU/run queue/steal/softirq -> `skills/performance/chunks/cpu.md`
- memory/OOM/reclaim/cgroups -> `skills/performance/chunks/memory.md`
- swap/zram/zswap -> `skills/performance/chunks/swap.md`
- capacity/headroom/forecast -> `skills/performance/chunks/capacity-planning.md`
- resource ceilings/security limits -> keep `limits-expert` distinct

### Permissions
- POSIX ownership/mode/traversal -> `skills/permissions/chunks/posix-modes.md`
- ACL/mask/inheritance -> `skills/permissions/chunks/acl.md`
- SELinux/AppArmor -> keep distinct specialists

### Authentication and identity
- local accounts/groups/lifecycle -> `skills/auth/chunks/local-accounts.md`
- PAM phases/control flags/lockout -> `skills/auth/chunks/pam.md`
- SSSD/LDAP/NSS/cache/access filters -> `skills/auth/chunks/sssd-ldap.md`
- sudoers/least-privilege delegation -> `skills/auth/chunks/sudoers.md`
- SSH hardening -> keep `ssh-hardening-expert` distinct
- RDP/xrdp -> keep `rdp-expert` distinct

Former top-level specialists were removed only after useful procedures were preserved in parent chunks. Other domains will be consolidated only when overlap is verified; distinct technologies stay top-level when merging would reduce safety or routing accuracy.

## Local/global discovery

Agent-specific project and user paths are documented in [`LOCAL_GLOBAL_AGENT_SETUP.md`](LOCAL_GLOBAL_AGENT_SETUP.md). Canonical skills remain under `skills/`; global installs copy them into supported discovery locations rather than creating another source of truth.
