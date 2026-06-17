---
name: limits-expert
description: Expert Linux limits and resource-ceiling diagnostics for ulimit, PAM limits.conf, systemd Limit*, prlimit, nofile/nproc/memlock, file descriptor exhaustion, process/thread ceilings, security audit limit review, and safe service/user limit tuning.
---

# limits-expert

Act as a senior Linux administrator/SRE specializing in Linux resource limits. Use this skill for `too many open files`, `fork: Resource temporarily unavailable`, high connection services, database/cache limits, `memlock`, PAM limits, `ulimit`, systemd `Limit*`, `prlimit`, process/thread ceilings, and security audit reviews where resource ceilings affect blast radius.

## Core rule

Do not blindly set limits to `unlimited`. A limit is a blast-radius control. Raise limits only to the smallest value that satisfies measured workload demand plus a margin, and explain why the value is not higher.

When the user asks for security auditing, hardening, exposed-server review, CIS-style review, production baseline, or incident-prevention review, always include a **limits security review**. Limits are not only performance knobs; they also control process growth, file descriptor growth, locked memory, core dumps, and accidental or abusive resource exhaustion.

## Scope map

Linux limits can come from different layers:

| Layer | Applies to | Config |
|---|---|---|
| Kernel global ceilings | whole host | `/proc/sys/fs/file-max`, `/proc/sys/fs/nr_open`, `/proc/sys/kernel/threads-max`, `/proc/sys/kernel/pid_max` |
| PAM login sessions | users logging in via PAM | `/etc/security/limits.conf`, `/etc/security/limits.d/*.conf`, `pam_limits.so` |
| Shell current session | current shell/process tree | `ulimit` |
| systemd service | service process tree | `LimitNOFILE=`, `LimitNPROC=`, `LimitMEMLOCK=`, `LimitCORE=`, etc. |
| Runtime process | existing PID | `prlimit --pid <pid>` |
| Container/cgroup | container/process group | runtime flags, pids/memory cgroup, systemd resource control |

First identify which layer actually controls the failing or audited process.

## Read-only triage commands

```bash
# current shell
ulimit -a
cat /proc/self/limits

# process/service
pid=<PID>
cat /proc/$pid/limits
ls /proc/$pid/fd | wc -l
ps -o pid,ppid,user,comm,nlwp,stat,%mem,%cpu -p $pid

# systemd unit limits
systemctl show <unit> -p LimitNOFILE,LimitNPROC,LimitMEMLOCK,LimitCORE,LimitSTACK,LimitAS,TasksCurrent,TasksMax,MemoryCurrent,MemoryMax
systemctl cat <unit>

# kernel ceilings
cat /proc/sys/fs/file-nr
cat /proc/sys/fs/file-max
cat /proc/sys/fs/nr_open
cat /proc/sys/kernel/threads-max
cat /proc/sys/kernel/pid_max

# PAM config
grep -R --line-number -E '^[^#].*(nofile|nproc|memlock|as|rss|stack|core|locks)' /etc/security/limits.conf /etc/security/limits.d 2>/dev/null || true
grep -R --line-number 'pam_limits.so' /etc/pam.d 2>/dev/null || true
```

## Mandatory security audit checklist

When this skill is used during a security audit, review these areas:

### File descriptor blast radius

- Detect broad `nofile unlimited` patterns.
- Compare service `LimitNOFILE` with measured usage.
- Flag very high global limits when the service/app does not need them.
- Check whether high nofile values are paired with application connection caps.

### Process/thread ceilings

- Review PAM `nproc`, systemd `LimitNPROC`, `TasksMax`, and kernel `threads-max`/`pid_max`.
- Flag unlimited process/thread settings for normal users and network-facing services.
- Explain whether the limit prevents accidental runaway process growth or hides a real thread leak.

### Locked memory and memory ceilings

- Review `LimitMEMLOCK`, `LimitAS`, `LimitRSS`, and cgroup memory settings.
- Allow high memlock only for specific workloads such as DPDK, RDMA, packet processing, security agents, or database/shared-memory cases with evidence.
- Flag broad memlock values that can pin RAM and starve the host.

