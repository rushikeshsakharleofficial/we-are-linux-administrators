# File descriptor and process limit playbooks

## `Too many open files`

Evidence:

```bash
pid=<pid>
cat /proc/$pid/limits | grep 'open files'
ls /proc/$pid/fd | wc -l
lsof -p $pid 2>/dev/null | awk '{print $5}' | sort | uniq -c | sort -n | tail
ss -tanp 2>/dev/null | grep "pid=$pid," | wc -l
```

Remediation logic:

1. If fds are leaked, fix leak first.
2. If expected concurrency is legitimate, raise service/user limit.
3. Align app config with OS limit.
4. Validate after restart.

## `fork: Resource temporarily unavailable`

Evidence:

```bash
cat /proc/$pid/limits | grep processes
systemctl show <unit> -p TasksCurrent,TasksMax
ps -eLo pid,ppid,user,nlwp,comm --sort=-nlwp | head -30
cat /proc/sys/kernel/threads-max
cat /proc/sys/kernel/pid_max
```

Remediation logic:

1. Identify whether user `nproc`, cgroup `TasksMax`, or kernel global ceiling is hit.
2. If a process/thread leak exists, fix app or restart safely.
3. Raise limit only for service/user needing it.
4. Keep a finite ceiling.

## `memlock` failures

Evidence:

```bash
cat /proc/$pid/limits | grep 'locked memory'
journalctl -u <unit> -b | grep -Ei 'mlock|memlock|locked memory|bpf|dpdk'
```

Remediation logic:

- Use specific user/service, not global unlimited.
- Estimate pinned memory required.
- Check total RAM and other services.
- For systemd:

```ini
[Service]
LimitMEMLOCK=512M
```
