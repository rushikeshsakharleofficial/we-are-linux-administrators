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


def test_service_verify_preserves_recursive_error_semantics():
    skill = (ROOT / 'skills/service/SKILL.md').read_text()
    assert "systemd-analyze verify --help 2>&1 | grep -q -- '--recursive-errors'" in skill
    assert 'systemd-analyze verify --recursive-errors=no "$unit_file"' in skill
    assert 'Older systemd versions can print verification warnings while still returning zero' in skill
    assert 'never treat exit status alone as proof that the unit is clean' in skill


def test_service_preserves_narrow_rollback():
    skill = (ROOT / 'skills/service/SKILL.md').read_text()
    assert 'Do not use `systemctl revert <unit>` as the default rollback' in skill
    assert 'Rollback only the drop-in changed in this operation' in skill
    assert 'validate the real workload path' in skill


def test_service_dropin_backup_failure_is_not_suppressed():
    skill = (ROOT / 'skills/service/SKILL.md').read_text()
    assert 'if [ -d /etc/systemd/system/<unit>.d ]; then' in skill
    assert 'cp -a /etc/systemd/system/<unit>.d /var/tmp/<unit>.d.bak.$(date +%F-%H%M%S)' in skill
    assert 'cp -a /etc/systemd/system/<unit>.d /var/tmp/<unit>.d.bak.$(date +%F-%H%M%S) 2>/dev/null || true' not in skill
    assert 'do not continue to `systemctl edit` if that backup fails' in skill


if __name__ == '__main__':
    test_service_skill_exists()
    test_service_verify_uses_loaded_unit_fragment()
    test_service_verify_preserves_recursive_error_semantics()
    test_service_preserves_narrow_rollback()
    test_service_dropin_backup_failure_is_not_suppressed()
    print('service expert tests passed')
