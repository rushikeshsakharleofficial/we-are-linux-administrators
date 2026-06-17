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
