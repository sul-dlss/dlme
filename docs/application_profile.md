# DLME Application Profile and Schema Mapping

## Assumptions for DLME Initial Prototype

* DLME needs to aggregate data about cultural heritage objects sourced from multiple institutions using various schemas into a common index
* Any application profile, model, used etc. for DLME should be based on a pre-existing application profile and document any needed divergences
* For the prototype phase, any downstream publication or production of RDF should be considered secondary
* Subsequently, context classes (e.g. Agents, Subjects, Events) may not be applicable if data is only available as literals

## Common / Current Data Models to DLME Application Profile Mappings

* Schemas are selected based on their appearance in [this GH repo](https://github.com/waynegraham/dlme-metadata) containing metadata for batch loading
* Notes and some basic analysis of data for mapping purposes is in [this Google spreadsheet](https://docs.google.com/spreadsheets/d/1Sp7uMHizVX7xN7xN9mm-vgEuESQBovXO-qenAo_TV-w/edit?usp=sharing)

## Application profile

The DLME Prototype Application Profile a subset of the [Europeana Data Model](http://pro.europeana.eu/share-your-data/data-guidelines/edm-documentation). Currently, the Application Profile only focuses on implementation of EDM's core classes (i.e. `ore:Aggregation`, `edm:ProvidedCHO`, and `edm:WebResource`), plus the [EDM Profile for IIIF](http://pro.europeana.eu/files/Europeana_Professional/Share_your_data/Technical_requirements/EDM_profiles/IIIFtoEDM_profile_042016.pdf).

![Drawing of basic model](model.png)

### Expectation key

| Code   | Description               |
| ------ | ------------------------- |
| **M**  | Mandatory                 |
| **M+** | Mandatory if applicable   |
| **R**  | Recommended               |
| **R+** | Recommended if applicable |

### Namespaces

```turtle
@prefix dc: <http://purl.org/dc/elements/1.1/> .
@prefix dct: <http://purl.org/dc/terms/> .
@prefix doap: <http://usefulinc.com/ns/doap#> .
@prefix dpla: <http://dp.la/about/map/> .
@prefix edm: <http://www.europeana.eu/schemas/edm/> .
@prefix ore: <http://www.openarchives.org/ore/terms/> .
@prefix owl: <https://www.w3.org/2002/07/owl#> .
@prefix svcs: <http://rdfs.org/sioc/services#> .
```

### `DLME lnnternal Fields`
| Solr field name  | Property          | Expectation | Cardinality | Value type  | Definition | Notes                      |
| ---------------- | ----------------- | ----------- | ----------- | ----------- | ---------- | -------------------------- |
| dlme_source_file  |  |             | 1...1       | literal     | Path to the file in dlme metadata repository. | |

### `edm:ProvidedCHO`

| Solr field name  | Property          | Expectation | Cardinality | Value type  | Definition | Notes                      |
| ---------------- | ----------------- | ----------- | ----------- | ----------- | ---------- | -------------------------- |
| cho_alternative  | `dct:alternative` |             | 0...n       | literal     | Alternative title for the resource. | |
| cho_contributor  | `dc:contributor`  | R           | 0...n       | literal     | Contributor to the existance of the resource.  | |
| cho_coverage     | `dc:coverage`     | R           | 0...n       | literal     | The spatial or temporal topic of the resource, the spatial applicability of the resource, or the jurisdiction under which the resource is relevant. | |
| cho_creator      | `dc:creator`      | R           | 0...n       | literal     | Creator to the existance of the resource. | |
| cho_date         | `dc:date`         | R           | 0...n       | literal     | A point or period of time associated with an event in the lifecycle of the resource. | |
| cho_dc_rights    | `dc:rights`       |             | 0...n       | literal/ref | Information about rights held in and over the CHO resource (the work itself). | Use to give the name of the rights holder of the CHO if possible or for more general rights information; prefer `edm:rights` if more applicable |
| cho_description  | `dc:description`  | R           | 0...n       | literal     | An account of the resource. Includes all notes and abstracts at present. | |
| cho_edm_type     | `edm:type`        | R           | 0...n       | literal     | Extends the Europeana material type of the resource (TEXT, IMAGE, SOUND, VIDEO, and 3D) by adding DATASET, and INTERACTIVE RESOURCE | constrained list for facets, one of "Text", "Image", "Sound", "Video", "3D", "Dataset", "Interactive Resource" |
| cho_extent       | `dct:extent`      |             | 0...n       | literal     | The size or duration of the CHO resource (the work itself, not the digital representation). | |
| cho_format       | `dc:format`       |             | 0...n       | literal     | The file format, physical medium, or dimensions of the CHO resource (the work itself). | |
| cho_has_part     | `dct:hasPart`     |             | 0...n       | literal/ref | A related resource that is included either physically or logically in the described resource. | |
| cho_has_type     | `edm:hasType`     | R           | 0...n       | literal     | This property relates a resource with the concepts it belongs to in a suitable type system that captures categories of objects in a given field. It does not capture aboutness. | |
| cho_identifier   | `dc:identifier`   |             | 0...n       | literal/ref | An unambiguous reference to the resource within a given context. | |
| cho_is_part_of   | `dct:isPartOf`    |             | 0...n       | literal/ref | A related resource in which the described resource is physically or logically included. | |
| cho_language     | `dc:language`     | M+          | 0...n       | literal     | Language for the resource. | Mandatory for text in Europeana; determine if BCP47 language tags are feasible |
| cho_medium       | `dct:medium`      |             | 0...n       | literal     | The material or physical carrier of the resource. | |
| cho_provenance   | `dct:provenance`  | R+          | 0...n       | literal     | A statement of any changes in ownership and custody of the CHO resource (the work itself) since its creation that are significant for its authenticity, integrity, and interpretation. | Recommended if available   |
| cho_publisher    | `dc:publisher`    |             | 0...n       | literal     | An entity responsible for making the CHO resource (the work itself, not the digital representation) available. | |
| cho_relation     | `dc:relation`     |             | 0...n       | literal/ref | Related resources in which you can't determine if it is a part or has a part of or other. | |
| cho_same_as      | `owl:sameAs`      | R+          | 0...n       | reference   | Link or URI for the CHO resource hosted at another domain. | Recommended if there are multiple URIs for the same object. |
| cho_source       | `dc:source`       |             | 0...n       | literal/ref | A related resource from which the described resource is derived. | |
| cho_spatial      | `dct:spatial`     | R           | 0...n       | literal     | Spatial characteristics of the resource. | |
| cho_subject      | `dc:subject`      | R           | 0...n       | literal     | The topic of the resource. | |
| cho_temporal     | `dct:temporal`    | R           | 0...n       | literal     | Temporal characteristics of the resource. | |
| cho_title        | `dc:title`        | M           | 1...n       | literal     | A name given to the resource. | |
| cho_type         | `dc:type`         | R           | 0...n       | literal     | The value found in the incoming metadata without any applied transformations.  | cf `edm:type` for faceting |

### `ore:Aggregation`

| Solr field name    | Property            | Expectation | Cardinality | Value type  | Definition | Notes                      |
| ------------------ | ------------------- | ----------- | ----------- | ----------- | ---------- | -------------------------- |
| id                 | n/a                 | M           | 1...1       | literal     | Identifier for the Aggregation instance in the application. | Used to generate URIs in application. Should be generated by combination of source data ID and a provider ID |
| __source           | `dpla:originalRecord` |           | 0...1       | literal/ref | Identifier or code for the source of the fixture or test data. | Only used in fixtures to indicate the source of data. Prefer references over literals. |
| agg_aggregated_cho | `edm:aggregatedCHO` | M           | 1...1       | reference   | generated by the application (implied by the existance of the solr doc) | Solr document represents aggregation; inferred 1:1 relationship with the ProvidedCHO instance. derive from data if possible |
| agg_data_provider  | `edm:dataProvider`  | M           | 1...1       | literal     | The organization or entity that supplies data through a provider. | |
| agg_data_provider_ar  | `edm:dataProvider`  | M           | 1...1       | literal     | The organization or entity that supplies data through a provider specified in the Arabic language. | |
| agg_data_provider_country_ar  | `edm:dataProviderCountry`  | M           | 1...1       | literal     | The country of the organization or entity that supplies data through a provider specified in the Arabic language. | |
| agg_dc_rights      | `dc:rights`         |             | 0...n       | literal     | Information about rights held in and over the aggregation (both the Web Resource and the CHO). | Ideally this should be applied to the `edm:WebResource` or the `edm:ProvidedCHO`. |
| agg_edm_rights     | `edm:rights`        | R           | 1...n       | reference   | Information about copyright, usage and access rights of the digital objects that represent the source cultural heritage object described in the data. Requires normalization. | The URI for a rights statement that applies to the object. |
| agg_has_view       | `edm:hasView`       |             | 0...n       | JSON literal representation of an `edm:WebResource` | URL reference for the digital object in an undetermined context (is the parent of `agg_is_shown_at`, `agg_is_shown_by`, and `agg_preview`) | The URL of a web resource which is a digital representation of the CHO. |
| agg_is_shown_at    | `edm:isShownAt`     | M+          | 0...1       | JSON literal representation of an `edm:WebResource` | Unambiguous URL reference to digital object in its full information context. | The URL of a web view of the object in full information context. Mandatory as long as a web-viewable version from the provider exists. |
| agg_is_shown_by    | `edm:isShownBy`     | M+          | 0...1       | JSON literal representation of an `edm:WebResource` | An unambiguous URL reference to the digital object on the provider’s website in the best available resolution/quality. | The URL of a web view of the object. (Europeana presumes this is renderable in the browser and a is a full- or high-resolution image) |
| agg_preview        | `edm:preview`       | M+          | 0...1       | JSON literal representation of an `edm:WebResource` | The URL of a thumbnail representing the digital object. | The URL of a web view of the object used as a thumbnail. This must be an image regardless of the type of object. Mandatory whenever thumbnails are available. |
| agg_provider       | `edm:provider`      | M           | 1...1       | literal     | The name or identifier of the organization who delivers data directly to an aggregation service. | |
| agg_provider_ar       | `edm:provider`      | M           | 1...1       | literal     | The name or identifier of the organization who delivers data directly to an aggregation service specified in the Arabic language. | |
| agg_provider_country      | `edm:provider`      | M           | 1...1       | literal     | The country of the organization who delivers data directly to an aggregation service. | |
| agg_provider_country_ar     | `edm:provider`      | M           | 1...1       | literal     | The country of the organization who delivers data directly to an aggregation service specified in the Arabic language. | |
| agg_same_as        | `owl:sameAs`        | R+          | 0...n       | reference   | URL or URI or other reference to the same Aggregation object. | |

### `edm:WebResource`

| JSON property name  | Property             | Expectation | Cardinality | Value type   | Definition | Notes                      |
| ------------------- | -------------------- | ----------- | ----------- | ------------ | ---------- | -------------------------- |
| wr_id               | See notes            | M           | 1...1       | reference    | Identifier (URL) for the instance of the WebResource. | represents the URI for the `edm:WebResource` associated with a `ore:Aggregation` using `edm:hasView`, `edm:isShownAt`, `edm:isShownBy`, or `edm:preview` |
| wr_creator          | `dc:creator`         |             | 0...n       | literal      | Creator to the existance of the digital resource / digital asset. | |
| wr_dc_rights        | `dc:rights`          |             | 0...n       | literal      | Information about rights held in and over the web resource - the digital asset itself. | prefer `edm:rights` if available |
| wr_description      | `dc:description`     |             | 0...n       | literal      | Notes or other describing the web resource - the digital asset. | |
| wr_edm_rights       | `edm:rights`         | R           | 0...1       | reference    | Information about copyright, usage and access rights of the digital object / web resource. Requires normalization. | The rights statement that applies to an associated `edm:WebResource` when it doesn't have its own. Apply this carefully. |
| wr_format           | `dc:format`          | R+          | 0...n       | literal      | MIME Type. | Recommended for WebResources associated via `edm:preview` or `edm:isShownBy` |
| wr_has_service      | `svcs:has_service`   | R+          | 0...n       | JSON literal | Links to list of Service objects. Generated by the application. | for associating IIIF image resources see [EDM Profile for IIIF](http://pro.europeana.eu/files/Europeana_Professional/Share_your_data/Technical_requirements/EDM_profiles/IIIFtoEDM_profile_042016.pdf). Recommended if IIIF image resource exists exist. |
| wr_is_referenced_by | `dct:isReferencedBy` | R+          | 0...n       | reference    | Manifest URI that describes the web resource or another web resource that describes the CHO resource. | for associating IIIF presentation API resources; see [EDM Profile for IIIF](http://pro.europeana.eu/files/Europeana_Professional/Share_your_data/Technical_requirements/EDM_profiles/IIIFtoEDM_profile_042016.pdf). Recommended if IIIF manifests exist. |

### `svcs:Service`

| JSON property name  | Property             | Expectation | Cardinality | Value type   | Definition | Notes                      |
| ------------------- | -------------------- | ---- | ----------- | ------------ | ---------- | -------------------------- |
| service_id          | See notes            | M    | 1...1       | reference    | URI for the particular Service (IIIF server) or the URI of the web resource in that server | represents the URI for the `svcs:Service` associated with a `edm:WebResource` using `svcs:has_service` |
| service_conforms_to | `dct:conformsTo`     | M    | 1...n       | reference    | URI for the API specification that the service conforms to. | for associating IIIF image services; see [EDM Profile for IIIF](http://pro.europeana.eu/files/Europeana_Professional/Share_your_data/Technical_requirements/EDM_profiles/IIIFtoEDM_profile_042016.pdf) |
| service_implements  | `doap:implements`    | R    | 0...1       | reference    | The definition of a IIIF “protocol” the service is using. | for associating IIIF image profiles; see [EDM Profile for IIIF](http://pro.europeana.eu/files/Europeana_Professional/Share_your_data/Technical_requirements/EDM_profiles/IIIFtoEDM_profile_042016.pdf) |
