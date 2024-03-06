---
id: dbtdocs_migration
aliases: []
tags: []
---

https://jira.unext-info.jp/browse/RECO-1580

# Plan
Will change DBT Docs to start using GCS instead of S3. To do this I need to:
 * Change in `airflow-dataops` to change ENV parameter to start sending to GCS
 * Change in `infra-dataops` to start pulling from GCS
 * Change in `datascience-dataops-dbt`'s `utils.sh` to start sending to GCS https://github.com/u-next/datascience-dataops-dbt/blob/main/utils.sh

# Things I did
## 01-Modify `localenv`
* Start using `localenv`, pointing to `airflow-dataops`
## 02-Modify `airflow-dataops`. 
- [x] Additional ENV parameter https://github.com/u-next/ds-airflow-2-dataops/pull/68
## Modify `infra-dataops/src/dbtdocs` to start sending to GCS is ENV variable is set
- [x] PR - https://github.com/u-next/datascience-dataops-dbt/pull/557


