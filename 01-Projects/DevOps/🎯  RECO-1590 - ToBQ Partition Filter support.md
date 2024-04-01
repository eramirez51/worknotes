https://jira.unext-info.jp/browse/RECO-1590

# Systems
* [[🕎 00 - ToBQ]]

# Goal
* Add `Partition Filter requirement` when creating the table (if it is incremental with partition)
* Add `Partition Expiration` if it is incremental parition
# Usages
`tobqpy`
* ds-airflow-2-dataops
	* All using `tobqpy`

`tobq` - might need to move these to `tobqpy`
* [x] dags/Beemi_Package_Recommender_AutoALT_general_implicit_Jinja.py ✅ 2024-04-01
* [x] dags/Beemi_Package_Recommender_AutoALT_planet_implicit_Jinja.py ✅ 2024-04-01
* [ ] dags/book_artificial_book_series.py
* [ ] dags/book_related.py
* [ ] dags/capy_extractor.py
* [ ] dags/dsembed_tag_generation.py

# Via DagGenerator
## Kind Notififcation template
* [ ] dags/kind_notification_book_mylist_ref.py
* [ ] dags/kind_notification_book_mylist.py
* [ ] dags/kind_notification_book.py
* [ ] dags/kind_notification_bookpreorder.py
* [ ] dags/kind_notification_video_mylist_ref.py
* [ ] dags/kind_notification_video_mylist.py
* [ ] dags/kind_notification_video.py

## AutoaltMakers
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

