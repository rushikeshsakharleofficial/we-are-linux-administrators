# Diagnostic Method

## The Linux admin debugging loop

```text
Observe -> Classify -> Collect facts -> Build hypotheses -> Test smallest branch -> Decide -> Remediate -> Validate -> Prevent recurrence
```

## Step 1: Observe

Capture exactly:

- What is broken?
- Who is impacted?
- Since when?
- Is it intermittent or constant?
- What changed before it started?
- Is the system remote-only or console-accessible?

## Step 2: Classify

Classify into one primary and optional secondary class:

- boot
- systemd service
- network/DNS/firewall
- performance CPU/memory/load
- storage/filesystem/LVM/RAID
- permission/ACL/MAC
- package/update
- kernel panic/lockup
- container/runtime
- user/auth/SSH/sudo
- logging/monitoring
- automation/fleet

## Step 3: Collect baseline facts

Use the minimal universal baseline:

```bash
cat /etc/os-release
uname -a
uptime
systemctl --failed 2>/dev/null || true
journalctl -b -p err..alert --no-pager 2>/dev/null | tail -100 || true
ip -br addr 2>/dev/null || true
ip route 2>/dev/null || true
ss -lntup 2>/dev/null || true
lsblk -f 2>/dev/null || true
df -hT 2>/dev/null || true
free -h 2>/dev/null || true
```

## Step 4: Build hypotheses

Use this format internally:

```yaml
hypothesis:
  statement: "nginx fails because port 80 is already bound"
  evidence_for: ["journal shows bind() failed", "ss shows apache on :80"]
  evidence_against: []
  next_test: "ss -lntup | grep ':80'"
  risk_if_wrong: low
  confidence: 0.82
```

## Step 5: Test only discriminating commands

A discriminating command changes the path. Example:

- If raw IP ping works but DNS fails, stop testing routing; test resolver.
- If `df -i` is 100%, stop deleting big files; look for many tiny files.
- If POSIX permissions allow but SELinux logs AVC, test context, not chmod.
- If service exits with config syntax error, validate config before restarting.

## Step 6: Remediation readiness checklist

Before proposing a change, confirm:

- The root cause is likely enough.
- The change directly addresses that cause.
- The risk is classified.
- Backup or config copy exists where needed.
- Rollback is known.
- Validation is known.
- Production impact is understood.

## Step 7: Validate

Validation must prove both:

1. The immediate symptom is resolved.
2. No adjacent system was broken.

Examples:

```bash
systemctl is-active <unit>
journalctl -u <unit> -b --since '5 minutes ago' --no-pager
ss -lntup | grep <port>
curl -I http://127.0.0.1:<port>
ip route get <destination>
df -hT
getenforce
```

## Step 8: Prevention

After resolution, suggest one or more:

- Monitoring alert.
- Log pattern alert.
- Config validation pre-commit hook.
- Package pin/maintenance window.
- Backup/restore drill.
- Capacity threshold.
- Runbook update.
- Automation guardrail.
