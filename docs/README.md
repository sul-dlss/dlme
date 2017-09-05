# Data Documentation for the Digital Library of the Middle East

## Using this Documentation

This is documentation about the data choices in the existing DLME application as well as information for data providers.

For data providers, start by reading our [Information for Data Providers](providers.md) page. For information on our data choices for this application, keep reading.

## Specific Data Choices for this DLME Application

Part of building this proof of concept includes making some decisions for data processing that effect providers' adding of data to this repository. Some of these decisions are areas to be explicitly revisited as part of future work cycles, but for clarity of users and providers now, we detail some specific points here.

### Dataflow through the Application

At present, this diagram represents how data travels from being queued up for inclusion to internal representation in the DLME application's database and metadata included the discovery index:

![overview diagram](https://docs.google.com/drawings/d/e/2PACX-1vTFw2LtovfIngR5wk-XcYLHOO-loPIxeUJqRQihsjchmTP9hiIoa5IvxSdGBd2aOvenF2HMx9H2rHUI/pub?w=3372&h=1608)
[Link to diagram in Google Drawings](https://docs.google.com/drawings/d/116Z4PzOrwiYGgc81nTUaM7pE6cAOwhCd3HnC3NTtWSo/edit?usp=sharing)

### XML Handling

At present, we expect that metadata loaded as XML will have one record per XML document (or file). This unfortunately is hard-coded in our extract XML methods for the mapping configurations (and in our Xpath expectations).

It is queued up for future technical work to be able to handle multi-record and single record XML documents.

### URL Look-ups for Preview, Object in Context, Services, etc.

For the majority of the metadata provided to this DLME demonstration, URLs for the digital object in context, the thumbnail, an oEmbed or IIIF service representations, or related, were not consistently provided.

As such, where we were able to discern the logic, we have to develop DLME-specific Traject macros specific to data providers to then generate these URLs. Examples of this work include:

- [the IIIF manifest lookups written for Stanford MODS records](https://github.com/sul-dlss/dlme/blob/master/lib/traject/macros/iiif.rb#L6)
- [the Metropolitan Museum CSV records then leverage a Metropolitan Museum Open Data API to retrieve thumbnail URLs](https://github.com/sul-dlss/dlme/blob/master/lib/traject/macros/met_csv.rb#L24)

For future data providers, being able to perform URL look-ups or generation based on values in the records (in particular, identifiers) will continue to be tricky and probably require the writing of similar macros.

### Controlled Vocabularies & Look-ups (Translation Maps)

Right now, the following controlled vocabularies / look-ups are used:

* **Languages / Scripts:** We try to match language values to iso639-2b labels using Traject's built-in [marc_language translation map](https://github.com/traject/traject/blob/master/lib/translation_maps/marc_languages.yaml). Read more about this below.
* **EDM (Europeana Data Model) Types:** We normalize formats, types, and forms to also present one of one of these possible cho_edm_type values: 3d, cartographic, collection, dataset, image, interactive resource, software, sound, text, video. These types are an extension of the Europeana Data Model Types, and they are mapped in [the DLME translation map for types](../lib/translation_maps/types.yaml).
* **Service Conforms To:** Services right now are skewed towards IIIF services, so the available values for this are 'http://iiif.io/api/image/', 'http://iiif.io/api/auth/', 'http://iiif.io/api/presentation/' or 'http://iiif.io/api/search/'.

None of these normalizations or look-ups currently employ fuzzy matching; if the provided field value doesn't exactly match a value in the translation map, then a match is not made. In the configuration files, you can select the options for passing through the original value if a match is not made like so:

```
extract_mods('/*/mods:language/mods:scriptTerm', translation_map: ['scripts', default: '__passthrough__'])
```

### Languages Normalization

Language (`cho_language`) is a mandatory if applicable field for DLME objects. Discovery of objects via clear and consistent language facets is a prioritized discovery path we hope to support in this work. As such, we do normalize as able languages mapped to DLME objects to display labels from `iso639-2b` - the labels, not the codes.

Here is our existing logic for performing that normalization, including where we pass through the unnormalized values (or not), and where you can find the look-up mappings:

**MODS:**
1. If `language/languageTerm[@authority="iso639-2b"][@type="text"]` exists, use that text term as found.
2. If 1. doesn't exist, then check if `language/languageTerm[@authority="iso639-2b"][@type="code"]` exists, and normalize that code using Traject's existing [marc_language translation map](https://github.com/traject/traject/blob/master/lib/translation_maps/marc_languages.yaml) to generate the normalized label. See our note on `iso639-2b` / `marc languages` overlap below. The unnormalized value is not included in the output.
3. Otherwise, map whatever is in `language/languageTerm` to `iso639-2b` labels as best possible. At present, this means normalizing the text value using Traject's existing [marc_language translation map](https://github.com/traject/traject/blob/master/lib/translation_maps/marc_languages.yaml), and also passing through the unnormalized value as well. The better ability to support fuzzy lookup is an identified area of work in future cycles.

**FGDC:**

We are not expecting or mapping language values from FGDC in the current application.

**TEI:**

1. If `teiHeader/fileDesc/sourceDesc/msDesc/msContents/textLang/@mainLang` exists, normalize that code using Traject's existing [marc_language translation.](https://github.com/traject/traject/blob/master/lib/translation_maps/marc_languages.yaml) to generate the normalized label. See our note on `iso639-2b` / `marc languages` overlap below.
3. Otherwise (if 1 does not exist), map whatever is in `teiHeader/fileDesc/sourceDesc/msDesc/msContents/textLang` to `iso639-2b` labels as best possible. At present, this means normalizing the text value using Traject's existing [marc_language translation map](https://github.com/traject/traject/blob/master/lib/translation_maps/marc_languages.yaml), and also passing through the unnormalized value as well. The better ability to support fuzzy lookup is an identified area of work in future cycles.
2. In addition to 1 & 2 (no matter the outcome), check if `teiHeader/fileDesc/sourceDesc/msDesc/msContents/textLang/@otherLangs` exists, normalize that code using Traject's existing [marc_language translation](https://github.com/traject/traject/blob/master/lib/translation_maps/marc_languages.yaml) to generate the normalized label. See our note on `iso639-2b` / `marc languages` overlap below.

**MARC:**

We use the existing [Traject method `marc_languages`](https://github.com/traject/traject/blob/master/lib/traject/macros/marc21_semantics.rb#L189) to generate language labels (MARC Language labels) for these records. `008[35-37]` and `041` are the sources for languages normalized then using the [marc_language translation map](https://github.com/traject/traject/blob/master/lib/translation_maps/marc_languages.yaml).

**American Numismatic Society Local CSV:**

We are not expecting or mapping language values from the local ANS CSV schema in the current application.

**Yale Local CSV:**

If `Language` column value exists, we split the values based off of '|' as a delimiter, then use each as label as found (they are close enough to `iso639-2b` based on preliminary metadata analysis).

**Met Local CSV:**

We are not expecting or mapping language values from the local Metropolitan Museum CSV schema in the current application.

**Penn Museum Local CSV (Near Eastern & Egyptian):**

We are not expecting or mapping language values from the local University of Pennsylvania Museum CSV schema in the current application.

**Note on `ISO639-2b` / `MARC languages` overlap**

We aim to normalize all language values to the labels mapped to `ISO639-2b`, or a vocabulary of 3 characters codes for languages.

MARC Languages are codes are equivalent to those of `ISO 639-2b` codes and partially to those of `ISO 639-5`. However, the language name labels can differ between these vocabularies (some derived from their English name rather than local name).

A future work cycle would be to analyze and update mappings, if needed, for stricter adherence to `ISO639-2b` labels instead of MARC language labels.

## Contact information

For more information, please contact [dlme-tech-data@lists.stanford.edu](mailto:dlme-tech-data@lists.stanford.edu).
