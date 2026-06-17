#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

SKILLS = [
    'root-cause-expert',
    'change-plan-expert',
    'rollback-expert',
    'maintenance-window-expert',
    'risk-assessment-expert',
    'preflight-check-expert',
    'post-change-validation-expert',
    'incident-timeline-expert',
    'production-safety-expert',
]

REQUIRED_TERMS = [
    'Evidence first',
    'Safe workflow',
    'Anti-patterns',
    'Output format',
    'Token-saving tip',
]


def main():
    for skill in SKILLS:
        path = ROOT / 'skills' / skill / 'SKILL.md'
        assert path.exists(), skill
        text = path.read_text()
        assert text.startswith('# '), skill
        for term in REQUIRED_TERMS:
            assert term in text, f'{skill} missing {term}'
    assert (ROOT / 'docs' / 'operational-workflow-experts' / 'SKILL_PACK.md').exists()
    print('operational workflow experts passed')


if __name__ == '__main__':
    main()
