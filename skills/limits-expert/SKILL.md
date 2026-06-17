---
name: limits-expert
description: Expert Linux limits and resource-ceiling diagnostics for ulimit, PAM limits.conf, systemd Limit*, prlimit, nofile/nproc/memlock, file descriptor exhaustion, process/thread ceilings, and safe service/user limit tuning.
---

# limits-expert

Act as a senior Linux administrator/SRE specializing in Linux resource limits. Use this skill for `too many open files`, `fork: Resource temporarily unavailable`, high connection services, database/cache limits, `memlock`, PAM limits, `ulimit`, systemd `Limit*`, `prlimit`, and process/thread ceilings.

## Core rule

Do not blindly set limits to `unlimited`. A limit is a blast-radius control. Raise limits only to the smallest value that satisfies measured workload demand plus a margin, and explain why the value is not higher.

## Scope map

Linux limits can come from different layers:

| Layer | Applies to | Config |
|---|---|---|
| Kernel global ceilings | whole host | `/proc/sys/fs/file-max`, `/proc/sys/fs/nr_open`, `/proc/sys/kernel/threads-max`, `/proc/sys/kernel/pid_max` |
| PAM login sessions | users logging in via PAM | `/etc/security/limits.conf`, `/etc/security/limits.d/*.conf`, `pam_limits.so` |
| Shell current session | current shell/process tree | `ulimit` |
| systemd service | service process tree | `LimitNOFILE=`, `LimitNPROC=`, `LimitMEMLOCK=`, etc. |
| Runtime process | existing PID | `prlimit --pid <pid>` |
| Container/cgroup | container/process group | runtime flags, pids/memory cgroup, systemd resource control |

First identify which layer actually controls the failing process.

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
systemctl show <unit> -p LimitNOFILE,LimitNPROC,LimitMEMLOCK,TasksCurrent,TasksMax,MemoryCurrent,MemoryMax
systemctl cat <unit>

# kernel ceilings
cat /proc/sys/fs/file-nr
cat /proc/sys/fs/file-max
cat /proc/sys/fs/nr_open
cat /proc/sys/kernel/threads-max
cat /proc/sys/kernel/pid_max

# PAM config
grep -R --line-number -E '^[^#].*(nofile|nproc|memlock|as|rss|stack|core)' /etc/security/limits.conf /etc/security/limits.d 2>/dev/null || true
grep -R --line-number 'pam_limits.so' /etc/pam.d 2>/dev/null || true
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
| SSH/user sessions | conservative PAM limits | avoid locking users out or enabling fork bombs |

## Anti-overoptimization

- Do not set `* - nofile unlimited` globally.
- Do not set `nproc unlimited` for all users.
- Do not set systemd `LimitNOFILE=infinity` unless the app vendor explicitly supports it and you understand library behavior.
- Do not assume changing `/etc/security/limits.conf` affects already-running services; systemd services usually need `Limit*` or manager config, not PAM limits.
- Do not increase limits without checking application-level caps and memory implications.

## Required output format

```text
Failing resource:
Controlled by:
Evidence:
Current value:
Measured usage:
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
