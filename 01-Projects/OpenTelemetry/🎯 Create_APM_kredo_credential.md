---
id: 🎯 Create_APM_kredo_credential
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

# Background

* The APM client will be calling from on-premise
* We prefer that the client would use [AD FS](https://cloud.google.com/iam/docs/workload-identity-federation#providers), but need to ask Kou-san, or Bai or Momo about it 

# Plan

## To Add Pubsub client to our consumer

* According to this [document](https://cloud.google.com/pubsub/docs/access-control#pubsub.subscriber), we need `roles/pubsub.subscriber` 
* There is no good place to create this kredo credential right now (unique use case), I will add in [[🕎 00 - Kredo]] main repo instead
* I should not add add this in an cred rotator because client will not be able to refresh. Ideally, we should use `AD FS`


# What happened
## To Add Pubsub client to our consumer
* https://github.com/u-next/datascience-app-kredo/pull/18
## Asked how to use `AD FS` in main channel
* Sent a message to `#unext-dev` channel https://u-next.slack.com/archives/C320446MD/p1709875383796779


