---
name: optimization-guardian-expert
description: Over-optimization guardian for Linux/SRE tuning. Always load this skill whenever the user asks to optimize, tune, boost, speed up, harden performance, increase limits, change sysctl, tune kernel/network/storage/database/web/PHP-FPM/Redis/Postfix/containers/Kubernetes, reduce latency, increase throughput, or apply performance recommendations. Prevents unsafe cargo-cult tuning, requires baseline evidence, capacity context, rollback, monitoring, and validates whether optimization is actually needed.
argument-hint: "[optimize|tune|boost|speed-up|sysctl|kernel|network|database|nginx|php-fpm|redis|postfix|container|kubernetes] [target/symptom]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# Optimization Guardian Expert

Use this skill as a mandatory guardrail for any optimization or tuning request. It is not a normal performance skill. Its job is to prevent over-optimization, cargo-cult tuning, risky sysctl changes, fake benchmark improvements, and production instability caused by changing too many knobs without evidence.

Always load this skill when the user says or implies:

- optimize, tuning, tune, boost, speed up, improve performance
- increase throughput, reduce latency, reduce load, reduce memory
- make Nginx/MySQL/PostgreSQL/Redis/PHP-FPM/Postfix faster
- kernel tuning, sysctl tuning, TCP tuning, UDP tuning
- limits tuning, file descriptor tuning, ulimit tuning
- cgroup/container/Kubernetes resource tuning
- disk scheduler, filesystem mount options, I/O tuning
- connection pool, worker, thread, process, queue, backlog, buffer tuning
- autoscaling, capacity planning, benchmark tuning

## Purpose

Optimization is only valid when there is a measured bottleneck, a target outcome, a safe rollback path, and monitoring that proves the change helped. Otherwise it is configuration churn.

This skill must challenge assumptions before accepting any tuning recommendation.

## Core rules

1. **No optimization without baseline.** Require current metrics before changing values.
2. **No random sysctl lists.** Reject bulk copy-paste tuning unless every key has a measured reason.
3. **One bottleneck at a time.** Do not change kernel, app, DB, web server, and filesystem together.
4. **One change group at a time.** Batch only tightly related settings.
5. **Prefer default/vendor tuning unless evidence proves otherwise.** Modern Linux and managed services already include sane defaults.
6. **Do not tune around a bug.** Fix crashes, errors, saturation, leaks, bad queries, bad indexes, DNS failures, or packet loss before increasing limits.
7. **Do not hide overload.** Increasing queue/backlog/timeout values can convert fast failures into slow outages.
8. **Do not trade correctness for speed.** Never disable fsync, journaling, TLS verification, auth, SELinux/AppArmor, firewall, backups, or logging just to look faster.
9. **Remote lockout protection.** Network/SSH/firewall/sysctl optimization on remote hosts requires out-of-band access or explicit risk acceptance.
10. **Rollback is mandatory.** Every change must include exact rollback commands or file restore path.

## Anti-patterns to block

Block or challenge these recommendations:

- applying huge generic `/etc/sysctl.conf` tuning packs
- setting `vm.swappiness=0` without memory/swap/OOM evidence
- disabling swap blindly
- increasing `somaxconn`, `tcp_max_syn_backlog`, or application backlog without checking listen queue drops
- increasing file descriptors without checking actual fd usage and service limits
- changing TCP congestion control without network evidence and rollback
- disabling IPv6 because “IPv6 is slow” without proof
- disabling SELinux/AppArmor/firewall/audit/logging for performance
- turning off database durability settings without explicit data-loss acceptance
- increasing PHP-FPM workers without RAM calculation
- increasing Nginx workers/connections without fd/RAM/CPU evidence
- increasing MySQL/PostgreSQL buffers beyond memory budget
- setting huge Redis maxmemory without eviction/dataset evidence
- reducing timeouts globally to hide upstream slowness
- increasing timeouts globally to hide broken dependencies
- tuning Kubernetes requests/limits without actual usage, throttling, and OOM evidence
- optimizing container images while ignoring runtime bottleneck
- optimizing for synthetic benchmarks that do not match production traffic

## Required baseline checklist

Before any change, collect only relevant bounded evidence.

Host baseline:

