---
name: "containers"
description: "Troubleshoot Docker and Podman containers, restart loops, logs, inspect output, rootless Podman, bind mounts, ports, cgroups, and runtime storage errors."
argument-hint: "[container/runtime symptom]"
effort: "high"
allowed-tools: "Read Grep Glob Bash"
---
# containers skill

Use this plugin skill for: $ARGUMENTS

Important: begin read-only; require explicit confirmation before disruptive/destructive changes; include validation and rollback.

Supporting docs are available under `${CLAUDE_SKILL_DIR}/../../docs/`.

# Task: Docker, Podman, Containers

## When to use

Use for container exit, restart loops, image/entrypoint error, bind mount permission, port mapping, rootless Podman, Docker daemon issue, container network issue.

## Mental model

Classify the failure:

1. Container process exits.
2. Image/entrypoint/config error.
3. Bind mount/file permission/MAC issue.
4. Port/listener/network mapping issue.
5. Runtime/daemon/storage driver issue.
6. Rootless namespace/subuid/subgid issue.
7. Cgroup/resource limit issue.

## Read-only first commands

Docker:

```bash
docker ps -a
docker logs --tail 200 <container>
docker inspect <container>
docker port <container> 2>/dev/null || true
docker stats --no-stream 2>/dev/null || true
systemctl status docker --no-pager 2>/dev/null || true
journalctl -u docker -b --no-pager -n 200 2>/dev/null || true
```

Podman:

```bash
podman ps -a
podman logs <container>
podman inspect <container>
podman port <container> 2>/dev/null || true
podman info 2>/dev/null || true
grep "^$(id -un):" /etc/subuid /etc/subgid 2>/dev/null || true
journalctl --user -u podman* --no-pager -n 200 2>/dev/null || true
```

Host checks:

```bash
ss -lntup
getenforce 2>/dev/null || true
aa-status 2>/dev/null || true
journalctl -k -g 'AVC|apparmor|DENIED|overlay|cgroup|container' --no-pager 2>/dev/null | tail -100 || true
```

## Branch interpretation

| Signal | Meaning | Next action |
|---|---|---|
| exit code nonzero with app logs | application failure | inspect config/env/entrypoint |
| `permission denied` on bind mount | DAC/MAC/namespace issue | use permissions task |
| rootless Podman subuid/subgid missing | namespace mapping issue | add ranges after confirmation |
| host port already bound | port conflict | change mapping or stop conflicting service with confirmation |
| container listens internally but host not | port publish/network mode issue | inspect `Ports`, network settings |
| daemon storage errors | runtime storage driver issue | backup and runtime-specific remediation |

## Safe remediation patterns

### Recreate container

Do not delete volumes blindly. Preserve inspect output first:

```bash
docker inspect <container> > <container>-inspect.json
podman inspect <container> > <container>-inspect.json
```

Then propose exact recreate command or Compose change.

### Rootless Podman subuid/subgid

After confirmation:

```bash
usermod --add-subuids 100000-165535 --add-subgids 100000-165535 <user>
```

User may need logout/login or `podman system migrate` depending on state.

## Validation

```bash
docker ps --filter name=<container>
docker logs --tail 50 <container>
# or
podman ps --filter name=<container>
podman logs --tail 50 <container>
ss -lntup | grep <port>
curl -v http://127.0.0.1:<port>/ 2>&1 | head -60
```

## Prevention

- Store compose/systemd container definitions in Git.
- Pin image versions for production.
- Healthchecks.
- Explicit resource limits.
- Log rotation.
- Volume backup policy.

## Docker daemon depth

```bash
docker system df
docker network ls
docker volume ls
docker image ls --digests
docker events --since 1h 2>/dev/null | tail -50 || true
```

Anti-patterns: pruning everything during an incident, deleting volumes without backup review, restarting all containers blindly, ignoring host disk and cgroup limits.

## Podman depth (rootless/rootful/quadlet)

Rootless Podman differs from Docker: no daemon, uses user namespaces, cgroups v2, and SELinux labels on volumes.

```bash
podman system info
podman pod list
podman volume inspect <vol>
ls ~/.config/containers/systemd/ 2>/dev/null || true   # quadlet files
systemctl --user list-units 'podman*' 2>/dev/null || true
```

- Quadlet: edit source `.container`/`.pod` files, not the generated unit. Regenerate with `systemctl --user daemon-reload`.
- SELinux volume labels: use `:z` (shared) or `:Z` (private) mount options.
- Rootless storage: `~/.local/share/containers/`; check `podman system migrate` after uid/gid changes.

Anti-patterns: mixing Docker socket assumptions with rootless Podman, pruning storage blindly, ignoring SELinux volume labels, editing generated units instead of source quadlet files.
