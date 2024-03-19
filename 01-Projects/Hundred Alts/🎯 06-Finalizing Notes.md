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
This is the SQL i use to validate (still ongoing)
```sql
with

-- features as (

-- SELECT * FROM `dev-ds-sandbox.dev_recommendations.autoalt_ippan_leanback_100_features` WHERE dt = "2024-03-11"

-- ),

pages as

(

select

* except(feature_public_codes)

from (

select

* except(feature_public_codes),

split(feature_public_codes,"|") as feature_public_codes

from `dev-ds-sandbox.dev_recommendations.autoalt_ippan_leanback_100_pages`

where dt = "2024-03-11"

),

unnest(feature_public_codes) feature_public_code

),

features as (

select

*

from `dev-ds-sandbox.dev_recommendations.autoalt_ippan_leanback_100_features`

where dt = "2024-03-11"

),

combined as (

select

*,

concat(feature_public_code,":",coalesce(sakuhin_codes, "")) as reco

from (

select

p.*,

f.* except (create_date, feature_public_code, user_multi_account_id, dt)

from pages p

left join features f

on p.user_multi_account_id = f.user_multi_account_id and p.feature_public_code =f.feature_public_code

)

  

)

select * from combined
```