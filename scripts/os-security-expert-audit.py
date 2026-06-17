#!/usr/bin/env python3
"""Read-only Linux OS security posture audit."""

from __future__ import annotations
import json, shutil, subprocess, sys, os
from pathlib import Path

def run(cmd, timeout=8):
    if shutil.which(cmd[0]) is None:
        return {"cmd": cmd, "rc": None, "stdout": "", "stderr": f"{cmd[0]} not found"}
    try:
        p=subprocess.run(cmd,text=True,capture_output=True,timeout=timeout)
        return {"cmd":cmd,"rc":p.returncode,"stdout":p.stdout[-20000:],"stderr":p.stderr[-5000:]}
    except Exception as e:
        return {"cmd":cmd,"rc":None,"stdout":"","stderr":str(e)}

def sh(s, timeout=8): return run(['bash','-lc',s], timeout)

def main():
    report={"tool":"os-security-expert-audit","read_only":True,"commands":{
        "os_kernel": sh('cat /etc/os-release 2>/dev/null; uname -a'),
        "ports": sh('ss -tulpn 2>/dev/null | sed -n "1,240p"'),
        "users": sh('getent passwd | awk -F: \'{print $1":"$3":"$7}\' | sed -n "1,240p"'),
        "sudo": sh('visudo -c 2>&1 || true; find /etc/sudoers.d -maxdepth 1 -type f -printf "%m %u:%g %p\\n" 2>/dev/null || true'),
        "ssh": sh('sshd -T 2>/dev/null | grep -Ei "permitrootlogin|passwordauthentication|pubkeyauthentication|maxauthtries|allowusers|allowgroups" || true'),
        "mac": sh('getenforce 2>/dev/null || true; sestatus 2>/dev/null || true; aa-status 2>/dev/null || true'),
        "sysctl_security": sh('sysctl kernel.dmesg_restrict kernel.kptr_restrict kernel.yama.ptrace_scope kernel.modules_disabled fs.protected_hardlinks fs.protected_symlinks 2>/dev/null || true'),
        "auditd": sh('auditctl -s 2>/dev/null || true; systemctl status auditd 2>/dev/null | sed -n "1,120p" || true'),
        "suid_world_writable": sh('find /usr/bin /usr/sbin /bin /sbin /tmp /var/tmp -xdev \\( -perm -4000 -o -perm -2000 -o -perm -0002 \\) -printf "%m %u:%g %p\\n" 2>/dev/null | sed -n "1,240p"')},
        "recommendations":["Prioritize internet-exposed services, SSH/sudo, firewall, patching, MAC, audit/logging.","Do not disable SELinux/AppArmor as a fix.","Map every hardening change to validation and rollback."]}
    json.dump(report,sys.stdout,indent=2,sort_keys=True); print()
if __name__=='__main__': main()
