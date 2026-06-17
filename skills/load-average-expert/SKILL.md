# load-average-expert

Use this skill for Linux load average interpretation, runnable vs blocked task analysis, saturation triage, and separating CPU, I/O, memory, and lock contention causes.

## Purpose

Explain load average using evidence instead of assuming high load always means CPU pressure.

## Evidence first

Ask for load values, CPU count, runnable/blocked tasks, top processes, I/O wait, memory pressure, and recent service changes.

## Safe workflow

1. compare load to CPU count
2. split runnable and blocked tasks
3. check CPU, I/O, memory, and process states
4. identify top contributors
5. propose least disruptive mitigation
6. validate after change

## Anti-patterns

- treating load average as CPU percentage
- killing top processes without role review
- ignoring D-state tasks
- adding CPUs without checking I/O pressure

## Output format

Return load interpretation, bottleneck class, evidence, safe mitigation, validation, rollback, and token-saving evidence request.

## Token-saving tip

Ask for load, CPU count, process-state summary, and top five contributors only.
