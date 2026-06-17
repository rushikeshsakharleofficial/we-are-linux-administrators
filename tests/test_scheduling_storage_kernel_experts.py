#!/usr/bin/env python3
from pathlib import Path
import json, subprocess
ROOT=Path(__file__).resolve().parents[1]
SKILLS=['cron-scheduler-expert', 'chrony-expert', 'date-timectl-expert', 'quota-expert', 'disk-mounting-expert', 'filesystem-expert', 'kernel-expert']

def main():
    for s in SKILLS:
        skill=ROOT/'skills'/s/'SKILL.md'
        assert skill.exists(), skill
        txt=skill.read_text().lower()
        assert 'read-only' in txt
        assert 'rollback' in txt
        b=ROOT/'bin'/f'{s}-audit'
        assert b.exists() and (b.stat().st_mode & 0o111), b
        out=subprocess.check_output([str(b)], cwd=str(ROOT), text=True, timeout=25)
        data=json.loads(out)
        assert data['read_only'] is True
    guard=(ROOT/'scripts/linux-safety-guard.py').read_text()
    for token in ['crontab', 'chronyc', 'timedatectl', 'quotaon', 'mount -a', 'fsck', 'grub2-mkconfig']:
        assert token in guard, token
    print('scheduling storage kernel experts test passed')
if __name__=='__main__':
    main()
