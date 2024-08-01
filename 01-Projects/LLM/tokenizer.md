---
id: tokenizer
aliases: []
tags: []
---

# Train the tokenizer

First we need to prepare the alphabet

```bash

pushd /home/eugene/apps/projects/unext/ds-searchreco-customllm/.build/
curl -o unidic-mecab-2.1.2_src.zip https://clrd.ninjal.ac.jp/unidic_archive/cwj/2.1.2/unidic-mecab-2.1.2_src.zip 
  unzip unidic-mecab-2.1.2_src.zip 
popd

```

Execute the training
```bash

poetry install && utoken train_tokenizer \
--input_file /home/eugene/apps/projects/unext/ds-searchreco-customllm/.build/prep/ippan_sentences.csv \
--output_dir /home/eugene/apps/projects/unext/ds-searchreco-customllm/.build/tokenizer/model/ \
--initial_alphabet_file /home/eugene/apps/projects/unext/ds-searchreco-customllm/.build/unidic-mecab-2.1.2_src/lex.csv \
--vocab_size 32768 


# --pre_tokenizer_type mecab \
# --mecab_dic_type unidic_lite \
# --limit_alphabet 7012 \
# --num_unused_tokens 10 \
# --wordpieces_prefix '##'
```

I am able to create a UnextTokenizer, but it seems like there is a lot of work to be done. Will focus on something infra work for now.


