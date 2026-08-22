#!/usr/bin/env python3
"""Prevent canonical routing/install docs from advertising retired top-level skills."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RETIRED_FILE = ROOT / "tests" / "retired_top_level_skills.txt"
CANONICAL_DOCS = (
    ROOT / "README.md",
    ROOT / "AGENTS.md",
    ROOT / "skills" / "using-linux-admin" / "SKILL.md",
    ROOT / "docs" / "USAGE.md",
    ROOT / "docs" / "CODEX_USAGE.md",
    ROOT / "docs" / "AI_TOOL_SUPPORT.md",
    ROOT / "docs" / "LOCAL_GLOBAL_AGENT_SETUP.md",
    ROOT / "docs" / "EXPERT_MODULE_INDEX.md",
)


def retired_skills() -> list[str]:
    skills: list[str] = []
    for raw_line in RETIRED_FILE.read_text(encoding="utf-8").splitlines():
        line = raw_line.split("#", 1)[0].strip()
        if line:
            skills.append(line)
    return skills


def find_retired_mentions(text: str, retired: list[str]) -> list[str]:
    hits: list[str] = []
    for skill in retired:
        pattern = rf"(?<![A-Za-z0-9-]){re.escape(skill)}(?![A-Za-z0-9-])"
        if re.search(pattern, text):
            hits.append(skill)
    return hits


def main() -> None:
    assert RETIRED_FILE.is_file(), f"missing retired skill registry: {RETIRED_FILE}"
    retired = retired_skills()
    assert retired, "retired skill registry is empty"

    failures: list[str] = []
    for doc in CANONICAL_DOCS:
        if not doc.is_file():
            failures.append(f"missing canonical documentation: {doc.relative_to(ROOT)}")
            continue
        hits = find_retired_mentions(doc.read_text(encoding="utf-8"), retired)
        if hits:
            failures.append(
                f"{doc.relative_to(ROOT)} advertises retired top-level skill(s): "
                + ", ".join(sorted(hits))
            )

    assert not failures, "\n".join(failures)
    print(
        "canonical docs retired-skill guard passed: "
        f"{len(CANONICAL_DOCS)} files checked against {len(retired)} retired skills"
    )


if __name__ == "__main__":
    main()
