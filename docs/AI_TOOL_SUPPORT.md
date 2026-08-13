# AI tool support

`linux-admin` keeps one canonical skill tree under `skills/` and uses small compatibility adapters where an AI tool needs its own repository-instruction format.

## Maintained compatibility

| Tool | Project instruction path | Usage |
|---|---|---|
| Claude Code | `CLAUDE.md`, `.claude-plugin/` | Native plugin workflow and canonical skills |
| Codex | `AGENTS.md` | Project instructions and canonical skills |
| OpenCode | `AGENTS.md` | Project instructions and canonical skills |
| GitHub Copilot | `AGENTS.md`, `.github/copilot-instructions.md` | Repository and agent instructions |
| Cursor | `AGENTS.md` | Project guidance and canonical skills |
| Windsurf | `AGENTS.md` | Cascade guidance and canonical skills |
| Cline | `AGENTS.md` | Project rules plus canonical `SKILL.md` files |
| Amazon Q Developer | `.amazonq/rules/linux-admin.md` | Project-rule adapter to canonical skills |
| Bedrock-hosted models | Client dependent | Use through an agent client that can load repository context |
| Manus / Kimi / DeepSeek / GLM | Client dependent | Verify the actual client before claiming repository integration |

## Compatibility rule

Prefer portable instructions over vendor-specific duplication:

1. Use root `AGENTS.md` when the tool supports it.
2. Keep Linux procedures in `skills/<skill-name>/SKILL.md` and `skills/<skill-name>/chunks/`.
3. Add a vendor adapter only when its rule format materially improves support.
4. Do not copy the full skill tree into multiple vendor folders.
5. Do not claim native plugin or skill installation unless the tool officially supports that packaging model.

## Tool notes

GitHub Copilot supports repository custom instructions and agent instructions. Cursor supports project rules and root `AGENTS.md`. Windsurf Cascade supports `AGENTS.md`, Rules, Workflows and Skills. Cline supports `AGENTS.md`, workspace rules and `SKILL.md`-style skills. Amazon Q Developer supports project rules in `.amazonq/rules/`.

For baseline Cursor, Windsurf and Cline support, the repository should keep using `AGENTS.md` rather than duplicating the 101 skills into `.cursor`, `.windsurf` or `.cline` directories.

## Portable workflow

```text
Read AGENTS.md.
Read docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md.
Select the smallest relevant skills/<name>/SKILL.md.
Read only the required chunk files.
Collect bounded evidence first.
Plan rollback before risky changes.
Validate the result.
```

Compatibility never bypasses the repository safety contract. Keep read-only-first evidence, secret redaction, backup planning, guarded rollback, architecture-fit checks and validation on every supported agent surface.
