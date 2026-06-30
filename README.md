<div align="center">

# 🐧 linux-admin

### Open-source Linux administration skills for safer troubleshooting, production operations, Claude Code, Codex, and agent-assisted infrastructure work.

[![License](https://img.shields.io/github/license/rushikeshsakharleofficial/we-are-linux-administrators?style=for-the-badge&labelColor=0B1020&color=A78BFA)](LICENSE)
[![Build](https://img.shields.io/github/actions/workflow/status/rushikeshsakharleofficial/we-are-linux-administrators/validate.yml?style=for-the-badge&labelColor=0B1020&color=4ADE80)](https://github.com/rushikeshsakharleofficial/we-are-linux-administrators/actions)
[![Version](https://img.shields.io/badge/version-1.17.71-F472B6?style=for-the-badge&labelColor=0B1020)](.claude-plugin/plugin.json)
[![Skills](https://img.shields.io/badge/skills-101-22D3EE?style=for-the-badge&labelColor=0B1020)](skills)

![Linux](https://img.shields.io/badge/Linux-Admin-22D3EE?style=flat-square&logo=linux&logoColor=white)
![SRE](https://img.shields.io/badge/SRE-Workflow-A78BFA?style=flat-square)
![Codex](https://img.shields.io/badge/Codex-Plugin%20Ready-4ADE80?style=flat-square)
![Ubuntu](https://img.shields.io/badge/Ubuntu-Desktop-E95420?style=flat-square&logo=ubuntu&logoColor=white)
![Fedora](https://img.shields.io/badge/Fedora-Desktop-51A2DA?style=flat-square&logo=fedora&logoColor=white)
![Rollback](https://img.shields.io/badge/Rollback-First-F472B6?style=flat-square)

</div>

---

## ✨ Overview

`linux-admin` is an open-source Linux administration skills repository for Claude Code, Codex, and other agent-based coding/ops tools. It gives agents a senior Linux administrator and SRE-style operating model for practical troubleshooting, safe command planning, and repeatable infrastructure workflows.

| Principle | Meaning |
|---|---|
| 🔍 Read-only-first | Start with safe evidence collection before changes |
| 🧠 Evidence-based RCA | Rank hypotheses from real system signals |
| 🔁 Rollback-aware | Every high-impact fix needs a recovery path |
| 💾 Backup/disaster checks | Preserve critical state before impact |
| 🏗️ Architecture-fit review | Avoid over-engineering and under-engineering |
| 🔐 Vendor patch verification | Check current OS security sources before patch guidance |
| 🤖 Agent-context ready | Uses `AGENTS.md`, `CLAUDE.md`, and scoped docs for Codex/Claude-style agents |

**Version:** `1.17.71`  
**Skill count:** `101`

---

## 🖥️ Terminal preview

```console
$ linux-admin status
🐧 Project      : linux-admin
📦 Version      : 1.17.71
🧩 Skills       : 101
🛡️ Safety       : read-only-first + rollback-aware
🤖 Agents       : Claude Code + Codex + AGENTS.md workflows
🖥️ Desktop      : Ubuntu Desktop + Fedora Desktop
🔐 Patch model  : vendor security source verification
```

---

## 🚀 Installation

**Claude Code — plugin marketplace (one command):**
```
/plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
/plugin install linux-admin
```

**Claude Code — slash command (after install):**
```
/linux-admin:diagnose <your problem>
/linux-admin:network <your problem>
/linux-admin:storage <your problem>
```

**Codex CLI — plugin marketplace:**
```bash
codex plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
codex plugin add linux-admin@we-are-linux-administrators
```

---

<details open>
<summary><b>Run directly with npx</b></summary>

```bash
npx github:rushikeshsakharleofficial/we-are-linux-administrators
```

</details>

<details>
<summary><b>Install globally with npm</b></summary>

```bash
npm install -g linux-admin
linux-admin
```

</details>

<details>
<summary><b>Install from Claude Code plugin marketplace</b></summary>

```text
/plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
/plugin install linux-admin@we-are-linux-administrators
/reload-plugins
```

```bash
claude plugin marketplace add rushikeshsakharleofficial/we-are-linux-administrators
claude plugin install linux-admin@we-are-linux-administrators
```

</details>

<details open>
<summary><b>Install/use linux-admin with Codex</b></summary>

Codex has two useful paths for this repo:

### Path A — Use as a Codex project instruction pack now

This works immediately because Codex reads `AGENTS.md` from the repository.

```bash
git clone https://github.com/rushikeshsakharleofficial/we-are-linux-administrators.git
cd we-are-linux-administrators
curl -fsSL https://chatgpt.com/codex/install.sh | sh
codex
```

Then prompt Codex:

```text
Read AGENTS.md first.
Use this repository as the linux-admin skill pack.
Follow docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md and docs/SECURITY_PATCH_REFRESH_POLICY.md.
```

### Path B — Install from Codex plugin directory when published/shared

Use this when `linux-admin` is available in your Codex plugin marketplace or shared workspace plugin source.

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

After install, use it naturally:

```text
Use linux-admin to diagnose an Ubuntu Desktop GNOME login loop with read-only-first commands and rollback notes.
```

Or invoke it explicitly if your Codex UI supports plugin mentions:

```text
@linux-admin diagnose Fedora Kinoite update failure and suggest safe validation steps.
```

### Path C — Vendor into another repo for Codex

Use this when you want Codex to apply linux-admin rules inside a different infrastructure repo: