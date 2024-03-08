---
id: 🎯 UploadToBigTable
aliases: []
tags:
  - Project,
  - Autoalt,
  - hundred_alts
Area: Autoalt, hundred_alts
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
## Plan A
* Try to generate Avro and use ToBq to send it. I need to find my Dataflow code that generates Avro
 * Found it? https://github.com/u-next/ds-autoaltmakers/blob/feature/dataflower/src/dataflow/dataflow/beam/csv2avro.py
* Test how much additional time is incurred by this

## Plan B
* Focus on trying to upload the data to BigQuery first, worry about how to do it correctly later
 * Watch out about mini_batch streams, it could be pretty expensive..
* Test if I can dynamically enable|disable BigTable upload via a parameter

## Resources
* 

# What happened


 
