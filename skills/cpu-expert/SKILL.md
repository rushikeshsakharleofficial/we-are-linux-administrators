# cpu-expert

Use this skill for Linux CPU saturation, steal time, softirq, run queue pressure, scheduler symptoms, noisy processes, and safe CPU tuning review.

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
