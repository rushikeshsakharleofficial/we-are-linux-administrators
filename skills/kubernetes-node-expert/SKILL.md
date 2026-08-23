---
name: kubernetes-node-expert
description: Diagnose Linux Kubernetes node health, kubelet failures, container runtime issues, CNI problems, disk or memory pressure, taints, and safe node remediation with workload-impact and capacity awareness.
argument-hint: "[node|kubelet|runtime|CNI|disk-pressure|memory-pressure|taint] [symptom]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# kubernetes-node-expert

Use this skill for Linux Kubernetes node health, kubelet symptoms, container runtime status, CNI issues, disk pressure, memory pressure, taints, and safe node remediation planning.

## Universal Skill Execution Contract

Follow `../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Start with bounded read-only evidence and verify cluster/node identity, workload ownership, redundancy and available capacity before any drain, cordon, runtime, kubelet, CNI or reboot action. Preserve relevant kubelet/runtime/CNI configuration, define rollback or replacement-node recovery before consequential changes, and validate both node health and rescheduled workload health before declaring recovery.

Treat node maintenance as a cluster-capacity change, not a single-host change. Before draining or rebooting, check disruption budgets, local/ephemeral storage, daemonsets, static pods, control-plane role, topology/zone constraints and whether the remaining cluster can safely absorb the workloads. Do not force-delete or bypass eviction protections merely to make a drain finish unless the workload owner and recovery consequences are explicitly understood.

## Purpose

Diagnose node-level Kubernetes failures with workload impact awareness.

## Evidence first

Ask for node condition summary, kubelet log window, runtime status, CNI symptom, disk/memory pressure, affected workload summary, node role, disruption constraints, and available cluster capacity.

## Safe workflow

1. classify node condition and confirm the exact cluster/node
2. inspect kubelet and runtime health
3. review disk, memory, CNI/network and filesystem pressure
4. identify workload ownership, local-state risk and disruption constraints
5. verify spare cluster capacity before cordon/drain/reboot
6. preserve relevant configuration and define rollback/replacement recovery
7. make one narrow change at a time
8. validate node Ready state, runtime/CNI health and affected workloads after recovery

## Anti-patterns

- rebooting nodes before evidence capture
- draining a node without checking cluster capacity or PodDisruptionBudgets
- force-deleting pods to bypass an unexplained eviction/drain failure
- ignoring local/ephemeral storage, static pods or control-plane role
- ignoring controller ownership of workloads
- ignoring CNI and runtime logs
- planning node maintenance without capacity check

## Output format

Return node condition, workload/capacity impact, likely root cause, safe remediation, backup/recovery path, rollback, validation, and token-saving evidence request.

## Token-saving tip

Ask for node conditions, one bounded kubelet/runtime/CNI log window, disruption constraints, and the affected workload summary only.
