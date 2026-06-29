#!/usr/bin/env bash
# validate-linux-admin.sh — local/CI validation hook for linux-admin plugin safety.
# Runs read-only checks against skill metadata, counts, release/site consistency,
# optimization-guardian routing, and accidental secret patterns.

set -uo pipefail

ROOT="${1:-$(pwd)}"
cd "$ROOT" 2>/dev/null || {
  echo "ERROR: cannot cd into repo root: $ROOT" >&2
  exit 2
}

errors=0
warnings=0

err() {
  errors=$((errors + 1))
  printf 'ERROR: %s\n' "$*" >&2
}

warn() {
  warnings=$((warnings + 1))
  printf 'WARN: %s\n' "$*" >&2
}

info() {
  printf 'INFO: %s\n' "$*"
}

require_file() {
  [ -f "$1" ] || err "missing required file: $1"
}

require_file ".claude-plugin/plugin.json"
require_file "package.json"
require_file "README.md"
require_file "RELEASE.md"
require_file "skills/diagnose/SKILL.md"
require_file "skills/optimization-guardian-expert/SKILL.md"

skill_count=0
if [ -d skills ]; then
  skill_count=$(find skills -mindepth 2 -maxdepth 2 -name SKILL.md -type f | wc -l | tr -d ' ')
else
  err "missing skills directory"
fi

plugin_count=$(grep -Eo 'Covers [0-9]+ task-specific skills' .claude-plugin/plugin.json 2>/dev/null | grep -Eo '[0-9]+' | head -n1 || true)
package_count=$(grep -Eo '[0-9]+ expert skills' package.json 2>/dev/null | grep -Eo '[0-9]+' | head -n1 || true)
readme_count=$(grep -Eo 'Current skill count: \*\*[0-9]+' README.md 2>/dev/null | grep -Eo '[0-9]+' | head -n1 || true)
release_count=$(grep -Eo 'Skill count: `[0-9]+`' RELEASE.md 2>/dev/null | grep -Eo '[0-9]+' | head -n1 || true)

info "detected skill count: $skill_count"

for pair in \
  "plugin.json:$plugin_count" \
  "package.json:$package_count" \
  "README.md:$readme_count" \
  "RELEASE.md:$release_count"; do
  file=${pair%%:*}
  count=${pair#*:}
  if [ -z "$count" ]; then
    warn "could not detect skill count in $file"
  elif [ "$count" != "$skill_count" ]; then
    err "$file skill count $count does not match actual skills count $skill_count"
  fi
done

plugin_version=$(grep -Eo '"version"[[:space:]]*:[[:space:]]*"[^"]+"' .claude-plugin/plugin.json 2>/dev/null | head -n1 | sed -E 's/.*"([^"]+)"$/\1/' || true)
package_version=$(grep -Eo '"version"[[:space:]]*:[[:space:]]*"[^"]+"' package.json 2>/dev/null | head -n1 | sed -E 's/.*"([^"]+)"$/\1/' || true)
readme_version=$(grep -Eo 'Current plugin metadata version: \*\*[^*]+' README.md 2>/dev/null | sed -E 's/.*\*\*//' | head -n1 || true)
release_version=$(grep -Eo '^# Release [^[:space:]]+' RELEASE.md 2>/dev/null | awk '{print $3}' | head -n1 || true)

for pair in \
  "package.json:$package_version" \
  "README.md:$readme_version" \
  "RELEASE.md:$release_version"; do
  file=${pair%%:*}
  version=${pair#*:}
  if [ -z "$version" ]; then
    warn "could not detect version in $file"
  elif [ -n "$plugin_version" ] && [ "$version" != "$plugin_version" ]; then
    err "$file version $version does not match plugin metadata version $plugin_version"
  fi
done

# Validate SKILL.md front matter basics.
while IFS= read -r skill_file; do
  dir_name=$(basename "$(dirname "$skill_file")")
  first_line=$(head -n1 "$skill_file" || true)
  [ "$first_line" = "---" ] || err "$skill_file missing opening front matter delimiter"
  grep -Eq '^name:[[:space:]]*"?'"$dir_name"'"?'"'[[:space:]]*$' "$skill_file" || warn "$skill_file name does not exactly match directory $dir_name"
  grep -Eq '^description:[[:space:]]*.{20,}' "$skill_file" || warn "$skill_file missing useful description"
  grep -Eq '^allowed-tools:[[:space:]]*' "$skill_file" || warn "$skill_file missing allowed-tools"
done < <(find skills -mindepth 2 -maxdepth 2 -name SKILL.md -type f | sort)

# Guard optimization routing.
if ! grep -q 'optimization-guardian-expert' skills/diagnose/SKILL.md; then
  err "diagnose skill does not route optimization requests through optimization-guardian-expert"
fi

if ! grep -qi 'No optimization without baseline' skills/optimization-guardian-expert/SKILL.md; then
  err "optimization guardian is missing baseline guardrail text"
fi

# Check website runtime count if present.
if [ -f site/assets/js/main.js ]; then
  site_count=$(grep -Eo "SKILL_COUNT = '[0-9]+'" site/assets/js/main.js | grep -Eo '[0-9]+' | head -n1 || true)
  if [ -n "$site_count" ] && [ "$site_count" != "$skill_count" ]; then
    err "site/assets/js/main.js SKILL_COUNT $site_count does not match actual skills count $skill_count"
  fi
fi

# Release popup version should normally track plugin version for plugin/skill releases.
if [ -f site/assets/data/latest-update.json ]; then
  popup_version=$(grep -Eo '"version"[[:space:]]*:[[:space:]]*"[^"]+"' site/assets/data/latest-update.json | head -n1 | sed -E 's/.*"([^"]+)"$/\1/' || true)
  if [ -n "$popup_version" ] && [ -n "$plugin_version" ] && [ "$popup_version" != "$plugin_version" ]; then
    warn "latest-update.json version $popup_version does not match plugin version $plugin_version"
  fi
fi

# Basic accidental secret scan. Keep this intentionally conservative to avoid noisy false positives.
secret_hits=$(grep -RInE '(BEGIN (RSA|OPENSSH|EC|DSA|PRIVATE) KEY|AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9_]{30,}|xox[baprs]-[A-Za-z0-9-]{20,})' \
  --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=.venv --exclude='validate-linux-admin.sh' . 2>/dev/null || true)
if [ -n "$secret_hits" ]; then
  err "possible secret/token material found:\n$secret_hits"
fi

# Shell syntax check for hook scripts.
if [ -d hooks ]; then
  while IFS= read -r sh_file; do
    bash -n "$sh_file" || err "shell syntax failed: $sh_file"
  done < <(find hooks .githooks -type f -name '*.sh' 2>/dev/null | sort)
fi

if [ "$errors" -gt 0 ]; then
  printf '\nValidation failed: %d error(s), %d warning(s).\n' "$errors" "$warnings" >&2
  exit 1
fi

printf '\nValidation passed: %d warning(s).\n' "$warnings"
exit 0
