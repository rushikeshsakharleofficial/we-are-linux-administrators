#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: safe-triage-collector.sh [output-dir]

Collects read-only Linux troubleshooting evidence into a local directory.
No services are restarted. No packages are changed. No files outside output-dir are modified.
EOF
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

OUT="${1:-linux-triage-$(hostname)-$(date +%F-%H%M%S)}"
mkdir -p "$OUT"

run() {
  local name="$1"; shift
  {
    echo "# $name"
    echo "# command: $*"
    echo "# time: $(date -Is)"
    timeout 25 "$@"
  } > "$OUT/$name.txt" 2>&1 || true
}

run os-release cat /etc/os-release
run uname uname -a
run uptime uptime
run hostnamectl hostnamectl
run failed-units systemctl --failed
run boot-errors journalctl -b -p err..alert --no-pager
run kernel-log journalctl -k -b --no-pager
run ip-link ip -br link
run ip-addr ip -br addr
run ip-route ip route
run ip-rule ip rule
run sockets ss -lntup
run resolver sh -c 'resolvectl status 2>/dev/null || cat /etc/resolv.conf'
run lsblk lsblk -f
run findmnt findmnt -o TARGET,SOURCE,FSTYPE,OPTIONS
run df df -hT
run df-inodes df -ih
run free free -h
run ps-cpu sh -c "ps -eo pid,ppid,user,stat,comm,%cpu,%mem,rss,vsz --sort=-%cpu | head -50"
run ps-mem sh -c "ps -eo pid,ppid,user,stat,comm,%cpu,%mem,rss,vsz --sort=-%mem | head -50"
run dmesg-errors sh -c "dmesg -T | grep -Ei 'error|fail|panic|oom|I/O|reset|denied|AVC|apparmor' | tail -200"
run nft sh -c 'nft list ruleset 2>/dev/null | head -300'
run iptables sh -c 'iptables-save 2>/dev/null | head -300'
run selinux sh -c 'getenforce 2>/dev/null; sestatus 2>/dev/null'
run apparmor sh -c 'aa-status 2>/dev/null'
run package-tools sh -c 'command -v apt apt-get dpkg dnf yum rpm zypper pacman 2>/dev/null'

tar -czf "$OUT.tar.gz" "$OUT" 2>/dev/null || true

echo "Triage bundle written to: $OUT"
[[ -f "$OUT.tar.gz" ]] && echo "Archive: $OUT.tar.gz"
