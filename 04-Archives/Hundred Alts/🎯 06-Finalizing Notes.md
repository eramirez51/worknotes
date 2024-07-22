---
id: 🎯 UploadToBigTable
aliases: 
tags:
  - hundred_alts
  - Project
  - Autoalt
Area:
  - Autoalt, hundred_alts
priority: Medium
status: In Progress
---
# Todos
- [x] Fix the deployment file location in the DAG. Prod data should be isolated ✅ 2024-03-22
- [x] Separate the bigtabletools uploader config in [[🕎 00 - Starship]] repo ✅ 2024-03-22
- [x] Move lmdb file between envs - https://github.com/u-next/starship-app-autoalt/pull/407 ✅ 2024-03-22
- [x] When table is created, add partition expiration and require partition filter ✅ 2024-03-22
- [x] Dont upload to BQ if not data is not uploaded to prod ✅ 2024-03-26
- [ ] Double check that the 100 alts logic is correct - Do quick chat with Jens and Alex
- [x] Add the yaml file to `./src/bigtabletools` of [[🕎 00 - Starship]] repo ✅ 2024-03-26