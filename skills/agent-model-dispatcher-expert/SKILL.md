---
name: agent-model-dispatcher-expert
description: Agent and model routing expert for Linux administration workflows across Claude Code, Codex, OpenCode, GitHub Copilot, Cursor, Windsurf, Cline, Amazon Q Developer, Zed, JetBrains Junie, Aider, Sourcegraph Cody, goose, Bedrock-backed clients, local tools, and other verified agent surfaces.
argument-hint: "[model|agent|claude|codex|opencode|copilot|cursor|windsurf|cline|amazon-q|zed|junie|aider|cody|goose|bedrock|local|dispatch] [task]"
effort: high
allowed-tools: "Read Grep Glob Bash"
---

# Agent Model Dispatcher Expert

Use this skill for safe agent/model routing, task assignment, capability escalation, and cross-tool portability across the maintained surfaces documented by this repository.

## Universal Skill Execution Contract

Follow `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`. Collect bounded facts first, redact sensitive information before external-model routing, preserve rollback planning for operational changes, check architecture fit, and keep final output concise.

## Surface compatibility rule

Before recommending a coding agent, identify how that tool receives repository instructions and whether it has native skill discovery.

Compatibility priority:

1. Use root `AGENTS.md` when the agent supports it.
2. Use the repository's canonical `skills/*/SKILL.md` tree as the Linux-admin procedure library.
3. Use `CLAUDE.md`/`.claude-plugin/` for Claude Code packaging.
4. Use `opencode.json` for OpenCode's native instruction and skill catalog integration.
5. Use thin adapters such as `.github/copilot-instructions.md`, `.amazonq/rules/linux-admin.md`, or `.aider.conf.yml` only when the tool's own format materially improves support.
6. Never claim automatic instruction loading for a tool unless official docs confirm it.
7. Never claim marketplace/plugin/skill installation unless that package is actually published or the tool natively accepts this repository format.
8. Do not copy all 101 skills into multiple vendor directories merely to advertise compatibility.

See `docs/AI_TOOL_SUPPORT.md` for the maintained compatibility matrix and official-source refresh links.

## First classification

Classify each task by task type, required Linux skills, complexity, risk, production impact, repository-vs-remote execution, instruction-loading method, best agent surface, model tier, and escalation trigger.

## Model tiers

- **Tier 0 — local/deterministic tools:** discovery, parsing, bounded logs/config reads, validation, linters, tests, and package metadata checks.
- **Tier 1 — low model:** summarisation, formatting, simple explanations, small docs cleanup, and basic snippets after redaction.
- **Tier 2 — medium model:** config review, playbook drafting, service troubleshooting, moderate scripts, and small repository edits.
- **Tier 3 — high model:** production outages, security-sensitive changes, RCA, HA, database/storage/network changes, migrations, and risky SSH/firewall/routing/kernel/sysctl work.
- **Tier 4 — multi-agent expert mode:** critical incidents, major migrations, conflicting recommendations, multi-region architecture, and production data-loss risk.

Use the minimum capable tier. Local evidence collection comes before model escalation.

## Agent surface selection

### Claude Code
Prefer for repo-wide reasoning, skill design, documentation architecture, cross-file consistency, safety review, and complex Linux planning. Use `CLAUDE.md` plus the Claude plugin metadata and canonical skills.

### Codex
Prefer for repository edits, scripts, tests, config patches, CLI validation, structured diffs, and implementation work. Use root `AGENTS.md` as the project instruction entry point. Do not claim public Plugin directory installation unless verified.

### OpenCode
Prefer for local terminal/codebase workflows, custom agents, permission-controlled execution, and native on-demand skill loading. This repo exposes `AGENTS.md` plus `opencode.json` pointing at `./skills`.

### GitHub Copilot
Prefer for GitHub-native coding-agent work, code review, IDE-assisted changes, and Copilot CLI workflows. Use `AGENTS.md` plus `.github/copilot-instructions.md`; add path-specific instructions only for a real scoped requirement.

