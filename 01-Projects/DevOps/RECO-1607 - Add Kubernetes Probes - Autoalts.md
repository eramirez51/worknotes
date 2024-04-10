https://jira.unext-info.jp/browse/RECO-1607

# PRs
* https://github.com/u-next/starship-app-autoalt/pull/409
	* Currently it barely consumes CPU and Memory so I only requested 0.05cpu and 100Mi
	* Made minimum replica from 2 to 3
	* Also added request for `ephemeral-storage` to guarantee there is enough space on the device for the lmdb file. https://u-next.slack.com/archives/C01P6HVJKNZ/p1702420521889479