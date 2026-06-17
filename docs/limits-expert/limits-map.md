# Linux limits map

## Core model

A resource limit has a soft value and a hard ceiling. A process can generally lower its limits. An unprivileged process can raise the soft limit only up to the hard limit; raising the hard limit requires privilege.

## Common limits

| Limit | Common name | Failure symptom | Notes |
|---|---|---|---|
| `RLIMIT_NOFILE` | `nofile`, `ulimit -n` | `EMFILE`, `Too many open files` | value is one greater than highest fd number |
| `RLIMIT_NPROC` | `nproc`, `ulimit -u` | `fork: Resource temporarily unavailable` | user/process/thread related; systemd TasksMax may also apply |
| `RLIMIT_MEMLOCK` | `memlock`, `ulimit -l` | mlock/DPDK/BPF failures | pinned memory can starve host |
| `RLIMIT_CORE` | `core`, `ulimit -c` | no core dumps | controlled also by systemd-coredump/core_pattern |
| `RLIMIT_STACK` | `stack`, `ulimit -s` | thread/startup/recursion errors | too high per-thread stack wastes virtual memory |
| `RLIMIT_AS` | `as`, virtual memory | allocation failure | rarely best first control for services |
| `RLIMIT_FSIZE` | file size | log/output write failure | can surprise apps |

## Discovery

```bash
ulimit -a
cat /proc/self/limits
cat /proc/<pid>/limits
prlimit --pid <pid>
systemctl show <unit> -p LimitNOFILE,LimitNPROC,LimitMEMLOCK,LimitCORE,LimitSTACK,LimitAS
```

## Kernel ceilings

| File | Meaning |
|---|---|
| `/proc/sys/fs/nr_open` | ceiling for per-process nofile unlimited mapping |
| `/proc/sys/fs/file-max` | host-wide max allocated file handles |
| `/proc/sys/fs/file-nr` | allocated/unused/max file handles snapshot |
| `/proc/sys/kernel/threads-max` | host-wide threads ceiling |
| `/proc/sys/kernel/pid_max` | max PID number, not a tuning target for most cases |
