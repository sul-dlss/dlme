# frozen_string_literal: true

require_relative 'xml_reader'
require_relative 'dlme_json_resource_writer'
require_relative 'macros/mods'
require_relative 'macros/xml'
require_relative 'macros/stanford'
Traject::Indexer.include Macros::Xml
Traject::Indexer.include Macros::Mods
Traject::Indexer.include Macros::Stanford

settings do
  provide 'writer_class_name', 'DlmeJsonResourceWriter'
  provide 'reader_class_name', 'XmlReader'
  provide 'allow_empty_fields', true
  provide 'agg_provider', 'Stanford University Library'
  provide 'agg_data_provider', 'Stanford University Library'
  provide 'inst_id', 'stanford'
end

# Record Identifier
to_field 'id', lambda { |_record, accumulator, context|
  accumulator << if context.settings.fetch('identifier').include? context.settings.fetch('inst_id')
                   context.settings.fetch('identifier')
                 else
                   context.settings.fetch('inst_id') + '_' + context.settings.fetch('identifier')
                 end
}

# CHO Required
to_field 'cho_identifier', extract_mods('/*/mods:identifier')
to_field 'cho_identifier', extract_mods('/*/mods:recordInfo/mods:recordIdentifier')
to_field 'cho_identifier', extract_mods('/*/mods:location/mods:holdingSimple/mods:copyInformation/mods:itemIdentifier')
to_field 'cho_language', normalize_language
to_field 'cho_language', normalize_script
to_field 'cho_title', extract_mods('/*/mods:titleInfo/mods:title[not(@*)]')
to_field 'cho_title', extract_mods('/*/mods:title/mods:partName')
to_field 'cho_title', extract_mods('/*/mods:title/mods:partNumber')
to_field 'cho_title', extract_mods('/*/mods:titleInfo/mods:subTitle')

# CHO Other
to_field 'cho_alternative', extract_mods('/*/mods:titleInfo/mods:title[@type]')
to_field 'cho_coverage', extract_mods('/*/mods:originInfo/mods:dateValid')
to_field 'cho_creator', extract_name(role: 'author')
to_field 'cho_contributor', extract_name(exclude: 'author')
to_field 'cho_date', extract_mods('/*/mods:originInfo/mods:dateCreated')
to_field 'cho_date', extract_mods('/*/mods:originInfo/mods:copyrightDate')
to_field 'cho_date', extract_mods('/*/mods:originInfo/mods:dateIssued')
to_field 'cho_dc_rights', extract_mods('/*/mods:accessCondition')
to_field 'cho_description', extract_mods('/*/mods:abstract')
to_field 'cho_description', extract_mods('/*/mods:location/mods:holdingSimple/mods:copyInformation/mods:note')
to_field 'cho_description', extract_mods('/*/mods:note')
to_field 'cho_description', extract_mods('/*/mods:physicalDescription/mods:note')
to_field 'cho_description', extract_mods('/*/mods:tableOfContents')
to_field 'cho_edm_type', normalize_type
to_field 'cho_extent', extract_mods('/*/mods:physicalDescription/mods:extent')
to_field 'cho_format', extract_mods('/*/mods:physicalDescription/mods:form')
# cho_has_part
generate_has_part
to_field 'cho_has_type', extract_mods('/*/mods:genre')
# cho_is_part_of
generate_part_of
generate_series
to_field 'cho_publisher', extract_mods('/*/mods:originInfo/mods:publisher')
# cho_relatoin
generate_relation
# Better coordinate spatial aspects?
to_field 'cho_spatial', extract_mods('/*/mods:subject/mods:cartographics/mods:coordinates')
to_field 'cho_spatial', extract_mods('/*/mods:subject/mods:cartographics/mods:projection')
to_field 'cho_spatial', extract_mods('/*/mods:subject/mods:cartographics/mods:scale')
to_field 'cho_spatial', extract_mods('/*/mods:subject/mods:geographic')
to_field 'cho_spatial', extract_mods('/*/mods:subject/mods:geographicCode')
# there must be a better xpath way to iterate over text of all possible children
to_field 'cho_spatial', extract_mods('/*/mods:subject/mods:hierarchicalGeographic/mods:area')
to_field 'cho_spatial', extract_mods('/*/mods:subject/mods:hierarchicalGeographic/mods:city')
to_field 'cho_spatial', extract_mods('/*/mods:subject/mods:hierarchicalGeographic/mods:citySection')
to_field 'cho_spatial', extract_mods('/*/mods:subject/mods:hierarchicalGeographic/mods:continent')
to_field 'cho_spatial', extract_mods('/*/mods:subject/mods:hierarchicalGeographic/mods:country')
to_field 'cho_spatial', extract_mods('/*/mods:subject/mods:hierarchicalGeographic/mods:county')
to_field 'cho_spatial', extract_mods('/*/mods:subject/mods:hierarchicalGeographic/mods:extraterrestrialArea')
to_field 'cho_spatial', extract_mods('/*/mods:subject/mods:hierarchicalGeographic/mods:island')
to_field 'cho_spatial', extract_mods('/*/mods:subject/mods:hierarchicalGeographic/mods:region')
to_field 'cho_spatial', extract_mods('/*/mods:subject/mods:hierarchicalGeographic/mods:state')
to_field 'cho_spatial', extract_mods('/*/mods:subject/mods:hierarchicalGeographic/mods:territory')
to_field 'cho_subject', extract_mods('/*/mods:classification')
to_field 'cho_subject', extract_mods('/*/mods:subject/mods:topic')
to_field 'cho_subject', extract_mods('/*/mods:subject/mods:titleInfo/mods:title')
to_field 'cho_temporal', extract_mods('/*/mods:subject/mods:temporal')
to_field 'cho_type', extract_mods('/*/mods:typeOfResource')

# Agg
to_field 'agg_data_provider', lambda { |_record, accumulator, context|
  accumulator << context.settings.fetch('agg_data_provider')
}
to_field 'agg_provider', lambda { |_record, accumulator, context|
  accumulator << context.settings.fetch('agg_provider')
}

# WR
to_field 'wr_description', extract_mods('/*/mods:physicalDescription/mods:digitalOrigin')
to_field 'wr_description', extract_mods('/*/mods:physicalDescription/mods:reformattingQuality')
to_field 'wr_format', extract_mods('/*/mods:physicalDescription/mods:internetMediaType')

# STANFORD Specific
# wr_service, agg_is_shown_by, agg_preview, etc. generated by generate_sul_manifest
to_field 'wr_is_referenced_by', generate_sul_manifest
to_field 'cho_has_type', extract_mods('/*/mods:extension/rdf:RDF/rdf:Description/dc:format')
to_field 'cho_type', extract_mods('/*/mods:extension/rdf:RDF/rdf:Description/dc:type')
