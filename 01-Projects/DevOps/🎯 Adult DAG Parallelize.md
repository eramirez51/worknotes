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
https://jira.unext-info.jp/browse/RECO-1591

# System
* [[🎯 Adult DAG]]

# Background
* Currently, Adult recommendation is deployed to SOLR via [[🕎 00 - Streamset]]. But recently, its been failing everyday and needs constant manual attention.
* We suspect that this is due to the increase of number of users, thus it needs a big refactoring to handle the size, one way is via Parallelization
* We tried asking CMS to move this to Starship, but they declined, saying that they prefer to wait for Beemi https://u-next.slack.com/archives/C9V96J8DP/p1710728164928359
# Resources
* DAG code - See [[🎯 Adult DAG]]

# Plan
* Try generating small recos instead of one whole chunk.