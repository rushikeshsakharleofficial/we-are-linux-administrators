#!/usr/bin/env python3
"""Read-only Fail2Ban audit helper for linux-admin plugin."""
from __future__ import annotations
import json, shutil, subprocess, sys
from pathlib import Path


def run(cmd, timeout=10):
    if shutil.which(cmd[0]) is None:
        return {"cmd": cmd, "rc": None, "stdout": "", "stderr": f"{cmd[0]} not found"}
    try:
        p = subprocess.run(cmd, text=True, capture_output=True, timeout=timeout)
        return {"cmd": cmd, "rc": p.returncode, "stdout": p.stdout[-20000:], "stderr": p.stderr[-5000:]}
    except Exception as e:
        return {"cmd": cmd, "rc": None, "stdout": "", "stderr": str(e)}


def sh(script, timeout=10):
    return run(['bash','-lc',script], timeout)


def read_configs():
    paths = []
    for base in ['/etc/fail2ban/jail.local', '/etc/fail2ban/jail.conf']:
        p = Path(base)
        if p.exists(): paths.append(p)
    d = Path('/etc/fail2ban/jail.d')
    if d.exists(): paths.extend(sorted(d.glob('*.local')) + sorted(d.glob('*.conf')))
    out = []
    for p in paths[:80]:
        try:
            txt = p.read_text(errors='ignore')
        except Exception:
            continue
        warnings = []
        low = txt.lower()
        if 'bantime = -1' in low or 'bantime=-1' in low:
            warnings.append('Permanent bantime found; verify policy and false-positive controls.')
        if 'ignoreip' not in low:
            warnings.append('No ignoreip found in this config file; verify management IP protection elsewhere.')
        out.append({"file": str(p), "warnings": warnings, "excerpt": txt[:4000]})
    return out


def main():
    report = {
        "tool": "fail2ban-expert-audit",
        "read_only": True,
        "commands": {
            "version": sh('fail2ban-client version 2>/dev/null || true'),
            "status": sh('fail2ban-client status 2>/dev/null || true'),
            "debug_config": sh('fail2ban-client -d 2>/dev/null | sed -n "1,260p" || true'),
            "service_logs": sh('journalctl -u fail2ban -b --no-pager -n 200 2>/dev/null || true'),
            "firewall_f2b_nft": sh('nft list ruleset 2>/dev/null | grep -i f2b -C2 || true'),
            "firewall_f2b_iptables": sh('iptables-save 2>/dev/null | grep -i f2b || true'),
        },
        "config_files": read_configs(),
        "findings": [],
        "recommendations": []
    }
    status = report['commands']['status']['stdout']
    if 'Jail list:' not in status and status.strip():
        report['findings'].append('Fail2Ban responded, but no jail list was detected; inspect service state/config.')
    if any(item['warnings'] for item in report['config_files']):
        report['recommendations'].append('Review config_files warnings before enabling or making bans more aggressive.')
    report['recommendations'].append('Test filters with fail2ban-regex before enabling new/custom jails.')
    report['recommendations'].append('Confirm action backend creates expected firewall entries after a test ban.')
    json.dump(report, sys.stdout, indent=2, sort_keys=True)
    print()

if __name__ == '__main__':
    main()
