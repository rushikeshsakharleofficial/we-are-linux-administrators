#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]

REQUIRED_BINS = [
    'acl-permissions-expert-audit', 'cf-expert-audit', 'chrony-expert-audit',
    'command-expert-audit', 'cron-scheduler-expert-audit', 'date-timectl-expert-audit',
    'disk-mounting-expert-audit', 'dnsmasq-expert-audit', 'fail2ban-expert-audit',
    'file-permissions-expert-audit', 'filesystem-expert-audit', 'firewall-expert-audit',
    'kernel-expert-audit', 'limits-expert-audit', 'linux-log-classifier', 'linux-triage',
    'memory-expert-audit', 'migration-expert-audit', 'named-expert-audit',
    'networking-expert-audit', 'os-security-expert-audit', 'package-manager-expert-audit',
    'quota-expert-audit', 'swap-expert-audit', 'sysctl-expert-audit', 'systemd-expert-audit',
    'tcp-expert-audit', 'udp-expert-audit', 'user-permissions-expert-audit',
]

def main():
    manifest = json.loads((ROOT/'.claude-plugin/plugin.json').read_text())
    assert manifest['name'] == 'linux-admin'
    pkg_version = json.loads((ROOT/'package.json').read_text())['version']
    assert manifest['version'] == pkg_version, f"plugin.json {manifest['version']} != package.json {pkg_version}"

    # Skills: discovered from disk, not a hardcoded list
    skill_dirs = [d.name for d in (ROOT/'skills').iterdir() if d.is_dir() and (d/'SKILL.md').exists()]
    assert len(skill_dirs) > 0, "No skills found"

    missing_bins = [b for b in REQUIRED_BINS if not (ROOT/'bin'/b).exists()]
    assert not missing_bins, missing_bins
    assert (ROOT/'docs/EXPERT_MODULE_INDEX.md').exists()
    print(f'unified plugin test passed ({len(skill_dirs)} skills, {len(REQUIRED_BINS)} bins)')

if __name__ == '__main__':
    main()
