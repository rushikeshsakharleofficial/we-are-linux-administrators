#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]

REQUIRED_SKILLS = ['acl-permissions-expert', 'auditd-expert', 'auth', 'automation', 'backup-restore-expert', 'bash-script-expert', 'boot', 'cf-expert', 'chrony-expert', 'command-expert', 'containers', 'cron-scheduler-expert', 'date-timectl-expert', 'diagnose', 'disk-mounting-expert', 'dnsmasq-expert', 'fail2ban-expert', 'file-permissions-expert', 'filesystem-expert', 'firewall-expert', 'grep-expert', 'incident-response-expert', 'kernel', 'kernel-expert', 'limits-expert', 'logrotate-expert', 'logs', 'lvm-expert', 'migration-expert', 'mysql-expert', 'named-expert', 'network', 'networking-expert', 'nginx-expert', 'os-security-expert', 'package-manager-expert', 'packages', 'performance', 'permissions', 'php-fpm-expert', 'quota-expert', 'rsyslog-expert', 'service', 'shell-script-expert', 'ssh-hardening-expert', 'storage', 'sysctl-expert', 'systemd-expert', 'tcpdump-expert', 'tcp-expert', 'udp-expert', 'user-permissions-expert']
REQUIRED_BINS = ['acl-permissions-expert-audit', 'cf-expert-audit', 'chrony-expert-audit', 'command-expert-audit', 'cron-scheduler-expert-audit', 'date-timectl-expert-audit', 'disk-mounting-expert-audit', 'dnsmasq-expert-audit', 'fail2ban-expert-audit', 'file-permissions-expert-audit', 'filesystem-expert-audit', 'firewall-expert-audit', 'kernel-expert-audit', 'limits-expert-audit', 'linux-log-classifier', 'linux-triage', 'migration-expert-audit', 'named-expert-audit', 'networking-expert-audit', 'os-security-expert-audit', 'package-manager-expert-audit', 'quota-expert-audit', 'sysctl-expert-audit', 'systemd-expert-audit', 'tcp-expert-audit', 'udp-expert-audit', 'user-permissions-expert-audit']

def main():
    manifest = json.loads((ROOT/'.claude-plugin/plugin.json').read_text())
    assert manifest['name'] == 'linux-admin'
    assert manifest['version'] == '1.15.0'
    missing_skills = [s for s in REQUIRED_SKILLS if not (ROOT/'skills'/s/'SKILL.md').exists()]
    missing_bins = [b for b in REQUIRED_BINS if not (ROOT/'bin'/b).exists()]
    assert not missing_skills, missing_skills
    assert not missing_bins, missing_bins
    assert (ROOT/'docs/EXPERT_MODULE_INDEX.md').exists()
    print('unified plugin test passed')

if __name__ == '__main__':
    main()
