#!/usr/bin/env python3
"""Read-only sysctl audit helper for linux-admin plugin.

It inventories current sysctl values/config files and flags common risky patterns.
It does not change the system.
"""
from __future__ import annotations
import argparse, json, os, re, subprocess, sys
from pathlib import Path
from typing import Dict, List, Tuple

CONFIG_PATHS = [
    "/etc/sysctl.conf",
    "/etc/sysctl.d",
    "/run/sysctl.d",
    "/usr/local/lib/sysctl.d",
    "/usr/lib/sysctl.d",
    "/lib/sysctl.d",
]

RISK_RULES = [
    ("vm.drop_caches", lambda v: True, "info", "drop_caches is for testing/debugging only; do not use as ongoing tuning or cron."),
    ("net.ipv4.tcp_abort_on_overflow", lambda v: v == "1", "high", "Can reset clients when accept queue overflows; tune app backlog/accept rate first."),
    ("net.ipv4.tcp_tw_reuse", lambda v: v == "1", "medium", "Global TIME_WAIT reuse should not be enabled without expert review and evidence."),
    ("net.ipv4.tcp_syncookies", lambda v: v == "0", "high", "Disables SYN flood fallback; usually keep enabled."),
    ("net.ipv4.ip_forward", lambda v: v == "1", "info", "Host is routing IPv4; confirm firewall/NAT/rp_filter/redirect policy."),
    ("kernel.sysrq", lambda v: v not in ("0",), "medium", "Magic SysRq enabled; ensure this is intentional for recovery/debug workflows."),
    ("kernel.dmesg_restrict", lambda v: v == "0", "medium", "Unprivileged users may read kernel logs; consider 1 on production."),
    ("kernel.kptr_restrict", lambda v: v == "0", "medium", "Kernel pointer exposure restrictions are weak; consider 1 or 2 if compatible."),
    ("fs.protected_hardlinks", lambda v: v == "0", "medium", "Hardlink protection disabled; consider 1."),
    ("fs.protected_symlinks", lambda v: v == "0", "medium", "Symlink protection disabled; consider 1."),
    ("fs.protected_fifos", lambda v: v == "0", "medium", "FIFO protection disabled; consider 1 or 2 if compatible."),
    ("fs.protected_regular", lambda v: v == "0", "medium", "Regular-file sticky-dir protection disabled; consider 1 or 2 if compatible."),
    ("vm.vfs_cache_pressure", lambda v: v == "0", "high", "vfs_cache_pressure=0 can prevent dentry/inode reclaim and risk OOM."),
    ("vm.swappiness", lambda v: v == "0", "info", "swappiness=0 is not universally best; validate memory pressure behavior."),
    ("vm.overcommit_memory", lambda v: v in ("1", "2"), "info", "Non-default overcommit policy must match application memory behavior and reserves."),
    ("net.core.rmem_default", lambda v: int_or_none(v) is not None and int(v) > 4*1024*1024, "medium", "Very large default receive buffers can multiply memory use across many sockets."),
    ("net.core.wmem_default", lambda v: int_or_none(v) is not None and int(v) > 4*1024*1024, "medium", "Very large default send buffers can multiply memory use across many sockets."),
]

def int_or_none(s: str):
    try:
        return int(str(s).split()[0])
    except Exception:
        return None

def run(cmd: List[str]) -> Tuple[int, str, str]:
    try:
        p = subprocess.run(cmd, text=True, capture_output=True, timeout=30)
        return p.returncode, p.stdout, p.stderr
    except Exception as e:
        return 1, "", str(e)

def parse_sysctl_a() -> Dict[str, str]:
    rc, out, err = run(["sysctl", "-a"])
    vals = {}
    for line in out.splitlines():
        if " = " in line:
            k, v = line.split(" = ", 1)
            vals[k.strip()] = v.strip()
        elif "=" in line:
            k, v = line.split("=", 1)
            vals[k.strip()] = v.strip()
    return vals

def collect_configs() -> List[dict]:
    entries = []
    for base in CONFIG_PATHS:
        p = Path(base)
        if not p.exists():
            continue
        files = [p] if p.is_file() else sorted(p.glob("*.conf"))
        for f in files:
            try:
                for num, line in enumerate(f.read_text(errors="ignore").splitlines(), 1):
                    s = line.strip()
                    if not s or s.startswith(("#", ";")) or "=" not in s:
                        continue
                    optional = s.startswith("-")
                    if optional:
                        s = s[1:].lstrip()
                    key, val = s.split("=", 1)
                    entries.append({"file": str(f), "line": num, "key": key.strip(), "value": val.strip(), "optional": optional})
            except Exception as e:
                entries.append({"file": str(f), "error": str(e)})
    return entries

def namespace_counts(vals: Dict[str, str]) -> Dict[str, int]:
    counts = {}
    for k in vals:
        parts = k.split(".")
        ns = parts[0]
        if ns == "net" and len(parts) >= 2:
            ns = ".".join(parts[:2])
        counts[ns] = counts.get(ns, 0) + 1
    return dict(sorted(counts.items()))

def findings(vals: Dict[str, str], configs: List[dict]) -> List[dict]:
    out = []
    for key, pred, sev, msg in RISK_RULES:
        if key in vals and pred(vals[key]):
            out.append({"severity": sev, "parameter": key, "current": vals[key], "finding": msg})
    configured = {e.get("key"): e for e in configs if e.get("key")}
    for key in ("vm.drop_caches", "net.ipv4.tcp_tw_reuse", "net.ipv4.tcp_abort_on_overflow"):
        if key in configured:
            e = configured[key]
            out.append({"severity": "high", "parameter": key, "current": vals.get(key, "unknown"), "finding": f"Risky key is persisted in {e.get('file')}:{e.get('line')}. Re-evaluate necessity."})
    return out

def main() -> int:
    ap = argparse.ArgumentParser(description="Read-only sysctl audit helper")
    ap.add_argument("--json", action="store_true", help="print JSON only")
    args = ap.parse_args()
    vals = parse_sysctl_a()
    configs = collect_configs()
    rc, uname, _ = run(["uname", "-a"])
    os_release = Path("/etc/os-release").read_text(errors="ignore") if Path("/etc/os-release").exists() else ""
    report = {
        "tool": "sysctl-expert-audit",
        "mode": "read-only",
        "uname": uname.strip(),
        "os_release": os_release.strip(),
        "parameter_count": len(vals),
        "namespace_counts": namespace_counts(vals),
        "config_entries": configs,
        "findings": findings(vals, configs),
    }
    if args.json:
        print(json.dumps(report, indent=2, sort_keys=True))
    else:
        print("sysctl-expert-audit: read-only report")
        print(f"kernel: {report['uname']}")
        print(f"parameters discovered: {report['parameter_count']}")
        print("namespace counts:")
        for k, v in report["namespace_counts"].items():
            print(f"  {k}: {v}")
        print("findings:")
        if not report["findings"]:
            print("  none from built-in risk rules")
        for f in report["findings"]:
            print(f"  [{f['severity']}] {f['parameter']}={f.get('current','')}: {f['finding']}")
        print("\nUse --json for full config-entry details.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
