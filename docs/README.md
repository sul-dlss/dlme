# Data Documentation for the Digital Library of the Middle East

## Using this Documentation

This is documentation about the data choices in the existing DLME application as well as information for data providers.

For data providers, start by reading our [Information for Data Providers](providers.md) page. For information on our data choices for this application, keep reading.

### Dataflow through the Application

At present, this diagram represents how data travels from being queued up for inclusion to internal representation in the DLME application's database and metadata included the discovery index:

![overview diagram](https://docs.google.com/drawings/d/e/2PACX-1vTFw2LtovfIngR5wk-XcYLHOO-loPIxeUJqRQihsjchmTP9hiIoa5IvxSdGBd2aOvenF2HMx9H2rHUI/pub?w=3372&h=1608)
[Link to diagram in Google Drawings](https://docs.google.com/drawings/d/116Z4PzOrwiYGgc81nTUaM7pE6cAOwhCd3HnC3NTtWSo/edit?usp=sharing)

### XML Handling

At present, we expect that metadata loaded as XML will have one record per XML document (or file). This unfortunately is hard-coded in our extract XML methods for the mapping configurations (and in our Xpath expectations).

It is queued up for future technical work to be able to handle multi-record and single record XML documents.

## Contact information

For more information, please contact [dlme-tech-data@lists.stanford.edu](mailto:dlme-tech-data@lists.stanford.edu).
