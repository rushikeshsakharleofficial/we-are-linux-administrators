# Codex usage guide

This repository supports Codex app, Codex CLI, Codex IDE extension, Codex Web, and GitHub-connected Codex workflows through `AGENTS.md`, the canonical `using-linux-admin` routing map, and shared Linux admin documentation.

## How linux-admin works with Codex

Codex has two relevant integration models:

1. **Project instruction pack** — clone this repo or vendor it into another repo. Codex uses the repository instructions and supporting docs.
2. **Codex plugin directory** — when `linux-admin` is published or shared as a Codex plugin source, install it from the Codex app or Codex CLI `/plugins` browser.

This repo includes:

- `AGENTS.md` — default portable repository instructions for Codex and other coding agents.
- `skills/using-linux-admin/SKILL.md` — canonical parent/micro-skill routing map; use it before loading specialist content when the correct skill is unclear.
- `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md` — shared safety and output contract.
- `docs/SECURITY_PATCH_REFRESH_POLICY.md` — OS-specific patch and vulnerability-source policy.
- `docs/EXPERT_MODULE_INDEX.md` — short entry-point and parent-domain index; it intentionally does not duplicate the full routing map.
- `skills/*/SKILL.md` — task-specific Linux admin workflows.
- `skills/*/chunks/*.md` — focused category references for large domains.

## Install Codex CLI

Install Codex CLI on macOS/Linux:

```bash
npm install -g @openai/codex
```

Run Codex from a repository root:

```bash
codex
```

Use the authentication flow offered by the current Codex CLI, including Sign in with ChatGPT where available.

## Install/use linux-admin in Codex

### Option A — Use as a Codex project instruction pack now

Clone the repository and run Codex from its root:

```bash
git clone https://github.com/rushikeshsakharleofficial/we-are-linux-administrators.git
cd we-are-linux-administrators
codex
```

Starter prompt:

```text
Read AGENTS.md first.
Read skills/using-linux-admin/SKILL.md and choose the smallest relevant primary Linux skill.
Follow docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md and docs/SECURITY_PATCH_REFRESH_POLICY.md.
Load only the selected skill and required chunks; do not summarize or load the full skill tree.
```

### Option B — Install from Codex plugin directory when published/shared

Use this only when `linux-admin` is actually available in your Codex Plugin directory or workspace plugin source.

In Codex CLI:

```text
codex
/plugins
```

Then:

```text
Search: linux-admin
Open plugin details
Install plugin
Start a new thread
Ask Codex to use linux-admin
```

In Codex app:

```text
Open Plugins → search linux-admin → Add to Codex → start a new thread
```

After install:

```text
Use linux-admin to diagnose an Ubuntu Desktop GNOME login loop with read-only-first commands and rollback notes.
```

Or, where the installed surface supports plugin mentions:

```text
@linux-admin diagnose Fedora Kinoite update failure and suggest safe validation steps.
```

### Option C — Vendor linux-admin into another repo

Use this when you want Codex to apply linux-admin rules inside a separate infrastructure repo.

```bash
git submodule add https://github.com/rushikeshsakharleofficial/we-are-linux-administrators.git tools/linux-admin-skills
cp tools/linux-admin-skills/AGENTS.md ./AGENTS.md
```

Add this to the target repo's root `AGENTS.md`:

```text
Use tools/linux-admin-skills as the Linux admin skill reference.
Read tools/linux-admin-skills/skills/using-linux-admin/SKILL.md before choosing specialist Linux skill content.
Follow tools/linux-admin-skills/docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md.
Follow tools/linux-admin-skills/docs/SECURITY_PATCH_REFRESH_POLICY.md for OS-specific guidance.
```

## Use with Codex app

1. Open Codex and the repository/worktree you want to use.
2. Read `AGENTS.md` and `skills/using-linux-admin/SKILL.md` before selecting specialist content.
3. Keep tasks scoped to specific files or directories.
4. Require bounded evidence, validation, and changed-file summaries.
5. Load only the selected specialist skill and required chunks.

Starter prompt:

```text
Read AGENTS.md first.
Read skills/using-linux-admin/SKILL.md and select the smallest relevant specialist set.
Follow docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md.
Do not change files until the task scope is clear.
```

## Use with Codex CLI

From the repo root:

```bash
codex
```

Then use a scoped task:

```text
Read AGENTS.md and skills/using-linux-admin/SKILL.md first.
Task: improve the Ubuntu Desktop release-lifecycle chunk with current official Ubuntu lifecycle guidance.
Scope: skills/ubuntu-desktop-expert/chunks/release-lifecycle.md only.
Safety: follow docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md.
Patch policy: follow docs/SECURITY_PATCH_REFRESH_POLICY.md.
Validation: document what was checked and whether hooks were run.
```

## Use with Codex IDE extension

Open this repository in your IDE and use a prompt like:

```text
Read AGENTS.md and skills/using-linux-admin/SKILL.md.
Choose the smallest relevant skill for Fedora Desktop update troubleshooting.
Explain which specialist skill/chunk should be used and why.
Do not edit files until the scope is confirmed.
```

## Use with Codex Web / GitHub task

When assigning a task through Codex Web or a GitHub-connected Codex workflow, use this format:

```text
Read AGENTS.md and skills/using-linux-admin/SKILL.md first.
Task: <exact change>
Scope: <allowed files/directories>
Safety: follow docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md
Patch policy: follow docs/SECURITY_PATCH_REFRESH_POLICY.md for OS-specific changes
Validation: run or document relevant hooks/checks
Output: summarize changed files, evidence, validation, and rollback notes
```

## Use `/init`

For a new fork or derived repository, `/init` can scaffold or refresh repository instructions. Preserve the important safety and routing rules from this repo's `AGENTS.md`:

- work scoped and reversible
- fetch current files before writing
- route through `skills/using-linux-admin/SKILL.md`
- follow the Universal Skill Execution Contract
- verify official/vendor sources for version-specific or patch guidance
- keep large domains chunked
- report validation results and blocked work

## Recommended Codex task templates

### Skill update

```text
Read AGENTS.md and skills/using-linux-admin/SKILL.md first.
Update only <skill-path> based on current official vendor docs.
Treat community sources as signals only.
Keep the change small and reversible.
Update RELEASE.md only if user-facing behavior changes.
Summarize validation and rollback notes.
```

### New skill

```text
Read AGENTS.md, skills/using-linux-admin/SKILL.md, and docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md.
Create a new skill for <domain>.
Use a small SKILL.md and chunked references if the domain is broad.
Update the canonical routing map only if the new skill changes routing.
Add docs/package metadata only if needed.
Run or document validation hooks.
```

### OS patch refresh

```text
Read AGENTS.md, skills/using-linux-admin/SKILL.md, and docs/SECURITY_PATCH_REFRESH_POLICY.md.
Check current official security patch sources for <OS family>.
Update only the relevant skill chunk if guidance changed.
Do not apply broad package/kernel advice without lifecycle and rollback notes.
```

## Validation commands

```bash
bash hooks/validate-linux-admin.sh .
bash hooks/validate-universal-contract.sh .
```

If hooks cannot be run in the Codex environment, Codex should say that clearly and explain what was inspected instead.
