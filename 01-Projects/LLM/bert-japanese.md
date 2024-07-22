---
id: bert-japanese
aliases: []
tags: []
---


Source code: https://github.com/cl-tohoku/bert-japanese/tree/v2.0

I want to make sure that my tokenizer is same as whats done by above repo, so I need to study it.


I need to learn how they use `neologd` to split the sentences

> For the purpose of splitting texts into sentences, we used [fugashi](https://github.com/polm/fugashi) with [mecab-ipadic-NEologd](https://github.com/neologd/mecab-ipadic-neologd) dictionary (v0.0.7).

It seems like this is a good guide how to use it. The repo itself did not say how to install thedependencies
https://qiita.com/kado_u/items/e736600f8d295afb8bd9

# Dependencies
Prepare the dependencies

## prepare `mecab`


```bash
sudo apt install mecab
sudo apt install libmecab-dev
sudo apt install mecab-ipadic-utf8
```

Check if `mecab` is installed successfully

```bash
❯ mecab
特急はくたか
特急    名詞,一般,*,*,*,*,特急,トッキュウ,トッキュー
は      助詞,係助詞,*,*,*,*,は,ハ,ワ
く      動詞,自立,*,*,カ変・クル,体言接続特殊２,くる,ク,ク
た      助動詞,*,*,*,特殊・タ,基本形,た,タ,タ
か      助詞,副助詞／並立助詞／終助詞,*,*,*,*,か,カ,カ
EOS
```
## install `neologd`

Then install `neologd`

```bash
sudo ./bin/install-mecab-ipadic-neologd
```
It started downloading `neologd` binaries

```bash
[install-mecab-ipadic-NEologd] : Make mecab-ipadic-NEologd
[make-mecab-ipadic-NEologd] : Start..
[make-mecab-ipadic-NEologd] : Check local seed directory
[make-mecab-ipadic-NEologd] : Check local seed file
[make-mecab-ipadic-NEologd] : Check local build directory
[make-mecab-ipadic-NEologd] : create /home/eugene/apps/projects/temps/mecab-ipadic-neologd/libexec/../build
[make-mecab-ipadic-NEologd] : Download original mecab-ipadic file
[make-mecab-ipadic-NEologd] : Try to access to https://ja.osdn.net
[make-mecab-ipadic-NEologd] : Try to download from https://ja.osdn.net/frs/g_redir.php?m=kent&f=mecab%2Fmecab-ipadic%2F2.7.0-20070801%2Fmecab-ipadic-2.7.0-20070801.tar.gz
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:--  0:00:27 --:--:--     0
 36 11.6M   36 4352k    0     0  12148      0  0:16:44  0:06:06  0:10:38  9479
```

