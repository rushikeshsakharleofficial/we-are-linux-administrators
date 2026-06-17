#!/usr/bin/env python3
from pathlib import Path
import json, subprocess, sys
ROOT = Path(__file__).resolve().parents[1]

SKILLS = ['command-expert','user-permissions-expert','file-permissions-expert','acl-permissions-expert']
BINS = ['command-expert-audit','user-permissions-expert-audit','file-permissions-expert-audit','acl-permissions-expert-audit']

def main():
    for s in SKILLS:
        p = ROOT/'skills'/s/'SKILL.md'
        assert p.exists(), p
        txt = p.read_text()
        assert 'Read-only' in txt or 'read-only' in txt
        assert 'rollback' in txt.lower() or 'restore' in txt.lower()
    for b in BINS:
        p = ROOT/'bin'/b
        assert p.exists(), p
        assert p.stat().st_mode & 0o111, p
        out = subprocess.check_output([str(p)], cwd=str(ROOT), text=True, timeout=15)
        data = json.loads(out)
        assert data['read_only'] is True
    guard = (ROOT/'scripts/linux-safety-guard.py').read_text()
    for token in ['setfacl','useradd','visudo','rsync']:
        assert token in guard
    print('command and permission experts test passed')

if __name__ == '__main__':
    main()
