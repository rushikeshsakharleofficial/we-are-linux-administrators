#!/usr/bin/env python3
"""Read-only command environment audit helper."""

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

def main():
    report = {
        "tool": "command-expert-audit",
        "read_only": True,
        "shell": os.environ.get('SHELL',''),
        "path": os.environ.get('PATH',''),
        "commands": {
            "bash_version": sh('bash --version | head -1'),
            "core_tools": sh('for c in find xargs grep sed awk stat chmod chown getfacl setfacl sudo systemctl; do printf "%s=" "$c"; command -v "$c" || true; done'),
            "aliases": sh('alias 2>/dev/null || true'),
            "shell_options": sh('set -o 2>/dev/null | sed -n "1,120p" || true'),
        },
        "recommendations": [
            "Use preview/dry-run before destructive commands.",
            "Use find -print0 with xargs -0 for arbitrary filenames.",
            "Avoid recursive chmod/chown/rm without target preview and rollback."
        ]
    }
    json.dump(report, sys.stdout, indent=2, sort_keys=True); print()
if __name__ == '__main__': main()
