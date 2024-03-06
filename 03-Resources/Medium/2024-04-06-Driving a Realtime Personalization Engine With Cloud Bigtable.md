---
id: 2024-04-06-Driving a Realtime Personalization Engine With Cloud Bigtable
aliases: []
tags: []
---

https://www.youtube.com/watch?v=rECHcoGIJNU

Presenter: Segment Company CEO

# Points

Need to pick bw cloud providers, could be locked in. Lasting ramifications, ability to deliver on-time and on-budget. Kept hitting limit of what GCS can do

Journey led to using Bigquery and Bigtable

What is Segment: Gives a single API of what user is doing in your APP

Before, they are processing data with AWS components. Stateless. Kafka, message bus, saves to backnd DB that is also stateless. But, since they started `Persona`, it became difficult as it is very stateful, they can no longer add more nodes in the backend.

Explained about LambDa Architecture

Their solution, like a Lambda Architecture

===
```bash
Kafka -> Pubsub  ->  Bigquery
                 \ 
                     Bigtable
```
===




