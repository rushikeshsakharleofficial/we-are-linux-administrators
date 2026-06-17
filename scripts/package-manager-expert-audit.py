#!/usr/bin/env python3
"""Read-only package-manager audit helper for linux-admin plugin."""
from __future__ import annotations
import json, os, platform, shutil, subprocess
from pathlib import Path


def run(cmd, timeout=8):
    try:
        p = subprocess.run(cmd, shell=True, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, timeout=timeout)
        out = p.stdout.strip()
        return {"cmd": cmd, "rc": p.returncode, "output": out[-8000:]}
    except Exception as e:
        return {"cmd": cmd, "rc": None, "error": str(e)}


def exists(cmd):
    return shutil.which(cmd) is not None


def read_file(path, max_chars=5000):
    try:
        p=Path(path)
        if p.exists() and p.is_file():
            return p.read_text(errors='replace')[:max_chars]
    except Exception as e:
        return f"ERROR: {e}"
    return None


def main():
    cmds = {name: shutil.which(name) for name in ['apt','apt-get','apt-cache','apt-mark','dpkg','dnf','dnf5','yum','rpm'] if exists(name)}
    data = {
        "read_only": True,
        "host": platform.node(),
        "kernel": platform.release(),
        "os_release": read_file('/etc/os-release'),
        "detected_commands": cmds,
        "apt": {},
        "rpm": {},
        "repo_files": {},
        "locks": {},
    }
    common = [
        'systemctl is-system-running || true',
        'uptime',
    ]
    data['common'] = [run(c) for c in common]
    if any(k in cmds for k in ['apt','apt-get','dpkg']):
        apt_cmds = [
            'apt --version 2>/dev/null | head -3 || true',
            'apt-get --version 2>/dev/null | head -3 || true',
            'dpkg --version 2>/dev/null | head -3 || true',
            'apt-cache policy 2>/dev/null | head -120 || true',
            'apt list --upgradable 2>/dev/null | head -80 || true',
            'apt-mark showhold 2>/dev/null || true',
            'dpkg --audit 2>/dev/null || true',
            "dpkg -l 2>/dev/null | awk '$1 ~ /^(hi|rc|iF|iU|iH|un|pn)/ {print}' | head -100 || true",
            'tail -80 /var/log/apt/history.log 2>/dev/null || true',
            'tail -80 /var/log/dpkg.log 2>/dev/null || true',
        ]
        data['apt']['commands'] = [run(c) for c in apt_cmds]
        for path in ['/etc/apt/sources.list']:
            v=read_file(path)
            if v is not None: data['repo_files'][path]=v
        try:
            for p in Path('/etc/apt/sources.list.d').glob('*'):
                if p.is_file() and p.suffix in ('.list','.sources'):
                    data['repo_files'][str(p)] = p.read_text(errors='replace')[:5000]
        except Exception as e:
            data['repo_files']['/etc/apt/sources.list.d'] = f'ERROR: {e}'
        data['locks']['apt_dpkg'] = run('ls -lh /var/lib/dpkg/lock* /var/lib/apt/lists/lock /var/cache/apt/archives/lock 2>/dev/null || true')
    if any(k in cmds for k in ['dnf','dnf5','yum','rpm']):
        rpm_cmds = [
            'rpm --version 2>/dev/null || true',
            'dnf --version 2>/dev/null | head -20 || true',
            'dnf5 --version 2>/dev/null || true',
            'yum --version 2>/dev/null | head -12 || true',
            'rpm -qa --last 2>/dev/null | head -50 || true',
            'rpm -Va --nofiles --nodigest 2>/dev/null | head -100 || true',
            'dnf repolist all 2>/dev/null || yum repolist all 2>/dev/null || dnf5 repo list --all 2>/dev/null || true',
            'dnf check 2>/dev/null || yum check 2>/dev/null || dnf5 check 2>/dev/null || true',
            'dnf history list 2>/dev/null | head -40 || yum history list 2>/dev/null | head -40 || dnf5 history list 2>/dev/null | head -40 || true',
        ]
        data['rpm']['commands'] = [run(c) for c in rpm_cmds]
        for d in ['/etc/yum.repos.d','/etc/dnf']:
            try:
                for p in Path(d).rglob('*'):
                    if p.is_file() and p.suffix in ('.repo','.conf'):
                        data['repo_files'][str(p)] = p.read_text(errors='replace')[:5000]
            except Exception as e:
                data['repo_files'][d] = f'ERROR: {e}'
        data['locks']['rpm_dnf_yum'] = run('ls -lh /var/lib/rpm /var/lib/dnf /var/cache/dnf /var/cache/yum 2>/dev/null || true')
    print(json.dumps(data, indent=2, sort_keys=True))

if __name__ == '__main__':
    main()
