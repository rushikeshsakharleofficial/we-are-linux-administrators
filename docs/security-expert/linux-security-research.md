# Linux Security Deep Research for `security-expert`

This document is the research base for making `security-expert` an incident-driven Linux security validation framework instead of a simple checklist.

## Core security model

Linux security must be evaluated across the full attacker lifecycle:

1. Initial access
2. Execution
3. Persistence
4. Privilege escalation
5. Defense evasion and defense impairment
6. Credential access
7. Discovery
8. Lateral movement
9. Collection
10. Exfiltration
11. Impact and recovery

MITRE ATT&CK for Linux maps many of these areas directly to Linux techniques such as public-facing application exposure, external remote services, supply-chain compromise, valid accounts, Unix shells, cron, systemd timers, SSH authorized keys, systemd services, sudo/SUID abuse, kernel modules, ptrace/proc memory access, log clearing, brute force, `/etc/passwd` and `/etc/shadow`, shell history, and private keys.

## Real-world incident lessons

### XZ Utils supply-chain backdoor

The XZ Utils incident proved that Linux compromise can come from trusted dependencies and maintainer trust, not only open ports. The key lesson for `security-expert` is to add supply-chain checks:

- package version and origin
- third-party repositories
- development/testing repositories on production systems
- package signing and trust path
- unexpected critical package updates
- SSH dependency path risk
- software bill of materials awareness
- release/source mismatch risk

### OpenSSH regreSSHion class of exposure

Public SSH must be treated as a critical attack surface. `security-expert` should always check:

- OpenSSH version
- public bind address
- password authentication policy
- root login policy
- PAM/MFA controls
- rate limiting and fail2ban
- auth log visibility
- emergency access path

### Linux kernel local privilege escalation

Kernel vulnerabilities show that local access is still dangerous. If an attacker enters as a low-privilege user, a weak patch posture can turn that into root. `security-expert` must check:

- kernel version and vendor support
- pending kernel security updates
- reboot-required state
- local users with shell access
- container escape exposure
- unprivileged namespaces
- netfilter/nftables and other kernel feature exposure

### Ransomware impact path

A hardened server is still weak if recovery is untested. `security-expert` must score ransomware readiness:

- immutable or offline backups
- restore test date
- backup credential separation
- NFS/Samba write scope
- snapshot policy
- database dump validation
- backup server exposure
- recovery time objective and recovery point objective

## Linux security parts to audit

### 1. Asset and role classification

Every audit starts by classifying the host:

- web/API server
- mail server
- DNS server
- database/cache server
- monitoring server
- jump host
- VPN/router/NAT host
- container/Kubernetes node
- backup server
- file/NFS/Samba server
- developer/lab machine

### 2. Network and attack surface

Check:

- listening sockets
- public/private bind address
- IPv4 and IPv6 exposure
- firewall zones and default policy
- cloud security group mismatch
- NAT and port forwarding
- management interfaces
- debug/status endpoints

### 3. SSH and authentication

Check:

- password login
- root login
- key-only policy
- old authorized keys
- weak account lifecycle
- PAM modules
- sudo rules
- auth logging
- fail2ban or equivalent controls

### 4. Privilege boundaries

Check:

- sudoers scope
- NOPASSWD rules
- SUID/SGID files
- writable privileged paths
- service account shells
- user/group drift
- Linux capabilities
- cron and systemd writable paths

### 5. Persistence paths

Check:

- systemd services
- systemd timers
- cron jobs
- shell startup files
- authorized keys
- PAM changes
- udev rules
- package hooks
- web roots and upload directories

### 6. Systemd hardening

Route to `systemd-expert` for:

- User and Group
- DynamicUser
- NoNewPrivileges
- PrivateTmp
- ProtectSystem
- ProtectHome
- ProtectKernelTunables
- ProtectKernelModules
- ProtectControlGroups
- CapabilityBoundingSet
- AmbientCapabilities
- RestrictAddressFamilies
- SystemCallFilter
- TasksMax and MemoryMax
- secrets in Environment or command line

### 7. Sysctl hardening

Route to `sysctl-expert` for:

- kernel information exposure
- ptrace restrictions
- eBPF and perf restrictions
- filesystem link protections
- core dump policy
- mmap minimum address
- IPv4/IPv6 redirects and source routing
- RPF and martian logging
- SYN cookies and ICMP hygiene

### 8. Limits and resource ceilings

Route to `limits-expert` for:

- nofile
- nproc
- memlock
- core
- stack/as/rss where relevant
- PAM limits
- systemd Limit directives
- TasksMax
- container pids and memory limits

### 9. Mandatory access control

Route to `selinux-expert` or `apparmor-expert` for:

- enforcement state
- unconfined services
- denials ignored
- custom profile drift
- broad allow rules
- file context/profile mismatch

### 10. File integrity

Check:

- AIDE or Tripwire presence
- baseline age
- critical file coverage
- scheduled checks
- alert destination
- baseline storage safety

### 11. Logging and detection

Check:

- journald persistence
- rsyslog forwarding
- auditd rules
- SSH auth logs
- sudo logs
- package change logs
- kernel warning logs
- fail2ban jails
- time sync
- log retention

### 12. Patch and vulnerability posture

Check:

- OS support status
- kernel version
- pending security updates
- reboot-required state
- exposed vulnerable services
- third-party repository risk
- package origin
- CVE exploitability based on host role

### 13. Web and TLS

Route to web experts for:

- HTTPS redirect
- certificate validity
- TLS versions
- security headers
- default pages
- directory listing
- debug endpoints
- backup/config files in web roots
- reverse proxy header leakage

### 14. Mail security

For mail infrastructure, check:

- open relay risk
- SMTP AUTH policy
- submission ports
- TLS policy
- SPF, DKIM, DMARC
- queue abuse
- bounce abuse
- recipient validation
- rate limits
- RBL/DNSBL operational risk

### 15. Containers and Kubernetes

Route to container experts for:

- privileged containers
- hostPath mounts
- Docker socket exposure
- rootless mode
- seccomp
- AppArmor/SELinux profile
- secrets in environment
- Kubernetes kubelet exposure
- image provenance

## Scoring model

Suggested default score weighting:

```text
Attack Surface              15
SSH/Auth                    12
Firewall/Network             8
Patch/CVE                   12
Privilege/Sudo               8
Systemd Hardening            8
Sysctl Hardening             7
Limits/Resource Controls     5
MAC: SELinux/AppArmor        6
Logging/Audit/Detection      8
Backup/Ransomware Recovery  11
Total                      100
```

## Implementation rule

`security-expert` must not execute offensive tests. It performs authorized, low-risk validation and configuration review, then routes fixes to the correct expert skill. Any GitHub feedback issue must be opt-in and user-approved, following `PRIVACY.md`.
