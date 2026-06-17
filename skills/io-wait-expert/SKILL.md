# io-wait-expert

Use this skill for Linux I/O wait, disk latency, blocked tasks, queue depth, filesystem pressure, storage backend symptoms, and safe mitigation planning.

## Purpose

Separate storage latency from CPU saturation and identify the safest mitigation path.

## Evidence first

Ask for iowait summary, device latency, filesystem/mount point, top I/O processes, blocked tasks, and recent storage changes.

## Safe workflow

1. identify affected device and mount
2. review latency and utilization
3. map processes to I/O path
4. check filesystem and free space
5. correlate with application symptoms
6. propose safe mitigation and validation

## Anti-patterns

- assuming high load is CPU pressure
- restarting apps before checking storage latency
- ignoring failing disks or SAN path issues
- running heavy diagnostics on a saturated disk

## Output format

Return I/O bottleneck summary, affected device, top contributors, safe mitigation, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for device latency summary, blocked task count, and top I/O processes only.
