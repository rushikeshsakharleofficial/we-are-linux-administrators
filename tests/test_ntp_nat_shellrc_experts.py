#!/usr/bin/env python3
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]


def main():
    manifest = json.loads((ROOT / '.claude-plugin/plugin.json').read_text())
    assert manifest['name'] == 'linux-admin'

    current_paths = [
        ROOT / 'skills/time/SKILL.md',
        ROOT / 'skills/time/chunks/chrony.md',
        ROOT / 'skills/network/SKILL.md',
        ROOT / 'skills/network/chunks/nat-conntrack.md',
        ROOT / 'skills/shell-rc-expert/SKILL.md',
    ]
    for path in current_paths:
        assert path.exists(), path
        assert path.read_text().strip(), path

    retired_paths = [
        ROOT / 'skills/ntp-expert/SKILL.md',
        ROOT / 'skills/natting-expert/SKILL.md',
        ROOT / 'skills/bashrc-expert/SKILL.md',
        ROOT / 'skills/zshrc-expert/SKILL.md',
    ]
    for path in retired_paths:
        assert not path.exists(), path

    time_parent = (ROOT / 'skills/time/SKILL.md').read_text()
    network_parent = (ROOT / 'skills/network/SKILL.md').read_text()
    shell_rc = (ROOT / 'skills/shell-rc-expert/SKILL.md').read_text()

    assert 'chrony.md' in time_parent
    assert 'nat-conntrack.md' in network_parent
    assert 'Bash' in shell_rc and 'Zsh' in shell_rc

    print('time NAT shell-rc routing tests passed')


if __name__ == '__main__':
    main()
