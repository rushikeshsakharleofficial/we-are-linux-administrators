#!/usr/bin/env python3
"""Read-only Linux limits audit helper for linux-admin plugin."""
from __future__ import annotations

import json
import os
import re
import resource
import subprocess
import shutil
from pathlib import Path


def read(path):
    try:
        return Path(path).read_text(errors='ignore').strip()
    except Exception as e:
        return f"ERROR: {e}"


def run(cmd, timeout=8):
    if shutil.which(cmd[0]) is None:
        return {"cmd": cmd, "rc": None, "stdout": "", "stderr": f"{cmd[0]} not found"}
    try:
        p = subprocess.run(cmd, text=True, capture_output=True, timeout=timeout)
        return {"cmd": cmd, "rc": p.returncode, "stdout": p.stdout[-8000:], "stderr": p.stderr[-3000:]}
    except Exception as e:
        return {"cmd": cmd, "rc": None, "stdout": "", "stderr": str(e)}


def parse_limits_files():
    files = [Path('/etc/security/limits.conf')]
    d = Path('/etc/security/limits.d')
    if d.exists():
        files.extend(sorted(d.glob('*.conf')))
    findings = []
    for p in files:
        if not p.exists():
            continue
        try:
            lines = p.read_text(errors='ignore').splitlines()
        except Exception:
            continue
        for idx, line in enumerate(lines, 1):
            s = line.strip()
            if not s or s.startswith('#'):
                continue
            if re.search(r'\b(nofile|nproc|memlock)\b', s):
                item = {"file": str(p), "line": idx, "content": s, "warnings": []}
                if re.search(r'\*\s+[-a-z]+\s+(nofile|nproc|memlock)\s+(unlimited|infinity|-1)\b', s):
                    item['warnings'].append('Global unlimited resource limit; prefer finite per-user/per-service value.')
                if re.search(r'\*\s+', s):
                    item['warnings'].append('Global wildcard limit; verify blast radius.')
                findings.append(item)
    return findings


def rlimit_name_map():
    names = ['NOFILE','NPROC','MEMLOCK','CORE','STACK','AS','FSIZE','CPU']
    out = {}
    for n in names:
        attr = 'RLIMIT_' + n
        if hasattr(resource, attr):
            val = resource.getrlimit(getattr(resource, attr))
            out[n] = {"soft": val[0], "hard": val[1]}
    return out


def main():
    report = {
        "tool": "limits-expert-audit",
        "read_only": True,
        "self_limits": read('/proc/self/limits'),
        "python_resource_getrlimit": rlimit_name_map(),
        "kernel_ceilings": {
            "fs.file-nr": read('/proc/sys/fs/file-nr'),
            "fs.file-max": read('/proc/sys/fs/file-max'),
            "fs.nr_open": read('/proc/sys/fs/nr_open'),
            "kernel.threads-max": read('/proc/sys/kernel/threads-max'),
            "kernel.pid_max": read('/proc/sys/kernel/pid_max'),
        },
        "pam_limits": parse_limits_files(),
        "commands": {
            "ulimit": run(['bash','-lc','ulimit -a']),
            "pam_limits_usage": run(['bash','-lc',"grep -R --line-number 'pam_limits.so' /etc/pam.d 2>/dev/null || true"]),
            "systemd_limit_overrides": run(['bash','-lc',"grep -R --line-number -E '^\\s*Limit(NOF|NOFILE|NPROC|MEMLOCK|CORE|STACK|AS|FSIZE)' /etc/systemd/system /run/systemd/system 2>/dev/null || true"]),
        },
        "recommendations": []
    }
    if any(x.get('warnings') for x in report['pam_limits']):
        report['recommendations'].append('Review wildcard/unlimited PAM limits; prefer measured finite limits for specific users/services.')
    report['recommendations'].append('For systemd services, validate effective limits with /proc/<MainPID>/limits after restart, not only config files.')
    json.dump(report, sys.stdout, indent=2, sort_keys=True)
    print()


if __name__ == '__main__':
    import sys
    main()
