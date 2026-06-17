# GitHub Pages Setup

This repo deploys the site at `site/` via GitHub Actions to GitHub Pages.

## Requirements

- GitHub Pages enabled on the repo
- Source: **GitHub Actions** (not branch deploy)
- No custom domain required — deploys to `https://<owner>.github.io/<repo>/`

## Steps (one-time)

1. Go to `Settings → Pages`
2. Under **Source**, select **GitHub Actions**
3. Save

The workflow at `.github/workflows/deploy-pages.yml` handles everything else.

## Workflow triggers

- Push to `main` that changes `site/**` — auto-deploys
- Manual via `Actions → Deploy to GitHub Pages → Run workflow`

## Local preview

```bash
cd site
python3 -m http.server 8080
# Open http://localhost:8080
```

No build step. No Node.js required. Pure static HTML/CSS/JS.

## File structure

```
site/
├── index.html          # Home page
├── skills.html         # Skill directory
├── install.html        # Installation guide
├── architecture.html   # Plugin architecture
├── migration.html      # Migration expert guide
├── security.html       # Safety model
├── examples.html       # 12 real scenarios
├── about.html          # Project & maintainer
├── 404.html            # Custom 404
├── robots.txt          # Search crawler rules
├── sitemap.xml         # Page index for search
├── assets/
│   ├── css/
│   │   └── style.css   # Shared design system (dark/light, Inter + JetBrains Mono)
│   ├── js/
│   │   ├── main.js     # Nav, scroll reveal, counters, filter tabs
│   │   ├── theme.js    # Dark/light toggle with localStorage
│   │   ├── copy.js     # Copy button for command blocks
│   │   └── animations.js  # TerminalTyper, flow diagram, skill card glow
│   ├── core.css        # AMOLED monospace CSS (feature deep-dive pages)
│   └── core.js         # Canvas animation engines (Radar, Matrix, Waveform, NetworkGraph)
└── pages/              # 10 feature deep-dive pages
    ├── diagnose.html
    ├── boot.html
    ├── network.html
    ├── storage.html
    ├── performance.html
    ├── kernel.html
    ├── containers.html
    ├── auth.html
    ├── firewall.html
    └── safety.html
```

## Deployment workflow source

`.github/workflows/deploy-pages.yml` — uploads `site/` as the Pages artifact and deploys via `actions/deploy-pages@v4`.
