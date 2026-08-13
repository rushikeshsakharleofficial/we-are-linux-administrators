# AGENTS.md — linux-admin

Portable instructions for maintained repo-aware agents.

## Project

- Repo: `rushikeshsakharleofficial/we-are-linux-administrators`
- Branch: `main` unless explicitly requested otherwise
- Package/plugin: `linux-admin`
- Release: `1.18.x`
- Skills: `80`
- Compatibility: `docs/AI_TOOL_SUPPORT.md`

## Rules

1. Read the relevant canonical `skills/<name>/SKILL.md`; do not duplicate Linux procedures into vendor-specific folders.
2. Follow `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md` for evidence, safety, rollback and bounded output.
3. Use `docs/SECURITY_PATCH_REFRESH_POLICY.md` for current OS patch/kernel/driver/vulnerability guidance.
4. Prefer the smallest matching skill. Broad/unknown incidents start with `diagnose`.
5. Keep changes minimal, reversible and scoped. Verify files before writing.
6. Keep README, release, package/plugin metadata, marketplace metadata, site release data and skill count aligned after user-facing changes.
7. Verify current official documentation before changing AI-tool compatibility claims.
8. Never claim native plugin/marketplace availability unless verified.

## Routing

Use parent skills for merged domains:

- permissions/ACLs → `permissions`
- users/SSH/sudo/PAM/LDAP/SSSD → `auth`
- routing/NAT/TCP/UDP/VLAN/bonding → `network`
- CPU/memory/load/OOM → `performance`
- journald/rsyslog/logrotate → `logs`
- general RCA → `diagnose`
- OS security review → `security-expert`

## Validation

Run relevant hooks/tests when available. Report changed files, validation, rollback impact, and metadata/count changes.
