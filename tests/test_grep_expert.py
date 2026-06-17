#!/usr/bin/env python3
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]


def main():
    skill = ROOT / 'skills' / 'grep-expert' / 'SKILL.md'
    flow = ROOT / 'docs' / 'grep-expert' / 'TOKEN_SAVING_FLOW.md'
    library = ROOT / 'docs' / 'grep-expert' / 'PATTERN_LIBRARY.md'
    generator = ROOT / 'scripts' / 'grep-expert-patterns.py'

    for path in [skill, flow, library, generator]:
        assert path.exists(), str(path)

    skill_text = skill.read_text()
    assert 'grep-expert' in skill_text
    assert 'Token-saving' in skill_text or 'token-saving' in skill_text

    result = subprocess.run([sys.executable, str(generator)], text=True, capture_output=True, check=True)
    rows = [line for line in result.stdout.splitlines() if line and not line.startswith('id,')]
    assert len(rows) >= 1000, len(rows)

    print('grep expert tests passed')


if __name__ == '__main__':
    main()
