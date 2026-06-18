# Security Expert Strategy Model

`security-expert` should behave like a Linux security assessment engine, not a single checklist.

## Strategy stack

```text
Govern  -> policy, approval, privacy, ownership
Identify -> assets, roles, packages, users, services, exposure
Protect -> SSH, firewall, sysctl, systemd, limits, MAC, patching
Detect  -> logs, auditd, fail2ban, file integrity, monitoring
Respond -> contain, preserve evidence, reduce exposure, plan fix
Recover -> backups, restore tests, rollback, post-incident review
```

## Master router design

`security-expert` owns the assessment and routes remediation:

```text
security-expert
├── sysctl-expert
├── limits-expert
├── systemd-expert
├── firewall-expert
├── fail2ban-expert
├── ssh-hardening-expert
├── auditd-expert
├── selinux-expert
├── apparmor-expert
├── file-permissions-expert
├── sudoers-expert
├── patching-expert
├── package-manager-expert
├── backup-restore-expert
├── nginx/apache/proxy experts
├── container/kubernetes experts
└── mail/DNS experts
```

## Role-aware baselines

Do not apply one baseline to every server. Build and select profiles by role:

- web-server
- mail-server
- DNS-server
- database-server
- monitoring-server
- backup-server
- jump-host
- VPN/router/NAT-host
- container-host
- Kubernetes-node
- low-memory-VPS

Each profile must define:

- expected open ports
- required services
- dangerous services
- firewall baseline
- sysctl baseline
- limits baseline
- systemd hardening baseline
- logging and audit requirements
- backup/recovery requirements

## Safe validation strategy

The skill should verify controls with low-risk, authorized checks only.

Validation classes:

1. Port exposure validation
2. Firewall deny-path validation
3. SSH policy validation
4. Web/TLS/header validation
5. Mail relay/auth validation
6. Sudo boundary validation
7. Systemd sandbox validation
8. Sysctl hardening validation
9. Limits blast-radius validation
10. Logging and detection validation
11. Backup restore-readiness validation

Each validation must produce:

```text
Expected:
Observed:
Passed/Failed:
Why it matters:
Fix owner skill:
Validation after fix:
Rollback/safety note:
```

## Incident-informed checks

Use real-world incident patterns as defensive prompts:

### Supply-chain compromise pattern

Check package origin, enabled repositories, testing/dev repositories, third-party packages, unsigned packages, package pinning, and recent critical library changes.

### Public SSH exposure pattern

Check SSH version, public bind address, root login, password login, PAM/MFA, fail2ban, auth logs, and emergency access.

### Kernel local privilege escalation pattern

Check kernel version, pending security updates, reboot-required state, unprivileged namespace exposure, local shell users, containers, and sysctl hardening.

### Ransomware recovery pattern

Check immutable/offline backups, restore test date, backup credential separation, NFS/Samba write scope, snapshots, database restore validation, and backup server exposure.

## Finding format

```text
Finding:
Category:
Host role:
Expected control:
Observed gap:
Evidence:
Impact:
Severity:
Fix owner skill:
Recommended change:
Validation:
Rollback:
Feedback issue draft: only with user approval
```

## Privacy and feedback rule

The skill may generate a sanitized GitHub issue draft, but it must never create an issue, PR, comment, report, or telemetry submission without explicit user approval.
