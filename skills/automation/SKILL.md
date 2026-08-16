---
name: "automation"
description: "Design safe Linux automation and route script or runbook work to focused chunks while keeping Ansible and other product-specific automation distinct."
argument-hint: "[automation goal / script / runbook / fleet task]"
effort: "high"
allowed-tools: "Read Grep Glob Bash"
---
# automation

Use this skill for repeatable Linux diagnostics, fleet collection, simple remediation automation, script/runbook design, and choosing the right automation mechanism.

## Universal Skill Execution Contract

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Begin read-only, bound fleet evidence, require explicit apply modes for mutations, define rollback before changes, redact secrets, and validate results.

## Baseline evidence

Identify: target hosts/count, OS families, trigger, desired output, privilege needs, existing scheduler/tooling, blast radius, dry-run requirement, rollback path and whether the task is code, documentation or a product-specific automation system.

## Condition -> chunk/specialist

| Proven condition | Load |
|---|---|
| Bash/script creation, review, debugging, hardening or POSIX portability | `chunks/bash-scripting.md` |
| Maintenance procedure, operational runbook, handoff checklist | `chunks/runbooks.md` |
| Ansible playbook/inventory/module/role/rollout issue | `ansible-expert` |
| One command/one-liner only | `command-expert` |
| Cron-specific scheduling/execution | `cron-scheduler-expert` |
| systemd unit/timer semantics | `systemd-expert` |
| Unknown automation design | stay in this parent baseline until the mechanism is clear |

Default to this parent plus one chunk/specialist. Add a second only when evidence proves the workflow crosses layers.

## Automation principles

1. Read-only collection first.
2. Use distro-aware commands and timeouts.
3. Do not fail the whole fleet because one optional tool/host fails.
4. Redact secrets and separate raw evidence from summaries.
5. Make state-changing mode explicit (`--apply`, `--confirm`, check mode, canary/serial rollout).
6. Prefer idempotent/native mechanisms over fragile shell mutation.
7. Include rollback for every mutation.
8. Produce machine-readable output where useful (JSON/CSV plus human summary).

## Scheduler choice

Prefer systemd timers when dependency ordering, journald logging, randomized delay, missed-run handling or status visibility matters. Use cron for simple legacy-compatible schedules. Keep cron-specific failures in `cron-scheduler-expert` and unit/timer semantics in `systemd-expert`.

## Fleet evidence pattern

Use bounded commands, per-host timeouts, failed-host reporting and explicit privilege. Collect only fields needed for the decision; do not dump entire logs/configurations across a fleet.

## Validation

Validate syntax, dry-run/check mode, one-host/canary behaviour, expected output, failure handling, rollback path and only then wider rollout.

## Output

Return mechanism choice, evidence, architecture fit, selected chunk/specialist, safe implementation outline, rollback, validation and token-saving evidence request.