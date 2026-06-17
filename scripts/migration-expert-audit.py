#!/usr/bin/env python3
"""Read-only migration inventory helper for linux-admin plugin."""
from __future__ import annotations
import json, os, shutil, subprocess, sys
from pathlib import Path


def run(cmd, timeout=12):
    if shutil.which(cmd[0]) is None:
        return {"cmd": cmd, "rc": None, "stdout": "", "stderr": f"{cmd[0]} not found"}
    try:
        p = subprocess.run(cmd, text=True, capture_output=True, timeout=timeout)
        return {"cmd": cmd, "rc": p.returncode, "stdout": p.stdout[-30000:], "stderr": p.stderr[-8000:]}
    except Exception as e:
        return {"cmd": cmd, "rc": None, "stdout": "", "stderr": str(e)}


def sh(script, timeout=12):
    return run(['bash','-lc',script], timeout)


def read_file(path, limit=12000):
    p = Path(path)
    try:
        if p.exists() and p.is_file():
            return p.read_text(errors='ignore')[:limit]
    except Exception as e:
        return f"ERROR: {e}"
    return ""


def main():
    report = {
        "tool": "migration-expert-audit",
        "read_only": True,
        "purpose": "Initial migration inventory evidence bundle. Does not change the system.",
        "environment": {
            "cwd": os.getcwd(),
            "user": os.environ.get('USER',''),
            "shell": os.environ.get('SHELL',''),
        },
        "files": {
            "os_release": read_file('/etc/os-release'),
            "fstab": read_file('/etc/fstab'),
            "sshd_config": read_file('/etc/ssh/sshd_config'),
        },
        "commands": {
            "kernel": sh('uname -a; uptime'),
            "os": sh('cat /etc/os-release 2>/dev/null || true'),
            "cpu_mem": sh('nproc; free -h; vmstat 1 3 2>/dev/null || true'),
            "disk": sh('lsblk -f; df -hT; df -ih; findmnt -R | sed -n "1,240p"'),
            "lvm": sh('pvs; vgs; lvs 2>/dev/null || true'),
            "services": sh('systemctl list-units --type=service --state=running --no-pager 2>/dev/null | sed -n "1,240p"'),
            "failed_services": sh('systemctl --failed --no-pager 2>/dev/null || true'),
            "timers": sh('systemctl list-timers --all --no-pager 2>/dev/null | sed -n "1,200p"'),
            "ports": sh('ss -tulpn 2>/dev/null | sed -n "1,240p"'),
            "network": sh('ip -br addr; ip route show table all | sed -n "1,200p"'),
            "dns": sh('resolvectl status 2>/dev/null | sed -n "1,200p" || cat /etc/resolv.conf 2>/dev/null || true'),
            "packages_rpm": sh('rpm -qa 2>/dev/null | sort | sed -n "1,240p"; dnf repolist -v 2>/dev/null | sed -n "1,180p" || yum repolist -v 2>/dev/null | sed -n "1,180p" || true'),
            "packages_deb": sh('dpkg-query -W -f="${binary:Package} ${Version}\n" 2>/dev/null | sort | sed -n "1,240p"; apt-cache policy 2>/dev/null | sed -n "1,200p" || true'),
            "users_groups": sh('getent passwd | sed -n "1,220p"; echo ---GROUPS---; getent group | sed -n "1,220p"'),
            "sudoers": sh('visudo -c 2>&1 || true; find /etc/sudoers.d -maxdepth 1 -type f -printf "%m %u:%g %p\\n" 2>/dev/null || true'),
            "cron": sh('crontab -l 2>/dev/null || true; ls -la /etc/cron.* /var/spool/cron /var/spool/cron/crontabs 2>/dev/null || true'),
            "firewall": sh('firewall-cmd --state 2>/dev/null || true; nft list ruleset 2>/dev/null | sed -n "1,220p" || true; iptables-save 2>/dev/null | sed -n "1,160p" || true'),
            "db_detection": sh('ps -eo user,comm,args | grep -E "[p]ostgres|[m]ysqld|[m]ariadbd|[r]edis|[m]ongod" || true; systemctl list-units --type=service --all --no-pager 2>/dev/null | grep -Ei "postgres|mysql|maria|redis|mongo" || true'),
            "sftp_ssh": sh('sshd -T 2>/dev/null | grep -Ei "subsystem|chrootdirectory|forcecommand|allowusers|allowgroups|passwordauthentication|pubkeyauthentication" || true; grep -RInE "Subsystem|ChrootDirectory|ForceCommand|Match|AllowUsers|AllowGroups" /etc/ssh/sshd_config /etc/ssh/sshd_config.d 2>/dev/null || true'),
        },
        "recommendations": [
            "Classify migration strategy before executing commands.",
            "Create .migration shared memory files and dispatch agents by independent workstream.",
            "Require backup, validation matrix, and rollback trigger before cutover.",
            "Use internet/vendor docs for version-specific upgrade and DB migration details."
        ]
    }
    json.dump(report, sys.stdout, indent=2, sort_keys=True)
    print()

if __name__ == '__main__':
    main()
