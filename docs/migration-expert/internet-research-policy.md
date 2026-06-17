# Internet research policy

The migration-expert must research externally when:

- major OS upgrade path is version-specific
- database major version behavior matters
- distro package manager changed behavior
- cloud/firewall/LB feature behavior matters
- error message is unknown
- vendor support matrix matters
- rollback procedure is unclear

## Source order

1. Official vendor documentation.
2. Project documentation and man pages.
3. Distro wiki/forum/mailing list.
4. Server Fault / Unix & Linux Stack Exchange for operational edge cases.
5. Blog posts only as weak supporting evidence.

## Required citation note in plan

Every researched plan must include:

```text
Sources checked:
Version assumptions:
Conflicting guidance:
Chosen approach and why:
Manual verification needed:
```
