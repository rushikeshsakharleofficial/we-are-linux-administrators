#!/usr/bin/env python3
"""Read-only systemd audit helper for linux-admin plugin.

Outputs JSON. It is safe to run on systems with or without systemd as PID 1.
"""
from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path


def run(cmd, timeout=12):
    if shutil.which(cmd[0]) is None:
        return {"cmd": cmd, "rc": None, "stdout": "", "stderr": f"{cmd[0]} not found"}
    try:
        p = subprocess.run(cmd, text=True, capture_output=True, timeout=timeout)
        return {"cmd": cmd, "rc": p.returncode, "stdout": p.stdout[-12000:], "stderr": p.stderr[-4000:]}
    except Exception as e:
        return {"cmd": cmd, "rc": None, "stdout": "", "stderr": str(e)}


def collect_unit_files():
    roots = [Path('/etc/systemd/system'), Path('/run/systemd/system'), Path('/usr/lib/systemd/system'), Path('/lib/systemd/system')]
    risks = []
    for base in roots:
        if not base.exists():
            continue
        for p in list(base.rglob('*.service'))[:2000]:
            try:
                txt = p.read_text(errors='ignore')
            except Exception:
                continue
            unit_findings = []
            if re.search(r'^Type=forking\s*$', txt, re.M) and not re.search(r'^PIDFile\s*=', txt, re.M):
                unit_findings.append('Type=forking without PIDFile; legacy daemon tracking may be unreliable.')
            if re.search(r'^Restart=always\s*$', txt, re.M) and not re.search(r'^RestartSec\s*=', txt, re.M):
                unit_findings.append('Restart=always without explicit RestartSec; restart loops may be noisy.')
            if re.search(r'^ExecStartPre\s*=.*(sleep|tail\s+-f|while\s+true|python|node|java)', txt, re.M):
                unit_findings.append('ExecStartPre may contain long-running logic; pre-start helpers should exit.')
            if re.search(r'^\s*ExecStart\s*=\s*/bin/(ba)?sh\s+-c\s+', txt, re.M):
                unit_findings.append('ExecStart uses shell wrapper; verify quoting, environment, and signal behavior.')
            if unit_findings:
                risks.append({"file": str(p), "findings": unit_findings})
    return risks


def main():
    report = {
        "tool": "systemd-expert-audit",
        "read_only": True,
        "pid1": None,
        "commands": {},
        "unit_file_findings": [],
        "recommendations": [],
    }
    try:
        with open('/proc/1/comm') as f:
            report['pid1'] = f.read().strip()
    except Exception:
        report['pid1'] = 'unknown'

    report['commands']['systemctl_version'] = run(['systemctl', '--version'])
    report['commands']['failed_units'] = run(['systemctl', '--failed', '--no-pager', '--plain'])
    report['commands']['timers'] = run(['systemctl', 'list-timers', '--all', '--no-pager'])
    report['commands']['analyze_blame'] = run(['systemd-analyze', 'blame'])
    report['commands']['critical_chain'] = run(['systemd-analyze', 'critical-chain'])
    report['commands']['journal_warnings'] = run(['journalctl', '-b', '-p', 'warning..alert', '--no-pager', '-n', '200', '-o', 'short-iso'])
    report['unit_file_findings'] = collect_unit_files()

    failed = report['commands']['failed_units'].get('stdout','')
    if failed and '0 loaded units listed' not in failed.lower():
        report['recommendations'].append('Investigate failed units with systemctl status UNIT and journalctl -u UNIT -b before restart/reset-failed.')
    if report['unit_file_findings']:
        report['recommendations'].append('Review unit_file_findings; prefer drop-ins and validate with systemd-analyze verify before reload.')

    json.dump(report, sys.stdout, indent=2, sort_keys=True)
    print()


if __name__ == '__main__':
    main()
