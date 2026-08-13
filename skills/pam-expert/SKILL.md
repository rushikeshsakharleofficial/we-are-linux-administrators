---
name: "pam-expert"
description: "Review and troubleshoot Linux PAM authentication, account, password, and session stacks. Use for PAM service files, control flags, lockout policies, sudo/SSH integration, authentication failures, session-module problems, and safe PAM rollout or rollback planning."
---
# pam-expert

Use this skill for Linux PAM stack review, authentication flow debugging, account/session module behavior, lockout policies, sudo/ssh integration, and safe PAM rollout.

## Purpose

Debug authentication and session policy without locking out users.

## Universal Skill Execution Contract

Follow `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md` for security/facts checks, architecture fit, backup/disaster planning, guarded rollback, validation, and token-bounded output. For PAM changes that can affect login or privilege access, keep break-glass or out-of-band access available and define rollback before editing the active stack.

## Evidence first

Ask for service name, affected user/group, exact PAM stack snippets, auth log window, recent changes, and available break-glass access.

## Safe workflow

1. identify PAM service file
2. map auth, account, password, and session phases
3. review control flags carefully
4. test with a non-critical account first
5. keep a rollback session open
6. validate logs after change

## Anti-patterns

- editing common PAM includes without understanding all consumers
- changing auth and account rules together
- removing recovery access
- ignoring module order and control flags

## Output format

Return affected stack, failure phase, safe change plan, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for only the target PAM service file and relevant auth log lines, not all PAM configs.
