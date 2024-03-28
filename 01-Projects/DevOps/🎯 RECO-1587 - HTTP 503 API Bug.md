---
id: 🎯 Deploy to Prod.md
aliases: 
tags:
  - Project
  - Autoalt
  - Adult
Area:
  - 🕎 00 - Hundred Alts
created: 16-02-2024 10:51
status: In Progress
---
# JIRA
https://jira.unext-info.jp/browse/RECO-1587

* Found there is a bug in `apibase` where `probes` is also being put to `initContainers` section. made a PR: https://github.com/u-next/starship-app-charts/pull/155
* Made a  change in `leadtitle` to add probes - https://github.com/u-next/starship-app-central-leadtitle/pull/16
	* - leadtitle consumes 0.01 cpu an prod, but we request 0.5cpu, i made adjustment to just request 0.05
* Created this `Alert` to detect http 503 issues
	* https://console.cloud.google.com/monitoring/alerting/policies/14811055356748677455?hl=en&project=unext-recommender-system