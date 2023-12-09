https://jira.unext-info.jp/browse/RECO-1451


![[openstack aws-secrets diagram.svg]]
# Todo
* Migrate GraphQL to use GCS instead
	* Modify the DAG
		* https://github.com/u-next/ds-airflow-2-gke/blob/staging/dags/data_item_meta.py#L91
	* Modify the service itself
		* https://github.com/u-next/datascience-visualizer-starship/blob/main/kube/graphql/templates/s3ToSecret.yaml
	* 