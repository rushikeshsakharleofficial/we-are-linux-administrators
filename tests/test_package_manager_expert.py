#!/usr/bin/env python3
from pathlib import Path
import json, subprocess
ROOT = Path(__file__).resolve().parents[1]

def main():
    skill = ROOT/'skills/package-manager-expert/SKILL.md'
    assert skill.exists(), skill
    text = skill.read_text()
    for token in ['apt-get', 'apt-cache', 'apt-mark', 'dpkg', 'dnf', 'dnf5', 'yum', 'rpm', 'rollback', 'simulation']:
        assert token in text, token
    for p in ['option-catalog.md','playbooks.md','troubleshooting.md','research-sources.md']:
        assert (ROOT/'docs/package-manager-expert'/p).exists(), p
    b = ROOT/'bin/package-manager-expert-audit'
    assert b.exists() and (b.stat().st_mode & 0o111), b
    out = subprocess.check_output([str(b)], cwd=str(ROOT), text=True, timeout=20)
    data = json.loads(out)
    assert data['read_only'] is True
    guard = (ROOT/'scripts/linux-safety-guard.py').read_text()
    for token in ['apt-mark', 'dnf5', 'rpm --rebuilddb', 'dpkg --force-all']:
        assert token in guard, token
    print('package manager expert test passed')

if __name__ == '__main__':
    main()
