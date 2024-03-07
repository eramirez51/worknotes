---
id: 🎯 Add_OTEL_support_to_API
aliases: []
tags:
  - Project,
  - Autoalt,
  - hundred_alts
Area: Autoalt, hundred_alts
created: 16-02-2024 13:07
priority: Medium
status: In Progress
---

Plan
* Make sure it is configurable via env variables

How to do
* Conditionally do tracing based if env variable (`ENABLE_OTEL_TRACING`?) exist? https://github.com/u-next/datascience-infra-starship/blob/9d00726273f6487fff850e923f457d92b7366856/src/apm/server.js
* Add a `tracing.js` but use `koajs` instead of `hapi`. Use this library "https://www.npmjs.com/package/@opentelemetry/instrumentation-koa"
* Then do [[🎯 Load Test with OTEL]]

# POC
* https://github.com/u-next/datascience-infra-starship/pull/121/files

# What happened

## 2024-03-07
* There was a problem with Cluster's Workload Identity, where the OTEL publisher wont send to PubSub, I was getting 403 Forbidden
 * After creating Workload Identity Pool, it started working, but im not sure if it is actually the solution https://github.com/u-next/datascience-infra-starship/compare/master...feature/workload_identity_pool
* Did a load testing with OTEL enabled. The performance looks good (`tp95 at 25ms`), basically no change from previous performance
![[LoadTestingWithOtel.png]]

# References
* https://newrelic.com/jp/blog/how-to-relic/instrumenting-aws-lambda-functions-with-opentelemetry-sdks
* Examples https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/examples
* https://github.com/open-telemetry/
![[01-Projects/Hundred Alts/Untitled Diagram.svg]]
