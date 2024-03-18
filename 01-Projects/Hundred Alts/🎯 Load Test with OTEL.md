---
id: 🎯 Load Test with OTEL
aliases: 
tags:
  - hundred_alts
  - Project
  - Autoalt
Area:
  - Autoalt, hundred_alts
created: 16-02-2024 13:07
priority: Medium
status: In Progress
---
https://jira.unext-info.jp/browse/RECO-1514

Plan
* Add support for OTEL in KoaJs API, make sure it is configurable
* [[🎯Add_OTEL_support_to_API]]
* Support switching-it-off via ENV variable

What happened

## 2024-03-07

* Did a load testing with OTEL enabled. The performance looks good (`tp95 at 25ms`), basically no change from previous performance
![[LoadTestingWithOtel.png]]

 
