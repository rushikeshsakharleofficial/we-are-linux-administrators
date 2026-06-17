#!/usr/bin/env python3
"""Read-only memory expert audit helper for linux-admin."""
from __future__ import annotations

import json
import os
import subprocess

CMDS = {
    "free_h": ["free", "-h"],
    "vmstat": ["sh", "-lc", "vmstat 1 3"],
    "top_rss": ["sh", "-lc", "ps -eo pid,ppid,user,comm,%mem,rss,vsz --sort=-rss | head -40"],
    "psi_memory": ["sh", "-lc", "cat /proc/pressure/memory 2>/dev/null || true"],
    "kernel_oom_tail": ["sh", "-lc", "dmesg -T 2>/dev/null | grep -Ei 'oom|out of memory|killed process|page allocation' | tail -80 || true"],
    "sysctl_vm_mem": ["sh", "-lc", "sysctl vm.overcommit_memory vm.overcommit_ratio vm.overcommit_kbytes vm.swappiness vm.vfs_cache_pressure vm.dirty_ratio vm.dirty_background_ratio vm.max_map_count 2>/dev/null || true"],
}


def run(cmd: list[str]) -> dict:
    try:
        p = subprocess.run(cmd, text=True, capture_output=True, timeout=8)
        return {"rc": p.returncode, "stdout": p.stdout[-8000:], "stderr": p.stderr[-2000:]}
    except Exception as exc:
        return {"rc": -1, "error": str(exc)}


def main() -> None:
    out = {"tool": "memory-expert-audit", "note": "read-only memory pressure audit"}
    for key, cmd in CMDS.items():
        out[key] = run(cmd)

    if os.path.exists("/proc/meminfo"):
        selected = {}
        wanted = {
            "MemTotal", "MemFree", "MemAvailable", "Buffers", "Cached", "SwapCached",
            "Active", "Inactive", "Dirty", "Writeback", "AnonPages", "Mapped", "Shmem",
            "Slab", "SReclaimable", "SUnreclaim", "KernelStack", "PageTables",
            "Committed_AS", "CommitLimit", "SwapTotal", "SwapFree"
        }
        with open("/proc/meminfo", encoding="utf-8", errors="ignore") as fh:
            for line in fh:
                key, value = line.split(":", 1)
                if key in wanted:
                    selected[key] = value.strip()
        out["meminfo_selected"] = selected

    print(json.dumps(out, indent=2))


if __name__ == "__main__":
    main()
