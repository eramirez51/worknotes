How to concatenate 2 files

# Apache Beam Join 

## Using the Join library
https://stackoverflow.com/questions/49079716/left-join-operation-in-apache-beam
Use this for python
https://github.com/pavan-kattamuri/dataflow_joins

## Joining Terrabytes of data
https://cloud.google.com/blog/products/gcp/joining-and-shuffling-very-large-datasets-using-cloud-dataflow
https://spotify.github.io/scio/io/Cassandra.html


# Model Inference with Beam
  
Example how to load model  
[https://beam.apache.org/releases/pydoc/current/_modules/apache_beam/ml/inference/sklearn_inference.html](https://beam.apache.org/releases/pydoc/current/_modules/apache_beam/ml/inference/sklearn_inference.html)

```python
def _load_model(model_uri, file_type):
  file = FileSystems.open(model_uri, 'rb')
  if file_type == ModelFileType.PICKLE:
    return pickle.load(file)
  elif file_type == ModelFileType.JOBLIB:
    if not joblib:
      raise ImportError(
          'Could not import joblib in this execution environment. '
          'For help with managing dependencies on Python workers.'
          'see [https://beam.apache.org/documentation/sdks/python-pipeline-dependencies/](https://beam.apache.org/documentation/sdks/python-pipeline-dependencies/)'  # pylint: disable=line-too-long
      )
    return joblib.load(file)
  raise AssertionError('Unsupported serialization type.')
```

[https://beam.apache.org/documentation/transforms/python/elementwise/runinference-sklearn/](https://beam.apache.org/documentation/transforms/python/elementwise/runinference-sklearn/)

# Using SQLite with Beam
https://colab.research.google.com/github/apache/beam/blob/master/examples/notebooks/interactive-overview/reading-and-writing-data.ipynb#scrollTo=EJ58A0AoV02o
