# Codex usage guide

This repository supports Codex through portable repository instructions, Agent Skills discovery where supported, and the Codex Plugin Directory when a published/available plugin is actually visible to the user's plan, workspace, role and surface.

## Canonical linux-admin workflow

Use these files as the source of truth:

- `AGENTS.md` — portable repository instructions.
- `skills/using-linux-admin/SKILL.md` — top-level parent/specialist router.
- `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md` — safety, rollback and validation contract.
- `docs/SECURITY_PATCH_REFRESH_POLICY.md` — vendor-source policy for time-sensitive OS/security guidance.
- `docs/EXPERT_MODULE_INDEX.md` — compact domain index.
- `skills/<parent>/SKILL.md` — parent/specialist workflows.
- `skills/<parent>/chunks/*.md` — condition-specific procedures loaded only when needed.

Execution model:

```text
AGENTS.md
  -> skills/using-linux-admin/SKILL.md
  -> one parent/specialist
  -> bounded evidence
  -> one matching chunk when applicable
```

Load a second chunk/support skill only when evidence proves a cross-layer issue.

## Install Codex CLI

```bash
npm install -g @openai/codex
codex
```

Use the current authentication flow offered by Codex. Do not hard-code an old login command or assume one authentication mode is available everywhere.

## Use linux-admin with Codex today

### Option A — Repository/project use

This is the most predictable mode because it does not depend on plugin-directory publication.

```bash
git clone https://github.com/rushikeshsakharleofficial/we-are-linux-administrators.git
cd we-are-linux-administrators
codex
```

Recommended first instruction:

```text
Read AGENTS.md.
Read skills/using-linux-admin/SKILL.md and choose one parent/specialist.
Follow docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md.
Load only the selected skill and required chunk; do not preload the whole tree.
```

### Option B — User-wide Agent Skills

After installing the verified GitHub source:

```bash
npm install -g github:rushikeshsakharleofficial/we-are-linux-administrators
linux-admin status
linux-admin install-global
```

The installer copies canonical skills to supported user-level skill locations, including `~/.agents/skills/`, while preserving the repository as the source of truth. Existing destinations are skipped unless `--force` is intentional.

### Option C — Codex Plugin Directory

OpenAI currently documents plugins as installable workflow packages in the Plugin Directory across ChatGPT and Codex. A plugin can contain skills, apps and app templates. Availability and invocation can depend on plan, workspace settings, role, supported surface, region and any required app permissions.

Use this mode only when `linux-admin` is actually published/available in the Plugin Directory or supplied through an approved workspace plugin source.

Do **not** assume a specific Codex CLI slash command such as `/plugins` unless the current Codex client itself exposes and documents that command. In supported Codex task views, OpenAI currently documents plugin selection through **Sources -> Use plugins**. OpenAI notes that Plugin Directory changes in Codex can take **up to six hours** to refresh; restart Codex or refresh plugin data before treating a newly published/updated listing as missing.

After a plugin is available, verify:

1. the listing is the expected `linux-admin` package/workflow;
2. the workspace permits the plugin for the user's role;
3. any required apps are enabled and authorised;
4. a low-risk test prompt can invoke the expected skill workflow;
5. routing still follows `using-linux-admin -> parent/specialist -> bounded evidence -> one chunk`.

A plugin does not bypass underlying app or source-system permissions.

## Vendor linux-admin into another repository

```bash
git submodule add https://github.com/rushikeshsakharleofficial/we-are-linux-administrators.git tools/linux-admin-skills
```

Reference it from the target repository's `AGENTS.md`:

```text
Use tools/linux-admin-skills as the Linux administration skill reference.
Read tools/linux-admin-skills/skills/using-linux-admin/SKILL.md before choosing specialist content.
Follow tools/linux-admin-skills/docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md.
Follow tools/linux-admin-skills/docs/SECURITY_PATCH_REFRESH_POLICY.md for OS-specific security and lifecycle guidance.
```

Avoid copying the full skill tree into multiple vendor-specific instruction directories.

## Codex app, CLI, IDE and web usage

Whichever Codex surface is used:

1. load the repository/worktree and its `AGENTS.md` instructions;
2. select the smallest relevant parent/specialist;
3. collect bounded evidence before recommending changes;
4. load only the matching chunk;
5. define rollback before consequential changes;
6. validate the result;
7. report blocked or unverified work instead of inventing support.

For GitHub-connected/cloud work, keep task scope explicit:

```text
Read AGENTS.md and skills/using-linux-admin/SKILL.md first.
Task: <exact change>
Scope: <allowed files/directories>
Safety: follow docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md
Patch policy: follow docs/SECURITY_PATCH_REFRESH_POLICY.md for OS-specific changes
Validation: run or document relevant hooks/checks
Output: summarize changed files, evidence, validation and rollback notes
```

## `/init`

If the current Codex client offers `/init`, it can help scaffold or refresh repository instructions for a new fork/derived project. Preserve the important linux-admin rules:

- keep work scoped and reversible;
- fetch/read current files before writing;
- route through `skills/using-linux-admin/SKILL.md`;
- follow the Universal Skill Execution Contract;
- verify current vendor sources for time-sensitive OS/security guidance;
- keep large domains chunked;
- report validation results and blocked work.

Do not depend on `/init` being present in every Codex surface/version.

## Validation

```bash
bash hooks/validate-linux-admin.sh .
bash hooks/validate-universal-contract.sh .
```

The repository validator also verifies package contents, including the canonical skill tree and required documentation. If an environment cannot run the hooks, state that clearly and report exactly what was inspected instead.

## Publication accuracy

Repository metadata and Plugin Directory/GitHub Release publication are separate states. Never infer that a repository version is published merely because `package.json` or plugin metadata has that version. Verify the actual published surface first.
