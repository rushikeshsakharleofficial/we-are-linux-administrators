# Release 1.17.75

## Package

- NPM package version: `1.17.75`
- Plugin metadata version: `1.17.75`
- Skill count: `103`
- Package name: `linux-admin`

## Added

- `incident-report-creator-expert` — table-first incident management report creator that builds one canonical incident dataset and exports consistent reports in Word (`.docx`), Excel (`.xlsx`), PDF (`.pdf`), PowerPoint (`.pptx`), or all four formats.
- `docs/LOCAL_GLOBAL_AGENT_SETUP.md` — verified project/user discovery guidance for maintained agent surfaces without hard-coded maintainer paths.
- `linux-admin install-global` — safe user-level skill install to `~/.agents/skills` and `~/.claude/skills`; existing skill directories are skipped unless `--force` is explicitly requested.

## Fixed

- The npm package now actually ships `skills/`, relevant docs, `AGENTS.md`, `CLAUDE.md`, `opencode.json`, and `.aider.conf.yml`; earlier packaging exposed the CLI but excluded the canonical skills.
- Removed committed machine-local `.agent`/`.claude/state` command history and stale AGENTS/CLAUDE backup files, and added ignore rules to prevent recurrence.
- `CLAUDE.md` is now a thin Claude-specific adapter that imports `AGENTS.md` instead of duplicating repository rules.
- Copilot, Amazon Q, OpenCode, and Aider/project guidance converge on `using-linux-admin` as the canonical router.
- Website runtime/release data are aligned to `1.17.75` and `103` skills; stale dynamic cards for non-existent expert names were removed with the simplified runtime.
- Validation now checks npm packaged skill presence and rejects tracked local agent state.

## Incident reporting model

The reporting skill uses shared tables for incident summary, impact, timeline, detection/response, RCA, corrective/preventive actions, communications, lessons learned, evidence, and review status. Unknown or conflicting facts are marked explicitly instead of being invented.

## Install

```bash
npm install -g linux-admin
linux-admin status
linux-admin install-global
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
