from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKILLS = ROOT / "skills"


def main() -> None:
    violations = []

    for path in sorted(SKILLS.rglob("*.md")):
        text = path.read_text(encoding="utf-8")
        if "${CLAUDE_SKILL_DIR}" in text:
            violations.append(path.relative_to(ROOT).as_posix())

    assert not violations, (
        "Canonical skills/chunks must stay cross-agent portable; "
        "replace Claude-only ${CLAUDE_SKILL_DIR} references with repository-relative paths: "
        + ", ".join(violations)
    )

    print("portable skill path regression checks passed")


if __name__ == "__main__":
    main()
