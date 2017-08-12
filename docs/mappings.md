# Schema to DLME MAP Mappings

## Source of Schema for Mappings

* Schemas are selected based on their appearance in [this GH repo](https://github.com/waynegraham/dlme-metadata) containing metadata for batch loading
* Rougher notes and some basic analysis of data in that GH repo for mapping purposes only is in [this Google spreadsheet](https://docs.google.com/spreadsheets/d/1Sp7uMHizVX7xN7xN9mm-vgEuESQBovXO-qenAo_TV-w/edit?usp=sharing) (the mappings are then migrated here for review / completion)

## Mappings

### MODS/XML (Based on MODS 3.5)

MODS Field (XPath) | DLME MAP Field          | Notes                     
------------------ | ----------------------- | --------------------------
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
mods:titleInfo[@type]/mods:title	|	cho_alternative	|
mods:titleInfo[not(@\*)]/mods:title	|	cho_title	|
mods:typeOfResource	|	cho_type, cho_edm_type (normalized)	|	Reuse format?

### FGDC/XML

FGDC Field (XPath) | DLME MAP Field          | Notes             
------------------ | ----------------------- | --------------------------
metainfo/metc/cntinfo/cntorgp/cntorg	|	agg_provider	|
dataqual/lineage/srcinfo/srctime/timeinfo/rngdates/begdate	|	cho_coverage	|	is related to the parent object / dataset
dataqual/lineage/srcinfo/srctime/timeinfo/rngdates/enddate	|	cho_coverage	|	is related to the parent object / dataset
dataqual/lineage/srcinfo/srctime/timeinfo/sngdate/caldate	|	cho_coverage	|	is related to the parent object / dataset
dataqual/lineage/srcinfo/srccite/citeinfo/pubdate	|	cho_date	|	is related to the parent object / dataset
idinfo/citation/citeinfo/pubdate	|	cho_date	|
idinfo/crossref/citeinfo/pubdate	|	cho_date	|
dataqual/attracc/attraccr	|	cho_description	|
dataqual/complete	|	cho_description	|
dataqual/lineage/procstep/procdesc	|	cho_description	|	is related to the parent object / dataset
dataqual/posacc/horizpa/horizpar	|	cho_description	|
dataqual/posacc/horizpa/qhorizpa/horizpae	|	cho_description	|
dataqual/posacc/vertacc/vertaccr	|	cho_description	|
distinfo/stdorder/digform/digtinfo/filedec	|	cho_description	|
eainfo/overview/eaover	|	cho_description	|
idinfo/descript/abstract	|	cho_description	|
idinfo/descript/purpose	|	cho_description	|
idinfo/status/update	|	cho_description	|
idinfo/crossref/citeinfo/othercit	|	cho_extent	|
distinfo/stdorder/digform/digtinfo/formname	|	cho_format	|
spdoinfo/direct	|	cho_format	|
spdoinfo/ptvctinf/sdtsterm/sdtstype	|	cho_format	|
spdoinfo/rastinfo/rasttype	|	cho_format	|
idinfo/citation/citeinfo/geoform	|	cho_has_type	|
idinfo/crossref/citeinfo/geoform	|	cho_has_type	|
distinfo/resdesc	|	cho_identifier / \_id	|	
dataqual/lineage/srcinfo/srccite/citeinfo/lworkcit/citeinfo/serinfo/sername	|	cho_is_part_of	|	is related to the parent object / dataset
dataqual/lineage/srcinfo/srccite/citeinfo/lworkcit/citeinfo/title	|	cho_is_part_of	|	is related to the parent object / dataset
idinfo/citation/citeinfo/serinfo/sername	|	cho_is_part_of	|
dataqual/lineage/procstep/proccont/cntinfo/cntorgp/cntorg	|	cho_provenance	|	is related to the parent object / dataset
idinfo/citation/citeinfo/origin	|	cho_provenance	|
idinfo/crossref/citeinfo/origin	|	cho_provenance	|
idinfo/native	|	cho_provenance	|
idinfo/citation/citeinfo/pubinfo/publish	|	cho_publisher	|
idinfo/crossref/citeinfo/pubinfo/publish	|	cho_publisher	|
distinfo/distrib/cntinfo/cntorgp/cntorg	|	cho_publisher / edm:dataProvider	|
distinfo/distrib/cntinfo/cntpos	|	cho_publisher / edm:dataProvider	|	if not the same as cntorg
idinfo/accconst	|	cho_rights	|
idinfo/useconst	|	cho_rights, wr_rights	|
dataqual/lineage/procstep/srcprod	|	cho_source	|	is related to the parent object / dataset
dataqual/lineage/procstep/srcused	|	cho_source	|	is related to the parent object / dataset
dataqual/lineage/srcinfo/srccite/citeinfo/origin	|	cho_source	|	is related to the parent object / dataset
dataqual/lineage/srcinfo/srccite/citeinfo/pubinfo/publish	|	cho_source	|	is related to the parent object / dataset
dataqual/lineage/srcinfo/srccite/citeinfo/serinfo/issue	|	cho_source	|	is related to the parent object / dataset
dataqual/lineage/srcinfo/srccite/citeinfo/serinfo/sername	|	cho_source	|	is related to the parent object / dataset
dataqual/lineage/srcinfo/srccite/citeinfo/title	|	cho_source	|	is related to the parent object / dataset
idinfo/keywords/place/placekey	|	cho_spatial	|
idinfo/spdom/bounding/eastbc	|	cho_spatial	|
idinfo/spdom/bounding/northbc	|	cho_spatial	|
idinfo/spdom/bounding/southbc	|	cho_spatial	|
idinfo/spdom/bounding/westbc	|	cho_spatial	|
dataqual/lineage/srcinfo/srccite/citeinfo/edition	|	cho_title	|	is related to the parent object / dataset
eainfo/detailed/attr/attrdomv/codesetd/codesetn	|	cho_title	|	??
eainfo/detailed/attr/attrdomv/edom/edomvd	|	cho_title	|	??
idinfo/citation/citeinfo/edition	|	cho_title	|
idinfo/citation/citeinfo/title	|	cho_title	|
idinfo/crossref/citeinfo/title	|	cho_title	|
dataqual/lineage/srcinfo/srccite/citeinfo/geoform	|	cho_type ; cho_edm_type	|	is related to the parent object / dataset
idinfo/crossref/citeinfo/onlink	|	wr_	|	need to check for full link(s)
idinfo/datacred	|	wr_description	|


### Met Museum Local Schema CSV
