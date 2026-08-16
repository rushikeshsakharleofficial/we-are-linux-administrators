# NFS

Use this chunk only after `storage` proves the problem is NFS-specific: exports, client mounts, UID/GID identity, root squash, stale handles, locking, version negotiation, or NFS performance/reliability.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Begin read-only, avoid widening exports to bypass permissions, preserve a rollback path for export/mount changes, and validate with one narrow client before broader rollout.

## Evidence

```bash
nfsstat -m 2>/dev/null || true
mount -t nfs,nfs4 2>/dev/null || true
findmnt -t nfs,nfs4 -o TARGET,SOURCE,FSTYPE,OPTIONS 2>/dev/null || true
exportfs -v 2>/dev/null || true
showmount -e 127.0.0.1 2>/dev/null || true
rpcinfo -p 127.0.0.1 2>/dev/null | head -80 || true
systemctl --no-pager --full status nfs-server nfs-client.target 2>/dev/null | head -100 || true
journalctl -u nfs-server -n 80 --no-pager 2>/dev/null || true
```

Also collect one export line, one client mount line, path ownership/mode/ACL, effective UID/GID for the failing user, NFS version, and one exact client error.

## Diagnose by layer

1. **Reachability/version** — prove DNS/IP reachability and NFS version support before changing exports.
2. **Export policy** — compare the exact exported path, client selector and options. Do not replace a narrow client/network with `*` just to make the error disappear.
3. **Identity** — compare numeric UID/GID across client/server and understand NFSv4 idmapping when used.
4. **Filesystem access** — validate server-side POSIX mode/ACL/MAC policy; NFS cannot grant access the backing filesystem denies.
5. **Root squash** — treat `root_squash` as a security control. Do not disable it casually to fix ownership symptoms.
6. **Stale handle** — confirm whether the exported inode/path was replaced, filesystem remounted, snapshot switched, or server-side object recreated before remounting clients.
7. **Locking/state** — separate NFSv3 lock-manager issues from NFSv4 stateful locking and recovery behaviour.
8. **Performance** — compare RTT, retransmits, mount options, server storage latency and workload pattern before tuning rsize/wsize, concurrency or timeouts.

## Safe change pattern

- Back up `/etc/exports` and any systemd mount/automount units before edits.
- Validate exports with `exportfs -ra` only after reviewing the exact diff; prefer `exportfs -v` immediately after.
- For client changes, test one temporary/manual mount or one non-critical client before editing fleet-wide persistence.
- Preserve root squash and least-privilege client scoping unless a documented requirement proves otherwise.
- If the issue is actually routing/firewall/DNS, return to the matching network specialist instead of forcing NFS changes.

## Validation

```bash
exportfs -v 2>/dev/null || true
findmnt -t nfs,nfs4 -o TARGET,SOURCE,FSTYPE,OPTIONS 2>/dev/null || true
nfsstat -m 2>/dev/null || true
```

Then validate read/write/rename/delete only with the intended identity and path, confirm ownership on the server, and check logs for new NFS/RPC errors.

## Escalate

Escalate when multiple clients lose state simultaneously, NFSv4 recovery/grace behaviour is unclear, Kerberos-secured NFS is involved, the backing filesystem is unhealthy, or a production remount/export reload could interrupt a large client fleet.