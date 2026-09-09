---
name: "service"
description: "Troubleshoot systemd service failures, restart loops, failed units, daemon crashes, port bind errors, unit dependencies, and service config validation."
argument-hint: "[unit name / service symptom]"
effort: "high"
allowed-tools: "Read Grep Glob Bash"
---
# service skill

Use this plugin skill for: $ARGUMENTS

## Universal Skill Execution Contract

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Begin with bounded read-only evidence, verify the exact unit and dependency path, preserve the effective unit/config before edits, define rollback before reload/restart or dependency changes, protect remote-access and production dependencies, use guarded rollback when a service change can cut operator access or client traffic, and validate both unit state and the actual workload after change.

Supporting documentation is available under `../../docs/`.

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

If unit configuration was edited, verify the actual loaded unit fragment and keep verification diagnostics visible. On systemd versions that expose `--recursive-errors`, use `--recursive-errors=no` so warnings in the specified unit make the command fail. Older systemd versions can print verification warnings while still returning zero, so review their output and never treat exit status alone as proof that the unit is clean.

```bash
unit_file="$(systemctl show -p FragmentPath --value <unit>)"
if [ -z "$unit_file" ]; then
  echo "Unable to resolve loaded unit fragment" >&2
  exit 1
fi
if systemd-analyze verify --help 2>&1 | grep -q -- '--recursive-errors'; then
  systemd-analyze verify --recursive-errors=no "$unit_file"
else
  systemd-analyze verify "$unit_file"
fi
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

Before editing, preserve the current effective unit and any existing local drop-ins. A narrow rollback must restore only the configuration touched by this change. If a drop-in directory already exists, its backup is mandatory: do not continue to `systemctl edit` if that backup fails.

```bash
systemctl cat <unit>
if [ -d /etc/systemd/system/<unit>.d ]; then
  cp -a /etc/systemd/system/<unit>.d /var/tmp/<unit>.d.bak.$(date +%F-%H%M%S)
fi
systemctl edit <unit>
systemctl daemon-reload
unit_file="$(systemctl show -p FragmentPath --value <unit>)"
if [ -z "$unit_file" ]; then
  echo "Unable to resolve loaded unit fragment" >&2
  exit 1
fi
if systemd-analyze verify --help 2>&1 | grep -q -- '--recursive-errors'; then
  systemd-analyze verify --recursive-errors=no "$unit_file"
else
  systemd-analyze verify "$unit_file"
fi
systemctl cat <unit>
```

Do not use `systemctl revert <unit>` as the default rollback when the unit already had local overrides. `revert` removes all matching local drop-ins and overriding unit files, so it can erase unrelated administrator or configuration-management changes.

Rollback only the drop-in changed in this operation: restore its exact pre-change backup, or remove only the newly created drop-in if none existed before, then reload and validate the merged unit again.

```bash
systemctl daemon-reload
systemctl cat <unit>
unit_file="$(systemctl show -p FragmentPath --value <unit>)"
if [ -z "$unit_file" ]; then
  echo "Unable to resolve loaded unit fragment" >&2
  exit 1
fi
if systemd-analyze verify --help 2>&1 | grep -q -- '--recursive-errors'; then
  systemd-analyze verify --recursive-errors=no "$unit_file"
else
  systemd-analyze verify "$unit_file"
fi
```

## Validation

```bash
systemctl is-active <unit>
systemctl status <unit> --no-pager
journalctl -u <unit> -b --since '5 minutes ago' --no-pager
ss -lntup | grep -E '<port>|<process>' || true
```

Also validate the real workload path (for example an application health endpoint, a client connection, or the dependent unit), not only `systemctl is-active`.

## Prevention

- Add config validation in deployment pipeline.
- Add `systemd-analyze verify` for unit changes.
- Add alert for restart count / failed unit.
- Keep unit overrides under config management.