### Cursor
Prefer for interactive repository editing, scoped agent work, CLI/IDE implementation, and review loops. Cursor can consume root `AGENTS.md`; add `.cursor/rules` only when path-specific Cursor behavior is genuinely required.

### Windsurf
Prefer for Cascade-based repository work, reusable workflows, skill-oriented IDE tasks, and MCP-enabled workflows. Use `AGENTS.md` as portable project context and avoid forking canonical Linux procedures.

### Cline
Prefer for permission-gated autonomous edits and terminal workflows. Use `AGENTS.md`, then explicitly load only the relevant canonical `skills/<name>/SKILL.md` and chunks required by the task.

### Amazon Q Developer
Prefer for AWS-heavy development/operations workflows, IDE chat, GitHub/GitLab feature work, and enterprise AWS contexts. Use `.amazonq/rules/linux-admin.md` and route deep Linux procedures back to the canonical skill tree.

### Zed Agent
Prefer for editor-native agent work with project instructions, skills, MCP/ACP, configurable tool profiles, and granular tool permissions. Zed reads root `AGENTS.md`; keep terminal permissions conservative for Linux production operations.

### JetBrains Junie
Prefer for JetBrains-native autonomous implementation and IDE-aware workflows. Current Junie reads root `AGENTS.md`; retain approval for consequential terminal actions and point Junie at the relevant canonical skill files.

### Aider
Prefer for git-centric terminal pair programming and focused repository edits. `.aider.conf.yml` loads the portable project/safety files read-only; add only the task-specific skill file when deeper Linux context is needed.

### Sourcegraph Cody
Prefer for large-repository code intelligence, search-backed context, IDE chat, and Sourcegraph Enterprise workflows. Do not assume automatic `AGENTS.md` loading; attach repository/file context explicitly or use Cody CLI context flags.

### goose
Prefer for open-source agent workflows requiring MCP, ACP, recipes, skills, sandboxing, or provider flexibility. Until a verified linux-admin goose package is published, use explicit repository context and canonical `AGENTS.md`/`skills/` files.

### Bedrock and other model/runtime providers
Treat Bedrock-hosted models, Kimi, DeepSeek, GLM, Ollama/local models, OpenRouter, and similar providers as model/runtime choices unless the actual agent client has verified repository instruction support. Select the client first, then the model.

Do not route credentials, private customer data, authentication material, private keys, session cookies, or other secrets to external models. Redact first and prefer local processing for sensitive evidence.

## Complexity routing

- **1 — simple:** Tier 0/1.
- **2 — routine administration:** Tier 1/2 plus one primary skill.
- **3 — production change:** Tier 2 plus `change-safety-expert` and rollback.
- **4 — high risk:** Tier 3 plus the relevant expert skill and recovery validation.
- **5 — critical/multi-agent:** Tier 4 plus independent final review where justified.

## Tool-selection questions

Before routing, answer these internally:

1. Does this tool automatically load `AGENTS.md`?
2. Does it have native `SKILL.md` discovery, or must the skill be read explicitly?
3. Can it execute terminal/file operations, and what approval controls exist?
4. Does it support MCP/ACP or another external-tool protocol when required?
5. Is the task sensitive enough to require local-only processing or enterprise-controlled model hosting?
6. Would adding a vendor-specific adapter reduce friction without creating duplicated skill content?

## Escalation triggers

Escalate when configuration logic is unclear, multiple services interact, evidence conflicts, production or security impact exists, lockout/data-loss risk appears, tool permissions are overly broad, repository instruction loading is uncertain, or rollback becomes complex.

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
  skill_loading:
  execution_permissions:
  model_tier:
  model_runtime:
  escalation_condition:
  secret_handling:
  verification:
  rollback:
```

## Final guardrail

Optimize for the correct result, minimum safe token usage, minimum blast radius, verified compatibility, verified facts, and rollback-ready execution — not for using the strongest model or the largest number of AI products.
