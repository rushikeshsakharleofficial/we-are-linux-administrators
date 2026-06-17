# podman-expert

Use this skill for Podman rootless/rootful containers, pods, volumes, networks, systemd integration, quadlet files, image issues, and safe cleanup planning.

## Purpose

Troubleshoot Podman while respecting rootless permissions, cgroups, SELinux labels, and systemd-managed containers.

## Evidence first

Ask for rootless/rootful mode, container/pod summary, systemd/quadlet context, logs window, volume labels, and network mode.

## Safe workflow

1. identify rootless/rootful context
2. map container to systemd or user service if present
3. inspect logs and restart reason
4. review storage and SELinux labeling
5. validate one container or pod first
6. document rollback

## Anti-patterns

- mixing Docker assumptions with Podman rootless behavior
- pruning storage blindly
- ignoring SELinux volume labels
- editing generated units instead of source quadlet files

## Output format

Return runtime context, likely issue, safe action, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for one inspect summary, one service/quadlet file, and bounded logs only.
