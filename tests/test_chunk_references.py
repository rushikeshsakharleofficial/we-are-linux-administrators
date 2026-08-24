#!/usr/bin/env python3
"""Validate condition-specific chunk references from canonical skill entry points."""

from pathlib import Path
import re


ROOT = Path(__file__).resolve().parents[1]
SKILLS = ROOT / "skills"
CHUNK_REF = re.compile(r"(?<![A-Za-z0-9_./-])(chunks/[A-Za-z0-9_.\-/]+\.md)")


def resolve_chunk(skill_file: Path, relative_ref: str) -> tuple[Path | None, str | None]:
    """Resolve a local chunk first, then one unambiguous cross-parent chunk."""
    local_target = skill_file.parent / relative_ref
    if local_target.is_file():
        return local_target, None

    candidates = sorted(SKILLS.glob(f"*/{relative_ref}"))
    if len(candidates) == 1:
        return candidates[0], None
    if not candidates:
        return None, "missing"
    return None, "ambiguous"


def referenced_chunks_resolve() -> None:
    """Every explicit chunks/*.md reference must resolve locally or to one unique parent."""
    missing: list[str] = []
    ambiguous: list[str] = []

    for skill_file in sorted(SKILLS.glob("*/SKILL.md")):
        text = skill_file.read_text(encoding="utf-8")
        for relative_ref in sorted(set(CHUNK_REF.findall(text))):
            target, error = resolve_chunk(skill_file, relative_ref)
            if error == "missing":
                missing.append(f"{skill_file.relative_to(ROOT)} -> {relative_ref}")
            elif error == "ambiguous":
                candidates = sorted(SKILLS.glob(f"*/{relative_ref}"))
                rendered = ", ".join(path.relative_to(ROOT).as_posix() for path in candidates)
                ambiguous.append(
                    f"{skill_file.relative_to(ROOT)} -> {relative_ref} matches: {rendered}"
                )
            else:
                assert target is not None
                assert target.is_relative_to(SKILLS), f"chunk escaped skills/: {target}"

    assert not missing, "Missing condition-specific chunk reference(s):\n" + "\n".join(missing)
    assert not ambiguous, (
        "Ambiguous cross-parent chunk reference(s); qualify the parent in routing text:\n"
        + "\n".join(ambiguous)
    )


def chunk_reference_syntax_is_safe() -> None:
    """Chunk references are simple repository-relative paths without traversal."""
    unsafe: list[str] = []

    for skill_file in sorted(SKILLS.glob("*/SKILL.md")):
        text = skill_file.read_text(encoding="utf-8")
        for relative_ref in sorted(set(CHUNK_REF.findall(text))):
            parts = Path(relative_ref).parts
            if not parts or parts[0] != "chunks" or ".." in parts:
                unsafe.append(f"{skill_file.relative_to(ROOT)} -> {relative_ref}")

    assert not unsafe, "Unsafe chunk reference(s):\n" + "\n".join(unsafe)


def main() -> None:
    referenced_chunks_resolve()
    chunk_reference_syntax_is_safe()
    print("chunk reference validation passed")


if __name__ == "__main__":
    main()
