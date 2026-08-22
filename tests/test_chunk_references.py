#!/usr/bin/env python3
"""Validate condition-specific chunk references from canonical skill entry points."""

from pathlib import Path
import re


ROOT = Path(__file__).resolve().parents[1]
SKILLS = ROOT / "skills"
CHUNK_REF = re.compile(r"(?<![A-Za-z0-9_./-])(chunks/[A-Za-z0-9_.\-/]+\.md)")


def test_referenced_chunks_exist() -> None:
    """Every explicit chunks/*.md reference in a top-level SKILL.md must resolve locally."""
    missing: list[str] = []

    for skill_file in sorted(SKILLS.glob("*/SKILL.md")):
        text = skill_file.read_text(encoding="utf-8")
        for relative_ref in sorted(set(CHUNK_REF.findall(text))):
            target = skill_file.parent / relative_ref
            if not target.is_file():
                missing.append(f"{skill_file.relative_to(ROOT)} -> {relative_ref}")

    assert not missing, "Missing condition-specific chunk reference(s):\n" + "\n".join(missing)


def test_chunk_references_stay_local_to_parent() -> None:
    """Parent chunk references must remain beneath that parent's chunks directory."""
    escaped: list[str] = []

    for skill_file in sorted(SKILLS.glob("*/SKILL.md")):
        text = skill_file.read_text(encoding="utf-8")
        parent_chunks = (skill_file.parent / "chunks").resolve()
        for relative_ref in sorted(set(CHUNK_REF.findall(text))):
            target = (skill_file.parent / relative_ref).resolve()
            try:
                target.relative_to(parent_chunks)
            except ValueError:
                escaped.append(f"{skill_file.relative_to(ROOT)} -> {relative_ref}")

    assert not escaped, "Chunk reference escaped its parent chunks directory:\n" + "\n".join(escaped)
