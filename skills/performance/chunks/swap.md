# Swap, zram and memory-survival diagnostics

Use this chunk after `performance` baseline evidence points specifically to swap configuration, active swap pressure/thrashing, swap sizing/priorities, zram/zswap, or safe short-term memory-survival mitigation.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`.

## Golden rules

- Do not disable swap blindly.
- Do not run `swapoff -a` on production without proving RAM headroom.
- Swap usage alone is not a problem; sustained `si/so`, PSI and latency matter.
- Swap is a stability tool, not a replacement for chronic RAM under-sizing.
- `vm.swappiness=0` is not a universal performance setting.

## Evidence first

```bash
free -h
swapon --show --bytes
cat /proc/swaps
vmstat 1 5
sar -S 1 5 2>/dev/null || true
cat /proc/pressure/memory 2>/dev/null || true
zramctl 2>/dev/null || true
cat /sys/module/zswap/parameters/enabled 2>/dev/null || true
journalctl -k -p warning..alert --no-pager | grep -Ei 'oom|memory|swap' | tail -80
sysctl vm.swappiness vm.page-cluster vm.overcommit_memory vm.overcommit_ratio vm.overcommit_kbytes 2>/dev/null
```

## Interpretation

- no swap -> reduced survival margin during spikes; not automatically wrong
- swap configured but unused -> normal
- high swap use with low `si/so` -> often cold pages, not an incident
- sustained `si/so` + latency -> active swapping/thrashing
- OOM despite swap -> inspect cgroups, limits, overcommit, hugepages, fragmentation and process RSS
- zram/fast swap -> different swappiness trade-offs than slow disk-backed swap

## Safe swap-file pattern

Before creating swap, verify filesystem/free-space/I/O context:

```bash
df -hT / /var
findmnt -T /swapfile 2>/dev/null || true
```

After approval, a typical pattern is:

```bash
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
swapon --show
```

Persist in `/etc/fstab` only after validation. If filesystem semantics make `fallocate` unsuitable, use an appropriate supported creation method instead of blindly continuing.

## Validation and rollback

Validate `swapon --show`, `free -h`, `vmstat`, PSI and application latency. Before removing or disabling swap, prove enough free/available memory exists; otherwise rollback can itself trigger OOM.
