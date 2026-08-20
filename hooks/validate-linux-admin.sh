#!/usr/bin/env bash
set -uo pipefail

ROOT="${1:-$(pwd)}"
cd "$ROOT" 2>/dev/null || { echo "ERROR: cannot cd into repo root: $ROOT" >&2; exit 2; }
errors=0
warnings=0
err(){ errors=$((errors+1)); printf 'ERROR: %s\n' "$*" >&2; }
warn(){ warnings=$((warnings+1)); printf 'WARN: %s\n' "$*" >&2; }
info(){ printf 'INFO: %s\n' "$*"; }
require_file(){ [ -f "$1" ] || err "missing required file: $1"; }

for f in .claude-plugin/plugin.json package.json README.md RELEASE.md AGENTS.md CLAUDE.md \
  skills/diagnose/SKILL.md skills/optimization-guardian-expert/SKILL.md \
  skills/using-linux-admin/SKILL.md skills/incident-report-creator-expert/SKILL.md \
  docs/LOCAL_GLOBAL_AGENT_SETUP.md; do require_file "$f"; done

skill_count=$(find skills -mindepth 2 -maxdepth 2 -name SKILL.md -type f 2>/dev/null | wc -l | tr -d ' ')
plugin_count=$(grep -Eo 'Covers [0-9]+ task-specific skills' .claude-plugin/plugin.json | grep -Eo '[0-9]+' | head -n1 || true)
package_count=$(grep -Eo '[0-9]+ expert skills' package.json | grep -Eo '[0-9]+' | head -n1 || true)
readme_count=$(grep -Eo '\*\*Skill count:\*\*[[:space:]]*`[0-9]+`' README.md | grep -Eo '[0-9]+' | head -n1 || true)
release_count=$(grep -Eo 'Skill count: `[0-9]+`' RELEASE.md | grep -Eo '[0-9]+' | head -n1 || true)
info "detected skill count: $skill_count"
for pair in "plugin.json:$plugin_count" "package.json:$package_count" "README.md:$readme_count" "RELEASE.md:$release_count"; do
  file=${pair%%:*}; count=${pair#*:}
  [ -z "$count" ] && warn "could not detect skill count in $file" || [ "$count" = "$skill_count" ] || err "$file skill count $count does not match actual skills count $skill_count"
done

plugin_version=$(grep -Eo '"version"[[:space:]]*:[[:space:]]*"[^"]+"' .claude-plugin/plugin.json | head -n1 | sed -E 's/.*"([^"]+)"$/\1/' || true)
package_version=$(grep -Eo '"version"[[:space:]]*:[[:space:]]*"[^"]+"' package.json | head -n1 | sed -E 's/.*"([^"]+)"$/\1/' || true)
readme_version=$(grep -Eo '\*\*Version:\*\*[[:space:]]*`[^`]+`' README.md | grep -Eo '[0-9]+\.[0-9]+\.[0-9]+' | head -n1 || true)
release_version=$(grep -Eo '^# Release [^[:space:]]+' RELEASE.md | awk '{print $3}' | head -n1 || true)
for pair in "package.json:$package_version" "README.md:$readme_version" "RELEASE.md:$release_version"; do
  file=${pair%%:*}; version=${pair#*:}
  [ -z "$version" ] && warn "could not detect version in $file" || [ "$version" = "$plugin_version" ] || err "$file version $version does not match plugin metadata version $plugin_version"
done

while IFS= read -r skill_file; do
  dir_name=$(basename "$(dirname "$skill_file")")
  [ "$(head -n1 "$skill_file" || true)" = "---" ] || { warn "$skill_file uses legacy format without front matter"; continue; }
  grep -Eq "^name:[[:space:]]*\"?$dir_name\"?[[:space:]]*$" "$skill_file" || warn "$skill_file name does not exactly match directory $dir_name"
  grep -Eq '^description:[[:space:]]*.{20,}' "$skill_file" || warn "$skill_file missing useful description"
  grep -Eq '^allowed-tools:[[:space:]]*' "$skill_file" || warn "$skill_file missing allowed-tools"
done < <(find skills -mindepth 2 -maxdepth 2 -name SKILL.md -type f | sort)

grep -q 'optimization-guardian-expert' skills/diagnose/SKILL.md || err "diagnose does not route optimization requests through optimization guardian"
grep -qi 'No optimization without baseline' skills/optimization-guardian-expert/SKILL.md || err "optimization guardian missing baseline guardrail"
grep -q '^name:[[:space:]]*using-linux-admin' skills/using-linux-admin/SKILL.md || err "using-linux-admin metadata invalid"
grep -q 'incident-report-creator-expert' skills/using-linux-admin/SKILL.md || err "router does not include incident report creator"

if [ -f site/assets/js/main.js ]; then
  site_count=$(grep -Eo "SKILL_COUNT = '[0-9]+'" site/assets/js/main.js | grep -Eo '[0-9]+' | head -n1 || true)
  [ -z "$site_count" ] || [ "$site_count" = "$skill_count" ] || err "site runtime skill count $site_count does not match $skill_count"
fi
if [ -f site/assets/data/latest-update.json ]; then
  popup_version=$(grep -Eo '"version"[[:space:]]*:[[:space:]]*"[^"]+"' site/assets/data/latest-update.json | head -n1 | sed -E 's/.*"([^"]+)"$/\1/' || true)
  [ -z "$popup_version" ] || [ "$popup_version" = "$plugin_version" ] || err "website popup version $popup_version does not match $plugin_version"
fi

# Machine-local agent files must never be tracked in a clean checkout.
for local_path in .agent/CONTEXT.md .agent/STATUS.md .claude/state/bash-command-history.tsv site/.claude/state/bash-command-history.tsv; do
  [ ! -e "$local_path" ] || err "machine-local agent state is tracked: $local_path"
done
find . -maxdepth 1 -type f \( -name 'AGENTS.md.bak.*' -o -name 'CLAUDE.md.bak.*' \) -print | grep -q . && err "stale agent instruction backup files are tracked" || true

# Ensure npm distribution really contains the canonical skill/chunk tree and core safety docs.
if command -v npm >/dev/null 2>&1; then
  pack_json=$(npm pack --dry-run --json 2>/dev/null || true)
  [ -n "$pack_json" ] || err "npm pack --dry-run --json returned no package manifest"

  for packaged_file in \
    AGENTS.md \
    CLAUDE.md \
    docs/LOCAL_GLOBAL_AGENT_SETUP.md \
    docs/SECURITY_PATCH_REFRESH_POLICY.md \
    docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md; do
    printf '%s' "$pack_json" | grep -Fq "$packaged_file" || err "npm package omits required file: $packaged_file"
  done

  while IFS= read -r procedure_file; do
    printf '%s' "$pack_json" | grep -Fq "$procedure_file" || err "npm package omits canonical procedure: $procedure_file"
  done < <(find skills -type f \( -name 'SKILL.md' -o -path '*/chunks/*.md' \) | sort)
fi

secret_hits=$(grep -RInE '(BEGIN (RSA|OPENSSH|EC|DSA|PRIVATE) KEY|AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9_]{30,}|xox[baprs]-[A-Za-z0-9-]{20,})' --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=.venv --exclude='validate-linux-admin.sh' . 2>/dev/null || true)
[ -z "$secret_hits" ] || err "possible secret/token material found:\n$secret_hits"

while IFS= read -r sh_file; do bash -n "$sh_file" || err "shell syntax failed: $sh_file"; done < <(find hooks .githooks -type f -name '*.sh' 2>/dev/null | sort)

if [ "$errors" -gt 0 ]; then
  printf '\nValidation failed: %d error(s), %d warning(s).\n' "$errors" "$warnings" >&2
  exit 1
fi
printf '\nValidation passed: %d warning(s).\n' "$warnings"