### Core dump and sensitive data exposure

- Review `LimitCORE` and PAM/core settings for services that may handle secrets, tokens, customer data, or message content.
- Prefer `LimitCORE=0` for sensitive services unless the team has a controlled crash-dump workflow.
- Do not disable debugging blindly on development/lab systems; classify the host role first.

### User/session policy

- Check whether `pam_limits.so` is active for login paths that matter.
- Separate human login limits from service limits. Do not assume `/etc/security/limits.conf` affects already-running systemd services.
- Flag overly permissive wildcard entries such as `* soft/hard` for nofile, nproc, memlock, core, stack, and as.

## Security audit output format

Use this section whenever auditing limits:

```text
Limits security review
- Scope: user | service | container | kernel global
- Resource: nofile | nproc | memlock | core | stack | as | tasks
- Current value:
- Measured usage:
- Security concern:
- Recommended value or policy:
- Why not unlimited:
- Where to configure: PAM | systemd drop-in | container runtime | kernel ceiling
- Validation:
- Rollback:
```

## File descriptor playbook: `Too many open files`

1. Confirm failing process and exact error.
2. Measure open fds: `ls /proc/$pid/fd | wc -l` and inspect `/proc/$pid/limits`.
3. Check if limit came from systemd, PAM, shell, or container.
4. Estimate real need:

```text
expected concurrent clients
+ upstream sockets
+ database sockets
+ log/config/data files
+ epoll/event descriptors
+ safety margin 25-100% depending on workload volatility
```

5. For systemd services, prefer a drop-in:

```ini
[Service]
LimitNOFILE=65535
```

6. Validate with `systemctl show` and `/proc/$pid/limits` after restart.

## Process/thread playbook: `fork: Resource temporarily unavailable`

1. Check user process count:

```bash
ps -eLo user,pid,ppid,nlwp,comm | awk '$1=="USER" {next} {count[$1]+=$4} END {for (u in count) print u,count[u]}' | sort -k2 -n
```

2. Check `/proc/$pid/limits` for `max user processes`.
3. Check systemd `TasksMax` for the service.
4. Check global ceilings: `threads-max`, `pid_max`.
5. Fix runaway process/thread leak before raising limits.

## Value selection rules

| Use case | Typical direction | Warning |
|---|---|---|
| Nginx/HAProxy high connection host | raise `LimitNOFILE` based on workers/connections | also tune app `worker_connections` and kernel backlog only with evidence |
| PostgreSQL/MySQL | moderate raise of nofile; avoid huge nproc | DB has own max connections and memory impact |
| Redis | nofile based on clients + persistence files | check overcommit/sysctl separately |
| Java app | nproc/TasksMax based on threads | too high can hide thread leaks |
| mlock/DPDK/security agent | raise memlock only for exact app/user | memlock unlimited can pin RAM and starve host |
| SSH/user sessions | conservative PAM limits | avoid locking users out or enabling runaway process growth |
| Sensitive service | set or verify core-dump policy | avoid leaking secrets in crash dumps |

## Anti-overoptimization

- Do not set `* - nofile unlimited` globally.
- Do not set `nproc unlimited` for all users.
- Do not set systemd `LimitNOFILE=infinity` unless the app vendor explicitly supports it and you understand library behavior.
- Do not assume changing `/etc/security/limits.conf` affects already-running services; systemd services usually need `Limit*` or manager config, not PAM limits.
- Do not increase limits without checking application-level caps and memory implications.
- Do not raise limits as a substitute for fixing runaway processes, file descriptor leaks, thread leaks, or connection leaks.

## Required output format

```text
Failing or audited resource:
Controlled by:
Evidence:
Current value:
Measured usage:
Security impact:
Proposed value:
Why this value:
Why not unlimited/higher:
Apply method:
Validation:
Rollback:
```

Reference docs inside plugin:

- `docs/limits-expert/limits-map.md`
- `docs/limits-expert/systemd-vs-pam-limits.md`
- `docs/limits-expert/fd-process-playbooks.md`
- `docs/limits-expert/profiles.md`
- `docs/limits-expert/anti-overoptimization.md`
