# Package Manager Change Plan

## Goal

## Detected platform

- OS:
- Package stack:
- Package manager version:
- Critical services affected:

## Evidence collected

```bash
package-manager-expert-audit
```

## Risk classification

- [ ] Read-only query
- [ ] Cache/metadata refresh
- [ ] Install/update/remove transaction
- [ ] Repository trust/source change
- [ ] Recovery/repair
- [ ] Rollback/downgrade
- [ ] Release migration

## Proposed transaction

```bash
# preview first

# apply after approval
```

## Expected package changes

| Package | Action | Current | Target | Repository | Reason |
|---|---|---|---|---|---|

## Risk notes

- Packages removed:
- Packages downgraded:
- Held/protected packages changed:
- Kernel/boot packages changed:
- Services needing restart:
- Reboot required:

## Rollback plan

```bash
# package-manager history / exact version / snapshot restore plan
```

## Validation

```bash
# package-manager checks
# service checks
# application checks
```

## Why not a shortcut?

Explain why not using force/nodeps/allowerasing/skip-broken/blind dist-upgrade.
