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

for f in .claude-plugin/plugin.json .claude-plugin/marketplace.json package.json README.md RELEASE.md AGENTS.md CLAUDE.md \
  opencode.json .aider.conf.yml bin/linux-admin-install.js hooks/hooks.json \
  skills/diagnose/SKILL.md skills/optimization-guardian-expert/SKILL.md \
  skills/using-linux-admin/SKILL.md skills/incident-report-creator-expert/SKILL.md \
  docs/AI_TOOL_SUPPORT.md docs/CODEX_USAGE.md docs/EXPERT_MODULE_INDEX.md \
  docs/LOCAL_GLOBAL_AGENT_SETUP.md docs/SECURITY_PATCH_REFRESH_POLICY.md \
  docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md site/assets/js/main.js \
  site/assets/data/latest-update.json tests/retired_top_level_skills.txt; do require_file "$f"; done

# Keep local/pre-commit validation aligned with CI. Metadata parsed below with
# grep must first be syntactically valid JSON, otherwise malformed files can
# produce misleading version/count errors or pass some checks accidentally.
if command -v python3 >/dev/null 2>&1; then
  json_python=python3
elif command -v python >/dev/null 2>&1; then
  json_python=python
else
  json_python=""
  warn "python is unavailable; JSON syntax validation skipped"
fi
if [ -n "$json_python" ]; then
  for json_file in .claude-plugin/plugin.json .claude-plugin/marketplace.json package.json hooks/hooks.json opencode.json site/assets/data/latest-update.json; do
    "$json_python" -m json.tool "$json_file" >/dev/null 2>&1 || err "invalid JSON: $json_file"
  done
fi

