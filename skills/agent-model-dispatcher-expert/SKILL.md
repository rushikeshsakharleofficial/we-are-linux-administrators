---
name: agent-model-dispatcher-expert
description: Agent and model routing expert for Linux administration workflows across Codex, Claude Code, OpenCode, Bedrock, Manus, Kimi, DeepSeek, GLM, local tools, and other maintained model surfaces.
argument-hint: "[model|agent|codex|claude|opencode|bedrock|manus|kimi|deepseek|glm|dispatch] [task]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# Agent Model Dispatcher Expert

Use this skill for safe agent/model routing, task assignment, and low-to-high capability escalation across the maintained surfaces documented by this repository.

## Universal Skill Execution Contract

Follow `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Collect bounded facts first, redact sensitive information before external-model routing, preserve rollback planning for operational changes, check architecture fit, and keep final output concise.

## First classification

Classify each task by task type, required Linux skills, complexity, risk, production impact, whether a repository or remote-server change is required, best surface, model tier, and escalation trigger.

## Model tiers

- **Tier 0 — local tools:** deterministic discovery, parsing, bounded logs/config reads, and validation.
- **Tier 1 — low model:** summarisation, formatting, simple explanation, small docs cleanup, and basic snippets after redaction.
- **Tier 2 — medium model:** config review, playbook drafting, service troubleshooting, moderate scripts, and small repository edits.
- **Tier 3 — high model:** production outages, security-sensitive changes, RCA, HA, database/storage/network changes, migrations, and risky SSH/firewall/routing/kernel/sysctl work.
- **Tier 4 — multi-agent expert mode:** critical incidents, major migrations, conflicting recommendations, multi-region architecture, and production data-loss risk.

Use the minimum capable tier. Local evidence collection comes before model escalation.

## Agent surface selection

### Codex
Prefer for repository edits, scripts, tests, config patches, CLI validation, structured diffs, and implementation work.

### Claude Code
Prefer for repo-wide reasoning, skill design, documentation architecture, cross-file consistency, safety review, and complex Linux planning.

### OpenCode
Prefer for lightweight local codebase edits, `AGENTS.md`-compatible instruction execution, and quick repository tasks.

### Bedrock
Prefer approved Bedrock-hosted models where enterprise governance, provider controls, data residency, or compliance requirements apply.

### Manus
Use autonomous workflow tools only for appropriate multi-step external-system work with explicit human approval gates for consequential actions.

### Kimi / DeepSeek / GLM
Use cost-efficient models for non-sensitive summarisation, code reading, alternate review, and draft plans when policy permits.

Do not route credentials, private customer data, authentication material, or other secrets to external models. Redact first and prefer local processing for sensitive evidence.

## Complexity routing

- **1 — simple:** Tier 0/1.
- **2 — routine administration:** Tier 1/2 plus one primary skill.
- **3 — production change:** Tier 2 plus `change-safety-expert` and rollback.
- **4 — high risk:** Tier 3 plus the relevant expert skill and recovery validation.
- **5 — critical/multi-agent:** Tier 4 plus independent final review where justified.

## Escalation triggers

Escalate when configuration logic is unclear, multiple services interact, evidence conflicts, production or security impact exists, lockout/data-loss risk appears, or rollback becomes complex.

## Required output

```yaml
task:
  summary:
  complexity:
  risk:
  primary_skill:
  support_skills:
  preferred_surface:
  model_tier:
  escalation_condition:
  secret_handling:
  verification:
  rollback:
```

## Final guardrail

Optimize for the correct result, minimum safe token usage, minimum blast radius, verified facts, and rollback-ready execution — not for using the strongest model.
