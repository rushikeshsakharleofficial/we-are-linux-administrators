#!/usr/bin/env python3
from pathlib import Path
import json, subprocess
ROOT = Path(__file__).resolve().parents[1]


def main():
    assert (ROOT/'skills/migration-expert/SKILL.md').exists()
    skill = (ROOT/'skills/migration-expert/SKILL.md').read_text()
    for token in ['Agent count', 'Shared memory', 'Strict research rule', 'Rollback', 'SFTP', 'Database']:
        assert token.lower() in skill.lower(), token
    for agent in ['migration-orchestrator','migration-inventory','migration-risk','migration-validation','migration-research']:
        assert (ROOT/'agents'/f'{agent}.md').exists(), agent
    out = subprocess.check_output([str(ROOT/'bin/migration-expert-audit')], cwd=str(ROOT), text=True, timeout=20)
    data = json.loads(out)
    assert data['read_only'] is True
    guard = (ROOT/'scripts/linux-safety-guard.py').read_text()
    for token in ['leapp', 'do-release-upgrade', 'pg_upgrade', 'rsync']:
        assert token in guard, token
    print('migration expert test passed')

if __name__ == '__main__':
    main()
