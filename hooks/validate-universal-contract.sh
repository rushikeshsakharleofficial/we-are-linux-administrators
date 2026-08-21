#!/usr/bin/env bash
# validate-universal-contract.sh — checks Universal Skill Execution Contract coverage.

set -uo pipefail

ROOT="${1:-$(pwd)}"
cd "$ROOT" 2>/dev/null || exit 2

errors=0
warnings=0

err() { errors=$((errors + 1)); printf 'ERROR: %s\n' "$*" >&2; }
warn() { warnings=$((warnings + 1)); printf 'WARN: %s\n' "$*" >&2; }

[ -f docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md ] || err "missing docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md"
[ -f skills/diagnose/SKILL.md ] || err "missing skills/diagnose/SKILL.md"

if [ -f docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md ]; then
  for required in \
    'Security checks and facts before apply' \
    'Rollback plan' \
    'Architecture fit check' \
    'Architecture audit in final output' \
    'Backup and disaster plan' \
    'Token-optimized execution'; do
    grep -q "$required" docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md || err "contract missing required rule: $required"
  done
fi

if [ -f skills/diagnose/SKILL.md ]; then
  grep -q 'UNIVERSAL_SKILL_EXECUTION_CONTRACT.md' skills/diagnose/SKILL.md || err "diagnose skill does not reference universal contract"
  grep -q 'Security/facts check' skills/diagnose/SKILL.md || warn "diagnose default output should include Security/facts check"
  grep -q 'Architecture fit' skills/diagnose/SKILL.md || warn "diagnose default output should include Architecture fit"
  grep -q 'Backup/disaster plan' skills/diagnose/SKILL.md || warn "diagnose default output should include Backup/disaster plan"
  grep -q 'Token-saving note' skills/diagnose/SKILL.md || warn "diagnose default output should include Token-saving note"
fi

# Every executable procedure surface must carry either a direct contract
# reference or one of the contract's core safety/architecture markers. This
# includes condition-specific chunks: they are packaged procedures and may be
# loaded after the parent, so auditing only top-level SKILL.md files leaves a
# real coverage blind spot. Keep the warning non-blocking while legacy files
# are migrated, but print exact paths so the debt is actionable.
missing_files=()
while IFS= read -r procedure_file; do
  if ! grep -Eq 'Universal Skill Execution Contract|UNIVERSAL_SKILL_EXECUTION_CONTRACT|Security/facts check|Backup/disaster plan|Architecture fit|Rollback|rollback|Validation|validation' "$procedure_file"; then
    missing_files+=("$procedure_file")
  fi
done < <(find skills -type f \( -name SKILL.md -o -path '*/chunks/*.md' \) | sort)

if [ "${#missing_files[@]}" -gt 0 ]; then
  warn "${#missing_files[@]} procedure file(s) still need direct universal contract coverage"
  for procedure_file in "${missing_files[@]}"; do
    printf '  - %s\n' "$procedure_file" >&2
  done
fi

if [ "$errors" -gt 0 ]; then
  printf '\nUniversal contract validation failed: %d error(s), %d warning(s).\n' "$errors" "$warnings" >&2
  exit 1
fi

printf '\nUniversal contract validation passed: %d warning(s).\n' "$warnings"
exit 0
