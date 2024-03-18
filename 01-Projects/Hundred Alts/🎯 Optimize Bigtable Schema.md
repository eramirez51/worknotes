---
tags:
  - Project
  - Autoalt
  - hundred_alts
---
# What happened
* I made the change in the bigtable tools and bigtable base to test this feature
	* https://github.com/u-next/datascience-infra-starship/pull/128/files
	* https://github.com/u-next/starship-app-autoalt/pull/404

The performance is very bad with the updated schema
![[load_test_with_page_public_code_as_column_qualifer.png]]


I reversed the optimization, and remeasured. The performance became okay. Even while it was writing 15K records per second, and Bigtable nodes count is `1`, the performance is still okay
![[fresh_write_reverse_optimize.png]]
![[load_test_all_users_reverse_optimize.png]]