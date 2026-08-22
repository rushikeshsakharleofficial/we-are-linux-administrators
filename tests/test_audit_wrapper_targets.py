#!/usr/bin/env python3
"""Validate extensionless Bash audit wrappers and their delegated scripts."""

from pathlib import Path
import os
import re


ROOT = Path(__file__).resolve().parents[1]
BIN = ROOT / "bin"
TARGET_RE = re.compile(r'/\.\./(scripts/[A-Za-z0-9_.\-/]+)"')


def audit_wrapper_targets_exist() -> None:
    """Every Bash wrapper that delegates into scripts/ must resolve to a real target."""
    missing: list[str] = []
    non_executable: list[str] = []
    wrappers_checked = 0

    for wrapper in sorted(BIN.iterdir()):
        if not wrapper.is_file():
            continue
        text = wrapper.read_text(encoding="utf-8")
        if not text.startswith("#!/usr/bin/env bash\n"):
            continue

        match = TARGET_RE.search(text)
        if not match:
            continue

        wrappers_checked += 1
        target = ROOT / match.group(1)
        if not target.is_file():
            missing.append(f"{wrapper.relative_to(ROOT)} -> {target.relative_to(ROOT)}")
            continue
        if not os.access(target, os.X_OK):
            non_executable.append(str(target.relative_to(ROOT)))

    assert wrappers_checked > 0, "No delegated Bash audit wrappers were discovered"
    assert not missing, "Audit wrapper target(s) missing:\n" + "\n".join(missing)
    assert not non_executable, "Audit wrapper target(s) are not executable:\n" + "\n".join(non_executable)


def audit_wrapper_targets_stay_in_scripts() -> None:
    """Compatibility wrappers must not delegate outside the repository scripts directory."""
    escaped: list[str] = []
    scripts_root = (ROOT / "scripts").resolve()

    for wrapper in sorted(BIN.iterdir()):
        if not wrapper.is_file():
            continue
        text = wrapper.read_text(encoding="utf-8")
        if not text.startswith("#!/usr/bin/env bash\n"):
            continue
        match = TARGET_RE.search(text)
        if not match:
            continue

        target = (ROOT / match.group(1)).resolve()
        try:
            target.relative_to(scripts_root)
        except ValueError:
            escaped.append(f"{wrapper.relative_to(ROOT)} -> {target}")

    assert not escaped, "Audit wrapper target escaped scripts/:\n" + "\n".join(escaped)


def main() -> None:
    audit_wrapper_targets_exist()
    audit_wrapper_targets_stay_in_scripts()
    print("audit wrapper target validation passed")


if __name__ == "__main__":
    main()
