# Package Manager Expert — Research Sources

This module was built from official package-manager and distro administration docs plus practical community/admin guidance.

## Core sources to prefer during live research

- Debian man pages for `apt-get`, `apt-cache`, `apt-mark`, `dpkg`, `sources.list`, and `apt_preferences`.
- Debian Reference, Chapter 2: Debian package management.
- Ubuntu Community Help Wiki and AskUbuntu for Ubuntu-specific operational patterns.
- DNF command reference and DNF5 command docs.
- Red Hat RHEL 7 Yum guide and RHEL 8/9 DNF software-management docs.
- Fedora docs for DNF/DNF5 and system upgrade behavior.
- Vendor repo docs for third-party package sources.

## Key researched rules captured in the skill

- Use `apt` for interactive Debian administration; use `apt-get`/`apt-cache` for scripts and robust runbooks.
- Always simulate APT removals/full-upgrades before making changes.
- Treat APT dangerous options like `--allow-remove-essential`, `--allow-downgrades`, `--allow-change-held-packages`, and deprecated `--force-yes` as high-risk.
- Use DNF/DNF5 `repoquery`, `history`, `distro-sync`, advisories/security filters, and `--downloadonly`/`--store`/`--offline` where appropriate.
- YUM/DNF transaction undo/rollback depends on history and package availability; it is not a substitute for snapshots/backups.
- Do not mix repositories or suites casually; repo consistency is a package-management safety requirement.
