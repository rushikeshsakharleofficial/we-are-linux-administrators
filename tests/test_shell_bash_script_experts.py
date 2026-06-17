#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]


def main():
    manifest = json.loads((ROOT / '.claude-plugin/plugin.json').read_text())
    assert manifest['name'] == 'linux-admin'
    for skill in ['bash-script-expert', 'shell-script-expert']:
        p = ROOT / 'skills' / skill / 'SKILL.md'
        assert p.exists(), skill
        text = p.read_text()
        assert text.startswith('# '), skill
    assert (ROOT / 'docs' / 'bash-script-expert' / 'PLAN.md').exists()
    assert (ROOT / 'docs' / 'shell-script-expert' / 'PLAN.md').exists()
    print('shell and bash script expert tests passed')


if __name__ == '__main__':
    main()
