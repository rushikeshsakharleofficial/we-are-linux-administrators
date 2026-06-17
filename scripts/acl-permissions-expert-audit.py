#!/usr/bin/env python3
"""Read-only ACL audit helper. Optionally pass paths."""

from __future__ import annotations
import json, shutil, subprocess, sys, os
from pathlib import Path

def run(cmd, timeout=8):
    if shutil.which(cmd[0]) is None:
        return {"cmd": cmd, "rc": None, "stdout": "", "stderr": f"{cmd[0]} not found"}
    try:
        p = subprocess.run(cmd, text=True, capture_output=True, timeout=timeout)
        return {"cmd": cmd, "rc": p.returncode, "stdout": p.stdout[-20000:], "stderr": p.stderr[-5000:]}
    except Exception as e:
        return {"cmd": cmd, "rc": None, "stdout": "", "stderr": str(e)}

def sh(script, timeout=8):
    return run(['bash','-lc',script], timeout)

def q(paths):
    return ' '.join("'"+p.replace("'", "'\\''")+"'" for p in paths[:20])

def main():
    paths = sys.argv[1:] or ['.']
    qp = q(paths)
    report = {
        "tool": "acl-permissions-expert-audit",
        "read_only": True,
        "paths": paths,
        "commands": {
            "tooling": sh('command -v getfacl; command -v setfacl || true'),
            "stat": sh(f'stat -c "%n %U:%G %a %A %F" -- {qp} 2>/dev/null || true'),
            "getfacl": sh(f'for p in {qp}; do getfacl -p -- "$p" 2>/dev/null || true; done'),
            "effective_entries": sh(f'for p in {qp}; do getfacl -p -- "$p" 2>/dev/null | grep -E "#effective|^mask::|^default:" || true; done'),
            "mount": sh(f'for p in {qp}; do findmnt -T "$p" -o TARGET,FSTYPE,OPTIONS 2>/dev/null || true; done'),
        },
        "recommendations": [
            "Inspect ACL mask when effective permissions differ from requested entries.",
            "Back up ACLs with getfacl -Rp before bulk setfacl changes.",
            "Use default ACLs only for inheritance on new children."
        ]
    }
    json.dump(report, sys.stdout, indent=2, sort_keys=True); print()
if __name__ == '__main__': main()
