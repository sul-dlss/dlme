# Schema to DLME MAP Mappings

## Source of Schema for Mappings

* Schemas are selected based on their appearance in [this GH repo](https://github.com/waynegraham/dlme-metadata) containing metadata for batch loading
* Rougher notes and some basic analysis of data in that GH repo for mapping purposes only is in [this Google spreadsheet](https://docs.google.com/spreadsheets/d/1Sp7uMHizVX7xN7xN9mm-vgEuESQBovXO-qenAo_TV-w/edit?usp=sharing) (the mappings are then migrated here for review / completion)

## Mappings

### MODS/XML (Based on MODS 3.5)

MODS Field (XPath) | DLME MAP Solr Field          | Notes                     
------------------ | ---------------------------- | --------------------------
mods:abstract	|	cho_description	|	Move to abstract?
mods:accessCondition	|	cho_dc_rights	|
mods:accessCondition[@type="restriction on access"]	|	cho_dc_rights	|
mods:accessCondition[@type="use and reproduction"]	|	cho_dc_rights	|
mods:classification	|	cho_subject	|
mods:extension/*	|	n/a	|
mods:extension/rdf:RDF/rdf:Description/dc:format	|	cho_has_type	|
mods:extension/rdf:RDF/rdf:Description/dc:type	|	cho_type	|
mods:extension/rdf:RDF/rdf:Description/gml:boundedBy/gml:Envelope/gml:lowerCorner	|	n/a	|	add geographic attributes support?
mods:extension/rdf:RDF/rdf:Description/gml:boundedBy/gml:Envelope/gml:upperCorner	|	n/a	|	add geographic attributes support?
mods:genre	|	cho_has_type	|	type / format mess
mods:identifier	|	cho_identifier	|
mods:language/mods:languageTerm	|	cho_language	|
mods:language/mods:scriptTerm	|	cho_language	|	do we want to split this? is different from language.
mods:location/mods:holdingExternal	|	n/a	|
mods:location/mods:holdingSimple/mods:copyInformation/mods:electronicLocator	|	n/a	|	identifier back-up
mods:location/mods:holdingSimple/mods:copyInformation/mods:enumerationAndChronology	|	n/a	|
mods:location/mods:holdingSimple/mods:copyInformation/mods:form	|	n/a	|
mods:location/mods:holdingSimple/mods:copyInformation/mods:itemIdentifier	|	cho_identifier	|	identifier back-up
mods:location/mods:holdingSimple/mods:copyInformation/mods:note	|	cho_description	|
mods:location/mods:holdingSimple/mods:copyInformation/mods:shelfLocator	|	n/a	|
mods:location/mods:holdingSimple/mods:copyInformation/mods:subLocation	|	n/a	|
mods:location/mods:physicalLocation	|	agg_data_provider	|
mods:location/mods:shelfLocator	|	n/a	|
mods:location/mods:url	|	agg_is_shown_at	|
mods:name/mods:affiliation	|	n/a	|	Would be applied as description of the Agent resource.
mods:name/mods:description	|	n/a	|	Would be applied as description of the Agent resource.
mods:name/mods:displayForm	|	"cho_contributor when roleTerm != 'creator'
cho_creator when roleTerm == 'creator'"	|	Use in preference to namePart when available.
mods:name/mods:nameIdentifier	|	n/a	|	Would be applied as description of the Agent resource.
mods:name/mods:namePart	|	"cho_contributor when roleTerm != 'creator'
cho_creator when roleTerm == 'creator'"	|	Would be applied as description of the Agent resource.
mods:name/mods:role/mods:roleTerm	|	n/a	|	Used for how to capture relationship to an Agent.
mods:note	|	cho_description	|	Note types (an attribute, but uncontrolled in MODS spec) might change this mapping.
mods:originInfo/mods:copyrightDate	|	cho_date	|
mods:originInfo/mods:dateCaptured	|	n/a	|	Would be date on the digital resource most likely.
mods:originInfo/mods:dateCreated	|	cho_date	|
mods:originInfo/mods:dateIssued	|	cho_date	|
mods:originInfo/mods:dateModified	|	n/a	|	Not sure we are specific enough on what modify means to capture.
mods:originInfo/mods:dateOther	|	n/a	|
mods:originInfo/mods:dateValid	|	cho_coverage	|
mods:originInfo/mods:edition	|	n/a	|
mods:originInfo/mods:frequency	|	n/a	|
mods:originInfo/mods:issuance	|	n/a	|
mods:originInfo/mods:place/mods:placeTerm	|	n/a	|	Spatial subject vs source?
mods:originInfo/mods:publisher	|	cho_publisher	|
mods:part/mods:date	|	n/a	|
mods:part/mods:detail/mods:caption	|	n/a	|
mods:part/mods:detail/mods:number	|	n/a	|
mods:part/mods:detail/mods:title	|	n/a	|
mods:part/mods:extent/mods:end	|	n/a	|
mods:part/mods:extent/mods:list	|	n/a	|
mods:part/mods:extent/mods:start	|	n/a	|
mods:part/mods:extent/mods:total	|	n/a	|
mods:part/mods:text	|	n/a	|
mods:physicalDescription/mods:digitalOrigin	|	wr_description	|	Do we want to keep this? Does it help with WR declarations?
mods:physicalDescription/mods:extent	|	cho_extent	|
mods:physicalDescription/mods:form	|	cho_format	|
mods:physicalDescription/mods:internetMediaType	|	wr_format	|
mods:physicalDescription/mods:note	|	cho_description	|
mods:physicalDescription/mods:reformattingQuality	|	wr_description	|	Do we want to keep this?
mods:recordInfo/mods:descriptionStandard	|	n/a	|
mods:recordInfo/mods:languageOfCataloging/mods:languageTerm	|	n/a	|
mods:recordInfo/mods:languageOfCataloging/mods:scriptTerm	|	n/a	|
mods:recordInfo/mods:recordChangeDate	|	n/a	|
mods:recordInfo/mods:recordContentSource	|	agg_provider	|
mods:recordInfo/mods:recordCreationDate	|	n/a	|
mods:recordInfo/mods:recordIdentifier	|	cho_identifier	|
mods:recordInfo/mods:recordInfoNote	|	n/a	|
mods:recordInfo/mods:recordOrigin	|	n/a	|
mods:relatedItem[@type="constituent"]/mods:location/mods:url	|	cho_has_part	|
mods:relatedItem[@type="constituent"]/mods:titleInfo/mods:title	|	n/a	|
mods:relatedItem[@type="host"]/mods:titleInfo/mods:title	|	cho_is_part_of	|
mods:relatedItem[@type="series"]/mods:titleInfo/mods:title	|	cho_is_part_of	|
mods:relatedItem/*	|		|
mods:relatedItem/mods:identifier	|	n/a	|
mods:relatedItem/mods:name/mods:namePart	|	??	|
mods:relatedItem/mods:originInfo/mods:dateIssued	|	??	|
mods:relatedItem/mods:titleInfo[@type="otherVersion"]/mods:title	|	cho_relation	|
mods:relatedItem/mods:titleInfo[not(@\*)]/mods:title	|	cho_relation	|
mods:subject/mods:cartographics/mods:coordinates	|	cho_spatial	|
mods:subject/mods:cartographics/mods:projection	|	cho_spatial	|
mods:subject/mods:cartographics/mods:scale	|	cho_spatial	|
mods:subject/mods:genre	|	n/a	|
mods:subject/mods:geographic	|	cho_spatial	|
mods:subject/mods:geographicCode	|	cho_spatial	|
mods:subject/mods:hierarchicalGeographic/mods:area	|	cho_spatial	|
mods:subject/mods:hierarchicalGeographic/mods:city	|	cho_spatial	|
mods:subject/mods:hierarchicalGeographic/mods:citySection	|	cho_spatial	|
mods:subject/mods:hierarchicalGeographic/mods:continent	|	cho_spatial	|
mods:subject/mods:hierarchicalGeographic/mods:country	|	cho_spatial	|
mods:subject/mods:hierarchicalGeographic/mods:county	|	cho_spatial	|
mods:subject/mods:hierarchicalGeographic/mods:extraterrestrialArea	|	cho_spatial	|
mods:subject/mods:hierarchicalGeographic/mods:island	|	cho_spatial	|
mods:subject/mods:hierarchicalGeographic/mods:region	|	cho_spatial	|
mods:subject/mods:hierarchicalGeographic/mods:state	|	cho_spatial	|
mods:subject/mods:hierarchicalGeographic/mods:territory	|	cho_spatial	|
mods:subject/mods:name/mods:affiliation	|	n/a	|	Relates to an agent
mods:subject/mods:name/mods:description	|	n/a	|	Relates to an agent
mods:subject/mods:name/mods:nameIdentifier	|	n/a	|	Relates to an agent
mods:subject/mods:name/mods:namePart	|	n/a	|	Relates to an agent
mods:subject/mods:name/mods:role/mods:roleTerm	|	n/a	|	Relates to an agent
mods:subject/mods:occupation	|	n/a	|	Relates to an agent
mods:subject/mods:temporal	|	cho_temporal	|
mods:subject/mods:title/mods:nonSort	|	n/a	|	Relates to another Work / CHO.
mods:subject/mods:title/mods:partName	|	n/a	|	Relates to another Work / CHO.
mods:subject/mods:title/mods:partNumber	|	n/a	|	Relates to another Work / CHO.
mods:subject/mods:titleInfo/mods:subTitle	|	n/a	|	Relates to another Work / CHO.
mods:subject/mods:titleInfo/mods:title	|	cho_subject	|	Relates to another Work / CHO.
mods:subject/mods:topic	|	cho_subject	|
mods:tableOfContents	|	cho_description	|
mods:targetAudience	|	n/a	|
mods:title/mods:nonSort	|	n/a	|
mods:title/mods:partName	|	cho_title	|
mods:title/mods:partName	|	n/a	|	Append to mods:titleInfo/mods:title[not(@\*)] cho_title?
mods:title/mods:partNumber	|	cho_title	|
mods:title/mods:partNumber	|	n/a	|	Append to mods:titleInfo/mods:title[not(@\*)] cho_title?
mods:titleInfo/mods:subTitle	|	cho_title	|
mods:titleInfo/mods:subTitle	|	n/a	|	Append to mods:titleInfo/mods:title[not(@\*)] cho_title?
mods:titleInfo/mods:title[@type]	|	cho_alternative	|
mods:titleInfo/mods:title[not(@\*)]	|	cho_title	|
mods:typeOfResource	|	cho_type, cho_edm_type (normalized)	|	Reuse format?

### FGDC/XML

### Met Museum Local Schema CSV
