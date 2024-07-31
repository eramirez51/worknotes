---
id: credential
aliases: []
tags: []
---




# Credentials neede

1st credential
*  Run the command from concourse
  *  `gcloud dataflow deploy`
  *  run `datafow flex-template`
   
    ```
    --role=“roles/iam.serviceAccountUser” \
    --role=“roles/storage.objectViewer” \
    --role=“roles/storage.objectCreator” \
    --role=“roles/storage.objectAdmin” \
    --role=“roles/cloudbuild.builds.builder” \
    --role=“roles/viewer” \
    ```

Will run in concourse

```
    --role=“roles/dataflow.worker” \
```

```bash
# credential you are using run dataflow cannot read from bigtable and pubsub
gcloud dataflow flex-template run "ds-search-history-dev-test" \
--template-file-gcs-location "gs://ds-search-infra-dev/dataflow/pipeline.json" \
--project "unext-recommender-system" \
--region "asia-northeast1" \
--temp-location "gs://ds-search-infra-dev/job-tmp" \
--parameters input_pubsub_topic="projects/unext-recommender-system/topics/starship-unext-dev-search-htry-topic" \
--parameters output_bigtable="unext-recommender-system/starship-unext-dev-search-htry/user_search_kw_history" \
--additional-experiments=graph_validate_only \
--service-account-email "kredo-gcp-cicdtest-gcr-rw@unext-recommender-system.iam.gserviceaccount.com"
```

2nd credential


```bash


```
