#!/usr/bin/env python3
"""Read-only local user/group/sudo audit helper."""

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
        "tool": "user-permissions-expert-audit",
        "read_only": True,
        "commands": {
            "current_user": sh('id; umask'),
            "passwd_summary": sh('getent passwd | awk -F: \'{print $1":"$3":"$4":"$7}\' | sed -n "1,200p"'),
            "group_summary": sh('getent group | awk -F: \'{print $1":"$3":"$4}\' | sed -n "1,200p"'),
            "sudoers_check": sh('visudo -c 2>&1 || true'),
            "sudo_groups": sh('getent group sudo wheel admin 2>/dev/null || true'),
            "sshd_access_controls": sh('grep -RInE "^(AllowUsers|DenyUsers|AllowGroups|DenyGroups|PermitRootLogin|PasswordAuthentication)" /etc/ssh/sshd_config /etc/ssh/sshd_config.d 2>/dev/null || true'),
        },
        "recommendations": [
            "Use getent/id to verify the active identity source before editing local files.",
            "Validate sudoers changes with visudo -c.",
            "Use role groups and sudoers.d drop-ins for least privilege."
        ]
    }
    json.dump(report, sys.stdout, indent=2, sort_keys=True); print()
if __name__ == '__main__': main()
