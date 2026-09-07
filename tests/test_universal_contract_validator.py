#!/usr/bin/env python3
"""Regression test for direct Universal Skill Execution Contract coverage."""

from pathlib import Path
import shutil
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
VALIDATOR = ROOT / "hooks" / "validate-universal-contract.sh"

CONTRACT = """# Universal Skill Execution Contract
## Security checks and facts before apply
## Rollback plan
## Architecture fit check
## Architecture audit in final output
## Backup and disaster plan for each tool/workflow
## Token-optimized execution
"""

DIAGNOSE = """---
name: diagnose
---
Follow docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md.
Security/facts check:
Architecture fit:
Backup/disaster plan:
Token-saving note:
"""

GENERIC_ONLY = """---
name: fake-skill
---
# Fake skill
## Validation
Validate the result and document rollback steps.
"""

DIRECT = """---
name: fake-skill
---
# Fake skill
## Universal Skill Execution Contract
Follow docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md.
"""


def run_validator(repo: Path) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["bash", str(repo / "hooks" / "validate-universal-contract.sh"), str(repo)],
        text=True,
        capture_output=True,
        check=False,
    )


def main() -> None:
    with tempfile.TemporaryDirectory() as tmp:
        repo = Path(tmp)
        (repo / "docs").mkdir()
        (repo / "hooks").mkdir()
        (repo / "skills" / "diagnose").mkdir(parents=True)
        (repo / "skills" / "fake-skill").mkdir(parents=True)

        shutil.copy2(VALIDATOR, repo / "hooks" / "validate-universal-contract.sh")
        (repo / "docs" / "UNIVERSAL_SKILL_EXECUTION_CONTRACT.md").write_text(CONTRACT)
        (repo / "skills" / "diagnose" / "SKILL.md").write_text(DIAGNOSE)
        fake = repo / "skills" / "fake-skill" / "SKILL.md"

        fake.write_text(GENERIC_ONLY)
        result = run_validator(repo)
        assert result.returncode == 0, result.stderr
        assert "1 procedure file(s) still need direct universal contract coverage" in result.stderr
        assert "skills/fake-skill/SKILL.md" in result.stderr

        fake.write_text(DIRECT)
        result = run_validator(repo)
        assert result.returncode == 0, result.stderr
        assert "still need direct universal contract coverage" not in result.stderr
        assert "Universal contract validation passed: 0 warning(s)." in result.stdout

    print("universal contract direct-coverage validator test passed")


if __name__ == "__main__":
    main()
