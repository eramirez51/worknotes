---
id: data_preparation_ippan
aliases: []
tags: []
---

At the minimum, we need the folllowing files

This below is for Ippan

```sql
with people as (
select 
  sakuhin_public_code,
  count(*) as cnt,
  string_agg(case when cast_type_name = '出演' then normalize_person_name end, ', ') as actor,
  string_agg(case when cast_type_name = '声の出演' then normalize_person_name end, ', ') as voice_actor
from (
  select
    s.sakuhin_public_code,
    pn.normalize_person_name,
    cast_type_name as cast_type_name,
  from `un-ds-dwh.rawdata.cmsdb-sakuhin` s
  inner join `un-ds-dwh.rawdata.cmsdb-credit` cred using(sakuhin_id)
  inner join `un-ds-dwh.rawdata.cmsdb-person_name` pn using(person_name_id)
  inner join `un-ds-dwh.rawdata.cmsdb-person` p using(person_id)
  inner join `un-ds-dwh.rawdata.cmsdb-cast_type` cast_type using(cast_type_id)
  where cast_type_name in ('出演', '声の出演') -- '総監督','監督','演出',
)
  group by sakuhin_public_code
)
select 
  sakuhin_public_code,
  sakuhin_name,
  display_kana,
  highlight,
  story,
  main_genre_code,
  actor,
  voice_actor
from `un-ds-dwh.staging.dim_sakuhin`
inner join people using (sakuhin_public_code)
```
