#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def test_service_skill_exists():
    assert (ROOT / 'skills/service/SKILL.md').exists()


def test_service_verify_uses_loaded_unit_fragment():
    skill = (ROOT / 'skills/service/SKILL.md').read_text()
    assert 'FragmentPath --value <unit>' in skill
    assert 'systemd-analyze verify "$unit_file"' in skill
    assert 'systemd-analyze verify "$unit_file" 2>/dev/null || true' not in skill


def test_service_preserves_narrow_rollback():
    skill = (ROOT / 'skills/service/SKILL.md').read_text()
    assert 'Do not use `systemctl revert <unit>` as the default rollback' in skill
    assert 'Rollback only the drop-in changed in this operation' in skill
    assert 'validate the real workload path' in skill


if __name__ == '__main__':
    test_service_skill_exists()
    test_service_verify_uses_loaded_unit_fragment()
    test_service_preserves_narrow_rollback()
    print('service expert tests passed')
