---
name: "service"
description: "Troubleshoot systemd service failures, restart loops, failed units, daemon crashes, port bind errors, unit dependencies, and service config validation."
argument-hint: "[unit name / service symptom]"
effort: "high"
allowed-tools: "Read Grep Glob Bash"
---
# service skill

Use this plugin skill for: $ARGUMENTS

Important: begin read-only; require explicit confirmation before disruptive/destructive changes; include validation and rollback.

Supporting docs are available under `${CLAUDE_SKILL_DIR}/../../docs/`.

# Task: systemd Service Failures and Restart Loops

## When to use

Use this for failed units, restart loops, dependency failures, daemon crashes, ports not listening, and service config errors.

## Mental model

Treat service diagnosis as four evidence layers:

1. Unit state and exit status.
2. Unit definition and drop-ins.
3. Service logs and application config validation.
4. Runtime dependencies: port, file, permission, package, network, cgroup, SELinux/AppArmor.

## Read-only first commands

```bash
systemctl status <unit> --no-pager
systemctl show -p Id,LoadState,ActiveState,SubState,Result,ExecMainCode,ExecMainStatus,Restart,RestartSec,NRestarts <unit>
systemctl cat <unit>
journalctl -u <unit> -b --no-pager -n 200
journalctl -u <unit> --since '1 hour ago' --no-pager
systemctl list-dependencies <unit> --reverse --no-pager 2>/dev/null || true
systemctl list-dependencies <unit> --no-pager 2>/dev/null || true
coredumpctl list <unit> 2>/dev/null || true
ss -lntup 2>/dev/null | head -100
```

If unit file was edited:

```bash
systemd-analyze verify /etc/systemd/system/<unit>.service 2>/dev/null || true
systemd-analyze verify /usr/lib/systemd/system/<unit>.service 2>/dev/null || true
systemd-analyze verify /lib/systemd/system/<unit>.service 2>/dev/null || true
```

## Branch interpretation

| Signal | Meaning | Next action |
|---|---|---|
| `ExecMainStatus=1/2` plus app syntax error | config/application failure | Run app-specific config test before restart |
| `Start request repeated too quickly` | repeated crash/restart throttle | Find first failure line before restart spam |
| `code=killed, status=9/KILL` | OOM/cgroup/manual kill possible | Check memory/OOM/cgroup logs |
| bind/listen error | port conflict or permission | Check `ss -lntup`, capabilities, SELinux/AppArmor |
| missing EnvironmentFile | unit dependency/config path missing | Check package or deployment change |
| coredump exists | binary crash | Use `coredumpctl info`, package version, upstream issue path |

## Safe remediation patterns

### Config syntax validation before reload/restart

Examples:

```bash
nginx -t
apachectl configtest
sshd -t
postfix check
named-checkconf
named-checkzone <zone> <file>
haproxy -c -f /etc/haproxy/haproxy.cfg
```

Only after syntax passes and user confirms:

```bash
systemctl reload <unit>
# or, if reload unsupported and impact accepted:
systemctl restart <unit>
```

### Use systemd drop-ins, not vendor unit edits

```bash
systemctl edit <unit>
systemctl daemon-reload
systemd-analyze verify /etc/systemd/system/<unit>.d/*.conf
```

Rollback:

```bash
systemctl revert <unit>
systemctl daemon-reload
```

## Validation

```bash
systemctl is-active <unit>
systemctl status <unit> --no-pager
journalctl -u <unit> -b --since '5 minutes ago' --no-pager
ss -lntup | grep -E '<port>|<process>' || true
```

## Prevention

- Add config validation in deployment pipeline.
- Add `systemd-analyze verify` for unit changes.
- Add alert for restart count / failed unit.
- Keep unit overrides under config management.