skill_count=$(find skills -mindepth 2 -maxdepth 2 -name SKILL.md -type f 2>/dev/null | wc -l | tr -d ' ')
plugin_count=$(grep -Eo 'Covers [0-9]+ task-specific skills' .claude-plugin/plugin.json | grep -Eo '[0-9]+' | head -n1 || true)
marketplace_count=$(grep -Eo '[0-9]+ expert skills' .claude-plugin/marketplace.json | grep -Eo '[0-9]+' | head -n1 || true)
package_count=$(grep -Eo '[0-9]+ expert skills' package.json | grep -Eo '[0-9]+' | head -n1 || true)
readme_count=$(grep -Eo '\*\*Skill count:\*\*[[:space:]]*`[0-9]+`' README.md | grep -Eo '[0-9]+' | head -n1 || true)
release_count=$(grep -Eo 'Skill count: `[0-9]+`' RELEASE.md | grep -Eo '[0-9]+' | head -n1 || true)
info "detected skill count: $skill_count"
for pair in "plugin.json:$plugin_count" "marketplace.json:$marketplace_count" "package.json:$package_count" "README.md:$readme_count" "RELEASE.md:$release_count"; do
  file=${pair%%:*}; count=${pair#*:}
  [ -z "$count" ] && warn "could not detect skill count in $file" || [ "$count" = "$skill_count" ] || err "$file skill count $count does not match actual skills count $skill_count"
done

plugin_version=$(grep -Eo '"version"[[:space:]]*:[[:space:]]*"[^"]+"' .claude-plugin/plugin.json | head -n1 | sed -E 's/.*"([^"]+)"$/\1/' || true)
marketplace_metadata_version=$(grep -Eo '"version"[[:space:]]*:[[:space:]]*"[^"]+"' .claude-plugin/marketplace.json | sed -n '1p' | sed -E 's/.*"([^"]+)"$/\1/' || true)
marketplace_plugin_version=$(grep -Eo '"version"[[:space:]]*:[[:space:]]*"[^"]+"' .claude-plugin/marketplace.json | sed -n '2p' | sed -E 's/.*"([^"]+)"$/\1/' || true)
package_version=$(grep -Eo '"version"[[:space:]]*:[[:space:]]*"[^"]+"' package.json | head -n1 | sed -E 's/.*"([^"]+)"$/\1/' || true)
readme_version=$(grep -Eo '\*\*Version:\*\*[[:space:]]*`[^`]+`' README.md | grep -Eo '[0-9]+\.[0-9]+\.[0-9]+' | head -n1 || true)
release_version=$(grep -Eo '^# Release [^[:space:]]+' RELEASE.md | awk '{print $3}' | head -n1 || true)
for pair in "marketplace metadata:$marketplace_metadata_version" "marketplace plugin:$marketplace_plugin_version" "package.json:$package_version" "README.md:$readme_version" "RELEASE.md:$release_version"; do
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
  site_version=$(grep -Eo "PROJECT_VERSION = '[^']+'" site/assets/js/main.js | sed -E "s/.*'([^']+)'$/\1/" | head -n1 || true)
  site_count=$(grep -Eo "SKILL_COUNT = '[0-9]+'" site/assets/js/main.js | grep -Eo '[0-9]+' | head -n1 || true)
  [ -z "$site_version" ] && warn "could not detect website runtime version" || [ "$site_version" = "$plugin_version" ] || err "site runtime version $site_version does not match $plugin_version"
  [ -z "$site_count" ] || [ "$site_count" = "$skill_count" ] || err "site runtime skill count $site_count does not match $skill_count"
fi
if [ -f site/assets/data/latest-update.json ]; then
  popup_version=$(grep -Eo '"version"[[:space:]]*:[[:space:]]*"[^"]+"' site/assets/data/latest-update.json | head -n1 | sed -E 's/.*"([^"]+)"$/\1/' || true)
  [ -z "$popup_version" ] || [ "$popup_version" = "$plugin_version" ] || err "website popup version $popup_version does not match $plugin_version"
  popup_count=$(grep -Eio 'skill count[^0-9]*[0-9]+' site/assets/data/latest-update.json | grep -Eo '[0-9]+' | head -n1 || true)
  [ -z "$popup_count" ] && warn "could not detect skill count in website popup summary" || [ "$popup_count" = "$skill_count" ] || err "website popup skill count $popup_count does not match $skill_count"
fi

for local_path in .agent/CONTEXT.md .agent/STATUS.md .claude/state/bash-command-history.tsv site/.claude/state/bash-command-history.tsv; do
  [ ! -e "$local_path" ] || err "machine-local agent state is tracked: $local_path"
done
find . -maxdepth 1 -type f \( -name 'AGENTS.md.bak.*' -o -name 'CLAUDE.md.bak.*' \) -print | grep -q . && err "stale agent instruction backup files are tracked" || true

# Canonical skills/chunks are cross-agent procedures. Keep Claude-only path
# variables out of the portable skill tree so local/pre-commit validation
# catches the same regression covered by tests/test_portable_skill_paths.py.
portable_skill_path_hits=$(grep -RInF '${CLAUDE_SKILL_DIR}' skills --include='*.md' 2>/dev/null || true)
[ -z "$portable_skill_path_hits" ] || err "Claude-only path variable found in canonical skills/chunks; use repository-relative paths instead:\n$portable_skill_path_hits"

# Retired names are intentionally present in negative regression tests and
# historical design notes. Scan only canonical user-facing routing/install
# surfaces for dead *canonical paths*; tests separately guard that retired
# top-level skills are not restored and that replacement routes are correct.
canonical_ref_files=(
  README.md RELEASE.md AGENTS.md CLAUDE.md opencode.json .aider.conf.yml
  docs/AI_TOOL_SUPPORT.md docs/CODEX_USAGE.md docs/EXPERT_MODULE_INDEX.md
  docs/LOCAL_GLOBAL_AGENT_SETUP.md docs/SECURITY_PATCH_REFRESH_POLICY.md
  docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md docs/USAGE.md
  skills/using-linux-admin/SKILL.md skills/diagnose/SKILL.md
  site/assets/data/latest-update.json site/assets/js/main.js
)
if [ -f tests/retired_top_level_skills.txt ]; then
  while IFS= read -r retired_skill; do
    retired_skill=${retired_skill%%#*}
    retired_skill=$(printf '%s' "$retired_skill" | xargs)
    [ -n "$retired_skill" ] || continue
    [ ! -e "skills/$retired_skill/SKILL.md" ] || err "retired top-level skill restored: $retired_skill"
    stale_refs=""
    for canonical_file in "${canonical_ref_files[@]}"; do
      [ -f "$canonical_file" ] || continue
      grep -IlF "skills/$retired_skill/SKILL.md" "$canonical_file" 2>/dev/null || true
    done | while IFS= read -r hit; do
      [ -n "$hit" ] && printf '%s\n' "$hit"
    done > /tmp/linux-admin-stale-refs.$$
    stale_refs=$(cat /tmp/linux-admin-stale-refs.$$ 2>/dev/null || true)
    rm -f /tmp/linux-admin-stale-refs.$$
    [ -z "$stale_refs" ] || err "stale canonical path for retired skill $retired_skill referenced by: $(printf '%s' "$stale_refs" | tr '\n' ' ')"
  done < tests/retired_top_level_skills.txt
fi

# Validate the npm CLI contract before packaging. package.json promises both
# commands and they intentionally share one executable implementation.
if command -v node >/dev/null 2>&1; then
  node --check bin/linux-admin-install.js >/dev/null 2>&1 || err "Node syntax failed: bin/linux-admin-install.js"
  node -e 'const p=require("./package.json"); const b=p.bin||{}; if(b["linux-admin"]!=="./bin/linux-admin-install.js"||b["linux-admin-install"]!=="./bin/linux-admin-install.js") process.exit(1)' 2>/dev/null || err "package.json CLI bin mappings drifted from bin/linux-admin-install.js"
fi

if command -v npm >/dev/null 2>&1; then
  pack_json=$(npm pack --dry-run --json 2>/dev/null || true)
  [ -n "$pack_json" ] || err "npm pack --dry-run --json returned no package manifest"
  # Avoid `printf ... | grep -q` here: with `pipefail`, grep can exit as soon
  # as it finds a match, causing printf to receive SIGPIPE and making a valid
  # package entry look missing. A here-string keeps the membership check
  # deterministic for large npm manifests.
  for packaged_file in AGENTS.md CLAUDE.md opencode.json .aider.conf.yml bin/linux-admin-install.js \
    docs/AI_TOOL_SUPPORT.md docs/CODEX_USAGE.md docs/EXPERT_MODULE_INDEX.md \
    docs/LOCAL_GLOBAL_AGENT_SETUP.md docs/SECURITY_PATCH_REFRESH_POLICY.md \
    docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md; do
    grep -Fq "$packaged_file" <<< "$pack_json" || err "npm package omits required file: $packaged_file"
  done
  while IFS= read -r procedure_file; do
    grep -Fq "$procedure_file" <<< "$pack_json" || err "npm package omits canonical procedure: $procedure_file"
  done < <(find skills -type f \( -name 'SKILL.md' -o -path '*/chunks/*.md' \) | sort)
fi

secret_hits=$(grep -RInE '(BEGIN (RSA|OPENSSH|EC|DSA|PRIVATE) KEY|AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9_]{30,}|xox[baprs]-[A-Za-z0-9-]{20,})' --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=.venv --exclude='validate-linux-admin.sh' . 2>/dev/null || true)
[ -z "$secret_hits" ] || err "possible secret/token material found:\n$secret_hits"

while IFS= read -r sh_file; do bash -n "$sh_file" || err "shell syntax failed: $sh_file"; done < <(find hooks .githooks -type f -name '*.sh' 2>/dev/null | sort)
if [ -f .githooks/pre-commit ]; then bash -n .githooks/pre-commit || err "shell syntax failed: .githooks/pre-commit"; fi
while IFS= read -r bin_file; do
  [ "$(head -n1 "$bin_file" 2>/dev/null || true)" = '#!/usr/bin/env bash' ] || continue
  bash -n "$bin_file" || err "shell syntax failed: $bin_file"
done < <(find bin -maxdepth 1 -type f 2>/dev/null | sort)

while IFS= read -r bin_file; do
  [ "$(head -n1 "$bin_file" 2>/dev/null || true)" = '#!/usr/bin/env bash' ] || continue
  target_rel=$(sed -nE 's#.*\/\.\.\/(scripts\/[A-Za-z0-9_.\/-]+)".*#\1#p' "$bin_file" | head -n1)
  [ -n "$target_rel" ] || continue
  case "$target_rel" in scripts/*) ;; *) err "audit wrapper target escapes scripts/: $bin_file -> $target_rel"; continue ;; esac
  [ -f "$target_rel" ] || { err "audit wrapper target missing: $bin_file -> $target_rel"; continue; }
  [ -x "$target_rel" ] || err "audit wrapper target is not executable: $bin_file -> $target_rel"
done < <(find bin -maxdepth 1 -type f 2>/dev/null | sort)

if [ "$errors" -gt 0 ]; then
  printf '\nValidation failed: %d error(s), %d warning(s).\n' "$errors" "$warnings" >&2
  exit 1
fi
printf '\nValidation passed: %d warning(s).\n' "$warnings"