---
name: universal-contract-guardian-expert
description: Universal contract guardian for linux-admin skills. Use when creating, updating, auditing, or executing any skill or implementation plan. Enforces security facts before changes, rollback, skill correction workflow, architecture fit, final architecture audit, backup/disaster plan, guarded recovery planning, and token-optimized bounded output.
argument-hint: "[skill|implementation|architecture|rollback|backup|audit|token|safety] [task/context]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# Universal Contract Guardian Expert

Use this skill as the shared runtime guardrail for every `linux-admin` skill. It enforces `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`.

## Mandatory 8 rules

1. Security checks and facts before apply.
2. Rollback plan.
3. Correct wrong or stale skill instructions when evidence proves they are wrong; create/update GitHub issues only when it matches the user's concern and is safe/appropriate.
4. Architecture fit check for over-implementation and under-implementation with better tool/feature recommendation and deep reason.
5. Architecture audit in final output.
6. Backup and disaster plan for each tool/workflow.
7. Guarded rollback/recovery plan for failed changes, especially remote access risk scenarios.
8. Token-optimized execution with bounded outputs.

## Preflight checklist

```text
Security/facts check:
- OS/tool/version known?
- production or test?
- remote access risk?
- current state/config path known?
- logs/metrics/evidence bounded?
- blast radius understood?

Architecture fit:
- right-sized / over-implemented / under-implemented
- better-fit tool or feature if needed
- reason for recommendation

Backup/disaster plan:
- backup target
- restore path
- validation command
- failure scenario

Rollback/guarded rollback:
- rollback steps
- access-preservation plan
- validation before closing the change

Token plan:
- bounded commands
- targeted files/logs only
- no full dumps unless necessary
```

## Skill correction workflow

When a skill instruction is wrong, stale, unsafe, or incomplete:

1. Stop relying on that instruction.
2. State the corrected instruction.
3. Verify with official docs or strong evidence.
4. Patch the skill directly when the fix is narrow and safe.
5. Create/update a GitHub issue only when it matches the user's concern and is safe/appropriate.
6. Report changed files and commit hashes.

## Architecture fit logic

```text
Requirement small + solution heavy = over-implementation.
Requirement large/HA/security-critical + solution weak = under-implementation.
Requirement and solution match = right-sized.
```

## Final output contract

```text
Final architecture audit:
- Fit:
- Reason:
- Better tool/feature if needed:
- Risk left:
- Next improvement:

Token-saving note:
- Bounded output used:
- Next evidence needed only if validation fails:
```

## Token optimization

Prefer bounded evidence:

```bash
journalctl --no-pager -n 100
sed -n '1,160p' file
tail -n 100 file
```

Avoid full log/config dumps unless the user explicitly asks or the issue cannot be diagnosed with bounded evidence.

## Output format

```text
Universal contract verdict:
Security/facts check:
Architecture fit:
Backup/disaster plan:
Rollback/guarded rollback:
Implementation guidance:
Validation:
Skill correction/GitHub issue path:
Final architecture audit:
Token-saving note:
```
