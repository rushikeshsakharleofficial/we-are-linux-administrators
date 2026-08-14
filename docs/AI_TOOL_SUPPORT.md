# AI tool support

`linux-admin` keeps one canonical Linux administration skill tree under `skills/` and uses the smallest compatibility layer each AI coding/agent tool actually needs.

The goal is portability without maintaining thirteen divergent copies of the same 102 skills.

## Maintained compatibility matrix

| Tool | Support mode | Repository entry point | Notes |
|---|---|---|---|
| Claude Code | Native plugin + instructions | `CLAUDE.md`, `.claude-plugin/`, `skills/` | Primary packaged plugin surface |
| Codex | Native project instructions | `AGENTS.md` | Use repo/project-pack flow; plugin directory only when verified published/shared |
| OpenCode | Native instructions + native skill catalog | `AGENTS.md`, `opencode.json`, `skills/` | `opencode.json` points OpenCode at the canonical skill tree |
| GitHub Copilot | Native repository/agent instructions | `AGENTS.md`, `.github/copilot-instructions.md` | Works across supported Copilot chat/agent/code-review surfaces |
| Cursor | Native project instructions | `AGENTS.md` | Add `.cursor/rules/` only for genuinely Cursor-specific scoped rules |
| Windsurf | Native project instructions | `AGENTS.md` | Keep procedures canonical under `skills/`; add Windsurf-specific workflows only when needed |
| Cline | Project instructions + canonical skills by reference | `AGENTS.md`, `skills/` | Read the relevant `skills/<name>/SKILL.md`; do not duplicate the full tree |
| Amazon Q Developer | Native project rules | `.amazonq/rules/linux-admin.md` | Adapter points back to the canonical repo rules and skills |
| Zed Agent | Native project instructions | `AGENTS.md` | Zed also supports skills, MCP, ACP agents and tool permissions |
| JetBrains Junie | Native project instructions | `AGENTS.md` | Current Junie reads root `AGENTS.md`; no duplicate `.junie` rule set required |
| Aider | Read-only convention/context files | `.aider.conf.yml`, `AGENTS.md`, `skills/using-linux-admin/SKILL.md` | Config preloads the portable instructions, canonical router, and safety docs as read-only context |
| Sourcegraph Cody | Explicit repository/file context | `AGENTS.md`, `skills/` | Use repo context, `@` file context, or Cody CLI `--context-file`; do not claim automatic `AGENTS.md` loading |
| goose | Portable agent/recipe/skills context | `AGENTS.md`, `skills/` | Use explicit repo context or a future verified recipe/skill package; no fake marketplace claim |
| Bedrock-hosted models | Client dependent | Agent client dependent | Bedrock is a model/runtime surface, not a repository instruction convention |
| Kimi / DeepSeek / GLM and other model providers | Client dependent | Agent client dependent | Treat as model choices until the actual client integration is verified |

## Canonical portability rules

1. Keep Linux procedures in `skills/<skill-name>/SKILL.md` and `skills/<skill-name>/chunks/`.
2. Use root `AGENTS.md` wherever the tool supports it.
3. Keep `CLAUDE.md` and `.claude-plugin/` for Claude Code packaging.
4. Use a thin vendor adapter only when the product has a materially different repository rule format.
5. Never copy all 102 skills into `.cursor/`, `.windsurf/`, `.cline/`, `.junie/`, or other vendor directories just to advertise compatibility.
6. Do not claim native marketplace/plugin/skill installation unless publication and packaging are verified.
7. Model providers and agent clients are different layers: route Bedrock, DeepSeek, Kimi, GLM, local models, and similar providers through a verified client rather than pretending the model itself reads repository rules.

## Tool-specific usage

### Claude Code

Use the existing plugin flow and `CLAUDE.md`. The canonical skill tree is already exposed through `.claude-plugin/` metadata.

### Codex

Run from the repository root and read `AGENTS.md` first. Keep `docs/CODEX_USAGE.md` as the detailed Codex guide.

### OpenCode

The repository includes `opencode.json` so OpenCode can load project instructions and discover the canonical `skills/` directory without copying it into `.opencode/skills/`.

