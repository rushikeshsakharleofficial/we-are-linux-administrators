# Linux patching migration plan

## Patch rollout model

1. Inventory packages, repos, kernel, running services.
2. Classify patches: security, bugfix, kernel, library, app dependency.
3. Identify reboot requirement.
4. Patch canary node first.
5. Validate service health and logs.
6. Continue in small batches.
7. Hold and rollback on failure patterns.

## RPM family

Use advisory filters where supported for security/CVE-scoped updates. Capture transaction history for rollback analysis.

## Debian family

Use apt simulation before upgrade where possible and identify held packages.

## Required checks

- free disk/inodes
- repo reachability
- package manager locks
- config file `.rpmnew`, `.rpmsave`, `.dpkg-dist`, `.dpkg-old`
- kernel modules/drivers
- service restart needs
- reboot window
