#!/usr/bin/env python3
"""Small Linux log classifier for quick triage.

Usage:
  journalctl -b | ./log_classifier.py
  ./log_classifier.py /var/log/messages
"""
from __future__ import annotations

import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

PATTERNS = {
    "boot": r"(emergency\.target|rescue\.target|failed to mount|dracut|initramfs|root fs|fstab)",
    "service": r"(Main process exited|Failed with result|Start request repeated too quickly|Unit .* failed)",
    "network": r"(NetworkManager|systemd-networkd|wicked|DHCP|DNS|no route|link is down|carrier)",
    "firewall": r"(nftables|iptables|firewalld|UFW|DROP|REJECT)",
    "storage": r"(I/O error|blk_update|EXT4-fs error|XFS|BTRFS|mdadm|nvme|scsi reset|Buffer I/O)",
    "memory": r"(Out of memory|oom-kill|Killed process|memory allocation failure)",
    "kernel": r"(kernel panic|soft lockup|hard LOCKUP|hung task|BUG:|Oops|Call Trace)",
    "security": r"(AVC|SELinux|apparmor=\"DENIED\"|permission denied|audit)",
    "package": r"(dpkg|apt|dnf|yum|rpm|zypper|pacman|dependency|transaction)",
    "container": r"(docker|podman|containerd|runc|overlayfs|cgroup)",
}

compiled = {k: re.compile(v, re.I) for k, v in PATTERNS.items()}


def read_input() -> list[str]:
    if len(sys.argv) > 1:
        data: list[str] = []
        for arg in sys.argv[1:]:
            p = Path(arg)
            if p.exists():
                data.extend(p.read_text(errors="replace").splitlines())
        return data
    return sys.stdin.read().splitlines()


def main() -> int:
    lines = read_input()
    counts: Counter[str] = Counter()
    examples: dict[str, list[str]] = defaultdict(list)

    for line in lines:
        for label, pattern in compiled.items():
            if pattern.search(line):
                counts[label] += 1
                if len(examples[label]) < 5:
                    examples[label].append(line[:300])

    if not counts:
        print("No known high-signal patterns found.")
        return 0

    print("# Classification counts")
    for label, count in counts.most_common():
        print(f"{label}: {count}")

    print("\n# Examples")
    for label, _ in counts.most_common():
        print(f"\n## {label}")
        for example in examples[label]:
            print(f"- {example}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
