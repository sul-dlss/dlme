# frozen_string_literal: true

require_relative 'xml_reader'
require_relative 'dlme_json_resource_writer'
require_relative 'macros/dlme'
require_relative 'macros/extraction'
require_relative 'macros/mods'
require_relative 'macros/xml'
require_relative 'macros/stanford'

extend Macros::DLME
extend Macros::Xml
extend Macros::Mods
extend Macros::IIIF
extend Macros::Stanford

settings do
  provide 'writer_class_name', 'DlmeJsonResourceWriter'
  provide 'reader_class_name', 'XmlReader'
end

# Spotlight DLME IR Record Identifier
to_field 'id', generate_mods_id

# CHO Required
to_field 'cho_identifier', extract_mods('/*/mods:identifier')
to_field 'cho_identifier', extract_mods('/*/mods:recordInfo/mods:recordIdentifier')
to_field 'cho_identifier', extract_mods('/*/mods:location/mods:holdingSimple/mods:copyInformation/mods:itemIdentifier')
to_field 'cho_language', normalize_language
to_field 'cho_language', normalize_script
to_field 'cho_title', extract_mods('/*/mods:titleInfo[not(@*)]/mods:title')
to_field 'cho_title', extract_mods('/*/mods:titleInfo[not(@*)]/mods:partName')
to_field 'cho_title', extract_mods('/*/mods:titleInfo[not(@*)]/mods:partNumber')
to_field 'cho_title', extract_mods('/*/mods:titleInfo[not(@*)]/mods:subTitle')

# CHO Other
to_field 'cho_alternative', extract_mods('/*/mods:titleInfo[@type]/mods:title')
to_field 'cho_coverage', extract_mods('/*/mods:originInfo/mods:dateValid')
to_field 'cho_coverage', extract_mods('/*/mods:originInfo/mods:place/mods:placeTerm')
to_field 'cho_creator', extract_name(role: %w[author creator])
to_field 'cho_contributor', extract_name(exclude: %w[author creator])
to_field 'cho_date', extract_mods('/*/mods:originInfo/mods:dateCreated')
to_field 'cho_date', extract_mods('/*/mods:originInfo/mods:copyrightDate')
to_field 'cho_date', extract_mods('/*/mods:originInfo/mods:dateIssued')
to_field 'cho_dc_rights', first(
  extract_mods('/*/mods:accessCondition[@type="restrictionOnAccess"]/@xlink:href'),
  extract_mods('/*/mods:accessCondition[@type="restriction on access"]')
)
to_field 'cho_dc_rights', first(
  extract_mods('/*/mods:accessCondition[@type="useAndReproduction"]/@xlink:href'),
  extract_mods('/*/mods:accessCondition[@type="use and reproduction"]')
)
to_field 'cho_dc_rights', conditional(
  ->(_record, context) { context.output_hash['cho_dc_rights'].blank? },
  extract_mods('/*/mods:accessCondition')
)
to_field 'cho_description', extract_mods('/*/mods:abstract')
to_field 'cho_description', extract_mods('/*/mods:location/mods:holdingSimple/mods:copyInformation/mods:note')
to_field 'cho_description', extract_mods('/*/mods:note')
to_field 'cho_description', extract_mods('/*/mods:physicalDescription/mods:note')
to_field 'cho_description', extract_mods('/*/mods:tableOfContents')
to_field 'cho_edm_type', normalize_type
to_field 'cho_extent', extract_mods('/*/mods:physicalDescription/mods:extent')
to_field 'cho_format', extract_mods('/*/mods:physicalDescription/mods:form')
to_field 'cho_has_part', generate_relation('/*/mods:relatedItem[@type="constituent"]')
to_field 'cho_has_type', extract_mods('/*/mods:genre')
to_field 'cho_is_part_of', generate_relation('/*/mods:relatedItem[@type="host"]')
to_field 'cho_is_part_of', generate_relation('/*/mods:relatedItem[@type="series"]')
to_field 'cho_publisher', extract_mods('/*/mods:originInfo/mods:publisher')
to_field 'cho_relation', generate_relation('/*/mods:relatedItem[not(@*)]')
to_field 'cho_spatial', extract_mods('/*/mods:subject/mods:cartographics/mods:coordinates')
to_field 'cho_spatial', extract_mods('/*/mods:subject/mods:cartographics/mods:projection')
to_field 'cho_spatial', extract_mods('/*/mods:subject/mods:cartographics/mods:scale')
to_field 'cho_spatial', extract_mods('/*/mods:subject/mods:geographic')
to_field 'cho_spatial', extract_mods('/*/mods:subject/mods:geographicCode')
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

# Aggregation Object(s)
to_field 'agg_data_provider', data_provider
to_field 'agg_provider', provider

# agg_dc_rights:,
# agg_edm_rights:,
# agg_same_as

# nested fields
