#!/usr/bin/env python3
"""Read-only Disk Mounting Expert audit helper for linux-admin plugin."""
from __future__ import annotations
import json, platform, subprocess
from pathlib import Path

COMMANDS = ['lsblk -f -o NAME,FSTYPE,LABEL,UUID,FSAVAIL,FSUSE%,MOUNTPOINTS 2>/dev/null || lsblk -f', 'findmnt -R -o TARGET,SOURCE,FSTYPE,OPTIONS', 'findmnt --verify --verbose 2>/dev/null || true', 'blkid 2>/dev/null || true', 'cat /etc/fstab 2>/dev/null || true', 'systemctl --failed 2>/dev/null || true', 'journalctl -b -p warning --no-pager | grep -Ei "mount|fstab|filesystem|dependency|timed out" | tail -80 || true']
FILES = ['/etc/fstab']

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
    data={"read_only": True, "expert": "disk-mounting-expert", "host": platform.node(), "kernel": platform.release(), "commands": [], "files": {}}
    for cmd in COMMANDS:
        data["commands"].append(run(cmd))
    for f in FILES:
        v=read(f)
        if v is not None:
            data["files"][f]=v
    print(json.dumps(data, indent=2, sort_keys=True))

if __name__ == '__main__':
    main()
