#!/usr/bin/env python3
from pathlib import Path
import json
import subprocess

ROOT = Path(__file__).resolve().parents[1]


def test_quota_parent_chunk_and_legacy_audit():
    parent = ROOT / 'skills/storage/SKILL.md'
    chunk = ROOT / 'skills/storage/chunks/quota.md'
    audit = ROOT / 'bin/quota-expert-audit'

    for path in (parent, chunk, audit):
        assert path.exists(), path

    chunk_text = chunk.read_text().lower()
    assert 'quota' in chunk_text
    assert any(token in chunk_text for token in ['read-only', 'read only', 'evidence'])
    assert any(token in chunk_text for token in ['rollback', 'restore', 'recovery'])

    assert audit.stat().st_mode & 0o111, audit
    out = subprocess.check_output([str(audit)], cwd=str(ROOT), text=True, timeout=20)
    data = json.loads(out)
    assert data['read_only'] is True
    assert data['parent_skill'] == 'storage', data
    assert data['chunk'] == 'chunks/quota.md', data
    assert data['legacy_command'] is True, data


if __name__ == '__main__':
    test_quota_parent_chunk_and_legacy_audit()
    print('quota compatibility routing test passed')
