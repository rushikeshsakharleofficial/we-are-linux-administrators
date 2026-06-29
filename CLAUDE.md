# CLAUDE.md

Project context for Claude Code sessions.

- Use `main` only unless the user explicitly asks for branches or PRs.
- Keep changes small, safe, reversible, and evidence-based.
- Load `docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md` before skill creation or skill updates.
- Load `docs/SECURITY_PATCH_REFRESH_POLICY.md` before OS-specific patch, kernel, desktop, driver, or vulnerability-fix work.
- Prefer chunked reference files under each skill directory so hourly updates can target one category at a time.
- Verify official/vendor sources before updating skill guidance.
- Community findings are signals only.
- Run validation hooks when available and report any blocked or unverified changes.
