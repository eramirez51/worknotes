---
id: bert_embeddings_research
aliases: []
tags: []
---

# Goal of research
I want to know best practices how to combine item fields for embedding.

# Finding Your Perfect Movie Match: BERT LLM-Powered Movie Recommendations
*  https://medium.com/@sgchandela960/the-bert-llm-redefining-movie-similarity-for-the-digital-age-c1740f4b3c43


It is saying that BERT LLM's bidirectional architecture is ideal for understanding movie descriptions, reviews and user pfofiles
In the article, he simply used the Movie Story field to feed to a pretrained BERT model, converts it to a vector then do cosine similarity. Not very useful.

I cant seem to find a good article how to solve this similarity problem.
