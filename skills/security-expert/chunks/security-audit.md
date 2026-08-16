# Full defensive host-security audit

Use this chunk when `security-expert` has established that the task is a broad security posture review rather than one known control failure.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Work only on owned or explicitly authorised systems. Keep tests bounded and non-destructive; do not use stealth/evasion, credential spraying, exploit chains, persistence, malware, destructive tests or high-rate probing.

## Audit model

Review the host through the attacker lifecycle without claiming that a checklist proves security:

1. initial access and exposed services;
2. execution paths, interpreters, writable paths and scheduled jobs;
3. persistence via users, SSH keys, services, cron/timers and package hooks;
4. privilege boundaries: sudo, SUID/SGID, capabilities, kernel exposure;
5. defence impairment: disabled logging/agents, relaxed MAC, log tampering;
6. credential exposure: readable secrets, environment, history, private keys, backups;
7. internal discovery and cloud metadata exposure;
8. lateral movement via SSH trust, shares and exposed databases;
9. sensitive-data collection paths;
10. outbound/exfiltration paths;
11. impact and recovery, especially immutable/offline backup and restore drills.

## Mandatory sections

For a full audit cover: scope/authorisation, host role/criticality, exposure map, public/private paths, firewall/cloud controls, SSH/auth, HTTP/TLS and mail where present, patch/CVE and repository provenance, privilege/sudo/SUID/capabilities, file access, sysctl, limits, systemd hardening, SELinux/AppArmor, logging/audit/detection, file integrity when available, crypto policy where relevant, backups/restore/ransomware readiness, then findings/severity/remediation/rollback/validation.

## Baseline evidence

```bash
cat /etc/os-release
uname -a
id
ss -tulpen
ip -brief addr
ip route
systemctl --failed --no-pager 2>/dev/null || true
journalctl -p warning..alert -b --no-pager -n 200
findmnt
sshd -T 2>/dev/null | grep -Ei 'permitrootlogin|passwordauthentication|pubkeyauthentication|allowusers|allowgroups|maxauthtries' || true
sudo -l 2>/dev/null || true
visudo -c 2>&1 || true
getenforce 2>/dev/null || true
aa-status 2>/dev/null || true
auditctl -s 2>/dev/null || true
sysctl kernel.dmesg_restrict kernel.kptr_restrict kernel.yama.ptrace_scope 2>/dev/null || true
find / -xdev -perm -4000 -type f -print 2>/dev/null | head -160
getcap -r / 2>/dev/null | head -160
```

Collect only role-relevant evidence. Never ingest whole logs or secrets merely because they are available.

## Integrity, crypto and package provenance

When relevant, inspect distro-supported integrity and crypto controls instead of inventing a generic hardening baseline:

- package verification/provenance using the distro package manager and trusted repositories;
- AIDE, IMA, fapolicyd or equivalent only when deployed or justified by the host role;
- distro crypto policy/TLS defaults and application compatibility before tightening algorithms;
- unexpected SUID/SGID files, file capabilities and writable privileged paths.

Do not deploy a new integrity stack or tighten crypto policy blindly during an audit. Record the observed control, gap, compatibility risk, owner, rollback and validation path first.

## Condition handoffs

- SSH configuration/lockout risk -> `ssh-hardening-expert`
- local accounts/PAM/SSSD-LDAP/sudo -> `auth`
- POSIX/ACL object access -> `permissions`
- SELinux/AppArmor -> matching MAC specialist
- firewall/NAT/network exposure -> network/firewall specialist
- kernel/sysctl -> `kernel-expert` / `sysctl-expert`
- resource ceilings -> `limits-expert`
- service sandboxing -> `systemd-expert`
- package/CVE/supply chain -> patch/package/vulnerability specialists
- security logging -> `logs`; audit subsystem -> `auditd.md`; repeated abusive auth -> `fail2ban.md`
- backup/recovery -> `backup-restore-expert`
- active compromise/outage -> `incident-response-expert`

## Safe validation patterns

External exposure: compare intended ports with `ss -tulpen` and one authorised low-rate reachability test. Do not perform stealth/aggressive scans.

SSH: inspect effective `sshd -T` and configuration; at most one or two controlled failed logins when specifically validating detection. Never spray credentials.

Web: use minimal HEAD/GET requests to verify HTTPS redirect, certificate, security headers, default/debug/status exposure and accidental sensitive files.

Privilege: review `id`, `sudo -l`, users/groups, SUID/SGID and file capabilities. Do not attempt privilege escalation during an audit.

Systemd: use `systemd-analyze security <unit>` plus relevant `systemctl show` sandbox/capability/resource properties before recommending hardening.

Logging/detection: verify journal persistence/visibility, audit subsystem state and relevant protection services. A benign `logger` marker is acceptable when authorised.

Patch posture: identify OS/kernel/package source and known exposure using official vendor/security sources. Do not auto-upgrade without a maintenance/rollback plan.

## Incident-pattern reminders

Supply-chain risk: record repository/package provenance, third-party sources, update cadence and rollback options. Being fully patched does not eliminate compromised-upstream risk.

Public SSH: review package/version, auth policy, root login, rate limiting/detection, logs and emergency access together. Any hardening that can lock out admins needs staged validation.

Kernel LPE exposure: review kernel patch state, unprivileged eBPF/ptrace/perf/info exposure and privileged binaries/capabilities. Do not reproduce privilege-escalation exploits on production systems.

Ransomware/recovery: verify backups are protected from the compromised host, restorable and tested; broad write access and permanently mounted backup targets increase blast radius.

## Severity

- Critical: direct sensitive public exposure, known-exploited exposed service, full admin boundary failure, or unrecoverable backup gap on a critical host.
- High: weak auth, broad privilege, missing firewall on public service, dangerous service configuration or exposed secret material.
- Medium: missing hardening layer, incomplete detection, broad resource/write scope or untested recovery path.
- Low: hygiene/documentation/minor hardening gap.
- Info: documented role exception or accepted risk with evidence.

## Optional score

For broad audits only, score assessed controls out of 100: attack surface 15, SSH/auth 12, firewall/network 8, patch/CVE 12, privilege/sudo 8, systemd 8, sysctl 7, resource limits 5, MAC 6, logging/audit/detection 8, backup/recovery 11. Mark unassessed areas `Not tested`; never present the score as a security guarantee.

## Finding format

```text
Finding:
Host/role:
Evidence:
Expected control:
Observed gap:
Likely cause:
Severity:
Fix owner:
Recommended change:
Risk of fix:
Rollback:
Validation:
Not tested / assumptions:
```

State exactly what was tested, what was not tested, and what uncertainty remains.