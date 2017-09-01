# Data Documentation for the Digital Library of the Middle East Application

## Using this Documentation

* [Metadata Application Profile](application_profile.md)
* [Metadata mappings spreadsheet](https://docs.google.com/spreadsheets/d/1Sp7uMHizVX7xN7xN9mm-vgEuESQBovXO-qenAo_TV-w/edit)
* [Information for Data Providers](providers.md)

## Steps for Adding Data to DLME

[How to add a data provider to DLME](add_data_source.md)

## Details on Specific Data & Tool Choices for this DLME Application

Part of building this proof of concept includes making some decisions for data that effect providers' adding of data to this repository.

Some of these decisions are areas to be explicitly revisited as part of future work cycles, but for clarity of users and providers now, we detail some specific points here.

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

## Contact & Where to Find Help

To be added.
