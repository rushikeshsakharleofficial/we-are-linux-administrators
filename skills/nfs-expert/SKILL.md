---
name: nfs-expert
description: Diagnose and operate Linux NFS safely for exports, mounts, permissions, UID/GID mapping, stale file handles, locking, version mismatches, and performance symptoms. Use when troubleshooting NFS server or client access, export policy, mount failures, identity mapping, or reliability issues.
argument-hint: "[server|client|export|mount|path|error]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# nfs-expert

Use this skill for NFS exports, mounts, permissions, UID/GID mapping, stale handles, performance symptoms, locking, and safe server/client troubleshooting.

## Purpose

Resolve NFS access and reliability issues without widening exports blindly.

## Evidence first

Ask for export line, client mount options, path permissions, UID/GID mapping, NFS version, and one relevant error snippet.

## Safe workflow

1. confirm server export and client mount path
2. verify name resolution and network reachability
3. map UID/GID and permission model
4. check version and mount options
5. test with a narrow client first
6. document rollback

## Anti-patterns

- using world-writable exports to bypass permission issues
- changing server and client options together
- ignoring root squash behavior
- dumping full exports when one path matters

## Output format

Return export map, client behavior, likely cause, safe fix, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for one export, one mount line, and one permission sample.

## Universal Skill Execution Contract

Follow [`docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`](../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md) for security facts before changes, architecture fit, backup/disaster planning, rollback, validation, and token-bounded output.