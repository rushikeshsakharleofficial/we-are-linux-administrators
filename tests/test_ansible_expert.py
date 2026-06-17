#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

REQUIRED_FILES = [
    'skills/ansible-expert/SKILL.md',
    'docs/ansible-expert/PLAN.md',
    'docs/ansible-expert/BEST_PRACTICES.md',
    'docs/ansible-expert/PRODUCTION_UPDATE_STRATEGY.md',
    'docs/ansible-expert/PROXY_JUMP_HOSTS.md',
    'docs/ansible-expert/INTERPRETER_COMPATIBILITY.md',
    'docs/ansible-expert/CMDB_INVENTORY.md',
]

REQUIRED_TERMS = [
    'module',
    'Inventory',
    'CMDB',
    'group_vars',
    'host_vars',
    'Handlers',
    'ansible.cfg',
    'Forks',
    'Proxy',
    'Interpreter',
    'package',
    'rollback',
    'disaster',
]


def main():
    for rel in REQUIRED_FILES:
        assert (ROOT / rel).exists(), rel
    skill_text = (ROOT / 'skills/ansible-expert/SKILL.md').read_text()
    for term in REQUIRED_TERMS:
        assert term.lower() in skill_text.lower(), f'missing {term}'
    cmdb_text = (ROOT / 'docs/ansible-expert/CMDB_INVENTORY.md').read_text()
    for term in ['lifecycle', 'patch_group', 'maintenance_window', 'write-back', 'jump', 'proxy']:
        assert term.lower() in cmdb_text.lower(), f'CMDB doc missing {term}'
    print('ansible expert tests passed')


if __name__ == '__main__':
    main()
