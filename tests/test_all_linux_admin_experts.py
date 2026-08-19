#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

DISTINCT_SKILLS = [
    'backup-restore-expert', 'selinux-expert', 'apparmor-expert',
    'ssh-hardening-expert', 'multipath-expert', 'process-expert',
    'load-average-expert', 'io-wait-expert', 'nginx-expert', 'apache-expert',
    'php-fpm-expert', 'mysql-expert', 'postgresql-expert', 'redis-expert',
    'kubernetes-node-expert', 'ansible-expert', 'incident-response-expert',
    'f5-expert', 'cloud-lb-expert', 'lvs-ipvs-expert', 'keepalived-expert',
]

PARENT_CHUNKS = {
    'network': [
        'tcp.md', 'udp.md', 'packet-capture.md', 'vlan-bonding.md',
        'routing-iproute.md', 'nat-conntrack.md',
    ],
    'time': ['chrony.md', 'system-clock.md'],
    'storage': [
        'mounts.md', 'filesystem-health.md', 'smart.md', 'quota.md', 'lvm.md',
        'raid.md', 'iscsi.md', 'nfs.md', 'samba.md',
    ],
    'performance': ['cpu.md', 'memory.md', 'swap.md', 'capacity-planning.md'],
    'permissions': ['posix-modes.md', 'acl.md'],
    'auth': ['local-accounts.md', 'pam.md', 'sssd-ldap.md', 'sudoers.md'],
    'logs': ['rsyslog.md', 'logrotate.md'],
    'automation': ['bash-scripting.md', 'runbooks.md'],
    'security-expert': [
        'security-audit.md', 'auditd.md', 'fail2ban.md', 'vulnerability-scan.md',
    ],
    'package-manager-expert': ['patching.md'],
    'incident-response-expert': ['root-cause-analysis.md'],
    'load-balancer-expert': ['haproxy.md'],
}

REMOVED_TOP_LEVEL = [
    'tcp-expert', 'udp-expert', 'tcpdump-expert', 'vlan-bonding-expert',
    'iproute-expert', 'routing-expert', 'natting-expert',
    'chrony-expert', 'date-timectl-expert', 'disk-mounting-expert',
    'filesystem-expert', 'smart-disk-expert', 'quota-expert', 'lvm-expert',
    'raid-expert', 'iscsi-expert', 'nfs-expert', 'samba-expert',
    'cpu-expert', 'memory-expert', 'swap-expert', 'capacity-planning-expert',
    'file-permissions-expert', 'acl-permissions-expert',
    'user-permissions-expert', 'pam-expert', 'sssd-ldap-expert',
    'sudoers-expert', 'rsyslog-expert', 'logrotate-expert',
    'root-cause-expert', 'bash-script-expert', 'runbook-expert',
    'auditd-expert', 'fail2ban-expert', 'os-security-expert',
    'vulnerability-scan-expert', 'patching-expert', 'haproxy-expert',
]


def main():
    for skill in DISTINCT_SKILLS:
        path = ROOT / 'skills' / skill / 'SKILL.md'
        assert path.exists(), f'missing distinct skill: {skill}'

    for parent, chunks in PARENT_CHUNKS.items():
        parent_file = ROOT / 'skills' / parent / 'SKILL.md'
        assert parent_file.exists(), f'missing parent: {parent}'
        parent_text = parent_file.read_text()
        assert 'chunk' in parent_text.lower(), f'{parent} does not route chunks'
        for chunk in chunks:
            path = ROOT / 'skills' / parent / 'chunks' / chunk
            assert path.exists(), f'missing chunk: {parent}/{chunk}'
            text = path.read_text()
            assert len(text.strip()) > 100, f'chunk too small: {parent}/{chunk}'

    for removed in REMOVED_TOP_LEVEL:
        assert not (ROOT / 'skills' / removed / 'SKILL.md').exists(), f'redundant top-level skill restored: {removed}'

    assert (ROOT / 'skills' / 'using-linux-admin' / 'SKILL.md').exists()
    assert (ROOT / 'docs' / 'all-linux-admin-experts' / 'SKILL_PACK.md').exists()
    print('linux-admin parent/chunk architecture passed')


if __name__ == '__main__':
    main()
