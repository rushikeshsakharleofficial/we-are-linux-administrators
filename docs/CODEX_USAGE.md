# Codex usage guide

This repository supports Codex app, Codex CLI, Codex IDE extension, Codex Web, and GitHub-connected Codex workflows through `AGENTS.md` plus the shared Linux admin documentation.

## Why this repo works with Codex

Codex can use repository-level instructions from `AGENTS.md`. This repo includes:

- `AGENTS.md` — default instructions for coding agents.
- `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md` — shared safety and output contract.
- `docs/SECURITY_PATCH_REFRESH_POLICY.md` — OS-specific patch and vulnerability-source policy.
- `docs/EXPERT_MODULE_INDEX.md` — skill index.
- `skills/*/SKILL.md` — task-specific Linux admin workflows.
- `skills/*/chunks/*.md` — focused category references for large domains.

## Install Codex CLI

OpenAI's official Codex CLI docs provide a standalone installer for macOS and Linux:

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

Run Codex from the repository root:

```bash
cd we-are-linux-administrators
codex
```

The first run prompts you to sign in with your ChatGPT account or API key.

## Use with Codex app

1. Open Codex.
2. Open or connect the GitHub repository.
3. Ask Codex to read `AGENTS.md` before making changes.
4. Keep tasks scoped to specific files or directories.
5. Require validation and changed-file summaries.

Starter prompt:

```text
Read AGENTS.md first.
Then review README.md and docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md.
Summarize how this repository expects Linux admin skill changes to be made safely.
Do not change files yet.
```

## Use with Codex CLI

From the repo root:

```bash
codex
```

Then use a scoped task:

```text
Read AGENTS.md first.
Task: improve the Ubuntu Desktop release-lifecycle chunk with current official Ubuntu lifecycle guidance.
Scope: skills/ubuntu-desktop-expert/chunks/release-lifecycle.md only.
Safety: follow docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md.
Patch policy: follow docs/SECURITY_PATCH_REFRESH_POLICY.md.
Validation: document what was checked and whether hooks were run.
```

## Use with Codex IDE extension

Open this repository in your IDE and use a prompt like:

```text
Read AGENTS.md and docs/EXPERT_MODULE_INDEX.md.
Find the best skill file for Fedora Desktop update troubleshooting.
Explain which chunk should be edited and why.
Do not edit files until the scope is confirmed.
```

## Use with Codex Web / GitHub task

When assigning a task through Codex Web or a GitHub-connected Codex workflow, use this format:

```text
Read AGENTS.md first.
Task: <exact change>
Scope: <allowed files/directories>
Safety: follow docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md
Patch policy: follow docs/SECURITY_PATCH_REFRESH_POLICY.md for OS-specific changes
Validation: run or document relevant hooks/checks
Output: summarize changed files, evidence, validation, and rollback notes
```

## Use `/init`

For a new fork or derived repository, run `/init` in Codex to scaffold or refresh repository instructions. Preserve the important safety rules from this repo's `AGENTS.md`:

- work scoped and reversible
- fetch current files before writing
- follow the Universal Skill Execution Contract
- verify official/vendor sources for version-specific or patch guidance
- keep large domains chunked
- report validation results and blocked work

## Recommended Codex task templates

### Skill update

```text
Read AGENTS.md first.
Update only <skill-path> based on current official vendor docs.
Treat community sources as signals only.
Keep the change small and reversible.
Update RELEASE.md only if user-facing behavior changes.
Summarize validation and rollback notes.
```

### New skill

```text
Read AGENTS.md and docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md.
Create a new skill for <domain>.
Use a small SKILL.md and chunked references if the domain is broad.
Add routing/docs/package metadata only if needed.
Run or document validation hooks.
```

### README/docs change

```text
Read AGENTS.md first.
Improve README.md for clarity and installation accuracy.
Do not change skill behavior.
Keep links and commands verifiable.
Summarize what changed.
```

### OS patch refresh

```text
Read AGENTS.md and docs/SECURITY_PATCH_REFRESH_POLICY.md.
Check current official security patch sources for <OS family>.
Update only the relevant skill chunk if guidance changed.
Do not apply broad package/kernel advice without lifecycle and rollback notes.
```

## Validation commands

```bash
hooks/validate-linux-admin.sh "$(pwd)"
hooks/validate-universal-contract.sh "$(pwd)"
```

If hooks cannot be run in the Codex environment, Codex should say that clearly and explain what was inspected instead.
