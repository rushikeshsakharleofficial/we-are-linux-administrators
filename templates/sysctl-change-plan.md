# Sysctl Change Plan

## Request

- Host role:
- Problem/symptom:
- Business impact:
- Maintenance window:

## Evidence collected

```text
uname -a:
OS:
Current sysctl value(s):
Relevant logs:
Relevant metrics:
Current config files setting same key:
```

## Proposed changes

| Parameter | Current | Proposed | Reason | Risk | Validation | Rollback |
|---|---:|---:|---|---|---|---|
|  |  |  |  |  |  |  |

## Runtime test

```bash
# snapshot
sysctl <key1> <key2>

# temporary test
sysctl -w <key>=<value>
```

## Persist after validation

```bash
cat >/etc/sysctl.d/70-linux-admin-<role>.conf <<'EOF'
# Explain every line.
key = value
EOF
sysctl --system
```

## Validation windows

- Immediate:
- After 5 minutes:
- After 1 hour:
- After reboot:

## Rollback

```bash
sysctl -w <key>=<old_value>
rm -f /etc/sysctl.d/70-linux-admin-<role>.conf
sysctl --system
```
