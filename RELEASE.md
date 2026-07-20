# Release 1.17.73

## Package

- NPM package version: `1.17.73`
- Plugin metadata version: `1.17.73`
- Skill count: `101`
- Package name: `linux-admin`

## Added

- `minimal-architecture-expert` — designs the smallest safe production architecture for traffic, load distribution, user flows, compliance constraints, failure scenarios, and rollback.
- `linux-source-guardian-expert` — re-verifies AI-suggested Linux changes and blocks unsafe kernel/source-code edits unless proper expert review, lab validation, and recovery planning exist.
- `server-memory-expert` — adds lightweight text-file server context memory for host identity, aliases, access flow, jump-host paths, and vault references without storing plaintext secrets.
- `web-stack-security-expert` — unifies Apache, NGINX, OpenLiteSpeed, proxy, TLS, cache, WAF, and adaptive rate-limit policy guidance.
- `linux-admin-chief-engineer` — acts as the top-level Linux engineer dispatcher for broad tasks, skill selection, token-bounded evidence collection, and safe next actions.
- `agent-model-dispatcher-expert` — routes tasks across Codex, Claude Code, OpenCode, Gemini, Bedrock, Manus, Kimi, DeepSeek, GLM, local tools, and low-to-high model tiers.

## Updated

- `README.md` — clarified Codex usage so the immediately available path is the AGENTS.md project-instruction workflow, while Codex plugin-directory installation is described only as "when published/shared".
- `README.md` — aligned version and skill count to `1.17.73` / `101`.
- `package.json` — aligned to `1.17.73` and 101-skill description.
- `.claude-plugin/plugin.json` — aligned description and version to the current 101-skill repository state.
- `.claude-plugin/marketplace.json` — aligned marketplace metadata to `1.17.73` and 101 skills.
- `site/assets/data/latest-update.json` — aligned website release popup to `1.17.73` and 101 skills.
- `AGENTS.md` and `CLAUDE.md` — retain the rule that Codex Plugin directory availability must not be claimed unless verified.

## Safety notes

- The new server memory skill explicitly forbids storing plaintext passwords, SSH private keys, API tokens, MFA secrets, cookies, private certificates, and customer secrets.
- The Linux source guardian skill redirects normal operations toward supported configuration, package, policy, and vendor-patch paths before any source-level change.
- The model dispatcher skill requires redaction before routing logs, configs, or tasks to external model providers.
- Codex install guidance now avoids overclaiming public Plugin directory availability and points users to the safer immediate AGENTS.md workflow.

## Existing highlights

- `ubuntu-desktop-expert` — Ubuntu Desktop specialist with chunked Ubuntu Desktop reference files.
- `fedora-desktop-expert` — Fedora Desktop specialist with chunked Fedora Desktop reference files.
- `docs/SECURITY_PATCH_REFRESH_POLICY.md` — repo-level first-run context for OS-specific security patch refresh behavior.
- `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md` — shared safety and rollback-aware execution contract.

## Install

```bash
npx github:rushikeshsakharleofficial/we-are-linux-administrators
npm install -g linux-admin
linux-admin
```

## Codex CLI

```bash
npm install -g @openai/codex
codex
/plugins
```
