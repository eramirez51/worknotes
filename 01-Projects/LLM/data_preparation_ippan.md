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
    string_agg(case when cast_type_name = '出演' then normalize_person_name end, ', ') as actor,
    string_agg(case when cast_type_name = '声の出演' then normalize_person_name end, ', ') as voice_actor,
    string_agg(case when cast_type_name in ('監督','演出') then normalize_person_name end, ', ') as director
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
    where cast_type_name in ('出演', '声の出演','監督','演出')
  )
  group by sakuhin_public_code
),

leanback_tags as (
  select
    sakuhin_public_code,
  string_agg(tag_name, ',') as tag_names
  from `un-ds-dwh.autoalt.ippan_sakuhin_tag_rel`
  inner join `un-ds-dwh.seed_data.ippan_menu_metadata` using(tag_public_code)
  group by 1
)

select 
  sakuhin_public_code,
  ds.sakuhin_name,
  highlight,
  story,
  ds.main_genre_code,
  actor,
  voice_actor,
  director,
  lt.tag_names
from `un-ds-dwh.staging.dim_sakuhin` ds
-- inner join `un-ds-dwh.recommendation_analysis.ippan_available_sakuhin` using(sakuhin_public_code)
left join people using (sakuhin_public_code)
left join leanback_tags lt using(sakuhin_public_code)
```

Below is for Book (created for me by Alex)

```sql
with book_pen_names as (
  select
    book_public_code,
    string_agg(distinct pen_name, ',') as pen_names
  from `un-ds-dwh.staging.rel_book_writer`
  inner join `un-ds-dwh.rawdata.cmsdb-pen_name` using(pen_name_public_code)
  group by 1
)

, book_tags as (
  select
    book_sakuhin_id,
    string_agg(distinct leanback_menu_name, ',') as tag_names
  FROM `un-ds-dwh.rawdata.cmsdb-book_sakuhin_tag_rel`
  inner join `un-ds-dwh.seed_data.book_sakuhin_menu_metadata_all` using(tag_id)
  group by 1
)

select
  book_sakuhin_public_code,
  book_public_code,
  bs.display_name as book_sakuhin_name,
  book_name,
  book_introduction,
  catch_sentence,
  media_type_code,
  tag_names,
  pen_names
from `un-ds-dwh.rawdata.cmsdb-book_sakuhin` bs
inner join `un-ds-dwh.rawdata.cmsdb-book` using(book_sakuhin_id)
inner join `un-ds-dwh.rawdata.cmsdb-book_detail` using(book_id)
left join book_pen_names using(book_public_code)
left join book_tags bt using(book_sakuhin_id)
```

# How to pull data from BQ

I think I need to create a tool. But for now the plan si something like below

```bash

```
