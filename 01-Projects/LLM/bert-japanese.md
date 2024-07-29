---
id: bert-japanese
aliases: []
tags: []
---


Source code: https://github.com/cl-tohoku/bert-japanese/tree/v2.0

I want to make sure that my tokenizer is same as whats done by above repo, so I need to study it.

I downloaded a `10GB` file from cirrussearch and saved it to `gs://ds-airflow-jobs/unexttokenizer/dev/data/jawiki-2024-07-15/`

I need to learn how they use `neologd` to split the sentences

For the purpose of splitting texts into sentences, they used [fugashi](https://github.com/polm/fugashi) with [mecab-ipadic-NEologd](https://github.com/neologd/mecab-ipadic-neologd) dictionary (v0.0.7).

It seems like followoing link is a good guide how to use it. The `neologd`'s repo does not say how to install thedependencies
https://qiita.com/kado_u/items/e736600f8d295afb8bd9

# Dependencies

Prepare the dependencies

## prepare `mecab`


```bash
sudo apt install mecab
sudo apt install libmecab-dev
s apt install mecab-ipadic-utf8
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
git clone --depth 1 https://github.com/neologd/mecab-ipadic-neologd.git
sudo ./bin/install-mecab-ipadic-neologd
```

> Note, in Dockerfile, use `--asuser -y` as parameters to install successfully without using `sudo`

```bash
RUN cd neologd && ./bin/install-mecab-ipadic-neologd --asuser  -y
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

If above is successful, we can see it is installed in the following path

```bash
❯ ls  /usr/lib/x86_64-linux-gnu/mecab/dic/mecab-ipadic-neologd
char.bin  dicrc  left-id.def  matrix.bin  pos-id.def  rewrite.def  right-id.def  sys.dic  unk.dic
```

```bash
sudo mv /usr/lib/x86_64-linux-gnu/mecab/dic/mecab-ipadic-neologd /var/lib/mecab/dic
```
Replace `dicdir` in `/etc/mecabrc`

```bash
sudo vi /etc/mecabrc
```

Set `dicdir` to below
```bash
dicdir = /var/lib/mecab/dic/mecab-ipadic-neologd ⇐ 一行追加
```

Test it again. Notice that the output is different than the previous test. `はくたか` is now one line.

```bash
❯ mecab
特急はくたか
特急    名詞,一般,*,*,*,*,特急,トッキュウ,トッキュー
はくたか        名詞,固有名詞,一般,*,*,*,はくたか,ハクタカ,ハクタカ
EOS
特急はくたか
特急    名詞,一般,*,*,*,*,特急,トッキュウ,トッキュー
はくたか        名詞,固有名詞,一般,*,*,*,はくたか,ハクタカ,ハクタカ
EOS
```

# Process files for Wikipedia
```bash

export WORK_DIR=/home/eugene/apps/projects/temps/bert-japanese/.build/workdir
export DATA_DIR=/home/eugene/apps/projects/temps/bert-japanese/.build/data

mkdir -p $WORK_DIR/corpus/wikipedia

python make_corpus_wiki.py \
--input_file $DATA_DIR/jawiki-20240715-cirrussearch-content.json.gz \
--output_file $WORK_DIR/corpus/wikipedia/corpus.txt.gz \
--min_sentence_length 10 \
--max_sentence_length 200 \
--mecab_option '-r /etc/mecabrc -d /var/lib/mecab/dic/mecab-ipadic-neologd'

```

The above command shall generate the splitted sentences of the wiki like the example below

```bash
❯ cd /home/eugene/apps/projects/temps/bert-japanese/.build/workdir/corpus/wikipedia/
❯ zless corpus.txt.gz

言語(げんご)は、狭義には「声による記号の体系」をいう。
広辞苑や大辞泉には次のように解説されている。
人間が音声や文字を用いて思想・感情・意志等々を伝達するために用いる記号体系。
およびそれを用いる行為(広辞苑)。音声や文字によって、人の意志・思想・感情などの情報を表現したり伝達する、あるいは他者のそれを受け入れ、理解するための約束・規則。
```
The above command, generated `38M` sentences from Japanese Wikipedia
```bash
```bash
- [ ] ❯ zcat corpus.txt.gz| wc -l
38377663
```

After the sentences are split in a single file. We need to split generated corpus to multiple files randomly via the following command.

```bash
python merge_split_corpora.py \
--input_files $WORK_DIR/corpus/wikipedia/corpus.txt.gz \
--output_dir $WORK_DIR/corpus/wikipedia \
--num_files 8
```

Above command splitted `corpus.txt.gz` into 8 files.

```bash
❯ ls -lah
Permissions Size User   Date Modified Name
.rw-rw-r--  2.0G eugene 22 Jul 17:15  corpus.txt.gz
.rw-rw-r--  654M eugene 23 Jul 08:50  corpus_01.txt
.rw-rw-r--  663M eugene 23 Jul 08:50  corpus_02.txt
.rw-rw-r--  657M eugene 23 Jul 08:50  corpus_03.txt
.rw-rw-r--  670M eugene 23 Jul 08:50  corpus_04.txt
.rw-rw-r--  663M eugene 23 Jul 08:50  corpus_05.txt
.rw-rw-r--  658M eugene 23 Jul 08:50  corpus_06.txt
.rw-rw-r--  664M eugene 23 Jul 08:50  corpus_07.txt
.rw-rw-r--  671M eugene 23 Jul 08:50  corpus_08.txt
```
## Generate sample corpus for the tokenizer

```bash
cat $WORK_DIR/corpus/wikipedia/corpus_*.txt|grep -a -v '^$'|shuf|head -n 10000000 > $WORK_DIR/corpus/wikipedia/corpus_sampled.txt
```
# Next we need to prepare unidic `lex.csv`

Download from the following 
https://clrd.ninjal.ac.jp/unidic_archive/cwj/2.1.2/

```bash
curl -o ./.build/unidic-mecab-2.1.2_src.zip https://clrd.ninjal.ac.jp/unidic_archive/cwj/2.1.2/unidic-mecab-2.1.2_src.zip

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  134M  100  134M    0     0   9.8M      0  0:00:13  0:00:13 --:--:-- 9325k
❯ cd ./.build
❯ ls
data  unidic-mecab-2.1.2_src.zip  workdir

❯ unzip unidic-mecab-2.1.2_src.zip
Archive:  unidic-mecab-2.1.2_src.zip
 extracting: unidic-mecab-2.1.2_src/AUTHORS
  inflating: unidic-mecab-2.1.2_src/BSD
  inflating: unidic-mecab-2.1.2_src/COPYING
  inflating: unidic-mecab-2.1.2_src/ChangeLog
  inflating: unidic-mecab-2.1.2_src/GPL
 extracting: unidic-mecab-2.1.2_src/INSTALL
  inflating: unidic-mecab-2.1.2_src/LGPL
  inflating: unidic-mecab-2.1.2_src/Makefile.am
  inflating: unidic-mecab-2.1.2_src/Makefile.bat
  inflating: unidic-mecab-2.1.2_src/Makefile.in
 extracting: unidic-mecab-2.1.2_src/NEWS
 extracting: unidic-mecab-2.1.2_src/README
  inflating: unidic-mecab-2.1.2_src/aclocal.m4
  inflating: unidic-mecab-2.1.2_src/char.def
  inflating: unidic-mecab-2.1.2_src/configure
  inflating: unidic-mecab-2.1.2_src/configure.ac
  inflating: unidic-mecab-2.1.2_src/dicrc
  inflating: unidic-mecab-2.1.2_src/feature.def
  inflating: unidic-mecab-2.1.2_src/install-sh
  inflating: unidic-mecab-2.1.2_src/left-id.def
  inflating: unidic-mecab-2.1.2_src/lex.csv
  inflating: unidic-mecab-2.1.2_src/matrix.def
  inflating: unidic-mecab-2.1.2_src/missing
  inflating: unidic-mecab-2.1.2_src/rewrite.def
  inflating: unidic-mecab-2.1.2_src/right-id.def
  inflating: unidic-mecab-2.1.2_src/unidic-mecab.pdf
  inflating: unidic-mecab-2.1.2_src/unk.def
```

Inside, we can see the `lex.csv` file. We can start using that.

```bash
mkdir -p $WORK_DIR/tokenizers/alphabet
python make_alphabet_from_unidic.py \
--lex_file $DATA_DIR/unidic-mecab-2.1.2_src/lex.csv \
--output_file $WORK_DIR/tokenizers/alphabet/unidic_lite.txt
```
Above command will generate the `unidic_lite.txt` file.

```bash
❯ head /home/eugene/apps/projects/temps/bert-japanese/.build/workdir/tokenizers/alphabet/unidic_lite.txt

!
"
#
$
%
&
'
(
)
```

We may now start the tokenizer training

```bash
python train_tokenizer.py \
--input_files $WORK_DIR/corpus/wikipedia/corpus_sampled.txt \
--output_dir $WORK_DIR/tokenizers/wordpiece_unidic_lite \
--pre_tokenizer_type mecab \
--mecab_dic_type unidic_lite \
--vocab_size 32768 \
--limit_alphabet 7012 \
--initial_alphabet_file $WORK_DIR/tokenizers/alphabet/unidic_lite.txt \
--num_unused_tokens 10 \
--wordpieces_prefix '##'

INFO:__main__:Loading the initial alphabet from file
INFO:__main__:The size of the initial alphabet: 7012
INFO:__main__:Training the tokenizer
[00:01:00] Pre-processing files (1434 Mo)
```

