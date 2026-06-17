#!/usr/bin/env python3
"""Claude Code PreToolUse Bash safety guard for linux-admin plugin.

Reads hook JSON from stdin and returns PreToolUse decision JSON.
Class 3 destructive commands are denied.
Class 2 disruptive commands ask the user for confirmation.
Read-only commands pass through.
"""
from __future__ import annotations

import json
import re
import sys


def out(obj: dict) -> None:
    print(json.dumps(obj, separators=(",", ":")))


def decision(kind: str, reason: str) -> None:
    out({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": kind,
            "permissionDecisionReason": reason,
        }
    })


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except Exception:
        return 0

    if payload.get("tool_name") != "Bash":
        return 0

    cmd = (payload.get("tool_input") or {}).get("command") or ""
    normalized = re.sub(r"\s+", " ", cmd.strip())
    lowered = normalized.lower()

    deny_patterns = [
        (r"\bdpkg\b.*--force-all", "dpkg --force-all bypasses package safety checks and can corrupt package state."),
        (r"\bapt(-get)?\b.*(--allow-remove-essential|--force-yes)", "APT essential-package removal/force-yes can make the system unusable."),
        (r"\brpm\b.*(--nodeps|--force).*\b(-e|-u|-uvh|-ivh|--install|--erase)\b", "rpm --nodeps/--force bypasses dependency safety checks."),
        (r"\brm\s+-[^\n;|&]*r[^\n;|&]*f\s+/(\s|$|\*|;|&&|\|)", "Recursive force delete targets root or root-like path."),
        (r"\brm\s+-[^\n;|&]*r[^\n;|&]*f\s+/(etc|var|usr|boot|home|root|lib|lib64|bin|sbin)(/|\s|$)", "Recursive force delete targets critical system path."),
        (r"\bmkfs(\.|\s)", "Filesystem creation is destructive."),
        (r"\bwipefs\b", "wipefs can destroy filesystem signatures."),
        (r"\bdd\s+.*\bof=/dev/", "dd writing to a block device can destroy data."),
        (r"\b(lvremove|vgremove|pvremove)\b", "LVM removal is destructive."),
        (r"\blvreduce\b", "lvreduce can destroy data if used incorrectly."),
        (r"\bmdadm\b.*--zero-superblock", "mdadm zero-superblock is destructive."),
        (r"\b(sgdisk|sfdisk|fdisk|parted)\b.*\b(mklabel|delete|rm|zap|clear)\b", "Partition table modification is destructive."),
        (r"\bfsck\b.*\s-y\b", "Automatic filesystem repair can cause data loss; require maintenance planning."),
        (r"\bxfs_repair\b(?!.*\s-n\b)", "xfs_repair without -n can modify the filesystem."),
        (r"\bchmod\s+-r\s+777\s+/(\s|$|etc|var|usr|boot|home|root)", "Recursive chmod 777 on system paths is unsafe."),
        (r"\bchown\s+-r\s+[^\n;|&]+\s+/(\s|$|etc|var|usr|boot|home|root)", "Recursive chown on broad system paths is unsafe."),
        (r"\bnft\s+flush\s+ruleset\b", "Flushing all nftables rules can lock out remote access."),
        (r"\biptables\s+-f\b", "Flushing iptables can lock out remote access."),
        (r"\bsetenforce\s+0\b", "Disabling SELinux is not an acceptable first-line fix."),
    ]

    # scheduling-storage-kernel: mount -a, crontab, chronyc, timedatectl, quotaon, fsck, grub2-mkconfig
