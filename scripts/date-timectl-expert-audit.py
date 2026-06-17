#!/usr/bin/env python3
"""Read-only Date / Timedatectl Expert audit helper for linux-admin plugin."""
from __future__ import annotations
import json, platform, subprocess
from pathlib import Path

COMMANDS = ['date -Ins', 'date -u -Ins', 'timedatectl status 2>/dev/null || true', 'timedatectl timesync-status 2>/dev/null || true', 'timedatectl show 2>/dev/null || true', 'hwclock --show --verbose 2>/dev/null || true', 'ls -l /etc/localtime 2>/dev/null || true', 'cat /etc/timezone 2>/dev/null || true', 'systemctl status systemd-timesyncd chronyd ntpd 2>/dev/null || true', 'journalctl -u systemd-timesyncd -u chronyd --no-pager -n 80 2>/dev/null || true']
FILES = ['/etc/timezone']

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
    data={"read_only": True, "expert": "date-timectl-expert", "host": platform.node(), "kernel": platform.release(), "commands": [], "files": {}}
    for cmd in COMMANDS:
        data["commands"].append(run(cmd))
    for f in FILES:
        v=read(f)
        if v is not None:
            data["files"][f]=v
    print(json.dumps(data, indent=2, sort_keys=True))

if __name__ == '__main__':
    main()