### GitHub Copilot

Use root `AGENTS.md` for agent instructions and `.github/copilot-instructions.md` for repository-wide Copilot guidance. Path-specific `.github/instructions/*.instructions.md` files should be added only when a real path-specific requirement exists.

### Cursor

Cursor supports root `AGENTS.md`. Use `.cursor/rules/*.mdc` only when scoped Cursor-only behavior is required. Avoid legacy `.cursorrules` for new work.

### Windsurf

Use root `AGENTS.md` as the shared project context. Windsurf-specific Skills, Rules, or Workflows may be added later for a concrete workflow, but they must point back to the canonical Linux skill content rather than fork it.

### Cline

Use `AGENTS.md` for project rules and explicitly read the selected `skills/<name>/SKILL.md` when handling a Linux task. Preserve permission gates for terminal/file operations.

### Amazon Q Developer

Use `.amazonq/rules/linux-admin.md`. Keep the adapter concise and route deep Linux procedures back to `skills/` and the universal contract.

### Zed Agent

Zed reads root `AGENTS.md` as project instructions. For risky Linux work, keep terminal/file tool permissions conservative and use Zed Skills only when packaging a reusable workflow adds real value.

### JetBrains Junie

Current Junie reads root `AGENTS.md`, so the portable repository instructions work without maintaining a second full guidelines file. Keep approval enabled for consequential terminal actions.

### Aider

The repository `.aider.conf.yml` preloads the portable instruction file, canonical router, and safety docs as read-only context. The equivalent manual form is:

```bash
aider --read AGENTS.md \
  --read skills/using-linux-admin/SKILL.md \
  --read docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md \
  --read docs/SECURITY_PATCH_REFRESH_POLICY.md
```

The `read:` option is supported by Aider for read-only context files. Add only the task-specific `skills/<name>/SKILL.md` when deeper Linux guidance is needed.

### Sourcegraph Cody

Cody has rich repository context but this repo does not assume it automatically loads `AGENTS.md`. Add the relevant files explicitly in chat, or use Cody CLI context flags where available. Example:

```bash
cody chat \
  --context-file AGENTS.md \
  --context-file docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md \
  --context-file skills/diagnose/SKILL.md \
  -m "Create a read-only-first Linux troubleshooting plan"
```

### goose

goose supports agent workflows, recipes, skills, MCP, ACP, permission controls, and sandboxing. Until this repository publishes a verified goose-specific package, use explicit repository context and the canonical `AGENTS.md`/`skills/` tree. Do not claim marketplace installation from this repo unless it is actually published there.

## Portable execution workflow

```text
Read AGENTS.md.
Read docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md.
Read skills/using-linux-admin/SKILL.md.
Select the smallest relevant skills/<name>/SKILL.md.
Read only the required chunk files.
Collect bounded evidence first.
Redact secrets before external-model routing.
Plan rollback before risky changes.
Validate the result.
```

## Official compatibility sources

Compatibility claims should be refreshed against official product documentation before repo guidance changes. Current source families include:

- OpenCode: `https://opencode.ai/docs/rules/` and `https://opencode.ai/docs/skills`
- GitHub Copilot: `https://docs.github.com/en/copilot/reference/custom-instructions-support`
- Cursor: `https://docs.cursor.com/context/rules-for-ai`
- Amazon Q Developer: `https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/context-project-rules.html`
- Zed: `https://zed.dev/docs/ai/instructions` and `https://zed.dev/docs/ai/skills`
- JetBrains Junie: `https://www.jetbrains.com/help/ai-assistant/junie-agent.html`
- Aider: `https://aider.chat/docs/usage/conventions.html` and `https://aider.chat/docs/config/aider_conf.html`
- Sourcegraph Cody: `https://sourcegraph.com/docs/cody/clients/install-cli`
- goose: `https://block.github.io/goose/`

Compatibility never bypasses the Universal Skill Execution Contract. Read-only-first evidence, secret redaction, backup planning, guarded rollback, architecture-fit checks, and validation remain mandatory on every supported surface.
