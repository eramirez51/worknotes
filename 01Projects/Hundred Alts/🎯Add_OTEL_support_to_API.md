---
id: 🎯Add_OTEL_support_to_API
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


# POC
* https://github.com/u-next/datascience-infra-starship/pull/121/files
