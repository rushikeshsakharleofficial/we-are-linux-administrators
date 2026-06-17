#!/usr/bin/env python3
"""Read-only Quota Expert audit helper for linux-admin plugin."""
from __future__ import annotations
import json, platform, subprocess
from pathlib import Path

COMMANDS = ['findmnt -o TARGET,SOURCE,FSTYPE,OPTIONS 2>/dev/null || true', 'repquota -avug 2>/dev/null || true', 'quotaon -p -a 2>/dev/null || true', 'xfs_quota -x -c state -c report / 2>/dev/null || true', 'grep -RhsE "usrquota|grpquota|prjquota|uquota|gquota|pquota|quota" /etc/fstab /etc/projects /etc/projid 2>/dev/null || true', 'df -hT', 'df -ih']
FILES = ['/etc/fstab', '/etc/projects', '/etc/projid']

def run(cmd, timeout=4):
    try:
        p = subprocess.run(cmd, shell=True, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, timeout=timeout)
        return {"cmd": cmd, "rc": p.returncode, "output": p.stdout.strip()[-9000:]}
    except Exception as e:
        return {"cmd": cmd, "rc": None, "error": str(e)}

def read(path):
    try:
        p=Path(path)
        if p.exists() and p.is_file():
            return p.read_text(errors='replace')[:8000]
    except Exception as e:
        return f"ERROR: {e}"
    return None

def main():
    data={"read_only": True, "expert": "quota-expert", "host": platform.node(), "kernel": platform.release(), "commands": [], "files": {}}
    for cmd in COMMANDS:
        data["commands"].append(run(cmd))
    for f in FILES:
        v=read(f)
        if v is not None:
            data["files"][f]=v
    print(json.dumps(data, indent=2, sort_keys=True))

if __name__ == '__main__':
    main()
