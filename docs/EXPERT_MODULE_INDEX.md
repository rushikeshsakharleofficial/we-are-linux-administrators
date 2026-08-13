# Expert Module Index

102 skills.

The canonical skill-selection map is [`skills/using-linux-admin/SKILL.md`](../skills/using-linux-admin/SKILL.md).

This file intentionally does not duplicate the full parent/micro-skill routing table. Keeping two routing maps creates drift and makes agents load unnecessary context.

## Entry points

| Need | Skill |
|---|---|
| Choose the correct Linux skill | `using-linux-admin` |
| Unknown Linux problem | `diagnose` |
| Broad senior execution | `linux-admin-chief-engineer` |
| Production change safety | `change-safety-expert` |
| Optimisation/tuning gate | `optimization-guardian-expert` |
| Universal safety contract enforcement | `universal-contract-guardian-expert` |
| AI client/model selection | `agent-model-dispatcher-expert` |

## Parent domains

| Domain | Parent skill |
|---|---|
| Boot | `boot` |
| Kernel | `kernel` |
| Services | `service` |
| Performance | `performance` |
| Storage | `storage` |
| Permissions | `permissions` |
| Authentication/identity | `auth` |
| Networking | `network` |
| Load balancing | `load-balancer-expert` |
| Security | `security-expert` |
| Containers | `containers` |
| Logging | `logs` |
| Migration | `migration-expert` |

For a known technology or failure layer, `using-linux-admin` routes directly to the matching micro-skill such as `lvm-expert`, `named-expert`, `firewall-expert`, `haproxy-expert`, `selinux-expert`, `mysql-expert`, `systemd-expert`, or `tcpdump-expert`.

## Rule

Do not load the whole skill tree. Read `using-linux-admin`, select one primary specialist, add no more than two support skills unless the task is an incident/migration/multi-domain production change, then load only the selected skill and required chunks.
