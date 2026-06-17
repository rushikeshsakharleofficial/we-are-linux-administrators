#!/usr/bin/env python3
"""Generate grep-expert pattern metadata.

This script prints more than 1000 Linux admin search pattern rows.
It does not execute shell commands. It only prints reusable search metadata.
"""
from __future__ import annotations

DOMAINS = {
    "systemd_journal": ["failed", "failure", "error", "timeout", "dependency failed", "start request repeated", "main process exited", "code=exited", "failed with result", "unit entered failed"],
    "kernel_hardware": ["error", "warn", "panic", "oops", "call trace", "segfault", "machine check", "io error", "firmware", "thermal"],
    "memory_oom": ["oom", "out of memory", "killed process", "page allocation", "memory allocation", "cgroup out of memory", "swap", "kswapd", "reclaim", "thp"],
    "auth_ssh_sudo": ["failed password", "invalid user", "authentication failure", "permission denied", "accepted", "session opened", "session closed", "sudo", "pam", "publickey"],
    "network_firewall": ["connection refused", "connection timed out", "no route to host", "network unreachable", "reset by peer", "packet loss", "martian", "drop", "reject", "conntrack"],
    "dns_named": ["servfail", "nxdomain", "refused", "timeout", "lame server", "zone", "serial", "dnssec", "not authoritative", "transfer failed"],
    "web_php": ["upstream timed out", "connect failed", "permission denied", "primary script unknown", "segfault", "502", "504", "php fatal", "fastcgi", "rewrite"],
    "database": ["deadlock", "lock wait", "too many connections", "connection refused", "crash recovery", "checkpoint", "replication", "wal", "innodb", "slow query"],
    "storage_fs": ["no space left", "read only file system", "io error", "inode", "xfs", "ext4", "mount", "fstab", "fsck", "quota"],
    "packages": ["dependency", "conflict", "broken", "unmet", "failed", "transaction", "rpmdb", "dpkg", "lock", "signature"],
    "cron_automation": ["cron", "run-parts", "permission denied", "not found", "bad minute", "pam", "session", "mail", "exit status", "failed"],
    "containers": ["oomkilled", "restart", "pull", "image", "permission denied", "cgroup", "mount", "network", "dns", "health"],
    "security_audit": ["denied", "avc", "apparmor", "audit", "sudo", "authentication", "policy", "capability", "exec", "uid"],
    "mail": ["deferred", "bounced", "reject", "sasl", "tls", "queue", "relay", "timeout", "spf", "dkim"],
    "tls_certs": ["certificate", "expired", "verify failed", "handshake", "unknown ca", "hostname mismatch", "tls", "ssl", "not yet valid", "ocsp"],
}

SCOPES = ["system-log", "kernel-log", "auth-log", "web-log", "database-log", "mail-log", "audit-log", "service-journal", "config-tree", "package-log"]
METHODS = ["count", "bounded-lines", "bounded-context", "service-time-window", "recursive-config", "case-insensitive", "line-numbered"]


def main() -> None:
    print("id,domain,pattern,scope,method")
    count = 0
    for domain, patterns in DOMAINS.items():
        for pattern in patterns:
            for scope in SCOPES:
                for method in METHODS:
                    count += 1
                    print(f"{count},{domain},{pattern},{scope},{method}")
                    if count >= 1050:
                        return


if __name__ == "__main__":
    main()
