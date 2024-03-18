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
# Background
* Currently, Adult recommendation is deployed to SOLR via [[🕎 00 - Streamset]]. But recently, its been failing everyday and needs constant manual attention.
* We suspect that this is due to the increase of number of users, thus it needs a big refactoring to handle the size, one way is via Parallelization
* 