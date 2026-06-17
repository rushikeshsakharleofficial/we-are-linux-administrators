# capacity-planning-expert

Use this skill for Linux fleet capacity planning, CPU/memory/storage/network growth forecasts, saturation thresholds, headroom planning, and scaling recommendations.

## Purpose

Convert utilization trends into safe capacity decisions.

## Evidence first

Ask for workload type, current utilization summary, trend window, peak periods, growth expectation, and service SLO/latency target.

## Safe workflow

1. classify resource bottleneck
2. review peak and sustained utilization
3. include growth and redundancy headroom
4. separate vertical and horizontal options
5. define alert thresholds
6. validate after capacity change

## Anti-patterns

- planning from one short spike
- ignoring business growth or batch windows
- scaling CPU when I/O is the bottleneck
- excluding redundancy/failover headroom

## Output format

Return current capacity, bottleneck forecast, recommended headroom, scaling options, validation, and token-saving evidence request.

## Token-saving tip

Ask for summarized 7/30-day peaks and current bottleneck evidence, not raw monitoring exports.
