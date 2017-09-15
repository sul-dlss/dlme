# Digital Library of the Middle East: Prototype Framing Statement

Mark A. Matienzo, Stanford University Libraries
Wayne Graham, CLIR

## Overview

CLIR and Stanford University Libraries are in the process of developing an early-stage proof of concept for the Digital Library of the Middle East. This prototype is being built using [Blacklight](http://projectblacklight.org/), an open source software framework for building discovery interfaces on top of [Solr](http://lucene.apache.org/solr/), a search platform. The intent of this prototype is to demonstrate a number of key features related to the discovery of and digital access to Middle Eastern cultural heritage resources.

## Selection and Ethical Considerations

All items included in the prototype as of July 2017 are intended to demonstrate preliminary functionality. The items selected do not represent curatorial decision making, subject matter expertise, or regional and cultural knowledge of the Middle East. In particular, the current lack of selection criteria or a collection development policy give us pause when coupled with the ambiguity of “the Middle East” as a regional descriptor and its incorporation into the title of the project<sup>[1](#footnote1)</sup>. Identifying a clear and inclusive definition, informed by regional stakeholders is an essential part of avoiding Eurocentric and imperialist biases within such a critical initiative. In addition, future work on the prototype should be informed by the work of, or perhaps in consultation with, DLF’s [Cultural Assessment Working Group](https://wiki.diglib.org/Assessment:Cultural_Assessment).

## Features and Technical Challenges During the Prototype Phase

Currently implemented features include:

- metadata aggregation (indexing descriptions of cultural heritage resources from multiple institutions and in multiple formats);
- keyword and fielded searching;
- faceted browsing of search results by topic, providing institution, and language; and
- links to digital objects as hosted by the providing institution.

Features we are considering for implementation and can be prototyped quickly include:

- integrated digital object viewers (for [IIIF](http://iiif.io/)-compliant image resources, PDF files, audiovisual materials, and certain three-dimensional models); and
- curatorial tools to identify, contextualize, and highlight items, through the creation of topic guides, exhibits, or other interpretive resources.

Technical challenges to prototyping include:

- multilingual support: identifying the extent needed both in terms of supported languages and features (internationalized and translated user interface, query parsing support for specific languages<sup>[2](#footnote2)</sup>, etc.);
- implementing a right-to-left user interface in Blacklight; and
- ensuring data quality for incorporated items over time.

* * *

<sup><a name="footnote1">1</a></sup> See Osman Nuri Özalp, “Where is the Middle East? The Definition and Classification Problem of the Middle East as a Regional Subsystem in International Relations,” Turkish Journal of Politics 2(2), Winter 2011.

<sup><a name="footnote2">2</a></sup> Solr provides some degree of support for Arabic, Farsi, Hebrew, Turkish, and Sorani Kurdish.
