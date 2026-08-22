#!/usr/bin/env python3
"""Verify the npm tarball contains the linux-admin CLI and core package files."""

from __future__ import annotations

import json
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PACKAGE_JSON = ROOT / "package.json"
CLI = "bin/linux-admin-install.js"


def main() -> None:
    assert PACKAGE_JSON.is_file(), "missing package.json"
    package = json.loads(PACKAGE_JSON.read_text(encoding="utf-8"))

    bin_map = package.get("bin")
    assert isinstance(bin_map, dict), "package.json bin mapping is missing"
    assert bin_map.get("linux-admin") == f"./{CLI}", "linux-admin bin target drifted"
    assert bin_map.get("linux-admin-install") == f"./{CLI}", "linux-admin-install bin target drifted"
    assert (ROOT / CLI).is_file(), f"CLI target is missing: {CLI}"

    npm = shutil.which("npm")
    assert npm, "npm is required to verify package distribution"
    result = subprocess.run(
        [npm, "pack", "--dry-run", "--json"],
        cwd=ROOT,
        text=True,
        capture_output=True,
        check=True,
    )
    manifest = json.loads(result.stdout)
    assert manifest and isinstance(manifest, list), "npm pack returned no manifest"
    files = {entry["path"] for entry in manifest[0].get("files", [])}

    required = {
        "package.json",
        "README.md",
        "LICENSE",
        CLI,
        "AGENTS.md",
        "CLAUDE.md",
        "opencode.json",
        ".aider.conf.yml",
        "skills/using-linux-admin/SKILL.md",
        "docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md",
    }
    missing = sorted(required - files)
    assert not missing, "npm package omits required CLI/core file(s): " + ", ".join(missing)

    print(f"package CLI distribution guard passed: {len(required)} required files present")


if __name__ == "__main__":
    main()
