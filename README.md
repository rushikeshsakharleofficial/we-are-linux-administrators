# we-are-linux-administrators

Repository for the **linux-admin** Claude Code plugin.

The plugin package/folder name is `we-are-linux-administrators`, but the Claude Code plugin name and command namespace are:

```text
linux-admin
```

Example command namespace:

```text
/linux-admin:diagnose
/linux-admin:migration-expert
/linux-admin:package-manager-expert
/linux-admin:cron-scheduler-expert
/linux-admin:filesystem-expert
/linux-admin:kernel-expert
```

## Current plugin package

The full generated plugin source is in the ChatGPT artifact zip. Extract it and push the full tree into this repo.

Expected root structure:

```text
we-are-linux-administrators/
├── .claude-plugin/plugin.json
├── README.md
├── skills/
├── docs/
├── agents/
├── hooks/
├── scripts/
├── bin/
├── templates/
├── tests/
├── codex/AGENTS.md
└── gemini/GEMINI.md
```

## Push full plugin source

```bash
unzip we-are-linux-administrators.zip
cd we-are-linux-administrators

git init
git add .
git commit -m "Add linux-admin Claude Code plugin"
git branch -M main
git remote add origin https://github.com/rushikeshsakharleofficial/we-are-linux-administrators.git
git push -u origin main --force-with-lease
```

## Test locally

```bash
claude --plugin-dir ./we-are-linux-administrators
```

Or with zip support:

```bash
claude --plugin-dir ./we-are-linux-administrators.zip
```
