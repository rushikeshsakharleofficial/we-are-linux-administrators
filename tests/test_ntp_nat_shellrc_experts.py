#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]


def main():
    manifest = json.loads((ROOT / '.claude-plugin/plugin.json').read_text())
    assert manifest['name'] == 'linux-admin'
    for skill in ['ntp-expert', 'natting-expert', 'bashrc-expert', 'zshrc-expert']:
        p = ROOT / 'skills' / skill / 'SKILL.md'
        assert p.exists(), skill
        assert p.read_text().strip().startswith('# '), skill
    print('ntp natting bashrc zshrc expert tests passed')


if __name__ == '__main__':
    main()
