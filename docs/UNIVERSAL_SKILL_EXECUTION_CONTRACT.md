# Universal Skill Execution Contract

Every `linux-admin` skill must follow this contract. This applies to all existing skills, future skills, hooks, automation, docs, website update text, and generated recommendations.

## 1. Security checks and facts before apply

Before recommending or applying any change, the skill must collect bounded facts first:

- operating system and version
- package/service/tool version when relevant
- running state and current config path
- security context: SELinux/AppArmor/firewall/auth exposure
- remote access risk: SSH/RDP/VPN/bastion/cloud console availability
- blast radius: single host, cluster, production service, client-facing path

Do not apply changes based on assumptions. State which facts are known and which are still missing.

## 2. Rollback plan

Every change path must include rollback before implementation:

- exact file backup path or snapshot/checkpoint
- exact command to restore the prior state
- service reload/restart rollback steps
- package downgrade or config restore path when relevant
- validation command proving rollback worked

If rollback is not realistic, state that clearly and require explicit approval before proceeding.

## 3. Wrong-instruction self-correction and GitHub issue path

When a skill instruction is found to be wrong, stale, unsafe, or incomplete while using or reviewing it:

1. Do not continue using the bad instruction.
2. State the safer corrected instruction.
3. Update the skill directly when the correction is evidence-based and narrow.
4. Create or update a GitHub issue only when it matches the user's concern and is safe/appropriate.
5. Label whether the evidence is official, community-confirmed, or needs verification.

Do not create noisy issues for speculative findings.

## 4. Architecture fit check

Every implementation recommendation must check whether the architecture is properly sized:

- **Over-implementation:** If the solution is heavier than needed, recommend the simpler relevant tool/feature and explain why it is safer, cheaper, easier to operate, or more reliable.
- **Under-implementation:** If the solution is too weak for the requirement, recommend the robust tool/feature and explain why the current design will fail or become risky.

Examples:

- Do not suggest Kubernetes for a single simple service when systemd or Docker Compose is enough.
- Do not suggest cron-only automation where systemd timers with logging/ordering are safer.
- Do not suggest single-node storage for a workload requiring HA and recovery guarantees.
- Do not suggest large tuning packs when one measured bottleneck needs one change.

## 5. Architecture audit in final output

Every final response for an implementation, migration, optimization, hardening, or production change must include a short architecture audit:

```text
Architecture fit: right-sized / over-implemented / under-implemented
Reason:
Better-fit tool or feature:
Operational risk:
Next improvement:
```

For small command fixes, keep this to one or two lines.

## 6. Backup and disaster plan for each tool/workflow

Each tool-specific skill must include a disaster plan appropriate to that tool:

- config backup
- data backup or snapshot when data-bearing
- restore procedure
- verification command
- failure scenario notes
- owner/operator action when automated rollback is impossible

Examples:

- Databases: dump/snapshot + restore test + WAL/binlog/replication note.
- DNS/BIND: zone backup + `named-checkconf`/`named-checkzone` + reload rollback.
- Firewalls/network: rollback timer + out-of-band access note.
- Monitoring: config backup + alert-notification impact note.
- Proxy/load balancer: config test + graceful reload + previous config restore.

## 7. Auto-rollback or guarded rollback for failed changes

For risky remote changes, especially network, firewall, SSH, RDP, routing, DNS, proxy, or load balancer changes, the skill must prefer guarded rollback:

- keep a second session open when possible
- schedule rollback before applying the risky change
- use `at`, `systemd-run`, or an equivalent timer where available
- cancel rollback only after validation succeeds
- avoid changes that can lock out the operator unless out-of-band access exists

Pattern:

```bash
# Example pattern only. Adapt to distro/tool.
cp -a /path/config /path/config.bak.$(date +%F-%H%M%S)
# schedule rollback before risky change
# apply narrow change
# validate from a new connection/session
# cancel rollback after validation
```

Do not pretend auto-rollback is possible when the platform/tool cannot support it. Use a guarded manual rollback plan instead.

## 8. Token-optimized execution

Every skill must avoid token exhaustion:

- use bounded commands: `head`, `tail`, `sed -n`, `journalctl -n`, `--since`, `--no-pager`
- avoid dumping full logs/configs unless required
- ask for exact failing service/file/host when broad output would be huge
- summarize large outputs and request only targeted snippets
- prefer reusable grep/ripgrep patterns
- group commands by decision branch
- avoid repeating the same explanation across steps

Default to small evidence windows first, then expand only when needed.

## Required output fields

For implementation or change recommendations, include:

```text
Security/facts check:
Architecture fit:
Backup/disaster plan:
Rollback/auto-rollback plan:
Implementation:
Validation:
Final architecture audit:
Token-saving note:
```

For diagnostic-only responses, include the same fields where relevant but keep them compact.

## Enforcement

- `skills/diagnose/SKILL.md` must route requests through this contract.
- `hooks/validate-linux-admin.sh` must detect missing contract coverage.
- New skills must include either a direct `## Universal Skill Execution Contract` section or a clear reference to this document.
- Existing skills should be updated progressively until all contain direct coverage.
