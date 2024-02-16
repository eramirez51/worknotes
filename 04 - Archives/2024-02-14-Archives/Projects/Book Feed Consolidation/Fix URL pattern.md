```js
/reco
/rerank
/feature_rec
```

```yml
  - match:
    - uri:
        prefix: /api/v1/book/reco/
    rewrite:
      uri: /
    route:
    - destination:
        host: api-book2.starship-api.svc.cluster.local
        port:
          number: 80
  - match:
    - uri:
        prefix: /api/v1/book/rerank/
    rewrite:
      uri: /
    route:
    - destination:
        host: api-book2.starship-api.svc.cluster.local
        port:
          number: 80
  - match:
    - uri:
        prefix: /api/v1/book/feature_rec/
    rewrite:
      uri: /
    route:
    - destination:
        host: api-book2.starship-api.svc.cluster.local
        port:
          number: 80                    
```