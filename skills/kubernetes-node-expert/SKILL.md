# kubernetes-node-expert

Use this skill for Linux Kubernetes node health, kubelet symptoms, container runtime status, CNI issues, disk pressure, memory pressure, taints, and safe node remediation planning.

## Purpose

Diagnose node-level Kubernetes failures with workload impact awareness.

## Evidence first

Ask for node condition summary, kubelet log window, runtime status, CNI symptom, disk/memory pressure, and affected workload summary.

## Safe workflow

1. classify node condition
2. inspect kubelet and runtime health
3. review disk, memory, and network pressure
4. identify workload impact
5. plan maintenance actions with capacity review
6. validate node recovery

## Anti-patterns

- rebooting nodes before evidence capture
- ignoring controller ownership of workloads
- ignoring CNI and runtime logs
- planning node maintenance without capacity check

## Output format

Return node condition, likely root cause, safe remediation, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for node conditions, kubelet short log window, and affected workload summary only.
