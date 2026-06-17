#!/usr/bin/env python3
"""Read-only firewall audit helper for linux-admin plugin."""
from __future__ import annotations
import json, shutil, subprocess, sys


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


def main():
    report = {
        "tool": "firewall-expert-audit",
        "read_only": True,
        "commands": {
            "active_services": sh('systemctl is-active firewalld nftables ufw fail2ban 2>/dev/null || true'),
            "listening": run(['ss','-lntup']),
            "addresses": run(['ip','-br','addr']),
            "routes": run(['ip','route','show','table','all']),
            "firewalld_state": sh('firewall-cmd --state 2>/dev/null || true'),
            "firewalld_active_zones": sh('firewall-cmd --get-active-zones 2>/dev/null || true'),
            "firewalld_all_zones": sh('firewall-cmd --list-all-zones 2>/dev/null || true'),
            "nft_ruleset": sh('nft list ruleset 2>/dev/null || true'),
            "iptables_save": sh('iptables-save 2>/dev/null || true'),
            "ip6tables_save": sh('ip6tables-save 2>/dev/null || true'),
            "ufw_status": sh('ufw status verbose 2>/dev/null || true'),
            "ipset_names": sh('ipset list -name 2>/dev/null || true'),
            "fail2ban_status": sh('fail2ban-client status 2>/dev/null || true'),
        },
        "findings": [],
        "recommendations": []
    }
    fw = report['commands']['firewalld_state']['stdout'].strip()
    nft = report['commands']['nft_ruleset']['stdout'].strip()
    ipt = report['commands']['iptables_save']['stdout'].strip()
    ufw = report['commands']['ufw_status']['stdout'].strip()
    owners = [name for name, data in [('firewalld',fw),('nftables',nft),('iptables',ipt),('ufw',ufw)] if data]
    if len(owners) > 1:
        report['findings'].append(f'Multiple firewall interfaces/rulesets detected: {owners}. Identify owner before changing rules.')
    if 'Chain INPUT (policy DROP)' in ipt or 'policy drop' in nft.lower():
        report['findings'].append('Drop policy detected; verify explicit management allow rules before changes.')
    if ':22 ' in report['commands']['listening']['stdout'] and not any(x in (fw+ipt+ufw+nft).lower() for x in ['ssh','dport 22','--dport 22','22/tcp']):
        report['findings'].append('SSH appears listening, but no obvious SSH allow rule found in captured text; verify before reload/reset.')
    report['recommendations'].append('Take backup/export and define rollback before any firewall modification.')
    report['recommendations'].append('Prefer runtime test then persist only after validation when using firewalld/UFW/nftables.')
    json.dump(report, sys.stdout, indent=2, sort_keys=True)
    print()

if __name__ == '__main__':
    main()
