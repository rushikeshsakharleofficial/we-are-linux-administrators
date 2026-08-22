# linux-admin Plugin — Usage Guide

## Install

The canonical repository metadata is currently `1.18.19` with 65 top-level skills. Do not confuse repository metadata with a published GitHub Release or npm-registry publication.

### Recommended: GitHub source / global agent skills

The npm registry publication is **not currently verified**. Use the GitHub source install unless registry publication is independently confirmed:

```bash
npm install -g github:rushikeshsakharleofficial/we-are-linux-administrators
linux-admin status
linux-admin install-global
```

`install-global` copies canonical skills into supported user skill locations while keeping this repository as the source of truth.

### Claude Code plugin

```text
/plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
/plugin install linux-admin@we-are-linux-administrators
/reload-plugins
```

### Repository checkout

```bash
git clone https://github.com/rushikeshsakharleofficial/we-are-linux-administrators.git
cd we-are-linux-administrators
npm install -g .
linux-admin status
```

Do not pin examples to an old GitHub Release unless that exact release is intentionally required. Do not advertise `npm install -g linux-admin` as the default path until npm publication is verified.

---

## Mental model

Use the canonical router first:

```text
/using-linux-admin -> one parent/specialist -> bounded evidence -> one matching chunk
```

A second chunk or support skill is loaded only when evidence proves a cross-layer dependency.

Every skill follows these operating rules:

1. **Read-only first.** Gather bounded evidence before changing state.
2. **Detect the environment.** Confirm distro, kernel, package manager, init system, architecture and privilege level when relevant.
3. **Tie conclusions to evidence.** Do not guess from symptoms alone.
4. **Separate diagnosis from remediation.** Identify the failing layer before selecting a procedure.
5. **Protect recovery paths.** Back up consequential configuration and define rollback before risky changes.
6. **Validate afterwards.** Confirm service health, intended behaviour and residual risk.

The detailed safety rules live in [`UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`](UNIVERSAL_SKILL_EXECUTION_CONTRACT.md).

---

## Routing examples

| Request | Route |
|---|---|
| Unknown Linux problem | `diagnose` |
| CPU, memory/OOM, swap or capacity | `performance` -> matching chunk |
| Mount/filesystem/SMART/quota/LVM/RAID/iSCSI/NFS/Samba | `storage` -> matching chunk |
| Multipath/WWID/ALUA | `multipath-expert` |
| Backup or restore | `backup-restore-expert` |
| POSIX permissions or ACL | `permissions` -> matching chunk |
| Local account/PAM/SSSD-LDAP/sudo | `auth` -> matching chunk |
| TCP/UDP/VLAN/packet capture/routing/NAT | `network` -> matching chunk |
| Firewall | `firewall-expert` |
| Proxy | `linux-proxy-expert` |
| Time/NTP/timezone/RTC | `time` -> matching chunk |
| Package/repository transaction | `package-manager-expert` |
| Planned patch rollout | `package-manager-expert` -> `chunks/patching.md` |
| HAProxy | `load-balancer-expert` -> `chunks/haproxy.md` |
| Vulnerability/CVE finding | `security-expert` -> `chunks/vulnerability-scan.md` |
| Sysctl/kernel runtime tuning | `sysctl-expert` |
| Active incident | `incident-response-expert` |
| Post-containment RCA | `incident-response-expert` -> `chunks/root-cause-analysis.md` |
| Formal incident artifact | `incident-report-creator-expert` |

Full routing map: [`../skills/using-linux-admin/SKILL.md`](../skills/using-linux-admin/SKILL.md).

---

## Safety and execution

The repository's hooks and validators are guardrails, not substitutes for operator judgement. Consequential changes must still preserve access, recovery and rollback paths. Avoid broad destructive shortcuts such as recursive world-writable permissions, blind firewall flushes, filesystem creation on uncertain devices, forced filesystem repair without recovery planning, or disabling security controls merely to make a symptom disappear.

For local/global agent discovery and Codex-specific guidance, use [`LOCAL_GLOBAL_AGENT_SETUP.md`](LOCAL_GLOBAL_AGENT_SETUP.md), [`AI_TOOL_SUPPORT.md`](AI_TOOL_SUPPORT.md), and [`CODEX_USAGE.md`](CODEX_USAGE.md).