# Information for DLME Data Providers

DLME welcomes contributions of data for Middle Eastern cultural heritage materials. This document outlines information about the types of data that DLME can currently aggregate, and associated technical requirements.

## Data formats and mapping

Currently, we have readers to accept metadata in the following formats:

* XML
* CSV
* MARC21 binary
* JSON (not tested)

We have data mappings in existence for MODS, MARC21, TEI, FGDC, IIIF, and a number of local schema in CSV.

## DLME Object Record requirements

A "minimum viable record" for DLME currently requires the following:

* `Title` (or brief description)
* `Identifier` (for the item or record)
* `Provider` (the entity providing DLME with the record, including aggregators)
* `Data Provider` (the entity that holds the item)

We strongly recommend the following in addition to the minimum requirements above:

* `Is Shown At` (a link to a digital object or an in-depth description of the item)
* `Preview` (a link to an image thumbnail depicting the item)

If certain information such as identifiers, links to digital objects, or image thumbnails are unavailable from your metadata, we will likely ask for additional information about how to gather this data to build out quality records (e.g. with this identifier, and this URL structure, you can retrieve a thumbnail URL).

## In-Depth Data Provider Documentation

* Metadata ingested into the DLME needs to be mapped to the DLME Metadata Application Profile (MAP), or the available classes, fields, and definitions (including requirements) for objects described in DLME. You can read more details on the DLME MAP [here](application_profile.md).
* After understanding the DLME MAP, data providers will need to provide a metadata mapping from your provided metadata to our DLME MAP. You need to pay special attention to the required fields (identifier, title, language if applicable and URL to view the object). To get started, you can view existing mappings or add your own to our [open DLME Mappings Google spreadsheet](https://docs.google.com/spreadsheets/d/1Sp7uMHizVX7xN7xN9mm-vgEuESQBovXO-qenAo_TV-w/edit).

## Suggested Digital Object Delivery Mechanism

We are happy to link to any digital object delivery mechanisms you may have in place. We are currently able to provide embedded viewers for [IIIF](http://iiif.io)-compliant image and presentation resources, as well as digital objects delivered using [oEmbed](http://oembed.com/)

## Contact information

For more information, please contact [dlme-tech-data@lists.stanford.edu](mailto:dlme-tech-data@lists.stanford.edu).
