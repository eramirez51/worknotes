


from #reco_and_cms channel
https://u-next.slack.com/archives/C9V96J8DP/p1699838925457589
1. 次のオルト特集を作成するため、それぞれのロジックを教えていただければと思います。
	1. ランキングとoriginal comicの抽出のロジック
		1. ・ランキング  
			たとえば毎日無料であれば下記のようなクエリで取れそうです。  
			```sql
			select * 
			from book_ranking 
			where ranking_id = (select ranking_id from latest_ranking where ranking_target_code = 'D_C_COMIC')
			order by current_rank
			;
		  ```
			注意点としては、ランキングは毎日更新しているのですが、更新完了時間は日によってことなったりすることがあると思います。ちなみに本日は、AM3：０５ごろ完了しています。  
			あと、ちょっと思ったのですが、  
			（前回MTGで聞き逃していたかもしれないですが）  
			ランキングは、ランキング順に表示することに意味がありそうですが、それをユーザに合わせて表示する場合は、「ランキング」という表記ではなさそうかなと思いました。
		2. original comic
			```sql
			select * 
			from book_ranking 
			where ranking_id = (select ranking_id from latest_ranking where ranking_target_code = 'D_C_COMIC')
			order by current_rank
			;
```
			オリジナルコミックは、新着順に並びますが、  
			著者の方と新着順に並べることを契約条件にしているようなことを聞いたことがあるので、  
			順番を変更する場合は book PO 側に確認が必要そうです。 (cc : [@yu-kimura2](https://u-next.slack.com/team/UMF5E52SF) [@s-tachikawa](https://u-next.slack.com/team/UA3803C02) [@akiyosakiyama](https://u-next.slack.com/team/U32G04E9H))
	1. オススメ無料にはCMSのAPIから対象書籍を取得してるのですが、CMSDBから直接書籍を取得は可能のではないかと思っていて
		1. 現在の仕様で、という意味では、CMSDBから取得可能だと思いますが、  
			仕様変更になる場合があるので、  
			仕様が複数箇所にあるとあまり良くなさそうかなと思いました。  
			↑のオリジナル書籍、ランキングは、ほぼ変更することはないと思いますが
1. APIのresponseの中、各オルト特集のjsonの中にBID/BSDのフラグのfieldを追加したほうがいいでしょうか？
	3. Answer: いつは BID いつは BSD 現状はjsonから判断できないので、code_type　string  的なフラグを追加した方が良さそう
2. APIのresponseのfieldについて：
	1. 会議で`block_type`と`recommend_block_code` があれば特定できるという結論になったのですが、チーム内で議論した結果、DSチームの`feature_public_code` を使った方がdownstream（ログ取得、一般のコードと統一等）でデータが扱いやすくなると思いました。`block_type` とAPIのリクエストからの`tag_public_code` で特定は可能でしょうか？他の案も`block_type`と`recommend_block_code` とDSチームの`feature_public_code` を全部返して、Client上で`feature_public_code` を使うことは可能でしょうか？
	2. book/feature_recのAPIのresponseの中に`feature_public_code,feature_typeとbook_recommend_block_public_code` というfieldが入ってますが、新しいAPIの中で`book_recommend_block_public_code` と`block_type（B_FEATURE）`のみ返せば大丈夫でしょうか？
	3. responseの中で`book_recommend_block_public_code` の意味を持って、`feature_public_code` を名乗っても可能でしょうか？
	4. DSチームの`feature_public_code` を次の様に考えてるのですが、大丈夫でしょうか？`{C|J}BRB{ジャンル}00XX` 。例：
		1. CBRBMNG0001：DSチームからのオルト自動生成 漫画（MNG）common alt number 1
		2. JBRBRNB0002：DSチームからのオルト自動生成 ラノベ（RNB）personalized alt number 2
		3. BRB0000453：CMSDBからのオルト特集 #453
3. 質問：
	1. もしAPIのresponseの中にあるオルト自動生成特集が存在しない場合（オススメ無料、新着、新刊予約等）ではCMSチームはどう対応する予定でしょうか？そのままDSチームのレスポンスをClientに送る？
		1. Answer: 現状では CMS側バッチで作られたcache上のデータを返してます
	2. もしAPIのresponseの中にあるオルト自動生成特集の中にitem_codesが存在しない場合はCMSはどう対応する予定でしょうか？coldstart的なリストを探すか？除外するか？
		1. Answer: 現状では 4.a と同じく、CMS側バッチで作られたcache上のデータを返してます。
	3. APIのresponseの中のオルト特集の順番はそのままClientに送るのでしょうか？
	4. 一般ドメインみたいにbook domainのdeduplication・filteringのロジックありますでしょうか？
		1. Ansser: 基本は重複排除しているはずですが、全部とは言い切れないです。　もし、DS側どこか重複可能性があれば、事前に連絡すれば助かります。  
			例えば、この間、 新着/おすすめ　ところが BID　で返しているところがありますて、そこで２つ以上のBIDが同じBSDに配属する場合、  
			おそらくCMS側が同じ作品２をclientにかえすことになります。



# Questions to ask
* Negotiate to use own code in `recommend_public_code`
- Item poolings and logic for ranking, original comic, オススメ無料
- Can we use our own code for autoalt, if we provide `block_type`?
- Do they need a BID/BSD flag?
- Do they still need `feature_type`  (`CAMPAIGN` or `FEATURE`) flag for manual ALTs?
- What is the logic they plan for if any auto or manual ALTs are missing in DS output?
- Do they plan on making some kind of deduplication filtering like for Ippan since the whole recommendation response would be within a list
- More specifically, are they using some filtering?
- More kind of confirmation: Do the order of the alts provided by our response will be the one shown?

# Visualization

![[Book Feed Consolidation Diagram.svg]]