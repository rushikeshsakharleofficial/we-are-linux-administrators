---
name: process-expert
description: Diagnose Linux process states, stuck or zombie processes, signals, open files, parent-child trees, service relationships, and safe process intervention. Use when investigating hung processes, unexpected process behaviour, kill or restart decisions, or process ownership and lifecycle issues.
---

# process-expert

Use this skill for Linux process inspection, stuck processes, zombie states, signal behavior, open files, parent/child trees, and safe process intervention.

## Universal Skill Execution Contract

Follow [`../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`](../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md) before recommending or applying changes. Collect bounded facts first, plan rollback or recovery before intervention, prefer graceful actions over forceful ones, and keep output token-bounded.

## Purpose

Understand process state before killing or restarting services.

## Evidence first

Ask for process tree, PID, state, owner, command line, open-file/socket summary, and service relationship.

## Safe workflow

1. identify process ownership and parent
2. classify state and resource use
3. map to systemd service or job
4. inspect open files and sockets when relevant
5. choose graceful action before forceful action
6. document rollback or recovery

## Anti-patterns

- killing by broad pattern without review
- ignoring parent process and service manager
- treating zombie processes as killable targets
- restarting before evidence capture

## Output format

Return process map, risk level, safe action, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for one process tree and one PID detail, not full process listings.
