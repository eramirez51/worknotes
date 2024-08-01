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

I had to develop a tool to easily get this data from BQ and add it to to my `~/.zshrc.min` in my dotfiles
https://u-next.slack.com/archives/C01P6HVJKNZ/p1721787063230909

```bash

bq_to_gcs_csv \
/home/eugene/apps/projects/unext/ds-searchreco-customllm/lab/dataprep/sqls/book.sql \
"gs://ds-airflow-jobs/unexttokenizer/dev/data/metadata/books.csv.gz"

```

```bash

bq_to_gcs_csv \
/home/eugene/apps/projects/unext/ds-searchreco-customllm/lab/dataprep/sqls/ippan.sql \
"gs://ds-airflow-jobs/unexttokenizer/dev/data/metadata/ippan.csv.gz"

```

# Now download from GCS

> Note
> The uploaded data from previous step is gzipped, with `Content-Encoding:gzip` flag.
> Because of this, the file will be autoamatically unzipped when downloaded.

```bash
gsutil cp gs://ds-airflow-jobs/unexttokenizer/dev/data/metadata/books.csv.gz /home/eugene/apps/projects/unext/ds-searchreco-customllm/.build/data/books.csv
gsutil cp gs://ds-airflow-jobs/unexttokenizer/dev/data/metadata/ippan.csv.gz /home/eugene/apps/projects/unext/ds-searchreco-customllm/.build/data/ippan.csv
```

# Prepare the templates

Now lets create the templates for ippan and book. (This is written in the project repo.)

Example

```jinja
{%- if book_sakuhin_name|is_not_nan %}作品の名前は「{{book_sakuhin_name}}」。{% endif %}
{%- if book_name|is_not_nan %}エピソードは「{{book_name}}」。{% endif %}
{%- if book_introduction|is_not_nan %}{{book_introduction}}。{% endif %}
{%- if catch_sentence|is_not_nan %}{{catch_sentence}}。{% endif %}
{%- if tag_names|is_not_nan %}関連するタグは{{tag_names}}。{% endif %}
{%- if media_type_code|is_not_nan %}ジャンルは{{media_type_code}}。{% endif %}
{%- if pen_names|is_not_nan %}作者は{{pen_names}}。{% endif %}
```

# Generate the data
Execute the following command for ippan

```bash

poetry install && utoken prep_generate \
--data_path=/home/eugene/apps/projects/unext/ds-searchreco-customllm/.build/data/ippan.csv \
--output_path=/home/eugene/apps/projects/unext/ds-searchreco-customllm/.build/prep/ippan_generated.jsonl.gz \
--template_path=/home/eugene/apps/projects/unext/ds-searchreco-customllm/lab/dataprep/templates/ippan.j2 \
--header_key=sakuhin_public_code

```

Execute the following command for book

```bash

poetry install && utoken prep_generate \
--output_path=/home/eugene/apps/projects/unext/ds-searchreco-customllm/.build/prep/book_generated.jsonl.gz \
--data_path=/home/eugene/apps/projects/unext/ds-searchreco-customllm/.build/data/books.csv \
--template_path=/home/eugene/apps/projects/unext/ds-searchreco-customllm/lab/dataprep/templates/book.j2 \
--header_key=book_public_code

```



Example run below.

```bash
2024-07-25 10:07:41,166 - unexttokenizer.commands.commands - INFO - {'output_path': '/home/eugene/apps/projects/unext/ds-searchreco-customllm/.build/prep/book_generated.csv', 'data_path': '/home/eugene/apps/projects/unext/ds-searchreco-customllm/.build/data/books.csv', 'template_path': '/home/eugene/apps/projects/unext/ds-searchreco-customllm/lab/dataprep/templates/book.j2', 'header_key': 'book_public_code'}                                                                                                                                                                                                                                                                                             
Writing rows to CSV: 100%|██████████████████████████████████████████████████████████████████████████████████████████████████████| 1602958/1602958 [01:25<00:00, 18843.09row/s]
```

I plan to use Gemini to convert these generated text to more fluent Japanese. Here is a good reference.
https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/use-cases/data-augmentation/data_augmentation_for_text.ipynb

# Next, split the sentences

Ippan

```bash

poetry install && utoken prep_split \
  --input_file=/home/eugene/apps/projects/unext/ds-searchreco-customllm/.build/prep/ippan_generated.jsonl.gz \
  --output_file=/home/eugene/apps/projects/unext/ds-searchreco-customllm/.build/prep/ippan_sentences.csv.gz \
  --min_text_length=5 \
  --max_text_length=300 \
  --mecab_option="-r /etc/mecabrc -d /var/lib/mecab/dic/mecab-ipadic-neologd"

```

Book
```bash

poetry install && utoken prep_split \
  --input_file=/home/eugene/apps/projects/unext/ds-searchreco-customllm/.build/prep/book_generated.jsonl.gz \
  --output_file=/home/eugene/apps/projects/unext/ds-searchreco-customllm/.build/prep/book_sentences.csv.gz \
  --min_text_length=5 \
  --max_text_length=300 \
  --mecab_option="-r /etc/mecabrc -d /var/lib/mecab/dic/mecab-ipadic-neologd"

```

At this point, we have the book and ippan sentences that are ready to be mixed with the wiki corpus located. Copy that text to local

`gs://ds-airflow-jobs/unexttokenizer/dev/data/jawiki-2024-07-15/processeddata/wikipedia/corpus_sampled.txt`

```bash

gsutil cp gs://ds-airflow-jobs/unexttokenizer/dev/data/jawiki-2024-07-15/processeddata/wikipedia/corpus_sampled.txt \
/home/eugene/apps/projects/unext/ds-searchreco-customllm/.build/prep/corpus_sampled.txt

```
