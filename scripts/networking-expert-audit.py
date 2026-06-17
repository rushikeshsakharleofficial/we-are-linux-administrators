#!/usr/bin/env python3
"""Read-only Linux networking audit helper for linux-admin plugin."""
from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path


def run(cmd, timeout=10):
    if shutil.which(cmd[0]) is None:
        return {"cmd": cmd, "rc": None, "stdout": "", "stderr": f"{cmd[0]} not found"}
    try:
        p = subprocess.run(cmd, text=True, capture_output=True, timeout=timeout)
        return {"cmd": cmd, "rc": p.returncode, "stdout": p.stdout[-16000:], "stderr": p.stderr[-4000:]}
    except Exception as e:
        return {"cmd": cmd, "rc": None, "stdout": "", "stderr": str(e)}


def detect_managers():
    candidates = {
        'NetworkManager': ['systemctl','is-active','NetworkManager'],
        'systemd-networkd': ['systemctl','is-active','systemd-networkd'],
        'systemd-resolved': ['systemctl','is-active','systemd-resolved'],
        'firewalld': ['systemctl','is-active','firewalld'],
        'nftables': ['systemctl','is-active','nftables'],
    }
    out = {}
    for name, cmd in candidates.items():
        r = run(cmd, timeout=4)
        out[name] = (r.get('stdout') or r.get('stderr') or '').strip()
    return out


def findings_from(report):
    findings = []
    routes = report['commands']['routes'].get('stdout','')
    if 'default' not in routes:
        findings.append('No default route found in `ip route show table all`; outbound internet may fail unless policy/VRF-specific routing is intentional.')
    links = report['commands']['brief_links'].get('stdout','')
    for line in links.splitlines():
        if 'DOWN' in line and not line.startswith('lo'):
            findings.append(f'Interface appears DOWN: {line}')
    resolv = report['commands']['resolver'].get('stdout','') or report['commands']['resolver'].get('stderr','')
    if not resolv.strip():
        findings.append('Resolver status/config output is empty; verify DNS configuration.')
    sockets = report['commands']['listening_sockets'].get('stdout','')
    if '127.0.0.1:' in sockets:
        findings.append('Some services listen on 127.0.0.1 only; verify if remote access is expected.')
    return findings


def main():
    report = {
        "tool": "networking-expert-audit",
        "read_only": True,
        "managers": detect_managers(),
        "commands": {
            "brief_links": run(['ip','-br','link']),
            "brief_addresses": run(['ip','-br','addr']),
            "routes": run(['ip','route','show','table','all']),
            "rules": run(['ip','rule','show']),
            "socket_summary": run(['ss','-s']),
            "listening_sockets": run(['ss','-lntup']),
            "link_stats": run(['ip','-s','link']),
            "resolver": run(['bash','-lc','resolvectl status 2>/dev/null || cat /etc/resolv.conf 2>/dev/null || true']),
            "nft_ruleset": run(['bash','-lc','nft list ruleset 2>/dev/null || true']),
            "iptables_save": run(['bash','-lc','iptables-save 2>/dev/null || true']),
            "firewalld": run(['bash','-lc','firewall-cmd --list-all 2>/dev/null || true']),
            "tc_qdisc": run(['bash','-lc','for i in $(ls /sys/class/net 2>/dev/null); do echo "### $i"; tc -s qdisc show dev "$i" 2>/dev/null; done']),
        },
        "findings": [],
        "recommendations": [],
    }
    report['findings'] = findings_from(report)
    report['recommendations'].append('For any runtime ip/nft/tc/ethtool change, define persistent config owner and rollback before applying remotely.')
    report['recommendations'].append('Tune TCP/sysctl only after counters prove backlog, drops, conntrack, buffer, or MTU bottleneck.')
    json.dump(report, sys.stdout, indent=2, sort_keys=True)
    print()


if __name__ == '__main__':
    main()
