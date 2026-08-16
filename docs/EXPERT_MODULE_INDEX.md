# Expert Module Index

99 top-level skills.

Canonical routing map: [`skills/using-linux-admin/SKILL.md`](../skills/using-linux-admin/SKILL.md).

Do not maintain a second full routing matrix here. `using-linux-admin` selects the parent/specialist; each parent owns its own condition-to-chunk decision table.

## Routing model

```text
using-linux-admin
  -> one parent/specialist
    -> bounded evidence
      -> one matching chunk
```

Load a second chunk only when the evidence proves a cross-layer issue. Unknown conditions stay in the parent baseline flow until the failing layer is known.

## Entry points

| Need | Skill |
|---|---|
| Choose the correct Linux domain | `using-linux-admin` |
| Unknown Linux problem | `diagnose` |
| Broad senior execution | `linux-admin-chief-engineer` |
| Active incident response | `incident-response-expert` |
| Incident Word/Excel/PDF/PowerPoint report | `incident-report-creator-expert` |
| Production change safety | `change-safety-expert` |
| Optimisation/tuning gate | `optimization-guardian-expert` |
| Universal safety contract | `universal-contract-guardian-expert` |
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
| Incident response | `incident-response-expert` |

## Consolidation status

Network is the first converted parent. Its condition-specific chunks are:

| Condition | Chunk |
|---|---|
| TCP lifecycle/retransmit/SYN/PMTUD/socket issue | `skills/network/chunks/tcp.md` |
| UDP loss/fragmentation/buffer/NAT-timeout issue | `skills/network/chunks/udp.md` |
| packet-level proof/tcpdump | `skills/network/chunks/packet-capture.md` |
| VLAN/bond/LACP/MTU/failover issue | `skills/network/chunks/vlan-bonding.md` |

Former top-level `tcp-expert`, `udp-expert`, `tcpdump-expert`, and `vlan-bonding-expert` were removed after their useful procedures were moved into these chunks.

Other domains will be consolidated only when overlap is verified; distinct technologies remain top-level when merging would make routing less reliable.

## Local/global discovery

Agent-specific project and user paths are documented in [`LOCAL_GLOBAL_AGENT_SETUP.md`](LOCAL_GLOBAL_AGENT_SETUP.md). Canonical skills remain under `skills/`; global installs copy them into supported discovery locations rather than creating another source of truth.
