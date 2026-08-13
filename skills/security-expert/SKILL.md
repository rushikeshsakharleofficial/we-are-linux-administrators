---
name: security-expert
description: Defensive Linux security review and remediation routing for authorized systems.
argument-hint: "[audit|validate|fix-plan|report]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# security-expert

Use this skill for defensive Linux security review on authorized systems.

## Routing

- identity and access: `auth`
- file permissions and ACLs: `permissions`
- network exposure: `firewall-expert` or `network`
- SELinux/AppArmor: `selinux-expert` / `apparmor-expert`
- logging and audit: `logs` / `auditd-expert`
- patching and vulnerabilities: `patching-expert` / `vulnerability-scan-expert`
- kernel and sysctl: `kernel` / `sysctl-expert`
- service hardening: `systemd-expert`
- recovery: `backup-restore-expert`

Prefer supported configuration, package, policy, and vendor update paths. Keep evidence bounded, changes reversible, and output concise. Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`.
