#!/usr/bin/env python3
from pathlib import Path
import json
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]

def test_files_exist():
    required = [
        'skills/systemd-expert/SKILL.md',
        'docs/systemd-expert/diagnostic-method.md',
        'docs/systemd-expert/unit-design.md',
        'scripts/systemd-expert-audit.py',
        'bin/systemd-expert-audit',
    ]
    missing = [p for p in required if not (ROOT / p).exists()]
    assert not missing, missing

def test_audit_json():
    p = subprocess.run([str(ROOT/'scripts/systemd-expert-audit.py')], text=True, capture_output=True, timeout=25)
    assert p.returncode == 0, p.stderr
    data = json.loads(p.stdout)
    assert data['tool'] == 'systemd-expert-audit'
    assert data['read_only'] is True

if __name__ == '__main__':
    test_files_exist(); test_audit_json(); print('systemd expert tests passed')
