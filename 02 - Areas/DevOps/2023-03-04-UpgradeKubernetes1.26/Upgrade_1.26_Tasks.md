---
id: Upgrade_1.26_Tasks
aliases: []
tags: []
---


# Summary of what happened during this upgrade
* Upgraded ISTIO to 1.18.7
* Upgraded KeyDB helm chart to using the official helm chart, but we no longer need it, so I just did not use it, but kept usable in case it is needed
* Removed KeyDB nodes because it has been deprecated
* Upgraded Concourse helm chart to 12.3.0
* Concourse Builder no longer works in Kubernetes 1.26, Docker inside container no longer works, so I had to change the builder and upgrade its version to 2.0.5. I had to change all pipelines to start using it.
* Airflow did not require special change for 1.26

# Details

Changes for DBT Docs
* Add support for credentials file instead of env variable - https://github.com/u-next/datascience-infra-dataops/pull/74

Changes for Skyhub support of 1.26
* Merged: Addtional `apisecrets`  https://github.com/u-next/ds-infra-skyhub/pull/50 to pull extra necessary credentials for DBT Docs
* Merged: I needed to update DBT Docs helm chart to prevent it from using a wide credential - https://github.com/u-next/datascience-infra-dataops/pull/74
* Addtl `GetObjectVersion` for s3readwriter
 ** Merged: https://github.com/u-next/datascience-app-airflow/pull/159 
 ** Merged: https://github.com/u-next/datascience-app-kredo/pull/17
* Add support for credentials as file, in preparation for move to GCS instead of AWS https://github.com/u-next/datascience-dataops-dbt/pull/545
 ** Note: I need to wait for this PR to get merged before asking for PR of this change https://github.com/u-next/datascience-dataops-dbt/pull/544 

