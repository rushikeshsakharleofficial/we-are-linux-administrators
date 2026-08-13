---
name: agent-model-dispatcher-expert
description: Agent and model routing expert for Linux administration workflows across Codex, Claude Code, OpenCode, GitHub Copilot, Cursor, Windsurf, Cline, Amazon Q Developer, Bedrock, Manus, Kimi, DeepSeek, GLM, local tools, and other maintained agent surfaces.
argument-hint: "[model|agent|codex|claude|opencode|copilot|cursor|windsurf|cline|amazon-q|bedrock|manus|kimi|deepseek|glm|dispatch] [task]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# Agent Model Dispatcher Expert

Use this skill for safe agent/model routing, task assignment, and low-to-high capability escalation across the maintained surfaces documented by this repository.

## Universal Skill Execution Contract

Follow `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Collect bounded facts first, redact sensitive information before external-model routing, preserve rollback planning for operational changes, check architecture fit, and keep final output concise.

## Surface compatibility rule

Before recommending a coding agent, identify how that tool receives repository instructions. Prefer existing portable files over tool-specific duplication.

Compatibility priority:

1. Use root `AGENTS.md` when the agent supports it.
2. Use the repository's `skills/*/SKILL.md` files as the Linux-admin procedure library.
3. Add a tool-specific adapter only when the tool requires its own rule location.
4. Never claim native plugin/skill installation unless the tool officially supports the repository's packaging format.
5. Do not copy all skills into multiple vendor directories just to advertise compatibility; that creates drift.

See `docs/AI_TOOL_SUPPORT.md` for the maintained compatibility matrix.

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
Prefer for repository edits, scripts, tests, config patches, CLI validation, structured diffs, and implementation work. Use root `AGENTS.md` as the project instruction entry point.

### Claude Code
Prefer for repo-wide reasoning, skill design, documentation architecture, cross-file consistency, safety review, and complex Linux planning. Use `CLAUDE.md` plus the Claude plugin metadata where applicable.

### OpenCode
Prefer for lightweight local codebase edits, `AGENTS.md`-compatible instruction execution, and quick repository tasks.

### GitHub Copilot
Prefer for GitHub-native coding-agent work, code review, IDE-assisted changes, and Copilot CLI workflows. Use `AGENTS.md` for agent instructions and `.github/copilot-instructions.md` for repository-wide Copilot guidance.

### Cursor
Prefer for interactive repository editing, scoped agent work, and IDE-based implementation. Cursor can consume root `AGENTS.md`; add `.cursor/rules` only when path-specific Cursor behavior is genuinely required.

### Windsurf
Prefer for Cascade-based repository work, reusable workflows, and skill-oriented IDE tasks. Windsurf can consume `AGENTS.md`; keep linux-admin procedures in the canonical `skills/` tree instead of duplicating every skill under Windsurf-specific directories.

### Cline
Prefer for permission-gated autonomous edits, terminal workflows, and users who want progressive skill loading. Cline supports `AGENTS.md` and native `SKILL.md`-style skills, but this repository keeps one canonical `skills/` tree. Instruct Cline to read the relevant `skills/<name>/SKILL.md` unless a dedicated install adapter is added later.

### Amazon Q Developer
Prefer for AWS-heavy development/operations workflows, IDE chat, GitHub integration, and enterprise AWS contexts. Amazon Q project rules use `.amazonq/rules/`; use the repository adapter there and route detailed Linux procedures back to the canonical `skills/` tree.

### Bedrock
Prefer approved Bedrock-hosted models where enterprise governance, provider controls, data residency, or compliance requirements apply. Bedrock is a model/runtime surface rather than a repository-instruction standard, so pair it with an agent client that can read this repository safely.

### Manus
Use autonomous workflow tools only for appropriate multi-step external-system work with explicit human approval gates for consequential actions.

### Kimi / DeepSeek / GLM
Use cost-efficient models for non-sensitive summarisation, code reading, alternate review, and draft plans when policy permits. Treat these as model choices unless the actual client has verified repository-tooling support.

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
  instruction_source:
  model_tier:
  escalation_condition:
  secret_handling:
  verification:
  rollback:
```

## Final guardrail

Optimize for the correct result, minimum safe token usage, minimum blast radius, verified facts, and rollback-ready execution — not for using the strongest model or the largest number of agent products.
