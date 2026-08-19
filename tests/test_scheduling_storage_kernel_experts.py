#!/usr/bin/env python3
from pathlib import Path
import json, subprocess

ROOT = Path(__file__).resolve().parents[1]

ACTIVE_SKILLS = ['cron-scheduler-expert', 'kernel']
CHUNKS = [
    ('time', 'chunks/chrony.md'),
    ('time', 'chunks/system-clock.md'),
    ('storage', 'chunks/quota.md'),
    ('storage', 'chunks/mounts.md'),
    ('storage', 'chunks/filesystem-health.md'),
]
LEGACY_AUDITS = {
    'chrony-expert': ('time', 'chunks/chrony.md'),
    'date-timectl-expert': ('time', 'chunks/system-clock.md'),
    'quota-expert': ('storage', 'chunks/quota.md'),
    'disk-mounting-expert': ('storage', 'chunks/mounts.md'),
    'filesystem-expert': ('storage', 'chunks/filesystem-health.md'),
}
RETIRED_SKILLS = list(LEGACY_AUDITS)


def main():
    for skill_name in ACTIVE_SKILLS:
        skill = ROOT / 'skills' / skill_name / 'SKILL.md'
        assert skill.exists(), skill
        txt = skill.read_text().lower()
        assert 'read-only' in txt
        assert 'rollback' in txt

    for parent, chunk in CHUNKS:
        parent_skill = ROOT / 'skills' / parent / 'SKILL.md'
        chunk_path = ROOT / 'skills' / parent / chunk
        assert parent_skill.exists(), parent_skill
        assert chunk_path.exists(), chunk_path
        assert 'rollback' in chunk_path.read_text().lower()

    for retired in RETIRED_SKILLS:
        assert not (ROOT / 'skills' / retired / 'SKILL.md').exists(), retired

    for command, (parent, chunk) in LEGACY_AUDITS.items():
        audit = ROOT / 'bin' / f'{command}-audit'
        assert audit.exists() and (audit.stat().st_mode & 0o111), audit
        out = subprocess.check_output([str(audit)], cwd=str(ROOT), text=True, timeout=25)
        data = json.loads(out)
        assert data['read_only'] is True
        assert data['parent_skill'] == parent
        assert data['chunk'] == chunk
        assert data['legacy_command'] is True

    guard = (ROOT / 'scripts/linux-safety-guard.py').read_text()
    for token in ['crontab', 'chronyc', 'timedatectl', 'quotaon', 'mount -a', 'fsck', 'grub2-mkconfig']:
        assert token in guard, token
    print('scheduling storage kernel experts test passed')


if __name__ == '__main__':
    main()
