#!/usr/bin/env python3
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text()


def main():
    manifest = json.loads(read('.claude-plugin/plugin.json'))
    readme = read('README.md')

    assert manifest['name'] == 'linux-admin'
    assert 'version-' + manifest['version'] in readme

    skills = sorted(p.parent.name for p in (ROOT / 'skills').glob('*/SKILL.md'))
    assert len(skills) >= 90, len(skills)

    badge_match = re.search(r'skills-(\d+)-', readme)
    assert badge_match, 'README missing skills badge'
    assert int(badge_match.group(1)) == len(skills), f"README skill count {badge_match.group(1)} != actual {len(skills)}"

    for rel in [
        'bin/linux-triage',
        'bin/linux-log-classifier',
        'codex/AGENTS.md',
        'gemini/GEMINI.md',
    ]:
        assert (ROOT / rel).exists(), rel

    for phrase in [
        'read-only diagnostics',
        'rollback',
        'Validation',
        'skills/          skill definitions',
    ]:
        assert phrase in readme, f'README missing phrase: {phrase}'

    print('plugin integrity tests passed')


if __name__ == '__main__':
    main()
