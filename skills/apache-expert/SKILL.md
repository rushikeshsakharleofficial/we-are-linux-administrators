---
name: apache-expert
description: Safe Apache HTTPD diagnostics and change planning for virtual hosts, modules, MPM behaviour, proxying, TLS, access control, logs, reloads, rollback, and bounded production troubleshooting.
---

# apache-expert

Use this skill for Apache HTTPD virtual hosts, modules, MPM behavior, proxying, TLS, access control, log review, and safe reload troubleshooting.

## Universal Skill Execution Contract

Follow `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md` for security facts before changes, rollback planning, architecture fit, backup/disaster planning, guarded recovery for risky remote changes, validation, and token-bounded output.

## Purpose

Diagnose Apache behavior with minimal vhost/module scope and safe config validation.

## Evidence first

Ask for relevant vhost block, enabled modules, config-test output, error-log snippet, MPM type, and expected hostname/path.

## Safe workflow

1. identify selected vhost
2. validate syntax before reload
3. map modules and MPM impact
4. isolate one location or proxy path
5. reload safely with rollback config
6. validate logs and response

## Anti-patterns

- enabling modules blindly
- editing global config for one vhost
- reloading without config test
- exposing server-status publicly

## Output format

Return vhost map, likely issue, minimal fix, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for one vhost, module list, config-test output, and short error-log window only.
