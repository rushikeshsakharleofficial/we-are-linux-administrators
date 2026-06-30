---
name: agent-model-dispatcher-expert
description: Agent and model routing expert for Linux administration workflows. Assigns tasks to Codex, Claude Code, OpenCode, Gemini, Bedrock, Manus, Kimi, DeepSeek, GLM, local tools, or other model surfaces using low-to-high escalation based on complexity, risk, and evidence.
argument-hint: "[model|agent|codex|claude|gemini|bedrock|manus|kimi|deepseek|glm|dispatch] [task]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# Agent Model Dispatcher Expert

Use this skill when the task needs model/tool routing, agent assignment, low-to-high model escalation, Codex vs Claude Code selection, or orchestration across Claude Code, Codex, OpenCode, Gemini, Bedrock, Manus, Kimi, DeepSeek, GLM, local tools, or similar model surfaces.

This skill optimizes for correctness, safety, token cost, and the minimum capable model.

## Primary goal

Assign the right task to the right skill, agent, and model tier.

Do not use a high-cost model when local tools or a low-cost model can safely answer. Do not use a low-capability model for production-risk, security-sensitive, or ambiguous Linux changes.

## First classification

Classify every task by:

```text
Task type:
Required Linux skills:
Complexity: 1-5
Risk: low / medium / high / critical
Secrets involved: yes/no
Production impact: yes/no
Repository edit required: yes/no
Remote server change required: yes/no
Best surface:
Model tier:
Escalation trigger:
```

## Model tiers

### Tier 0: local tools only

Use for safe discovery and deterministic parsing:

- `grep`, `rg`, `find`, `awk`, `sed`
- `journalctl`, `systemctl`, `ss`, `ip`, `df`, `du`, `free`, `ps`
- config listing and bounded file reads
- validation commands

Rule:

```text
Never spend high-model tokens when a local command can answer safely.
```

### Tier 1: low model

Use for:

- log summarization
- simple command explanation
- report formatting
- small documentation cleanup
- basic shell snippets
- inventory parsing after secrets are removed

### Tier 2: medium model

Use for:

- config review
- Ansible/playbook drafting
- service troubleshooting
- package upgrade planning
- moderate scripts
- small repository edits
- web server/proxy policy drafts

### Tier 3: high model

Use for:

- production outage reasoning
- security-sensitive changes
- root-cause analysis with conflicting evidence
- HA/failover design
- database/storage/network changes
- firewall, SSH, routing, VPN, kernel, or sysctl changes
- migration plans

### Tier 4: multi-agent expert mode

Use for:

- critical incidents
- major migrations
- security incidents
- multi-cloud or multi-region architecture
- conflicting model recommendations
- production data-loss risk
- final review of high-blast-radius work

Pattern:

```text
1. Local tools collect bounded evidence.
2. Low/medium model summarizes facts.
3. Specialist skill creates the plan.
4. High model reviews risk only when justified.
5. Final agent produces rollback-ready output.
```

## Agent surface selection

### Codex

Prefer Codex for:

- repository edits
- scripts
- tests
- config patches
- CLI validation
- structured diffs
- implementation tasks

### Claude Code

Prefer Claude Code for:

- repo-wide reasoning
- skill design
- documentation architecture
- cross-file consistency
- safety review
- complex Linux planning

### OpenCode

Prefer OpenCode for:

- lightweight local codebase edits
- Codex-compatible instruction execution
- quick repository tasks

### Gemini

Prefer Gemini for:

- long-context summarization
- large document review
- broad comparison
- low-cost first-pass analysis

### Bedrock

Prefer Bedrock-hosted models when:

- the organization requires enterprise-controlled model routing
- compliance requires approved providers
- data residency or provider governance matters

### Manus

Prefer Manus-like autonomous workflow tools for:

- multi-step browser/tool workflows
- task planning across external systems
- execution where human approval gates remain required

### Kimi / DeepSeek / GLM

Prefer cost-efficient models for:

- non-secret workloads
- alternate review
- code reading
- second-opinion checks
- summarization and draft plans

Do not send secrets or private customer data to external tools.

## Complexity scoring

### Complexity 1: simple

Examples:

- explain command
- small grep
- format output
- basic syntax fix

Use:

```text
Tier 0 or Tier 1
```

### Complexity 2: routine admin

Examples:

- service issue
- log review
- disk cleanup plan
- user permission check

Use:

```text
Tier 1 or Tier 2 + one primary skill
```

### Complexity 3: production change

Examples:

- package upgrade
- web proxy change
- firewall rule
- rate-limit policy
- database config change

Use:

```text
Tier 2 + change-safety-expert + rollback plan
```

### Complexity 4: high risk

Examples:

- storage resize
- HA failover
- SSH/routing/firewall remote change
- kernel/sysctl tuning
- SELinux/AppArmor policy change

Use:

```text
Tier 3 + relevant expert skill + recovery validation
```

### Complexity 5: critical or multi-agent

Examples:

- active outage
- security incident
- production data risk
- multi-region migration
- conflicting recommendations

Use:

```text
Tier 4 multi-agent mode + high-model final review
```

## Secret handling

Never route these to external models:

- passwords
- SSH private keys
- API tokens
- cloud credentials
- database dumps
- cookies
- MFA secrets
- customer private data
- private certificates

Redact before routing. Prefer local-only processing for sensitive logs and configs.

## Required output format

```yaml
task:
  summary:
  complexity:
  risk:
  primary_skill:
  support_skills:
  preferred_surface:
  model_tier:
  why_this_model:
  escalation_condition:
  secret_handling:
  verification:
  rollback:
```

## Skill routing examples

```text
Nginx 502:
Primary: nginx-expert
Support: service, logs, tcp-expert
Surface: local tools -> Codex/Claude Code if config patch needed
Model: Tier 1 -> Tier 2
```

```text
PostgreSQL slow after traffic increase:
Primary: postgresql-expert
Support: performance, memory-expert, disk-mounting-expert
Surface: local metrics first, high model only for production tuning decision
Model: Tier 2 -> Tier 3
```

```text
CentOS 5 to Rocky 9 migration:
Primary: migration-expert
Support: package-manager-expert, change-safety-expert, service-specific skills
Surface: Claude Code for plan, Codex for scripts
Model: Tier 3 or Tier 4
```

```text
AI-generated Linux source change:
Primary: linux-source-guardian-expert
Support: command-expert, security-expert, change-safety-expert
Surface: high-model review only after redaction and local evidence
Model: Tier 3 or Tier 4
```

## Escalation rules

Escalate from low to medium when:

- configuration logic is unclear
- multiple services are involved
- a generated command could change state
- initial analysis conflicts with evidence

Escalate from medium to high when:

- production outage exists
- security impact exists
- network lockout risk exists
- storage/data-loss risk exists
- kernel/sysctl/firewall/SSH changes are involved
- rollback is complex

Escalate to multi-agent when:

- recommendations conflict
- business impact is high
- incident response is active
- migration spans multiple domains
- final decision needs independent review

## Final guardrail

Do not optimize for using the strongest model. Optimize for the correct result, minimum safe token usage, minimum blast radius, verified facts, and rollback-ready execution.
