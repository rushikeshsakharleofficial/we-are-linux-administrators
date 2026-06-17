#!/usr/bin/env python3
from pathlib import Path
import json
import subprocess

ROOT = Path(__file__).resolve().parents[1]

def test_files_exist():
    required = [
        'skills/limits-expert/SKILL.md',
        'docs/limits-expert/limits-map.md',
        'docs/limits-expert/systemd-vs-pam-limits.md',
        'scripts/limits-expert-audit.py',
        'bin/limits-expert-audit',
    ]
    missing = [p for p in required if not (ROOT / p).exists()]
    assert not missing, missing

def test_audit_json():
    p = subprocess.run([str(ROOT/'scripts/limits-expert-audit.py')], text=True, capture_output=True, timeout=20)
    assert p.returncode == 0, p.stderr
    data = json.loads(p.stdout)
    assert data['tool'] == 'limits-expert-audit'
    assert data['read_only'] is True

if __name__ == '__main__':
    test_files_exist(); test_audit_json(); print('limits expert tests passed')
