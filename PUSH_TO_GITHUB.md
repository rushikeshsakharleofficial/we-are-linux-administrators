# Push this plugin to GitHub

The GitHub connector available in this ChatGPT session can write to existing repositories, but it does not expose a repository-creation action. Create an empty GitHub repository named `we-are-linux-administrators`, then run these commands locally from the extracted folder.

```bash
git init
git add .
git commit -m "Add We Are Linux Administrators Claude Code plugin"
git branch -M main
git remote add origin git@github.com:rushikeshsakharleofficial/we-are-linux-administrators.git
git push -u origin main
```

HTTPS remote alternative:

```bash
git remote add origin https://github.com/rushikeshsakharleofficial/we-are-linux-administrators.git
git push -u origin main
```

After pushing, test locally:

```bash
claude --plugin-dir ./we-are-linux-administrators
```

Example command:

```text
/linux-admin:diagnose nginx service failed after config change
```
