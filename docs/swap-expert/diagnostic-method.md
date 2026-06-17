# swap-expert diagnostic method

## Read-only triage

Collect memory summary, active swap devices, `/proc/swaps`, `/proc/meminfo`, short `vmstat` samples, current VM sysctls, and recent kernel memory/OOM messages.

## Interpretation

- Swap configured but unused is normal.
- Swap used with no active swap-in/swap-out is not automatically an incident.
- Active swap-in/out plus latency usually means memory pressure or thrashing.
- `swapoff` can trigger OOM if RAM cannot absorb swapped pages.
- zram or fast swap and slow disk swap need different swappiness thinking.

## Validation after change

Confirm active swap, free/available memory, swap-in/swap-out rate, fstab persistence, and systemd swap unit state.