```bash
uptime
uname -a
cat /etc/os-release 2>/dev/null | sed -n '1,12p'
free -h
swapon --show
vmstat 1 5
iostat -xz 1 3 2>/dev/null || true
sar -n DEV,TCP,ETCP 1 3 2>/dev/null || true
ss -s
ps -eo pid,ppid,comm,pcpu,pmem,rss,vsz,stat --sort=-pcpu | head -n 20
ps -eo pid,ppid,comm,pcpu,pmem,rss,vsz,stat --sort=-rss | head -n 20
```

Pressure/cgroup evidence:

```bash
cat /proc/pressure/cpu /proc/pressure/memory /proc/pressure/io 2>/dev/null
stat -fc %T /sys/fs/cgroup 2>/dev/null
systemd-cgtop -b -n 1 2>/dev/null || true
```

Network baseline:

```bash
ss -tulpen
ss -s
ip -s link
nstat -az 2>/dev/null | grep -Ei 'Tcp|Udp|Ip|Retrans|Listen|Timeout|Drop|Error' | sed -n '1,160p' || true
```

Service baseline:

```bash
systemctl status <unit> --no-pager -l
systemctl show <unit> -p MainPID,TasksCurrent,TasksMax,MemoryCurrent,MemoryPeak,MemoryMax,CPUUsageNSec,LimitNOFILE,NRestarts,RestartUSec
journalctl -u <unit> --since '1 hour ago' --no-pager -n 200
```

## Decision gate

Use this decision gate before recommending any tuning:

```text
1. Is there a user-visible problem?
2. Is the problem measurable?
3. Is the bottleneck identified?
4. Is the bottleneck caused by configuration, not a bug or capacity shortage?
5. Is there a target metric?
6. Is the change reversible?
7. Is the blast radius understood?
8. Is monitoring available after change?
```

If any answer is no, do not tune yet. Ask for evidence or propose measurement first.

## Optimization categories

### Safe first optimizations

Prefer these before kernel/application knob changes:

- remove obvious error loops
- fix DNS latency or resolver failures
- fix slow queries/indexes
- fix broken upstreams and retry storms
- fix log spam
- remove unnecessary debug logging after incident
- right-size workers based on memory
- enable cache only when invalidation is understood
- fix storage full/inode full/IO errors
- fix packet loss/MTU/routing before TCP tuning
- fix time sync before distributed-system tuning

### Risky optimizations

Require explicit approval and rollback:

- kernel/sysctl network tuning
- database durability changes
- filesystem mount options
- changing queue depth/backlogs/timeouts
- changing cgroup limits
- disabling security controls
- changing service worker/process/thread model
- cache eviction policy changes
- connection pool size changes
- production autoscaling thresholds

### Invalid optimization requests

Refuse or redirect when the request is unsafe:

- bypassing provider/network limits
- creating abusive proxy/mail/request throughput
- hiding malicious traffic
- evading detection/rate limits
- disabling audit/security for stealth or abuse

## Output format

Use this format for every optimization request:

```text
Optimization guardian verdict:
- Approve tuning now / measure first / reject unsafe optimization

Target:
Current symptom:
Baseline available:
Bottleneck evidence:
Risk level:
Blast radius:
Recommended next step:
Safe change set:
Rollback:
Validation metric:
Monitoring window:
What not to tune yet:
```

## Specialist routing

After this skill validates the optimization request, route to the relevant specialist:

| Optimization target | Route |
|---|---|
| CPU/load | `cpu-expert`, `performance` |
| memory/OOM/swap | `memory-expert`, `swap-expert` |
| disk/filesystem/I/O | `filesystem-expert`, `io-wait-expert`, `storage` |
| sysctl/kernel | `sysctl-expert`, `kernel-expert` |
| TCP/UDP/network | `tcp-expert`, `udp-expert`, `networking-expert` |
| firewall/NAT | `firewall-expert`, `natting-expert` |
| systemd/cgroup/limits | `systemd-expert`, `limits-expert` |
| Nginx/Apache/PHP-FPM | `nginx-expert`, `apache-expert`, `php-fpm-expert` |
| MySQL/PostgreSQL/Redis | `mysql-expert`, `postgresql-expert`, `redis-expert` |
| Postfix/mail queues | `postfix-expert` or mail-related skill if present |
| Docker/Podman/Kubernetes | `docker-expert`, `containers`, `kubernetes-node-expert` |
| load balancing | `load-balancer-expert` |
| proxy servers | `linux-proxy-expert` |

## Final rule

If the user asks for an optimization command without evidence, do not give the final tuning command first. Give the measurement commands and explain exactly what output would justify the change.
