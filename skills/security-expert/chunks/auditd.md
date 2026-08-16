# auditd evidence and rule design

Use this chunk only after `security-expert` identifies Linux audit subsystem/rule/event evidence as the condition.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Start read-only, keep evidence bounded, back up persistent rule sources before changes, define rollback before reloads, and do not enable immutable mode until the complete ruleset is validated with console/recovery access understood.

## Use when

- tracking who changed an important file or directory
- tracing sudo/user activity or suspicious access
- investigating missing audit events
- designing a focused audit rule or compliance evidence query
- validating runtime versus persistent audit rules

## Bounded evidence first

```bash
systemctl status auditd --no-pager 2>/dev/null || true
auditctl -s 2>/dev/null || true
auditctl -l 2>/dev/null | head -200 || true
ls -l /etc/audit/rules.d /etc/audit/audit.rules 2>/dev/null || true
ausearch -ts recent 2>/dev/null | head -160 || true
aureport --summary 2>/dev/null | head -120 || true
```

Ask for the audit question, target path/syscall/user, expected actor, time window, current rule source, and one narrow search result. Do not dump complete audit logs into an agent context.

## Rule strategy

Choose the narrowest rule that answers the question:

1. path/directory watch for a specific sensitive object;
2. syscall rule only with architecture, identity/path and success/failure filters as appropriate;
3. stable `-k <key>` so validation and later searches are simple;
4. runtime test first, persistent rule only after event volume and matching behaviour are understood.

Avoid broad syscall rules, recursive high-churn watches and copied compliance packs with no workload review. Large or badly filtered rules can create serious event volume and operational overhead.

## Persistence and rollout

Persistent rules normally live under `/etc/audit/rules.d/*.rules` and are compiled/reloaded through the distro audit tooling. Before editing:

```bash
cp -a /etc/audit/rules.d /etc/audit/rules.d.bak.$(date +%F-%H%M%S)
```

Validate syntax/rule loading with the platform-supported audit rule loader, then generate one benign test event and search by key/time. Confirm the expected event appears and event volume remains reasonable.

Do not set `-e 2` / immutable mode during exploratory rollout. Changing an immutable audit configuration can require reboot/recovery and must be treated as a consequential production change.

## Validation

```bash
auditctl -s
auditctl -l
ausearch -k <key> -ts recent 2>/dev/null | head -160
aureport --auth --summary 2>/dev/null | head -120 || true
```

Verify: service healthy, intended rule loaded, benign marker captured, unrelated noise acceptable, disk/backlog health normal, persistent source matches runtime state.

## Output

Return: audit goal, minimal rule/query strategy, evidence, expected signal, persistent-change risk, rollback, validation, and remaining uncertainty.