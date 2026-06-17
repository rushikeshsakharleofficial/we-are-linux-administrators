#!/usr/bin/env python3
"""Read-only Kernel Expert audit helper for linux-admin plugin."""
from __future__ import annotations
import json, platform, subprocess
from pathlib import Path

COMMANDS = ['uname -a', 'cat /proc/cmdline', 'cat /proc/version', 'cat /proc/sys/kernel/tainted 2>/dev/null || true', 'lsmod 2>/dev/null | head -80 || true', 'dkms status 2>/dev/null || true', 'journalctl -k -b --no-pager | tail -160 || true', 'dmesg -T 2>/dev/null | tail -160 || true', 'sysctl kernel.panic kernel.sysrq kernel.kptr_restrict kernel.dmesg_restrict 2>/dev/null || true', 'ls -lh /boot 2>/dev/null | tail -80 || true', 'systemctl status kdump kdump-tools 2>/dev/null || true']
FILES = ['/proc/cmdline']

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
    data={"read_only": True, "expert": "kernel-expert", "host": platform.node(), "kernel": platform.release(), "commands": [], "files": {}}
    for cmd in COMMANDS:
        data["commands"].append(run(cmd))
    for f in FILES:
        v=read(f)
        if v is not None:
            data["files"][f]=v
    print(json.dumps(data, indent=2, sort_keys=True))

if __name__ == '__main__':
    main()
