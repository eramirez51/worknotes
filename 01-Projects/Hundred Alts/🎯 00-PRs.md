---
id: 🎯 Deploy to Prod.md
aliases: []
tags:
  - Project
  - Autoalt
  - hundred_alts
Area:
  - 🕎 00 - Hundred Alts
created: 16-02-2024 10:51
status: In Progress
---
PRs
* OTEL name change, Bigtable column name change https://github.com/u-next/starship-app-autoalt/pull/405
* Change LMDB paths to be compatible with the DAG
	* To staging: https://github.com/u-next/starship-app-autoalt/pull/407
	* To main: https://github.com/u-next/starship-app-autoalt/pull/408s
* Addtl filters, move lmdb to staging and prod https://jira.unext-info.jp/browse/RECO-1513
*  [[2024-03-26]] Changed `src/bigtabletools` backup location https://github.com/u-next/datascience-infra-starship/pull/129
*  [[2024-03-26]] Moved the `bigtable table id` config location https://github.com/u-next/ds-autoaltmakers/pull/402
*  [[2024-03-26]] Addtl triggered branch - https://github.com/u-next/datascience-recommendation-central/pull/105
*  [[2024-03-26]] Cleanup bigtable file - https://github.com/u-next/ds-airflow-2-gke/pull/707
* [[2024-03-26]] Additional alert policy, upgrade GCP Terraform lib to support `severity` in alert config https://github.com/u-next/datascience-infra-starship/pull/130
* [[02-Areas/DailyNotes/2024-03-27]] Upgrace starship bigtable - https://github.com/u-next/datascience-infra-starship/pull/132
* [[04-Archives/2024-02-14-Archives/2024-03-27]] Synced the hundred_alts config same with mixing config - https://github.com/u-next/ds-autoaltmakers/pull/407
* [[2024-03-28]] Addtl cache clear and slack - https://github.com/u-next/ds-autoaltmakers/pull/410
* [[2024-03-28]] Force to Superusers - https://github.com/u-next/starship-app-ab-service/pull/106