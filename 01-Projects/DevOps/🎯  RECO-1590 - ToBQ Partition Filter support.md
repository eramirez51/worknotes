https://jira.unext-info.jp/browse/RECO-1590

# Systems
* [[🕎 00 - ToBQ]]

# Goal
* Add `Partition Filter requirement` when creating the table (if it is incremental with partition)
* Add `Partition Expiration` if it is incremental parition
# Usages
`tobqpy`
- [x] ds-airflow-2-dataops/book_cmsreco_fetcher.py ✅ 2024-04-02
* [x] dags/Beemi_Package_Recommender_AutoALT_general_implicit_Jinja.py ✅ 2024-04-01
* [x] dags/Beemi_Package_Recommender_AutoALT_planet_implicit_Jinja.py ✅ 2024-04-01
* [x] dags/book_artificial_book_series.py ✅ 2024-04-01
* [x] dags/book_related.py ✅ 2024-04-01
* [x] dags/capy_extractor.py - this is not partitioned. ignore ✅ 2024-04-01
* [x] dags/dsembed_tag_generation.py - unusual `gcscil tobq` pattern. does not use partition, ignore ✅ 2024-04-01
* [x] dags/kind_notification_book_mylist_ref.py ✅ 2024-04-02
* [x] dags/kind_notification_book_mylist.py ✅ 2024-04-02
* [x] dags/kind_notification_book.py ✅ 2024-04-02
* [x] dags/kind_notification_bookpreorder.py ✅ 2024-04-02
* [x] dags/kind_notification_video_mylist_ref.py ✅ 2024-04-02
* [x] dags/kind_notification_video_mylist.py ✅ 2024-04-02
* [x] dags/kind_notification_video.py ✅ 2024-04-02
* [x] dags/Book_sakuhin_Recommender_AutoALT_implicit_all_Jinja.py ✅ 2024-04-01
* [x] dags/Book_sakuhin_Recommender_AutoALT_implicit_random_Jinja.py ✅ 2024-04-01
* [x] dags/Gelatoni_Recommender_AutoALT_implicit_Jinja.py ✅ 2024-04-01
* [x] dags/Ippan_Recommender_AutoALT_mixing_random.py ✅ 2024-04-01
* [x] dags/Ippan_Recommender_AutoALT_mixing.py ✅ 2024-04-01
* [x] dags/Ippan_Recommender_AutoALT_wtr_nokeydb.py ✅ 2024-04-01
* [x] dags/Label_Recommender_AutoALT_implicit_Jinja.py ✅ 2024-04-01
* [x] dags/Semiadult_Recommender_AutoALT_implicit_Jinja.py ✅ 2024-04-01
* [x] dags/Sport_Recommender_AutoALT_implicit_Jinja.py ✅ 2024-04-01


I cannot use the python API, but it seems i can execute a follow up command after like below
```bash	
	bq update --require_partition_filter ${PROJECT}:${DATASET}.${TABLE_NAME}
```


# PRS
* Autoalt Maker
	* https://github.com/u-next/ds-autoaltmakers/pull/414
* Airflow2gke
	* https://github.com/u-next/ds-airflow-2-gke/pull/711
* Airflow2Dataops
	* https://github.com/u-next/ds-airflow-2-dataops/pull/75