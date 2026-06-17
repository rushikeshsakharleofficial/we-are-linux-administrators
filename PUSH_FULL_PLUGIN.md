# Push the full linux-admin plugin source

This repository is named `we-are-linux-administrators`.

The Claude Code plugin name is `linux-admin`, so commands use this namespace:

```text
/linux-admin:<skill-name>
```

## Push from the generated zip

Download `we-are-linux-administrators.zip` from ChatGPT, then run:

```bash
rm -rf we-are-linux-administrators
unzip we-are-linux-administrators.zip
cd we-are-linux-administrators

git init
git add .
git commit -m "Add linux-admin Claude Code plugin"
git branch -M main

git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/rushikeshsakharleofficial/we-are-linux-administrators.git

git push -u origin main --force-with-lease
```

## Verify plugin manifest

```bash
python3 -m json.tool .claude-plugin/plugin.json >/dev/null
```

Expected plugin name:

```text
linux-admin
```

## Test locally

```bash
claude --plugin-dir ./we-are-linux-administrators
```

## Important

Do not rename the plugin manifest name to the repo name. Keep:

```json
{
  "name": "linux-admin"
}
```
