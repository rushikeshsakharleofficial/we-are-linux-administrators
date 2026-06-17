#!/usr/bin/env python3
"""Read-only file permission audit helper. Optionally pass paths."""

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
    safe = []
    for p in paths[:20]:
        safe.append(p.replace("'", "'\\''"))
    return ' '.join("'"+p+"'" for p in safe)

def main():
    paths = sys.argv[1:] or ['.']
    qp = q(paths)
    report = {
        "tool": "file-permissions-expert-audit",
        "read_only": True,
        "paths": paths,
        "commands": {
            "identity": sh('id; umask'),
            "stat": sh(f'stat -c "%n %U:%G %a %A %F" -- {qp} 2>/dev/null || true'),
            "namei": sh(f'for p in {qp}; do namei -l -- "$p" 2>/dev/null || true; done'),
            "acl": sh(f'for p in {qp}; do getfacl -p -- "$p" 2>/dev/null || true; done'),
            "mount": sh(f'for p in {qp}; do findmnt -T "$p" -o TARGET,SOURCE,FSTYPE,OPTIONS 2>/dev/null || true; done'),
        },
        "recommendations": [
            "Check every parent directory with namei -l for traversal failures.",
            "Use separate file and directory modes for recursive fixes.",
            "Avoid chmod -R 777; design owner/group/ACL access instead."
        ]
    }
    json.dump(report, sys.stdout, indent=2, sort_keys=True); print()
if __name__ == '__main__': main()
