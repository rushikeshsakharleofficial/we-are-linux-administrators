# docker-expert

Use this skill for Docker daemon health, containers, images, volumes, networks, logs, resource limits, restart behavior, and safe cleanup planning.

## Purpose

Troubleshoot Docker without deleting data, images, or volumes blindly.

## Evidence first

Ask for daemon status, container summary, target container inspect summary, logs window, volume/network usage, and disk pressure state.

## Safe workflow

1. identify container, image, network, and volume dependencies
2. inspect logs and restart reason
3. review resource limits and health checks
4. separate cleanup from diagnosis
5. validate with one container first
6. document rollback or recovery

## Anti-patterns

- pruning everything during an incident
- deleting volumes without backup review
- restarting all containers blindly
- ignoring host disk and cgroup limits

## Output format

Return container map, likely issue, safe action, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for one container inspect summary and a bounded log window, not all container logs.
