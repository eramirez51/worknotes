---
id: 2023-03-06-dbtdocs_migration
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
* Tested behavior in `localenv`, pointing to `airflow-dataops`

## 02-Modify `airflow-dataops`. 
- [x] Additional ENV parameter https://github.com/u-next/ds-airflow-2-dataops/pull/68

## 03-Modify `infra-dataops/src/dbtdocs` to start sending to GCS is ENV variable is set
- [x] - First change PR - https://github.com/u-next/datascience-dataops-dbt/pull/557
- [x] - I needed to also activate service account https://github.com/u-next/ds-airflow-2-dataops/pull/69
- [x] Modify dbtdocs api to start pulling from gcs 
 * https://github.com/u-next/datascience-infra-dataops/pull/75
 * https://github.com/u-next/ds-airflow-2-dataops/pull/70

