# memory-expert diagnostic method

## Read-only triage

Collect memory summary, `/proc/meminfo`, short `vmstat` samples, top RSS processes, PSI memory pressure when available, kernel OOM messages, and selected VM sysctls.

## Pressure signals

Real pressure usually appears as one or more of:

- Low `MemAvailable`.
- Active swap-in/swap-out.
- OOM killer logs.
- PSI memory stall growth.
- High reclaim or kswapd CPU.
- Application allocation failures.
- cgroup memory events.

High buff/cache alone is not a problem.

## Validation after change

Confirm memory availability, pressure metrics, OOM log absence, service/container memory limits, and application latency.
