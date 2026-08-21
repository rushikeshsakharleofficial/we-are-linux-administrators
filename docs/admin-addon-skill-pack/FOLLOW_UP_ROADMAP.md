# Follow-up roadmap

> Historical implementation roadmap. The original phase lists below describe the pre-consolidation skill tree and are **not** current routing or installation guidance. For the live architecture, use `skills/using-linux-admin/SKILL.md` and `docs/EXPERT_MODULE_INDEX.md`.

## Current maintenance direction

- Keep the compact 65-skill top-level tree; do not recreate retired micro-skills merely because they appear in the historical lists below.
- Preserve consolidated procedures in their current parent chunks, including network, time, storage, performance, permissions, auth, logs, automation, security, package-manager and incident-response chunks.
- Keep materially distinct specialists such as backup/restore, multipath, SELinux/AppArmor, SSH/RDP, databases and product-specific load balancers separate unless a future evidence-based review proves a safe merge.
- Prefer accuracy, validation, safety-contract coverage and packaging fixes over further count reduction.

## Historical Phase 1 follow-up

The following names are retained only as the original roadmap record; several were later consolidated into parent chunks.

- backup-restore-expert
- logrotate-expert
- auditd-expert
- rsyslog-expert
- ssh-hardening-expert
- lvm-expert
- tcpdump-expert
- incident-response-expert
- nginx-expert
- php-fpm-expert
- mysql-expert

## Historical Phase 2 follow-up

Add audit helpers under `scripts/` and wrappers under `bin/`.

## Historical Phase 3 follow-up

Update README, `docs/EXPERT_MODULE_INDEX.md`, and manifest keywords after review.

## Historical Phase 4 follow-up

These were candidate expert names from the original research report. Do not treat this list as the current top-level skill inventory.

- selinux-expert
- apparmor-expert
- sudoers-expert
- pam-expert
- sssd-ldap-expert
- raid-expert
- nfs-expert
- samba-expert
- iscsi-expert
- multipath-expert
- smart-disk-expert
- process-expert
- load-average-expert
- cpu-expert
- io-wait-expert
- iproute-expert
- routing-expert
- vlan-bonding-expert
- proxy-expert
- haproxy-expert
- apache-expert
- postgresql-expert
- redis-expert
- docker-expert
- podman-expert
- kubernetes-node-expert
- ansible-expert
- patching-expert
- vulnerability-scan-expert
- capacity-planning-expert
- runbook-expert
