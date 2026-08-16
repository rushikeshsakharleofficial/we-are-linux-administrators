# Release 1.17.75

## Package

- Repository/package metadata version: `1.17.75`
- Plugin metadata version: `1.17.75`
- Skill count: `103`
- Package name: `linux-admin`
- GitHub Release: pending publication of `v1.17.75`; latest published GitHub Release is currently `v1.17.74`.
- npm registry publication: not currently verified; the previous publish workflow failed authentication.

## Added

- `incident-report-creator-expert` — table-first incident management report creator for Word (`.docx`), Excel (`.xlsx`), PDF (`.pdf`), PowerPoint (`.pptx`), or all four formats.
- `docs/LOCAL_GLOBAL_AGENT_SETUP.md` — project/user discovery guidance without hard-coded maintainer paths.
- `linux-admin install-global` — safe user-level skill install to `~/.agents/skills` and `~/.claude/skills`; existing skill directories are skipped unless `--force` is explicit.

## Fixed

- The package now includes `skills/`, relevant docs, `AGENTS.md`, `CLAUDE.md`, `opencode.json`, and `.aider.conf.yml`; earlier packaging exposed the CLI but excluded canonical skills.
- Removed committed machine-local `.agent`/`.claude/state` history and stale AGENTS/CLAUDE backups, with ignore rules to prevent recurrence.
- `CLAUDE.md` is now a thin adapter importing `AGENTS.md` instead of duplicating repository rules.
- Copilot, Amazon Q, OpenCode, and Aider guidance converge on `using-linux-admin` as the canonical router.
- Website runtime is aligned to `1.17.75` / `103` and removes stale cards for non-existent skills.
- Validation checks packaged skill presence and rejects tracked local agent state.

## Latest source install

Until npm registry publishing is configured and verified:

```bash
npm install -g github:rushikeshsakharleofficial/we-are-linux-administrators
linux-admin status
linux-admin install-global
```

Or:

```bash
npx github:rushikeshsakharleofficial/we-are-linux-administrators
```

Claude Code plugin install:

```bash
linux-admin install-claude
```

Codex CLI:

```bash
npm install -g @openai/codex
codex
```
