# linux-admin hooks

This project uses hooks for read-only validation and release-quality checks. Hooks should prevent broken plugin releases; they must not rewrite files, remove files, silently change versions, or make network calls by default.

## Active hooks

| Hook | Purpose |
|---|---|
| `hooks/validate-linux-admin.sh` | Validates skill count/version consistency, skill front matter, optimization-guardian routing, website count, release popup version, shell syntax, and conservative credential-pattern checks. |
| `.githooks/pre-commit` | Optional local Git hook. Runs the validator before local commits when `core.hooksPath` is configured. |
| `.github/workflows/validate.yml` | CI validation. Runs existing tests plus the validator on push, pull request, and manual dispatch. |

## Install local hooks

```bash
git config core.hooksPath .githooks
chmod +x .githooks/pre-commit hooks/validate-linux-admin.sh
```

Run manually:

```bash
hooks/validate-linux-admin.sh "$(pwd)"
```

## Validator checks

- actual `skills/*/SKILL.md` count
- `.claude-plugin/plugin.json` skill count
- `package.json` skill count
- `README.md` skill count
- `RELEASE.md` skill count
- version alignment between plugin metadata, package, README, and release notes
- required skill front matter basics
- `diagnose` route to `optimization-guardian-expert`
- optimization guardian baseline guardrail text
- website runtime skill count when present
- release popup version consistency warning
- conservative credential-pattern checks
- shell syntax of hook scripts

## Future hook ideas

Add only when they reduce real risk:

- Markdown link checker for docs and website content.
- Skill index consistency validator for `docs/EXPERT_MODULE_INDEX.md`.
- Website card consistency validator for newly added skills.
- Release popup schema validator.
- ShellCheck integration when available in CI.
- GitHub Pages deployment status reporter.
- Duplicate skill overlap detector.
- Stale distro guidance detector using the 3-hour Linux Skill Watch automation.

## Rule

If a hook blocks too many valid changes or creates noisy false positives, open an issue and improve the hook instead of disabling it globally.
