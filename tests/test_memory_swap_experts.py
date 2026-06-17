#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]


def main():
    manifest = json.loads((ROOT / '.claude-plugin/plugin.json').read_text())
    assert manifest['name'] == 'linux-admin'
    for skill in ['swap-expert', 'memory-expert']:
        assert (ROOT / 'skills' / skill / 'SKILL.md').exists(), skill
    for helper in ['swap-expert-audit.py', 'memory-expert-audit.py']:
        assert (ROOT / 'scripts' / helper).exists(), helper
    for wrapper in ['swap-expert-audit', 'memory-expert-audit']:
        assert (ROOT / 'bin' / wrapper).exists(), wrapper
    print('memory and swap expert tests passed')


if __name__ == '__main__':
    main()
