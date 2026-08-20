#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

SKILLS = [
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

RCA_PARENT = ROOT / 'skills' / 'incident-response-expert' / 'SKILL.md'
RCA_CHUNK = ROOT / 'skills' / 'incident-response-expert' / 'chunks' / 'root-cause-analysis.md'
RETIRED_RCA = ROOT / 'skills' / 'root-cause-expert' / 'SKILL.md'


def main():
    for skill in SKILLS:
        path = ROOT / 'skills' / skill / 'SKILL.md'
        assert path.exists(), skill
        text = path.read_text()
        assert text.startswith('# '), skill
        for term in REQUIRED_TERMS:
            assert term in text, f'{skill} missing {term}'

    # RCA was consolidated into incident-response-expert. Guard the parent/chunk
    # architecture instead of requiring the retired root-cause-expert path.
    assert RCA_PARENT.exists(), RCA_PARENT
    assert RCA_CHUNK.exists(), RCA_CHUNK
    assert not RETIRED_RCA.exists(), RETIRED_RCA
    rca = RCA_CHUNK.read_text()
    for term in ['Evidence first', 'Safe RCA workflow', 'root cause', 'confidence', 'Token-saving tip']:
        assert term in rca, f'RCA chunk missing {term}'

    assert (ROOT / 'docs' / 'operational-workflow-experts' / 'SKILL_PACK.md').exists()
    print('operational workflow experts passed')


if __name__ == '__main__':
    main()
