---
id: 🕎 00 - Hundred Alts
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
table without id file.link AS "Epic"
from "01 - Areas"
where tags = "Project, Autoalt, hundred_alts"
```


```dataview
table without id file.link AS "Archives"
from "01 - Archives"
where tags = "Project, Autoalt, hundred_alts"
```

# Performance

* The DAG currently takes 8 hrs to load, where the x-ranking takes 1.5 hours, joining takes 1.5 hrs, and bigtable loading takes 1hr

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

## Changes
* This is how to change Autoaltmakers to generate 100 alts. (This message is sent by Alex)
> Change Autoalt Makers to serve 100
> - that variable to 100: [https://github.com/u-next/ds-autoaltmakers/blob/main/src/autoaltmakers/autoaltmakers/configs/leanback_ippan_autoalt_config.yaml#L197](https://github.com/u-next/ds-autoaltmakers/blob/main/src/autoaltmakers/autoaltmakers/configs/leanback_ippan_autoalt_config.yaml#L197)
> - this one to 90: [https://github.com/u-next/ds-autoaltmakers/blob/main/src/autoaltmakers/autoaltmakers/configs/leanback_ippan_autoalt_config.yaml#L183](https://github.com/u-next/ds-autoaltmakers/blob/main/src/autoaltmakers/autoaltmakers/configs/leanback_ippan_autoalt_config.yaml#L183)
> - If you set that one to true, it should then give 100 reco for every genre the user is watching: [https://github.com/u-next/ds-autoaltmakers/blob/main/src/autoaltmakers/autoaltmakers/configs/leanback_ippan_autoalt_config.yaml#L198](https://github.com/u-next/ds-autoaltmakers/blob/main/src/autoaltmakers/autoaltmakers/configs/leanback_ippan_autoalt_config.yaml#L198)
> 
 
