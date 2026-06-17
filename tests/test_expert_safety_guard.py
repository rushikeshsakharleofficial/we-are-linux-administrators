#!/usr/bin/env python3
import io
import json
import importlib.util
import sys
from pathlib import Path
from contextlib import redirect_stdout

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / 'scripts' / 'linux-safety-guard.py'

spec = importlib.util.spec_from_file_location('linux_safety_guard', SCRIPT)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

def run(cmd: str) -> str:
    old_stdin = sys.stdin
    try:
        sys.stdin = io.StringIO(json.dumps({'tool_name':'Bash','tool_input':{'command':cmd}}))
        buf = io.StringIO()
        with redirect_stdout(buf):
            mod.main()
        return buf.getvalue().strip()
    finally:
        sys.stdin = old_stdin

def assert_asks(cmd: str):
    out = run(cmd)
    assert '"permissionDecision":"ask"' in out, (cmd, out)

def main():
    for cmd in [
        'systemctl daemon-reload',
        'systemctl set-property nginx.service TasksMax=4096',
        'ulimit -n 65535',
        'prlimit --pid 123 --nofile=65535:65535',
        'vim /etc/security/limits.d/nginx.conf',
        'ip route add default via 10.0.0.1',
        'ip addr add 10.0.0.10/24 dev eth0',
        'tc qdisc add dev eth0 root fq',
        'ethtool -K eth0 gro off',
        'resolvectl dns eth0 1.1.1.1',
    ]:
        assert_asks(cmd)
    print('expert safety guard tests passed')

if __name__ == '__main__':
    main()
