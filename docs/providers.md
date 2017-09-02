# Information for DLME Data Providers

DLME welcomes contributions of data for Middle Eastern cultural heritage materials. This document outlines information about the types of data that DLME can currently aggregate, and associated technical requirements.

## Data formats and mapping

Currently, we have readers to accept metadata in the following formats:

* XML
* CSV
* MARC21 binary

We have data mappings in existence or underway for MODS, MARCXML/MARC21, TEI, and FGDC.

## Record requirements 

A "minimum viable record" for DLME currently requires the following:

* Title (or brief description)
* Identifier (for the item or record)
* Provider (the entity providing DLME with the record, including aggregators)
* Data Provider (the entity that holds the item)

We strongly recommend the following in addition to the minimum requirements above:

* Is Shown At (a link to a digital object or an in-depth description of the item)
* Preview (an image thumbnail depicting the item)

If certain information such as identifiers or links to digital objects or image thumbnails is unavailable from your metadata itself, we will likely ask for additional information about how to gather this data to build out quality records.

More in-depth documentation is available below:

* [Application profile](application_profile.md)
* [Metadata mappings](https://docs.google.com/spreadsheets/d/1Sp7uMHizVX7xN7xN9mm-vgEuESQBovXO-qenAo_TV-w/edit)

## Suggested object delivery mechanisms

We are happy to link to any digital object delivery mechanisms you may have in place. We are currently able to provide embedded viewers for [IIIF](http://iiif.io)-compliant image and presentation resources, as well as digital objects delivered using [oEmbed](http://oembed.com/)

## Contact information

For more information, please contact [dlme-tech-data@lists.stanford.edu](mailto:dlme-tech-data@lists.stanford.edu).
