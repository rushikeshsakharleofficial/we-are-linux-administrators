#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

SKILLS = [
    'backup-restore-expert',
    'logrotate-expert',
    'rsyslog-expert',
    'auditd-expert',
    'selinux-expert',
    'apparmor-expert',
    'ssh-hardening-expert',
    'sudoers-expert',
    'pam-expert',
    'sssd-ldap-expert',
    'lvm-expert',
    'raid-expert',
    'nfs-expert',
    'samba-expert',
    'iscsi-expert',
    'multipath-expert',
    'smart-disk-expert',
    'process-expert',
    'load-average-expert',
    'cpu-expert',
    'io-wait-expert',
    'tcpdump-expert',
    'iproute-expert',
    'routing-expert',
    'vlan-bonding-expert',
    'proxy-expert',
    'haproxy-expert',
    'nginx-expert',
    'apache-expert',
    'php-fpm-expert',
    'mysql-expert',
    'postgresql-expert',
    'redis-expert',
    'docker-expert',
    'podman-expert',
    'kubernetes-node-expert',
    'ansible-expert',
    'patching-expert',
    'vulnerability-scan-expert',
    'capacity-planning-expert',
    'incident-response-expert',
    'runbook-expert',
]

REQUIRED_TERMS = [
    'Evidence first',
    'Safe workflow',
    'Anti-patterns',
    'Output format',
    'Token-saving tip',
]


def main():
    missing = []
    for skill in SKILLS:
        path = ROOT / 'skills' / skill / 'SKILL.md'
        if not path.exists():
            missing.append(skill)
            continue
        text = path.read_text()
        assert text.startswith('# '), skill
        for term in REQUIRED_TERMS:
            assert term in text, f'{skill} missing {term}'
    assert not missing, f'missing skills: {missing}'
    assert (ROOT / 'docs' / 'all-linux-admin-experts' / 'SKILL_PACK.md').exists()
    print('all linux admin expert skills passed')


if __name__ == '__main__':
    main()
