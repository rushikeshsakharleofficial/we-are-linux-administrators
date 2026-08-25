#!/usr/bin/env python3
"""Keep the website retired-skill card filter aligned with the canonical registry."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RETIRED_FILE = ROOT / "tests" / "retired_top_level_skills.txt"
SITE_RUNTIME = ROOT / "site" / "assets" / "js" / "main.js"


def retired_skills() -> set[str]:
    skills: set[str] = set()
    for raw_line in RETIRED_FILE.read_text(encoding="utf-8").splitlines():
        line = raw_line.split("#", 1)[0].strip()
        if line:
            skills.add(line)
    return skills


def removed_skills_from_runtime() -> set[str]:
    text = SITE_RUNTIME.read_text(encoding="utf-8")
    match = re.search(
        r"const\s+REMOVED_SKILLS\s*=\s*new\s+Set\(\[(.*?)\]\);",
        text,
        flags=re.DOTALL,
    )
    assert match, "site runtime is missing REMOVED_SKILLS"
    return set(re.findall(r"['\"]([a-z0-9-]+)['\"]", match.group(1)))


def main() -> None:
    assert RETIRED_FILE.is_file(), f"missing retired skill registry: {RETIRED_FILE}"
    assert SITE_RUNTIME.is_file(), f"missing site runtime: {SITE_RUNTIME}"

    retired = retired_skills()
    removed = removed_skills_from_runtime()
    assert retired, "retired skill registry is empty"

    missing = sorted(retired - removed)
    assert not missing, (
        "website REMOVED_SKILLS is missing retired top-level skill(s): "
        + ", ".join(missing)
    )

    print(
        "website retired-skill filter passed: "
        f"{len(retired)} retired skills covered by REMOVED_SKILLS"
    )


if __name__ == "__main__":
    main()
