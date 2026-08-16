# Release 1.17.75

## Package

- NPM package version: `1.17.75`
- Plugin metadata version: `1.17.75`
- Skill count: `103`
- Package name: `linux-admin`

## Added

- `incident-report-creator-expert` — table-first incident management report creator that builds one canonical incident dataset and exports consistent reports in Word (`.docx`), Excel (`.xlsx`), PDF (`.pdf`), PowerPoint (`.pptx`), or all four formats.

## Updated

- `incident-response-expert` now routes formal PIR/RCA/management-report artifact creation to `incident-report-creator-expert` after incident facts are verified.
- `using-linux-admin` now distinguishes active incident handling from formal incident report generation.
- Repository metadata and website release surfaces are aligned to `1.17.75` and `103` skills.
- Maintained agent surfaces and the canonical portability model are unchanged.

## Incident reporting model

The reporting skill uses a shared table-first structure for incident summary, impact, timeline, detection/response, RCA, corrective/preventive actions, communications, lessons learned, evidence, and review status. Unknown or conflicting facts are marked explicitly instead of being invented.

## Install

```bash
npx github:rushikeshsakharleofficial/we-are-linux-administrators
npm install -g linux-admin
linux-admin
```

## Codex CLI

```bash
npm install -g @openai/codex
codex
/plugins
```
