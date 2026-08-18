#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]


def main():
    manifest = json.loads((ROOT / '.claude-plugin/plugin.json').read_text())
    assert manifest['name'] == 'linux-admin'

    performance = ROOT / 'skills' / 'performance'
    assert (performance / 'SKILL.md').exists()
    assert (performance / 'chunks' / 'memory.md').exists()
    assert (performance / 'chunks' / 'swap.md').exists()
    assert not (ROOT / 'skills' / 'memory-expert').exists()
    assert not (ROOT / 'skills' / 'swap-expert').exists()

    expected = {
        'memory-expert-audit.py': 'chunks/memory.md',
        'swap-expert-audit.py': 'chunks/swap.md',
    }
    for helper, chunk in expected.items():
        path = ROOT / 'scripts' / helper
        assert path.exists(), helper
        text = path.read_text()
        assert '"legacy_command": True' in text
        assert '"parent_skill": "performance"' in text
        assert f'"chunk": "{chunk}"' in text

    for wrapper in ['swap-expert-audit', 'memory-expert-audit']:
        assert (ROOT / 'bin' / wrapper).exists(), wrapper

    print('performance legacy audit routing tests passed')


if __name__ == '__main__':
    main()
