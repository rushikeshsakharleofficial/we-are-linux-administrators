#!/usr/bin/env python3
from pathlib import Path
import json, subprocess
ROOT = Path(__file__).resolve().parents[1]

SKILL_PATHS = [
    'skills/command-expert/SKILL.md',
    'skills/auth/SKILL.md',
    'skills/auth/chunks/local-accounts.md',
    'skills/permissions/SKILL.md',
    'skills/permissions/chunks/posix-modes.md',
    'skills/permissions/chunks/acl.md',
]
BINS = ['command-expert-audit','user-permissions-expert-audit','file-permissions-expert-audit','acl-permissions-expert-audit']
COMPATIBILITY_ROUTES = {
    'user-permissions-expert-audit': ('auth', 'chunks/local-accounts.md'),
    'file-permissions-expert-audit': ('permissions', 'chunks/posix-modes.md'),
    'acl-permissions-expert-audit': ('permissions', 'chunks/acl.md'),
}

def main():
    for rel in SKILL_PATHS:
        p = ROOT/rel
        assert p.exists(), p
        txt = p.read_text().lower()
        assert any(token in txt for token in ['read-only', 'read only', 'evidence first', 'baseline evidence']), rel
        assert any(token in txt for token in ['rollback', 'restore', 'recovery']), rel
    for b in BINS:
        p = ROOT/'bin'/b
        assert p.exists(), p
        assert p.stat().st_mode & 0o111, p
        out = subprocess.check_output([str(p)], cwd=str(ROOT), text=True, timeout=15)
        data = json.loads(out)
        assert data['read_only'] is True
        if b in COMPATIBILITY_ROUTES:
            parent, chunk = COMPATIBILITY_ROUTES[b]
            assert data['parent'] == parent, (b, data)
            assert data['chunk'] == chunk, (b, data)
            assert data['compatibility_command'] == b, (b, data)
    guard = (ROOT/'scripts/linux-safety-guard.py').read_text()
    for token in ['setfacl','useradd','visudo','rsync']:
        assert token in guard
    print('command, auth and permission routing test passed')

if __name__ == '__main__':
    main()
