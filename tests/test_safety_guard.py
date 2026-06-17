#!/usr/bin/env python3
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "linux-safety-guard.py"


def run(cmd: str):
    p = subprocess.run(
        [str(SCRIPT)],
        input=json.dumps({"tool_name":"Bash","tool_input":{"command":cmd}}),
        text=True,
        capture_output=True,
        check=False,
    )
    return p.stdout.strip()


def assert_contains(cmd, text):
    out = run(cmd)
    assert text in out, (cmd, out)


def main():
    assert_contains("rm -rf /var/log", '"permissionDecision":"deny"')
    assert_contains("systemctl restart sshd", '"permissionDecision":"ask"')
    assert run("journalctl -b -p err..alert --no-pager") == ""
    print("safety guard tests passed")


if __name__ == "__main__":
    main()
