#!/usr/bin/env python3
import json, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def hook_decision(cmd: str):
    p = subprocess.run(
        [str(ROOT / 'scripts' / 'linux-safety-guard.py')],
        input=json.dumps({'tool_name':'Bash','tool_input':{'command':cmd}}),
        text=True,
        capture_output=True,
        check=True,
    )
    return json.loads(p.stdout).get('hookSpecificOutput', {})

assert (ROOT / 'skills' / 'sysctl-expert' / 'SKILL.md').exists()
assert (ROOT / 'docs' / 'sysctl-expert' / 'parameter-catalog.md').exists()
assert (ROOT / 'bin' / 'sysctl-expert-audit').exists()

for command in ['sysctl -w vm.swappiness=10', 'sysctl --system', 'echo 1 > /proc/sys/net/ipv4/ip_forward']:
    dec = hook_decision(command)
    assert dec.get('permissionDecision') in ('ask','deny'), (command, dec)

print('sysctl expert tests passed')
