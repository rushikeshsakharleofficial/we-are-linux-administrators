---
name: cpu-expert
description: Diagnoses Linux CPU saturation, steal time, softirq pressure, run-queue contention, scheduler symptoms, noisy processes, and safe CPU tuning decisions. Use for high CPU, load averages, CPU bottlenecks, steal time, softirq spikes, thread pressure, or CPU capacity troubleshooting.
argument-hint: "[high CPU, load, steal time, softirq, run queue, or scheduler symptom]"
effort: medium
allowed-tools: "Read Grep Glob Bash"
---

# cpu-expert

Use this skill for Linux CPU saturation, steal time, softirq, run queue pressure, scheduler symptoms, noisy processes, and safe CPU tuning review.

## Universal Skill Execution Contract

Follow [`../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`](../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md) for security/facts checks, architecture fit, backup/disaster planning, rollback or guarded recovery, validation, and token-bounded output.

## Purpose

Identify CPU pressure type before recommending tuning or scaling.

## Evidence first

Ask for CPU count, utilization split, top process/thread summary, load context, steal time, softirq, and service impact.

## Safe workflow

1. classify user/system/iowait/steal/softirq pressure
2. map top processes and threads
3. compare load to CPU count
4. correlate with service latency
5. choose mitigation before tuning
6. validate after change

## Anti-patterns

- assuming high CPU is always bad
- tuning scheduler knobs before process evidence
- ignoring steal time on virtual machines
- killing processes without service context

## Output format

Return CPU pressure type, top contributors, risk level, safe mitigation, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for CPU summary and top thread/process lines, not full top output.