# package-manager-expert: rpm --rebuilddb, dpkg --force-all, apt-mark hold/unhold, dnf5 transactions
    ask_patterns = [

        (r"\b(apt|apt-get|aptitude|apt-mark|add-apt-repository|dpkg|dnf|dnf5|yum|rpm|subscription-manager)\b.*\b(install|remove|purge|upgrade|dist-upgrade|full-upgrade|autoremove|autopurge|reinstall|downgrade|distro-sync|system-upgrade|rollback|undo|redo|history\s+(undo|rollback|redo)|hold|unhold|mark|module\s+(enable|disable|reset|switch-to)|config-manager|repo\s+(enable|disable)|repolist|clean|makecache|--rebuilddb|--import|-i|-u|-e)\b", "Package-manager transaction/repo/database changes require evidence, preview/simulation, validation, and rollback."),
        (r"(/etc/apt/|/etc/yum\.repos\.d/|/etc/dnf/|/var/lib/dpkg/|/var/lib/rpm/|/var/lib/dnf/|/etc/pki/rpm-gpg/|/etc/apt/keyrings/|/usr/share/keyrings/)", "Package-manager repository/config changes require backup, trust verification, and rollback."),
        (r"\b(rndc\s+(reload|reconfig|restart|freeze|thaw|sync|sign|loadkeys)|named-checkzone\b.*\s-o\s|nsupdate\b)", "DNS/Cloudflare/security-impacting commands require config backup, validation, management access, and rollback."),
        (r"(/etc/named|/etc/bind|/var/named|/etc/dnsmasq\.conf|/etc/dnsmasq\.d/)", "DNS config/zone edits require syntax/zone validation before reload and rollback copy."),
        (r"\b(systemctl\s+(reload|restart|stop)\s+.*\b(named|bind9|dnsmasq)\b|dnsmasq\s+(?!.*--test))", "DNS service changes can break resolution/DHCP; require syntax test and rollback."),
        (r"\b(curl|httpie|wget)\b.*api\.cloudflare\.com.*\b(POST|PATCH|PUT|DELETE)\b|\b(wrangler|cloudflared|flarectl|cf-terraforming)\b.*\b(delete|create|update|put|patch|tunnel|route|dns|ruleset)\b", "Cloudflare changes require export/diff, least-privilege token/MCP scope, validation, and rollback."),
        (r"\b(auditctl|augenrules|semodule|semanage|setsebool|setenforce|aa-enforce|aa-complain|update-crypto-policies|fapolicyd-cli)\b.*\b(-D|-a|-w|--load|--set|enforcing|permissive|0|1|reload|restart|enable|disable)\b", "OS security policy changes require impact analysis, validation, and rollback."),


        (r"\b(crontab\s+(-e|-r|-u)|systemctl\s+(enable|disable|start|stop|restart|reload)\s+.*\.(timer|service)|systemd-run\b.*(--on-calendar|--on-active|--timer-property))", "Scheduling/time/quota/mount/filesystem/kernel changes require owner review, syntax validation, logging, rollback, and overlap control."),
        (r"(/etc/crontab|/etc/cron\.d/|/etc/cron\.(hourly|daily|weekly|monthly)|/var/spool/cron|/var/spool/cron/crontabs)", "Cron edits require backup, syntax validation, owner review, environment/PATH review, and rollback."),
        (r"\b(chronyc\s+(makestep|settime|offline|online|burst)|systemctl\s+(restart|stop|reload)\s+.*\b(chronyd|chrony|systemd-timesyncd|ntpd)\b|timedatectl\s+(set-time|set-timezone|set-ntp|set-local-rtc)|hwclock\s+(--systohc|--hctosys|--set))\b", "Time/NTP changes can break auth, TLS, clusters, databases, and logs; require impact analysis and rollback."),
        (r"\b(quotaon|quotaoff|quotacheck|edquota|setquota|xfs_quota)\b.*\b(-a|-x|-c|on|off|limit|project|enable|disable|check|repair|remove|timer)\b", "Quota changes can block writes or scan busy filesystems; require filesystem-specific plan and validation."),
        (r"\b(mount\s+-a|mount\b.*\s-o\s*(remount|rw|ro|bind|rbind|move)|umount\b.*(-a|-f|-l)|findmnt\s+--verify.*--tab-file|systemctl\s+(restart|daemon-reload).*mount)\b", "Mount/fstab changes can break boot or data access; require fstab backup, findmnt validation, and rollback."),
        (r"(/etc/fstab|/etc/systemd/system/.*\.mount|/etc/systemd/system/.*\.automount)", "Persistent mount config edits require backup, syntax validation, boot-impact review, and rollback."),
        (r"\b(fsck\b(?!.*\s-n\b)|e2fsck\b(?!.*\s-n\b)|xfs_repair\b(?!.*\s-n\b)|btrfs\s+check\b(?!.*--readonly)|resize2fs|xfs_growfs|tune2fs|xfs_admin)\b", "Filesystem repair/resize/tuning can affect data; require backup/snapshot, unmounted/read-only checks, and maintenance plan."),
        (r"\b(modprobe\s+(-r|--remove)|rmmod|insmod|dracut|update-initramfs|grub2-mkconfig|update-grub|grub-install|kdumpctl\s+(restart|enable|disable|propagate)|kexec)\b", "Kernel/module/boot changes require console access, rollback kernel/initramfs, and validation."),
        (r"\b(leapp\s+(upgrade|preupgrade|answer)|do-release-upgrade|fedup|dnf\s+system-upgrade)\b", "Migration-impacting commands require a migration plan, backup/snapshot, preflight report, console access, validation, and rollback gate."),
        (r"\b(pg_upgrade|pg_restore|mysqlpump|mariadb-dump|mysql\s+.*<|psql\s+.*(-f|<))\b", "Database migration/restore commands require backup integrity, restore test, downtime/cutover plan, validation, and rollback."),
        (r"\brsync\b(?!.*--dry-run)", "rsync without --dry-run changes destination state; migration syncs require reviewed dry-run, scope validation, and rollback."),
        (r"\b(scp|sftp)\b.*\s(-r|-b|put|mput)\b", "Bulk SFTP/SCP transfer can change destination data; require user/key/permission/data validation plan."),

        (r"\b(chmod|chown|chgrp|setfacl|chattr|lsattr|setcap)\b.*\b(-r|--recursive|--restore|-m|-x|-b|-k|\+i|-i|cap_)\b", "File ownership/mode/ACL/capability changes require current-state evidence, exact target preview, validation, and rollback."),
        (r"\b(useradd|usermod|userdel|groupadd|groupmod|groupdel|passwd|chage|gpasswd)\b", "User/group account changes require identity-source review, access impact analysis, validation, and rollback/offboarding plan."),
        (r"(/etc/passwd|/etc/shadow|/etc/group|/etc/gshadow|/etc/sudoers|/etc/sudoers\.d/|visudo)", "Account and sudoers file changes require backup, syntax validation, and least-privilege review."),
        (r"\b(sed|perl)\b.*\s-i(\b|\.)", "In-place text edits require backup, diff preview, config validation, and rollback."),
        (r"\bfind\b.*\b(-delete|-exec\s+rm|xargs\s+rm)\b", "Find-driven deletion requires target preview, count, backup/quarantine consideration, and rollback plan."),
        (r"\brsync\b.*--delete", "rsync --delete can remove data; require dry-run, source/destination confirmation, and rollback."),
        (r"\breboot\b|\bshutdown\b|\bpoweroff\b|\bsystemctl\s+reboot\b", "Reboot/shutdown is disruptive and needs explicit confirmation."),
        (r"\bsystemctl\s+(restart|stop)\s+.*\b(sshd|ssh|network|networkmanager|systemd-networkd|firewalld|iptables|nftables)\b", "Restarting SSH/network/firewall services can lock out remote access."),
        (r"\bsystemctl\s+(restart|stop)\b", "Service restart/stop is disruptive; confirm impact and rollback."),


        (r"\b(iptables|ip6tables|ebtables|arptables)\s+(-a|-i|-d|-r|-p|-f|-x|-n)\b", "Packet filter rule/chain/policy changes can lock out access; require backup, exact scope, validation, and rollback."),
        (r"\bufw\s+(allow|deny|reject|limit|delete|insert|prepend|route|enable|disable|reload|reset|default)\b", "UFW firewall changes can affect remote access; require dry-run/backup, management allow rule, validation, and rollback."),
        (r"\b(firewall-cmd|ufw|nft|iptables|ip6tables|iptables-restore|ip6tables-restore|ebtables|arptables|ipset)\b.*\b(add|remove|delete|del|insert|append|replace|flush|reset|reload|enable|disable|default|policy|permanent|restore|swap|destroy|create)\b", "Firewall rule/state changes can lock out access; require backup, exact scope, validation, and rollback."),
        (r"\bfail2ban-client\b.*\b(reload|restart|set|start|stop|banip|unbanip|unban|add|del|delete)\b", "Fail2Ban state/jail changes can block legitimate users; require ignoreip, validation, and rollback/unban plan."),
        (r"(/etc/firewalld/|/etc/nftables\.conf|/etc/iptables/|/etc/sysconfig/iptables|/etc/ufw/|/etc/fail2ban/)", "Firewall/Fail2Ban config edits require backup, test, reload plan, and rollback."),
        (r"\b(firewall-cmd|ufw|nft|iptables)\b.*\b(add|remove|delete|reload|enable|disable|default|policy|permanent)\b", "Firewall modification requires confirmation and rollback."),
        (r"\b(netplan\s+apply|netplan\s+try|nmcli\s+con\s+(up|down|mod|reload)|systemctl\s+restart\s+systemd-networkd)\b", "Network changes can break connectivity; confirm console/rollback."),
        (r"\b(apt|apt-get|dnf|yum|zypper|pacman)\b.*\b(install|remove|purge|upgrade|dist-upgrade|update|rollback|downgrade|autoremove)\b", "Package changes are state-changing and may be disruptive."),
        (r"\b(dnf\s+history\s+(undo|rollback)|yum\s+history\s+(undo|rollback))\b", "Package rollback requires history inspection and confirmation."),
        (r"\b(update-initramfs|dracut|grub2-mkconfig|update-grub|grub-install)\b", "Bootloader/initramfs changes require confirmation and rollback plan."),
        (r"\bmount\s+-a\b|\bumount\b|\bmount\b.*\s-o\s+remount", "Mount/remount operations can disrupt services."),
        (r"\brestorecon\s+-r\b|\bsemanage\b|\bsetsebool\b|\baa-complain\b|\baa-enforce\b", "Security policy changes require evidence and confirmation."),
        (r"\b(crontab\s+|systemctl\s+enable|systemctl\s+disable)\b", "Persistent scheduling/service enablement changes require confirmation."),

        (r"\bsystemctl\s+(daemon-reload|daemon-reexec|reload|try-reload-or-restart|reload-or-restart|reset-failed|mask|unmask|edit|set-property)\b", "systemd manager/unit state changes require confirmation, validation, and rollback."),
        (r"\b(systemctl\s+(enable|disable|preset|reenable)|systemctl\s+link)\b", "Persistent systemd enablement/link changes require confirmation."),
        (r"\b(ulimit|prlimit)\b.*(-n|-u|-l|--nofile|--nproc|--memlock|--pid)\b", "Resource limit changes require measured current usage, finite target, and rollback."),
        (r"(/etc/security/limits\.conf|/etc/security/limits\.d/|pam_limits\.so)", "PAM limits changes require scope analysis and new-session validation."),
        (r"\bip\s+(addr|address|route|rule|link|neigh)\s+(add|del|delete|change|replace|flush|set)\b", "Runtime IP/link/route/rule changes can break connectivity; require rollback/console plan."),
        (r"\btc\s+(qdisc|class|filter)\s+(add|del|delete|change|replace)\b", "Traffic control changes can disrupt connectivity/performance; require rollback."),
        (r"\bethtool\s+(-k|--offload|-g|--set-ring|-c|--coalesce|-l|--set-channels|-s|--change)\b", "NIC offload/ring/channel/link changes require evidence and rollback."),
        (r"\b(resolvectl\s+(dns|domain|default-route|llmnr|mdns|dnssec|dnsovertls)|nmcli\s+(con|connection)\s+(add|delete|modify|mod|up|down|reload)|netplan\s+(apply|try)|networkctl\s+(reload|reconfigure))\b", "Network manager/resolver changes can break connectivity; require rollback."),
        (r"\bsysctl\s+(-w|--write|-p|--load|--system)\b", "sysctl writes/reloads change kernel runtime behavior; require current value snapshot, rationale, validation, and rollback."),
        (r"(/proc/sys/|/etc/sysctl\.conf|/etc/sysctl\.d/)", "Writing sysctl files or /proc/sys can change kernel behavior; require explicit approval and rollback."),
    ]

    for pattern, reason in deny_patterns:
        if re.search(pattern, lowered):
            decision("deny", f"linux-admin safety guard denied command: {reason} Command: {normalized}")
            return 0

    for pattern, reason in ask_patterns:
        if re.search(pattern, lowered):
            decision("ask", f"linux-admin safety guard asks confirmation: {reason} Command: {normalized}")
            return 0

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
