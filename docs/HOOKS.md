# linux-admin hooks

This project uses hooks for read-only validation and release-quality checks. Hooks should prevent broken plugin releases; they must not rewrite files, remove files, silently change versions, or make network calls by default.

## Active hooks

| Hook | Purpose |
|---|---|
| `hooks/validate-linux-admin.sh` | Validates skill/version metadata, required files, front matter, routing invariants, website metadata, retired-skill hygiene, npm package contents, local-state/secret hygiene, shell syntax, and compatibility-wrapper targets. |
| `hooks/validate-universal-contract.sh` | Validates the Universal Skill Execution Contract document, router references, required output fields, and direct contract/safety coverage for top-level skills and condition-specific chunks. |
| `.githooks/pre-commit` | Optional local Git hook. Runs repository validation before local commits when `core.hooksPath` is configured. |
| `.github/workflows/validate.yml` | CI validation. Runs the repository regression suite plus validators on push, pull request, and manual dispatch. |

## Install local hooks

```bash
git config core.hooksPath .githooks
chmod +x .githooks/pre-commit hooks/validate-linux-admin.sh hooks/validate-universal-contract.sh
```

Run manually:

```bash
hooks/validate-linux-admin.sh "$(pwd)"
hooks/validate-universal-contract.sh "$(pwd)"
```

## Validator checks

`validate-linux-admin.sh` currently covers:

- actual `skills/*/SKILL.md` count
- skill-count consistency across plugin, marketplace, package, README, release notes, website runtime and website update metadata
- version consistency across plugin, marketplace, package, README, release notes and website runtime/update metadata
- required repository files and skill front-matter basics
- `diagnose`/optimization-guardian routing and canonical router invariants
- machine-local agent-state and stale backup-file hygiene
- retired top-level skill restoration and stale canonical-path references
- `npm pack --dry-run --json` coverage for every canonical top-level `SKILL.md`, every `chunks/*.md`, and core safety/agent documentation
- conservative credential/token-pattern checks
- Bash syntax for validation hooks, `.githooks/pre-commit`, and extensionless Bash wrappers
- compatibility/audit wrapper delegation targets: target must stay under `scripts/`, exist, and be executable

`validate-universal-contract.sh` separately covers the Universal Skill Execution Contract itself, router references, required output fields, and direct contract/safety/rollback/validation coverage gaps across both top-level skills and condition-specific chunks. Coverage gaps remain visible as maintenance debt rather than being hidden inside the main metadata validator.

## Future hook ideas

Add only when they reduce real risk:

- Markdown link checker for docs and website content.
- Skill index consistency validator for `docs/EXPERT_MODULE_INDEX.md`.
- Website card consistency validator for newly added skills.
- ShellCheck integration when available in CI.
- GitHub Pages deployment status reporter.
- Duplicate skill overlap detector.
- Stale distro guidance detector using the Linux Skill Watch maintenance workflow.

## Rule

If a hook blocks too many valid changes or creates noisy false positives, open an issue and improve the hook instead of disabling it globally.
