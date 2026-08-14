---
name: "samba-expert"
description: "Samba and SMB specialist for share access, authentication, AD integration symptoms, identity mapping, filesystem permissions, service discovery, and rollback-aware troubleshooting."
argument-hint: "[share/client/auth/permission symptom]"
effort: "high"
allowed-tools: "Read Grep Glob Bash"
---

# samba-expert

Use this skill for Samba shares, SMB access, AD integration symptoms, file permissions, identity mapping, service discovery, and safe share troubleshooting.

## Universal Skill Execution Contract

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Start with bounded read-only evidence, verify security and access facts before changes, define backup/rollback before state-changing work, check architecture fit, validate the result, and keep output token-bounded.

## Purpose

Fix SMB access with clear separation between Samba config, filesystem permissions, identity mapping, and client behavior.

## Evidence first

Ask for share stanza, path permissions, user/group mapping, client error, Samba version, and auth mode.

## Safe workflow

1. identify share and path
2. validate config syntax
3. map Samba access to filesystem access
4. confirm identity mapping
5. test with one user and one client
6. document rollback

## Anti-patterns

- making shares guest writable to bypass auth
- changing global config for one share
- ignoring SELinux/AppArmor and filesystem ACLs
- exposing broad shares without access review

## Output format

Return share map, identity flow, likely issue, safe fix, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for one share stanza, path permissions, and one client error only.
