# patching-expert

Use this skill for Linux patch planning, package update risk review, kernel update coordination, reboot planning, maintenance windows, and rollback strategy.

## Purpose

Patch systems safely with dependency, reboot, service, and rollback awareness.

## Evidence first

Ask for OS/distro, package manager, pending updates summary, critical services, reboot tolerance, backup status, and maintenance window.

## Safe workflow

1. classify security vs routine patching
2. review package and kernel impact
3. confirm backups and rollback path
4. patch canary first when possible
5. validate services after patching
6. record results and exceptions

## Anti-patterns

- patching all hosts at once without canary
- ignoring kernel reboot requirements
- mixing package cleanup with patching
- patching without backup or snapshot awareness

## Output format

Return patch scope, risk level, rollout plan, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for pending update summary and critical service list instead of full package database output.
