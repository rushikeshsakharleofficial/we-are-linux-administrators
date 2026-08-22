# All Linux admin expert skill pack

This document describes the maintained `linux-admin` expert architecture. It is **not** a request to recreate the old one-skill-per-topic layout.

The canonical repository currently keeps **65 top-level skills**. Broad parent domains own focused condition-specific chunks, while materially different products or high-risk control planes remain distinct specialists.

## Canonical routing

```text
using-linux-admin -> one parent/specialist -> bounded evidence -> one matching chunk
```

Load a second chunk or support skill only when evidence proves a cross-layer issue.

The source of truth for routing is:

- `skills/using-linux-admin/SKILL.md`
- `docs/EXPERT_MODULE_INDEX.md`
- each selected parent `SKILL.md`

## Consolidated expert domains

The following former micro-skill topics are maintained as parent chunks instead of standalone top-level skills:

- logging: rsyslog and logrotate -> `skills/logs/chunks/`
- auth: sudoers, PAM, SSSD/LDAP and local accounts -> `skills/auth/chunks/`
- storage: mounts/filesystems/SMART/quota/LVM/RAID/iSCSI/NFS/Samba -> `skills/storage/chunks/`
- performance: CPU, memory/OOM, swap/zram and capacity planning -> `skills/performance/chunks/`
- network: TCP, UDP, tcpdump/packet capture, VLAN/bonding, routing/iproute2 and NAT/conntrack -> `skills/network/chunks/`
- automation: Bash/POSIX scripting and runbooks -> `skills/automation/chunks/`
- package lifecycle: planned patch rollout -> `skills/package-manager-expert/chunks/patching.md`
- security: broad host audit, auditd, Fail2Ban and vulnerability/CVE triage -> `skills/security-expert/chunks/`
- incident management: post-containment RCA -> `skills/incident-response-expert/chunks/root-cause-analysis.md`
- load balancing: HAProxy -> `skills/load-balancer-expert/chunks/haproxy.md`

Do not restore retired top-level skill directories merely because an old skill name appears in historical commits, issue discussions, compatibility command names or archived documentation.

## Distinct specialists that intentionally remain top-level

Examples include:

- `backup-restore-expert`
- `selinux-expert`
- `apparmor-expert`
- `ssh-hardening-expert`
- `multipath-expert`
- `process-expert`
- `load-average-expert`
- `io-wait-expert`
- `nginx-expert`
- `apache-expert`
- `php-fpm-expert`
- `mysql-expert`
- `postgresql-expert`
- `redis-expert`
- `kubernetes-node-expert`
- `ansible-expert`
- `incident-response-expert`
- `f5-expert`
- `cloud-lb-expert`
- `lvs-ipvs-expert`
- `keepalived-expert`

They remain separate where product semantics, recovery boundaries, remote-access risk or control-plane differences make a merge less safe or less accurate.

## Common execution contract

Every parent, specialist and chunk follows `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`:

1. collect bounded evidence before changes;
2. verify security and architecture fit;
3. define backup/disaster and rollback paths first;
4. use guarded rollback for risky remote changes;
5. keep implementation scoped;
6. validate the result and residual risk.

## Validation

Run the full repository checks rather than validating only this document:

```bash
.githooks/pre-commit
```

The regression suite also checks the current parent/chunk architecture and prevents retired top-level skills from being silently restored.
