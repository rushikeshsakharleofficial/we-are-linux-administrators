#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Active top-level specialists that remain intentionally distinct.
TOP_LEVEL_SKILLS = [
    'backup-restore-expert',
    'ssh-hardening-expert',
    'incident-response-expert',
    'nginx-expert',
    'php-fpm-expert',
    'mysql-expert',
]

# Former micro-skills whose useful procedures now live under parent-domain chunks.
CONSOLIDATED_CONTENT = [
    'skills/logs/chunks/logrotate.md',
    'skills/security-expert/chunks/auditd.md',
    'skills/logs/chunks/rsyslog.md',
    'skills/storage/chunks/lvm.md',
    'skills/network/chunks/packet-capture.md',
]

RETIRED_TOP_LEVEL_SKILLS = [
    'logrotate-expert',
    'auditd-expert',
    'rsyslog-expert',
    'lvm-expert',
    'tcpdump-expert',
]


def main():
    for skill in TOP_LEVEL_SKILLS:
        path = ROOT / 'skills' / skill / 'SKILL.md'
        assert path.exists(), skill
        text = path.read_text().lower()
        assert any(token in text for token in ['evidence', 'baseline', 'read-only', 'read only']), skill
        assert any(token in text for token in ['rollback', 'restore', 'recovery']), skill

    for rel in CONSOLIDATED_CONTENT:
        path = ROOT / rel
        assert path.exists(), rel
        text = path.read_text().lower()
        assert any(token in text for token in ['evidence', 'diagnos', 'verify', 'check']), rel
        assert any(token in text for token in ['rollback', 'restore', 'recovery', 'safe']), rel

    for skill in RETIRED_TOP_LEVEL_SKILLS:
        assert not (ROOT / 'skills' / skill / 'SKILL.md').exists(), skill

    assert (ROOT / 'docs' / 'admin-addon-skill-pack' / 'IMPLEMENTATION_PLAN.md').exists()
    print('admin addon skill pack routing tests passed')


if __name__ == '__main__':
    main()
