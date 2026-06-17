#!/usr/bin/env python3
"""Read-only Chrony Expert audit helper for linux-admin plugin."""
from __future__ import annotations
import json, platform, subprocess
from pathlib import Path

COMMANDS = ['timedatectl status 2>/dev/null || true', 'chronyc tracking 2>/dev/null || true', 'chronyc sources -v 2>/dev/null || true', 'chronyc sourcestats -v 2>/dev/null || true', 'chronyc activity 2>/dev/null || true', 'systemctl status chronyd chrony 2>/dev/null || true', 'grep -RhsE "^(server|pool|peer|allow|deny|makestep|rtcsync|driftfile|logdir|nts|local|bind|cmdallow|cmdport)" /etc/chrony.conf /etc/chrony/chrony.conf /etc/chrony.d/* 2>/dev/null || true', 'journalctl -u chronyd -u chrony --no-pager -n 80 2>/dev/null || true']
FILES = ['/etc/chrony.conf', '/etc/chrony/chrony.conf']

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
    data={"read_only": True, "expert": "chrony-expert", "host": platform.node(), "kernel": platform.release(), "commands": [], "files": {}}
    for cmd in COMMANDS:
        data["commands"].append(run(cmd))
    for f in FILES:
        v=read(f)
        if v is not None:
            data["files"][f]=v
    print(json.dumps(data, indent=2, sort_keys=True))

if __name__ == '__main__':
    main()
