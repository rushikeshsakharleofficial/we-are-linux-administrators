# Capacity planning and scaling decisions

Use this chunk when `performance` evidence is not just an incident snapshot but a capacity question: sustained CPU/memory/storage/network growth, forecasted saturation, failover headroom, or vertical-vs-horizontal scaling.

Follow `../../../docs/UNIVERSAL_SKILL_EXECUTION_CONTRACT.md`.

## Evidence first

Collect summarized trend data rather than raw monitoring exports:

- workload/service role and SLO or latency target
- current resource allocation
- 7-day and 30-day peak and sustained utilization
- growth rate and known seasonal/batch windows
- current saturation/error signals
- redundancy/failover requirement and N+1 headroom

## Decision model

1. Prove the actual bottleneck first; do not scale CPU for storage or network saturation.
2. Separate short spikes from sustained demand.
3. Include business/workload growth and scheduled batch windows.
4. Reserve failover capacity; a cluster that runs at 95% before a node loss is already under-sized.
5. Compare vertical scaling against horizontal scaling for cost, operational complexity, single-node limits and failure domains.
6. Define alert thresholds early enough to act before SLO impact.

## Practical output

Provide:

```text
Current capacity:
Observed peak/sustained demand:
Bottleneck evidence:
Growth assumption:
Required headroom:
Failure/failover headroom:
Vertical option:
Horizontal option:
Recommended trigger/threshold:
Validation after change:
```

## Anti-patterns

- forecasting from one incident spike
- averaging away peak-period saturation
- excluding N+1/failover headroom
- scaling a resource that is not the bottleneck
- treating a forecast as precise when the growth input is uncertain

## Validation

After scaling, compare the same workload window against pre-change utilization, saturation, latency/error rate, headroom and failover capacity. Revisit alerts and document the next threshold that should trigger another review.
