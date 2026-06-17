#!/usr/bin/env python3
"""Read-only Cron Scheduler Expert audit helper for linux-admin plugin."""
from __future__ import annotations
import json, platform, subprocess
from pathlib import Path

COMMANDS = ['systemctl status cron crond anacron 2>/dev/null || true', 'crontab -l 2>/dev/null || true', 'ls -lah /etc/crontab /etc/cron.d /etc/cron.hourly /etc/cron.daily /etc/cron.weekly /etc/cron.monthly 2>/dev/null || true', 'find /etc/cron.d -maxdepth 1 -type f -print -exec sed -n "1,120p" {} \\; 2>/dev/null || true', 'systemctl list-timers --all 2>/dev/null || true', 'journalctl -u cron -u crond -u anacron --no-pager -n 80 2>/dev/null || true']
FILES = ['/etc/crontab']

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
    data={"read_only": True, "expert": "cron-scheduler-expert", "host": platform.node(), "kernel": platform.release(), "commands": [], "files": {}}
    for cmd in COMMANDS:
        data["commands"].append(run(cmd))
    for f in FILES:
        v=read(f)
        if v is not None:
            data["files"][f]=v
    print(json.dumps(data, indent=2, sort_keys=True))

if __name__ == '__main__':
    main()
