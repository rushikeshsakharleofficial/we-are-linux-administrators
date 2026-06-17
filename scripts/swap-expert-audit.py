#!/usr/bin/env python3
"""Read-only swap expert audit helper for linux-admin."""
from __future__ import annotations

import json
import os
import subprocess

CMDS = {
    "free_h": ["free", "-h"],
    "swapon_show": ["swapon", "--show", "--bytes"],
    "proc_swaps": ["cat", "/proc/swaps"],
    "vmstat": ["sh", "-lc", "vmstat 1 3"],
    "sysctl_vm_swap": ["sh", "-lc", "sysctl vm.swappiness vm.page-cluster vm.overcommit_memory vm.overcommit_ratio vm.overcommit_kbytes 2>/dev/null || true"],
    "systemd_swap": ["sh", "-lc", "systemctl list-units --type=swap --all --no-pager 2>/dev/null || true"],
    "zram_zswap": ["sh", "-lc", "zramctl 2>/dev/null || true; cat /sys/module/zswap/parameters/enabled 2>/dev/null || true"],
}


def run(cmd: list[str]) -> dict:
    try:
        p = subprocess.run(cmd, text=True, capture_output=True, timeout=8)
        return {"rc": p.returncode, "stdout": p.stdout[-6000:], "stderr": p.stderr[-2000:]}
    except Exception as exc:
        return {"rc": -1, "error": str(exc)}


def main() -> None:
    out = {"tool": "swap-expert-audit", "note": "read-only swap audit"}
    for key, cmd in CMDS.items():
        out[key] = run(cmd)

    if os.path.exists("/proc/meminfo"):
        selected = {}
        wanted = {"MemTotal", "MemAvailable", "SwapTotal", "SwapFree", "SwapCached", "Dirty", "Writeback"}
        with open("/proc/meminfo", encoding="utf-8", errors="ignore") as fh:
            for line in fh:
                key, value = line.split(":", 1)
                if key in wanted:
                    selected[key] = value.strip()
        out["meminfo_selected"] = selected

    print(json.dumps(out, indent=2))


if __name__ == "__main__":
    main()
