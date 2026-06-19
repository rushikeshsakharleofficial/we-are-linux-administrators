#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]

REQUIRED_SKILLS = ['acl-permissions-expert', 'ansible-expert', 'apache-expert', 'apparmor-expert', 'auditd-expert', 'auth', 'automation', 'backup-restore-expert', 'bash-script-expert', 'bashrc-expert', 'boot', 'capacity-planning-expert', 'cf-expert', 'change-plan-expert', 'chrony-expert', 'command-expert', 'containers', 'cpu-expert', 'cron-scheduler-expert', 'date-timectl-expert', 'diagnose', 'disk-mounting-expert', 'dnsmasq-expert', 'docker-expert', 'fail2ban-expert', 'file-permissions-expert', 'filesystem-expert', 'firewall-expert', 'grep-expert', 'haproxy-expert', 'incident-response-expert', 'incident-timeline-expert', 'io-wait-expert', 'iproute-expert', 'iscsi-expert', 'kernel', 'kernel-expert', 'kubernetes-node-expert', 'limits-expert', 'load-average-expert', 'logrotate-expert', 'logs', 'lvm-expert', 'maintenance-window-expert', 'memory-expert', 'migration-expert', 'multipath-expert', 'mysql-expert', 'named-expert', 'natting-expert', 'network', 'networking-expert', 'nfs-expert', 'nginx-expert', 'ntp-expert', 'os-security-expert', 'package-manager-expert', 'packages', 'pam-expert', 'patching-expert', 'performance', 'permissions', 'php-fpm-expert', 'podman-expert', 'post-change-validation-expert', 'postgresql-expert', 'preflight-check-expert', 'process-expert', 'production-safety-expert', 'proxy-expert', 'quota-expert', 'raid-expert', 'redis-expert', 'risk-assessment-expert', 'rollback-expert', 'root-cause-expert', 'routing-expert', 'rsyslog-expert', 'runbook-expert', 'samba-expert', 'selinux-expert', 'service', 'shell-script-expert', 'smart-disk-expert', 'ssh-hardening-expert', 'sssd-ldap-expert', 'storage', 'sudoers-expert', 'swap-expert', 'sysctl-expert', 'systemd-expert', 'tcp-expert', 'tcpdump-expert', 'udp-expert', 'user-permissions-expert', 'vlan-bonding-expert', 'vulnerability-scan-expert', 'zshrc-expert']
REQUIRED_BINS = ['acl-permissions-expert-audit', 'cf-expert-audit', 'chrony-expert-audit', 'command-expert-audit', 'cron-scheduler-expert-audit', 'date-timectl-expert-audit', 'disk-mounting-expert-audit', 'dnsmasq-expert-audit', 'fail2ban-expert-audit', 'file-permissions-expert-audit', 'filesystem-expert-audit', 'firewall-expert-audit', 'kernel-expert-audit', 'limits-expert-audit', 'linux-log-classifier', 'linux-triage', 'migration-expert-audit', 'named-expert-audit', 'networking-expert-audit', 'os-security-expert-audit', 'package-manager-expert-audit', 'quota-expert-audit', 'sysctl-expert-audit', 'systemd-expert-audit', 'tcp-expert-audit', 'udp-expert-audit', 'user-permissions-expert-audit']

def main():
    manifest = json.loads((ROOT/'.claude-plugin/plugin.json').read_text())
    assert manifest['name'] == 'linux-admin'
    expected = json.loads((ROOT/'package.json').read_text())['version']
    assert manifest['version'] == expected, f"plugin.json version {manifest['version']} != package.json {expected}"
    missing_skills = [s for s in REQUIRED_SKILLS if not (ROOT/'skills'/s/'SKILL.md').exists()]
    missing_bins = [b for b in REQUIRED_BINS if not (ROOT/'bin'/b).exists()]
    assert not missing_skills, missing_skills
    assert not missing_bins, missing_bins
    assert (ROOT/'docs/EXPERT_MODULE_INDEX.md').exists()
    print('unified plugin test passed')

if __name__ == '__main__':
    main()
