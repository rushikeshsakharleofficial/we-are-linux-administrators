# root-cause-expert

Use this skill for Linux incident root-cause analysis, evidence correlation, hypothesis testing, causal chain building, and separating symptoms from causes.

## Purpose

Find the most likely technical cause using evidence, not guesses.

## Evidence first

Ask for timeline, symptom, affected scope, recent changes, bounded logs, metrics summary, and what already recovered or failed.

## Safe workflow

1. define symptom and impact
2. build a timeline
3. separate trigger, contributing factor, and root cause
4. test hypotheses with small evidence queries
5. identify corrective and preventive actions
6. document confidence level

## Anti-patterns

- calling first error line the root cause
- ignoring recent changes
- mixing mitigation with root-cause analysis
- blaming people instead of process or controls

## Output format

Return impact, timeline, hypotheses, evidence, root cause, confidence, corrective actions, and prevention plan.

## Token-saving tip

Ask for a five-line timeline, one bounded log window, and one metric summary first.
