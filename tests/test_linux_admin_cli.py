#!/usr/bin/env python3
"""Regression checks for the packaged linux-admin Node CLI entry point."""

from __future__ import annotations

import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CLI = ROOT / "bin" / "linux-admin-install.js"
PACKAGE = ROOT / "package.json"
SKILLS = ROOT / "skills"
ROUTER = SKILLS / "using-linux-admin" / "SKILL.md"


def run(*args: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        list(args),
        cwd=ROOT,
        text=True,
        capture_output=True,
        check=False,
    )


def main() -> None:
    assert CLI.is_file(), f"missing CLI entry point: {CLI}"
    assert PACKAGE.is_file(), f"missing package metadata: {PACKAGE}"
    assert ROUTER.is_file(), f"missing canonical router: {ROUTER}"

    syntax = run("node", "--check", str(CLI))
    assert syntax.returncode == 0, syntax.stderr or syntax.stdout

    package = json.loads(PACKAGE.read_text(encoding="utf-8"))
    expected_version = package["version"]
    expected_skills = sum(
        1
        for path in SKILLS.iterdir()
        if path.is_dir() and (path / "SKILL.md").is_file()
    )

    status = run("node", str(CLI), "status")
    assert status.returncode == 0, status.stderr or status.stdout
    output = status.stdout

    assert f"linux-admin {expected_version}" in output, output
    assert f"detected skills: {expected_skills}" in output, output
    assert f"master router: {ROUTER}" in output, output

    print(
        f"linux-admin CLI validation passed: version={expected_version}, "
        f"skills={expected_skills}"
    )


if __name__ == "__main__":
    main()
