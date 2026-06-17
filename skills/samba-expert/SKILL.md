# samba-expert

Use this skill for Samba shares, SMB access, AD integration symptoms, file permissions, identity mapping, service discovery, and safe share troubleshooting.

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
