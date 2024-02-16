---
id: 🏁 00 - hundred alts
aliases: []
tags:
  - Area
created: 16-02-2024 10:15
---
```toc
```
# Headlines

```dataview
table without id file.link AS "Tasks"
from "01 - Projects"

where tags = "Project, Autoalt, hundred_alts"
```


```dataview
table without id file.link AS "Areas"
from "01 - Areas"
where tags = "Project, Autoalt, hundred_alts"
```


```dataview
table without id file.link AS "Hundred Alts"
from "01 - Archives"
where tags = "Project, Autoalt, hundred_alts"
```

# Performance

* The DAG currently takes 8 hrs to load

#  Major Blockers

## Support for legacy devices

Encountered a major blocker while testing the hundred_alts project where we have to support legacy devices
http://starship-visualizer-dev.datascience-team.dev-unext.com/dev/model/hundred_alts/ippan/feature_display/FET0010956/coldstart

To support this, i have to make a major change to the approach

I tried loading the unjoined files to Bigtable, but loading the features data takes a lot of time

![[Pasted image 20240207090431.png]]

As a workaround, i created a hybrid version of the API
* PR of Hybrid Solution in starship-app-autoalt: [https://github.com/u-next/starship-app-autoalt/pull/350](https://github.com/u-next/starship-app-autoalt/pull/350)

![[HybridSolution.svg]]


With this new solution, the Load Test still looks good
![[Pasted image 20240214095027.png]]
