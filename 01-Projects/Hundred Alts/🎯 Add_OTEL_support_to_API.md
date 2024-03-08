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
* Started talking to Yan for APM integration
https://u-next.slack.com/archives/C066RRDHPNH/p1709855362349529?thread_ts=1701217232.613609&cid=C066RRDHPNH


## 2024-03-08
* Created a special Kredo credential so that y-su@unext.jp(yan-san) may have access to it. https://github.com/u-next/datascience-app-kredo/pull/18
* Then gave him a personal access to the secret
https://console.cloud.google.com/security/secret-manager/secret/kredo_gcpotel_pubsub_ro/permissions?project=unext-recommender-system
![[y-su_pubsub_credential.png]]


* To access it, this is the [link](https://apm-kibana.core.unext.dev/app/apm/services/bigtable-base/overview?comparisonEnabled=true&environment=ENVIRONMENT_ALL&kuery=&latencyAggregationType=avg&offset=1w&rangeFrom=now-3d&rangeTo=now&serviceGroup=&transactionType=request)
* Uname/pwd https://u-next.slack.com/archives/C066RRDHPNH/p1709879299729369?thread_ts=1701217232.613609&cid=C066RRDHPNH  
![[APM Access.png]]
# References
* https://newrelic.com/jp/blog/how-to-relic/instrumenting-aws-lambda-functions-with-opentelemetry-sdks
* Examples https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/examples
* https://github.com/open-telemetry/
![[01-Projects/Hundred Alts/Untitled Diagram.svg]]
