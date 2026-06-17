# grep-expert pattern library

This document defines the pattern-library strategy for token-saving Linux admin triage.

A full generated local library with 1,050 command patterns was created as `GREP_EXPERT_PATTERN_LIBRARY.md`. The repository version keeps the library maintainable by storing categories and generation logic instead of only a static dump.

## Pattern domains

1. systemd and journald
2. kernel and hardware
3. memory and OOM
4. auth, SSH, sudo, PAM
5. network and firewall
6. DNS and named
7. web servers and PHP
8. databases
9. filesystems and storage
10. package managers
11. cron and automation
12. containers
13. security audit logs
14. mail systems
15. TLS certificates

## Reusable pattern families

### Failure words

```text
failed|failure|error|timeout|refused|denied|rejected|unreachable|unavailable
```

### Service failure

```text
failed|dependency failed|start request repeated|main process exited|code=exited|failed with result
```

### OOM and memory

```text
oom|out of memory|killed process|page allocation|memory allocation|cgroup out of memory
```

### Auth and SSH

```text
failed password|invalid user|authentication failure|permission denied|accepted|session opened|sudo
```

### Network

```text
connection refused|connection timed out|no route to host|network unreachable|reset by peer|packet loss
```

### DNS

```text
servfail|nxdomain|refused|timeout|lame server|zone|serial|dnssec|not authoritative
```

### Storage

```text
no space left|read-only file system|i/o error|inode|xfs|ext4|mount|fstab|fsck
```

### Package management

```text
dependency|conflict|broken|unmet|failed|transaction|rpmdb|dpkg|lock
```

## Token-saving command shapes

```bash
# count only
grep -cEi 'PATTERN' FILE

# bounded lines
grep -nEi -m 50 'PATTERN' FILE

# bounded context
grep -nEi -C 2 -m 30 'PATTERN' FILE

# journal bounded
journalctl -u SERVICE --since '1 hour ago' --no-pager | grep -nEi -m 50 'PATTERN'

# ripgrep recursive config search
rg -n --no-heading --glob '!*.bak' --glob '!*.old' 'PATTERN' PATH
```

## Generation rule

Use `scripts/grep-expert-patterns.py` to generate 1,000+ concrete command patterns from the domains, pattern families, file scopes, and output styles.
