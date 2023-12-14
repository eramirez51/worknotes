[[Make AutoaltMakers to produce 100 per user]]

## Test
When running for 100 alts
* The worker times out at this code. I need a more scalable implementation
```python
        # user_feature_pages | "Print user_feature_pages" >> beam.Map(print)
        user_page_feature = {
            "pages": user_feature_pages,
            "features": features,
        } | "CoGroup user_feature_pages and features" >> beam.CoGroupByKey()

```

# Load Test before loading
P95 is 25ms, p50 is 15
![[Pasted image 20231213151033.png]]

# During loading time
 There is around 5 minutes where the latency reaches around max 3s, then the bigtable autoscaling catches up and it goes back to normal
![[Pasted image 20231213160504.png]]

![[Pasted image 20231213160722.png]]


Writing concurrently results 3000ms p90latency at around, with latency peaks lasting 10 minutes, some job got stuck. But writing once at a time only results to 300ms p90, and lasts only less than a minute
![[Pasted image 20231214082135.png]]

![[Pasted image 20231214082226.png]]