#!/usr/bin/env python3
from pathlib import Path
import json
import subprocess

ROOT = Path(__file__).resolve().parents[1]

def test_files_exist():
    required = [
        'skills/networking-expert/SKILL.md',
        'docs/networking-expert/diagnostic-method.md',
        'docs/networking-expert/routing-dns-firewall.md',
        'scripts/networking-expert-audit.py',
        'bin/networking-expert-audit',
    ]
    missing = [p for p in required if not (ROOT / p).exists()]
    assert not missing, missing

def test_audit_json():
    p = subprocess.run([str(ROOT/'scripts/networking-expert-audit.py')], text=True, capture_output=True, timeout=25)
    assert p.returncode == 0, p.stderr
    data = json.loads(p.stdout)
    assert data['tool'] == 'networking-expert-audit'
    assert data['read_only'] is True

if __name__ == '__main__':
    test_files_exist(); test_audit_json(); print('networking expert tests passed')
