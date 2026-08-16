# Root-cause analysis

Load this chunk only after immediate containment/recovery needs are understood, or when the task is explicitly post-incident RCA. Do not delay urgent containment to complete RCA.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`.

## Purpose

Establish the most likely technical causal chain from bounded evidence. Separate symptoms, triggers, contributing factors, latent conditions, and proven root cause. Keep uncertainty explicit.

## Evidence first

Collect only the smallest useful set:

- affected scope and impact
- five-line incident timeline with timezone
- recent changes/deployments/configuration events
- one bounded relevant log window
- one relevant metrics summary
- what recovered, what still fails, and what mitigation changed

## Condition checks

| Signal | Interpretation / next step |
|---|---|
| First error appears after an earlier degradation/change | First error may be a symptom; correlate backwards in time |
| Incident disappears after rollback | Strong evidence for change-related causality, but verify the changed mechanism |
| Same failure repeats without the suspected trigger | Hypothesis is incomplete or wrong; test another causal branch |
| Multiple independent safeguards failed | Record latent/control failures as contributing factors |
| Evidence is contradictory or missing | Mark cause unproven; request the smallest next evidence query |

## Safe RCA workflow

1. Define the observed symptom and business/technical impact.
2. Build a timezone-labelled timeline. Detection time is not automatically incident start time.
3. List observations separately from hypotheses.
4. Identify candidate trigger, contributing factors, and latent conditions.
5. Test each hypothesis with small, reversible evidence queries or safe reproduction when appropriate.
6. Build the causal chain: trigger -> mechanism -> failure -> impact -> why safeguards did not stop it.
7. State the root cause only when evidence supports it; otherwise use `probable`, `possible`, or `unknown` with confidence.
8. Define corrective actions for the direct cause and preventive actions for control/process gaps.
9. Validate that the proposed correction would detect, prevent, or safely contain recurrence.

## Evidence rules

- Correlation is not causation.
- A successful mitigation does not automatically prove root cause.
- The first log error is often downstream damage.
- Do not hide conflicting evidence.
- Do not blame individuals; identify technical, process, design, monitoring, or control failures.
- Preserve raw evidence references so a formal incident report can trace conclusions back to sources.

## Output

Return:

1. impact and scope
2. ordered timeline
3. observations
4. hypotheses with evidence for/against
5. root cause or current best causal explanation
6. confidence and unresolved gaps
7. contributing/latent factors
8. corrective actions
9. preventive actions and validation

When the facts are stable and a `.docx`, `.xlsx`, `.pdf`, `.pptx`, PIR, RCA pack, or management report is requested, hand the verified dataset to `incident-report-creator-expert` rather than turning incident response into an artifact-generation skill.

## Token-saving tip

Start with a five-line timeline, one bounded log window, one metric summary, and the latest relevant change. Expand only when a hypothesis needs more evidence.
