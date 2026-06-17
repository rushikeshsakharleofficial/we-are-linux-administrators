# Linux Security Expert Checklist

Use this checklist when running `/linux-admin:security-expert`.

## Output contract

Every security assessment must produce:

```text
Scope:
Host role:
Assumptions:
Read-only evidence collected:
Findings by domain:
Score:
Critical gaps:
Recommended fix order:
Validation plan:
Rollback/safety notes:
GitHub feedback draft: only if user explicitly requests it
```

## 1. Scope and authorization

- Confirm the system is owned or authorized.
- Confirm whether the target is production, staging, lab, or personal.
- Confirm whether external validation is allowed.
- Do not perform disruptive tests.

## 2. Host role

Classify:

- web/API
- mail
- DNS
- database/cache
- monitoring
- jump host
- VPN/router/NAT
- container/Kubernetes
- backup
- file server
- developer/lab

## 3. Exposure review

Read-only checks:

```bash
ss -tulpen
ip -brief addr
ip route
```

Assess:

- unexpected listeners
- public bind address
- IPv6 exposure
- management ports
- cloud firewall mismatch
- NAT/forwarding paths

## 4. SSH and identity

Read-only checks:

```bash
sshd -T 2>/dev/null | sort
systemctl status ssh sshd --no-pager 2>/dev/null || true
grep -R --line-number -E 'PasswordAuthentication|PermitRootLogin|PubkeyAuthentication|MaxAuthTries|AllowUsers|AllowGroups|KbdInteractiveAuthentication|ChallengeResponseAuthentication' /etc/ssh/sshd_config /etc/ssh/sshd_config.d 2>/dev/null || true
sudo -l
```

Assess:

- password login
- root login
- MFA/PAM
- sudo scope
- old users
- authorized key ownership
- auth logging
- fail2ban coverage

## 5. Firewall and network path

Route to `firewall-expert` and `networking-expert`.

Assess:

- default policy
- interface/zone mapping
- IPv4 and IPv6 parity
- allowed service list
- exposed admin interfaces
- NAT/forwarding
- logs/counters

## 6. Systemd hardening

Route to `systemd-expert`.

Check for public or privileged services:

```bash
systemctl show <unit> --no-pager -p User,Group,DynamicUser,NoNewPrivileges,PrivateTmp,PrivateDevices,ProtectSystem,ProtectHome,ProtectKernelTunables,ProtectKernelModules,ProtectControlGroups,CapabilityBoundingSet,AmbientCapabilities,RestrictAddressFamilies,SystemCallFilter,TasksMax,MemoryMax
systemd-analyze security <unit> --no-pager 2>/dev/null || true
```

Assess:

- service identity
- filesystem write scope
- capabilities
- private temp/device/network settings
- kernel/control-group protection
- resource limits
- secrets in environment

## 7. Sysctl hardening

Route to `sysctl-expert`.

Assess:

- kernel log and pointer exposure
- ptrace/profiling/eBPF exposure
- protected hardlinks/symlinks/fifos/regular files
- core dump policy
- IPv4/IPv6 redirects and source routing
- RPF and martian logging
- TCP SYN cookies
- ICMP hygiene

## 8. Limits and resource ceilings

Route to `limits-expert`.

Assess:

- nofile
- nproc
- memlock
- core
- TasksMax
- MemoryMax
- PAM limits
- systemd Limit directives
- broad unlimited values

## 9. Privilege and permissions

Route to permissions experts.

Read-only checks:

```bash
id
getent passwd
getent group sudo 2>/dev/null || getent group wheel 2>/dev/null || true
find / -xdev -perm -4000 -type f -print 2>/dev/null
```

Assess:

- sudo scope
- unexpected SUID files
- weak service account policy
- writable privileged paths
- ACL drift
- broad ownership changes

## 10. Patch posture

Route to `patching-expert` and `package-manager-expert`.

Assess:

- OS support status
- kernel version
- pending security updates
- reboot requirement
- third-party repositories
- exposed vulnerable packages
- package origin

## 11. Web and TLS

Route to `nginx-expert`, `apache-expert`, or `proxy-expert`.

Read-only checks:

```bash
curl -Ik https://<owned-host>/ 2>/dev/null || true
curl -Ik http://<owned-host>/ 2>/dev/null || true
```

Assess:

- HTTPS redirect
- certificate validity
- TLS behavior
- security headers
- default pages
- directory listing
- debug endpoints
- exposed backup/config files

## 12. Mail security

For mail hosts, assess:

- relay policy
- SMTP AUTH
- submission ports
- TLS
- SPF, DKIM, DMARC
- queue abuse protections
- recipient validation
- rate limits
- bounce abuse controls
- RBL/DNSBL operations

## 13. Logging and detection

Route to `logs`, `auditd-expert`, `fail2ban-expert`, and `rsyslog-expert`.

Read-only checks:

```bash
journalctl -p warning..alert -b --no-pager -n 200
auditctl -s 2>/dev/null || true
systemctl status auditd fail2ban --no-pager 2>/dev/null || true
```

Assess:

- persistent logs
- auth event visibility
- sudo event visibility
- audit rules
- fail2ban jails
- remote log forwarding
- time sync
- retention

## 14. File integrity

Assess:

- AIDE or Tripwire installed
- baseline exists
- baseline age
- critical file coverage
- scheduled checks
- alerting path

## 15. Backup and ransomware readiness

Route to `backup-restore-expert`.

Assess:

- immutable/offline backup
- restore test date
- backup credential isolation
- snapshot policy
- database backup validation
- NFS/Samba write scope
- backup server exposure

## 16. Feedback issue

Only create a GitHub issue if the user explicitly approves.

Required before issue creation:

- show full title
- show full body
- show labels
- show target repo
- remind user to remove private data
- get explicit confirmation

Without confirmation, generate a local draft only.
