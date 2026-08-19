#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]


def main():
    manifest = json.loads((ROOT / '.claude-plugin/plugin.json').read_text())
    assert manifest['name'] == 'linux-admin'

    parent = ROOT / 'skills' / 'automation' / 'SKILL.md'
    chunk = ROOT / 'skills' / 'automation' / 'chunks' / 'bash-scripting.md'
    assert parent.exists()
    assert chunk.exists()

    parent_text = parent.read_text()
    chunk_text = chunk.read_text()
    assert 'chunks/bash-scripting.md' in parent_text
    assert 'Bash/script creation, review, debugging, hardening or POSIX portability' in parent_text
    assert '# Bash and POSIX shell automation' in chunk_text
    assert 'ShellCheck-style review' in chunk_text
    assert '/bin/sh' in chunk_text
    assert 'dry-run' in chunk_text
    assert 'rollback' in chunk_text

    for retired in ['bash-script-expert', 'shell-script-expert']:
        assert not (ROOT / 'skills' / retired / 'SKILL.md').exists(), retired

    print('automation bash and POSIX shell chunk tests passed')


if __name__ == '__main__':
    main()
