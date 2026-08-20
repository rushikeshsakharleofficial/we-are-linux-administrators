#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

CHANGE_SAFETY = ROOT / 'skills' / 'change-safety-expert' / 'SKILL.md'
INCIDENT_RESPONSE = ROOT / 'skills' / 'incident-response-expert' / 'SKILL.md'
RCA_CHUNK = ROOT / 'skills' / 'incident-response-expert' / 'chunks' / 'root-cause-analysis.md'
PACK_DOC = ROOT / 'docs' / 'operational-workflow-experts' / 'SKILL_PACK.md'

RETIRED_CHANGE_SKILLS = [
    'change-plan-expert',
    'rollback-expert',
    'maintenance-window-expert',
    'risk-assessment-expert',
    'preflight-check-expert',
    'post-change-validation-expert',
    'production-safety-expert',
]
RETIRED_INCIDENT_SKILLS = [
    'incident-timeline-expert',
    'root-cause-expert',
]


def main():
    assert CHANGE_SAFETY.exists(), CHANGE_SAFETY
    safety = CHANGE_SAFETY.read_text()
    for term in [
        'Evidence first',
        'Preflight',
        'Risk scoring',
        'Change plan structure',
        'Maintenance window design',
        'Post-change validation',
        'rollback',
        'Token-saving tip',
    ]:
        assert term in safety, f'change-safety-expert missing {term}'

    assert INCIDENT_RESPONSE.exists(), INCIDENT_RESPONSE
    incident = INCIDENT_RESPONSE.read_text()
    for term in ['Evidence first', 'Timeline reconstruction', 'containment', 'recovery', 'Token-saving tip']:
        assert term in incident, f'incident-response-expert missing {term}'

    assert RCA_CHUNK.exists(), RCA_CHUNK
    rca = RCA_CHUNK.read_text()
    for term in ['Evidence first', 'Safe RCA workflow', 'root cause', 'confidence', 'Token-saving tip']:
        assert term in rca, f'RCA chunk missing {term}'

    # These workflow micro-skills were consolidated. Guard against accidentally
    # restoring stale top-level paths instead of the current parent architecture.
    for skill in RETIRED_CHANGE_SKILLS + RETIRED_INCIDENT_SKILLS:
        retired = ROOT / 'skills' / skill / 'SKILL.md'
        assert not retired.exists(), retired

    assert PACK_DOC.exists(), PACK_DOC
    pack = PACK_DOC.read_text()
    for term in ['change-safety-expert', 'incident-response-expert', 'root-cause-analysis.md']:
        assert term in pack, f'workflow pack missing {term}'

    print('operational workflow parent/chunk architecture passed')


if __name__ == '__main__':
    main()
