---
id: 🎯 UploadToBigTable
aliases: 
tags:
  - Project
  - Autoalt
  - hundred_alts
Area:
  - 🕎 00 - Hundred Alts
priority: Medium
status: In Progress
---
https://jira.unext-info.jp/browse/RECO-1511

# Thinking

This job can be put together with the Dataflow Job during the join. Doing it again is in a separate process is a waste. 
But there will be a case where we want to disable it, and should only happen if we are ready to and we are confident that the data is the one actually served in production

How can this be done?

What is my goal? Goal is the validate the data, not to think about the edge cases yet
Can I just add an additional `env` field? So that we can easily filter out "test" upload during the query?

At least, for the Prod version, maybe while uploading to BigTable, maybe I should simultaneously upload to BigQuery, only when env is `prod`?
Another approach is to simultaneously generate an Avro file, so that, if we are ready, we can easily send to Bigquery? Hmm?
The advantage of an Avro file vs a streaming to Bigtable is it is cheaper, then we can easily use `tobq` for this .. This sounds like a better solution..

# Plan
## Prerequisite
* I might need addtl DF credential to write data to BQ, but if I use `tobq`, maybe I dont need that?
## Plan A
* Try to generate Avro and use ToBq to send it. I need to find my Dataflow code that generates Avro
 * Found it? https://github.com/u-next/ds-autoaltmakers/blob/feature/dataflower/src/dataflow/dataflow/beam/csv2avro.py
* I need to read from yaml config, and automatically send the data to BQ using this information, by automatically creating the BQ Job Config
* TODO: Test how much additional time is incurred by this

## Plan B
* Focus on trying to upload the data to BigQuery first, worry about how to do it correctly later
 * Watch out about mini_batch streams, it could be pretty expensive..
* Test if I can dynamically enable|disable BigTable upload via a parameter

## Resources
* 

# What happened
## [[2023-12-08]]
* Generated the avro file
* I need the following credentials https://cloud.google.com/bigquery/docs/loading-data-cloud-storage-avro#permissions-load-data-into-bigquery
* Modified the dataflow DAG to also generate the avro files

![[dataflow_with_avro_generate.png]]

Combining generating CSV and and AVRO together, the job takes 1h30mins

![[csv_plus_avro_allusers_job_1h30mins.png]]

After removing the CSV generation the time it took is about the same (1h30m). In comparison, previously it only took 1h30m to generate the joined reco files (without Avro).

* Modified the [[🕎 00 - BigTableTools]] to instead just use Avro instead of CSV https://github.com/u-next/datascience-infra-starship/pull/127. Im now testing its performance
* Modified the DAG and Dataflow runner to generate Avro instead. https://github.com/u-next/ds-autoaltmakers/pull/385