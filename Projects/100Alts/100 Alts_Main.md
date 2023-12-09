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

