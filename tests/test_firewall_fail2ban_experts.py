#!/usr/bin/env python3
from pathlib import Path
import json, subprocess
ROOT = Path(__file__).resolve().parents[1]

def test_files_exist():
    required = [
        'skills/firewall-expert/SKILL.md', 'skills/fail2ban-expert/SKILL.md',
        'docs/firewall-expert/firewall-model.md', 'docs/fail2ban-expert/jail-model.md',
        'scripts/firewall-expert-audit.py', 'scripts/fail2ban-expert-audit.py',
        'bin/firewall-expert-audit', 'bin/fail2ban-expert-audit'
    ]
    missing = [p for p in required if not (ROOT/p).exists()]
    assert not missing, missing

def test_audit_json():
    for script, tool in [('firewall-expert-audit.py','firewall-expert-audit'), ('fail2ban-expert-audit.py','fail2ban-expert-audit')]:
        p = subprocess.run([str(ROOT/'scripts'/script)], text=True, capture_output=True, timeout=30)
        assert p.returncode == 0, p.stderr
        data = json.loads(p.stdout)
        assert data['tool'] == tool
        assert data['read_only'] is True

if __name__ == '__main__':
    test_files_exist(); test_audit_json(); print('firewall/fail2ban expert tests passed')

# Safety-hook smoke tests are intentionally simple; detailed regex coverage lives in direct guard tests.
