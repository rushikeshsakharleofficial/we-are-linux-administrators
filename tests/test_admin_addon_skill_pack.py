#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

SKILLS = [
    'backup-restore-expert',
    'logrotate-expert',
    'auditd-expert',
    'rsyslog-expert',
    'ssh-hardening-expert',
    'lvm-expert',
    'tcpdump-expert',
    'incident-response-expert',
    'nginx-expert',
    'php-fpm-expert',
    'mysql-expert',
]

REQUIRED_TERMS = [
    'Evidence first',
    'Safe workflow',
    'Anti-patterns',
    'Output format',
    'Token-saving tip',
]


def main():
    for skill in SKILLS:
        path = ROOT / 'skills' / skill / 'SKILL.md'
        assert path.exists(), skill
        text = path.read_text()
        assert text.startswith('# '), skill
        for term in REQUIRED_TERMS:
            assert term in text, f'{skill} missing {term}'
    assert (ROOT / 'docs' / 'admin-addon-skill-pack' / 'IMPLEMENTATION_PLAN.md').exists()
    print('admin addon skill pack tests passed')


if __name__ == '__main__':
    main()
