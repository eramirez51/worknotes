https://jira.unext-info.jp/browse/RECO-1607

# PRs
* https://github.com/u-next/starship-app-autoalt/pull/409
	* Currently it barely consumes CPU and Memory so I only requested 0.05cpu and 100Mi
	* Made minimum replica from 2 to 3
	* Also added request for `ephemeral-storage` to guarantee there is enough space on the device for the lmdb file. https://u-next.slack.com/archives/C01P6HVJKNZ/p1702420521889479

[Deep L]
パーソナライズされた推奨ALTを50から100に増やしました。これにより、ユーザーにより興味深いコンテンツを提供することができます。多くの分野でKPIが改善されましたが、最も顕著な結果は以下の通りです。
* クリック数が7.41%増加しました。
	* これは、ユーザーがページをスクロールダウンした際に、より興味深いコンテンツを発見していることを意味します。
* クリックスルー率が4.34%増加し、ウォッチスルー率が2.75%増加した。
	* ユーザーはより頻繁にタイトルページを開き、より多くのコンテンツを視聴している。
* ダウンロードボタン率が1.30％増加
* マイリストが `1.43%` 増加した。

We have increased the personalized recommended ALTs from 50 to 100. This shall present more interesting content to our users. We have seen a lot of KPI improvements in a lot of areas. Below are the most notable results
* `7.41%` increase in the Click Row Index
	* This means the users are finding more interesting content when they scroll down the page
* `4.34%` increase in Click Through Rate which converts to `2.75%` increase in Watch Through Rate
	* Users are opening the Title Page more often and thus watching more content
* Download Button Rate increased by `1.30`
* My List increased by `1.43%`

This also marks a new milestone for Starship as we increased the scalability, operationalibity and sustainability of the underlying infrastructure to support our ever growing number of users and use cases. 


**Update on Personalized Recommendations**

We have increased the number of personalized recommendations from 50 to 100, aiming to offer a broader selection of content that may be of interest to our users. Alongside this update, we’ve noted several improvements across key performance indicators:

- **Click Row Index:** There has been a 7.41% increase, indicating that users are finding more appealing content as they browse.
- **Click Through Rate:** This metric has risen by 4.34%, corresponding to a 2.75% increase in Watch Through Rate, showing that users are engaging more with the content they discover.
- **Download Button Rate:** Usage has increased by 1.30.
- **My List Usage:** There has been a 1.43% increase, reflecting a slight uptick in how users curate their viewing lists.

This update also signifies a notable milestone for our Starship infrastructure. We've made enhancements in scalability, operability, and sustainability to accommodate and support the increased load from our expanding user base and the variety of their interactions with our platform.

Thank you for your continued support and dedication to improving our service.

Additionally, this update marks a significant milestone for Starship. We’ve enhanced the scalability, operability, and sustainability of our infrastructure to support this new feature. This advancement supports our ever-expanding user base and the diverse ways you use our service.

**Exciting Enhancements to Recommended Experience!**

We’re thrilled to announce a significant update to our personalized recommendation system. We have doubled the personalized ALT recommendation from 50 to 100, and by doing so, we're delivering a wider array of captivating content directly to our users. 

Here are some key performance improvements we've observed:

- **Enhanced Engagement:** We've seen a remarkable **7.41% increase** in our Click Row Index. This means that as our users scroll, they are more likely to discover content that piques their interest.
- **Increased Interaction:** There's been a **4.34% increase** in Click Through Rates, leading to a **2.75% rise** in Watch Through Rates. More users are exploring titles thoroughly and enjoying more content.
- **Improved Accessibility:** The Download Button usage has surged by **1.30**%.
- **Personalized Curation:** My List usage has grown by **1.43%**.

Additionally, this update marks a significant milestone for Starship. We’ve enhanced the scalability, operability, and sustainability of our infrastructure. This advancement supports our ever-expanding user base and the diverse ways you use our service.


パーソナライズドレコメンデーションの更新について
私たちは、パーソナライズドALTレコメンデーションの数を`50から100に増やしました。これにより、ユーザーにとって興味深いコンテンツの選択肢を広げることを目指しています。この更新に伴い、主要なパフォーマンス指標にいくつかの改善が見られました：
興味深いコンテンツを見つける場所が増えました： 興味深いコンテンツをより多くの場所で見つけることができるようになりました。これは、ユーザーがページをさらに下にスクロールすると、興味をそそるより興味深いコンテンツを見つけられる可能性が高まったことを意味します。
作品のインタラクションの増加：作品のCTRが4.34％増加し、視聴率が2.75％上昇しました。これにより、ユーザーはタイトルを徹底的に探索し、より多くのコンテンツを楽しんでいます。
ダウンロードボタンの使用率:が1.30％増加しました
マイリストの使用率にも1.43%の増加が見られ、ユーザーの視聴リストのカスタマイズへの関心の高まりが反映されています
また、このアップデートは、推薦インフラの重要なマイルストーンでもあります。私たちは、拡大するユーザーベースとその多様なインタラクションをサポートするために、スケーラビリティ、オペラビリティ、持続可能性の向上を図りました。

Update on Personalized Recommendations

We have increased the number of personalized ALT recommendations from 50 to 100, aiming to offer a broader selection of content that may be of interest to our users. Alongside this update, we’ve noted several improvements across key performance indicators:

More places to find interesting content: We've seen a 7.41% increase in Click Row Index. This means that if users scroll further down the page, we have increased the possibility of them finding more interesting content that piques their interest.
Increased Interaction: There's been a 4.34% increase in Click Through Rates, leading to a 2.75% rise in Watch Through Rates. More users are exploring titles thoroughly and enjoying more content.
Download Button Usage has increased by 1.30%.
My List Usage: There has been a 1.43% increase, reflecting an uptick in how users curate their viewing lists.

This update also signifies a notable milestone in our Recommendation infrastructure. We've made enhancements in scalability, operability, and sustainability to accommodate and support this increased load for our expanding user base and the variety of their interactions with our platform.