---
name: using-linux-admin
description: Main linux-admin routing map. Chooses one parent or distinct specialist; parents then load one condition-specific chunk.
argument-hint: "[linux task or symptom]"
effort: low
allowed-tools: "Read Grep Glob"
---

# Using linux-admin

Use this router when the correct Linux domain is unclear. Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`.

## Rules

1. Choose one parent/specialist.
2. Parent collects bounded evidence and loads one matching chunk.
3. Add a second chunk/support skill only for proven cross-layer issues.
4. Unknown issue -> `diagnose`.
5. Risky production change -> add `change-safety-expert`.
6. Tuning -> `optimization-guardian-expert` first.

## Parent map

- General: `diagnose`, `linux-admin-chief-engineer`, `command-expert`, `automation`, `ansible-expert`, `incident-response-expert`, `incident-report-creator-expert`, `change-safety-expert`.
- Boot/services: `boot`, `kernel`, `service`, `systemd-expert`, `process-expert`, `shell-rc-expert`.
- Performance: `performance` -> CPU, memory/OOM, swap/zram, capacity chunks; `limits-expert` remains distinct.
- Storage: `storage` -> mounts/fstab, filesystem health, SMART, quota, LVM, md/RAID, iSCSI, NFS or Samba/SMB chunk; multipath and backup/restore remain distinct.
- Permissions: `permissions` -> POSIX or ACL chunk; SELinux/AppArmor remain distinct.
- Auth: `auth` -> local accounts, PAM, SSSD/LDAP or sudoers chunk; SSH hardening/RDP remain distinct.
- Network: `network` -> TCP, UDP, packet capture or VLAN/bonding chunk; routing/NAT/firewall/proxy/DNS remain distinct.
- Time: `time` -> Chrony/NTP or system-clock/timezone/RTC chunk.
- Package lifecycle: `package-manager-expert` -> package/repository work or patching chunk; release upgrades -> `migration-expert`.
- Logs: `logs` -> rsyslog/logrotate chunk or journald parent flow; product monitoring remains distinct.
- Security: `security-expert` -> broad audit, auditd, Fail2Ban or vulnerability/CVE triage chunk; sysctl, MAC, SSH/auth and firewall controls stay separate when their own semantics are proven.
- Web/apps: matching Nginx/Apache/PHP/database specialist.
- Load balancing: `load-balancer-expert`.
- Containers: `containers` or `kubernetes-node-expert`.
- Migration: `migration-expert` + relevant domain + `change-safety-expert`.

## Fast picks

| Request | Primary |
|---|---|
| Unknown problem | `diagnose` |
| High load/OOM | `performance` |
| Disk/mount/I/O | `storage` |
| Quota | `storage` -> quota chunk |
| LVM | `storage` -> LVM chunk |
| RAID degradation/rebuild | `storage` -> RAID chunk |
| iSCSI session/LUN | `storage` -> iSCSI chunk |
| NFS export/mount/UID mapping | `storage` -> NFS chunk |
| Samba/SMB share/auth | `storage` -> Samba chunk |
| Multipath/WWID/ALUA | `multipath-expert` |
| Backup/restore workflow | `backup-restore-expert` |
| File mode/ACL | `permissions` |
| PAM/LDAP/sudo | `auth` |
| Connectivity/TCP/UDP | `network` |
| NTP/timezone | `time` |
| Package/repository issue | `package-manager-expert` |
| OS/security patching | `package-manager-expert` -> patching chunk |
| Vulnerability scanner/CVE finding | `security-expert` -> vulnerability-scan chunk |
| Sysctl/kernel runtime tuning | `sysctl-expert` |
| Logs | `logs` |
| Active incident/RCA | `incident-response-expert` |
| Formal incident report | `incident-report-creator-expert` |
| Security audit | `security-expert` |

## Output

```text
Primary parent/specialist: <skill>
Reason: <one short sentence>
Next: let that skill select one matching chunk if applicable
```
