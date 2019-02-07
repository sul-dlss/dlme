# frozen_string_literal: true

require_relative 'xml_reader'
require_relative 'dlme_json_resource_writer'
require_relative 'macros/dlme'
require_relative 'macros/extraction'
require_relative 'macros/xml'

extend Macros::DLME
extend Macros::Xml

settings do
  provide 'writer_class_name', 'DlmeJsonResourceWriter'
  provide 'reader_class_name', 'XmlReader'
end

record = 'srw:record/srw:recordData/oai_dc:dc'

# Cho Required
to_field 'id', extract_xml("#{record}/dc:identifier", LOC_NS), strip
to_field 'cho_title', extract_xml("#{record}/dc:title", LOC_NS), strip

# Cho Other
to_field 'cho_contributor', extract_xml("#{record}/dc:contributor", LOC_NS), strip # split('.'), first_only, strip
to_field 'cho_creator', extract_xml("#{record}/dc:creator", LOC_NS), split('.'), first_only, strip
to_field 'cho_creator', extract_xml("#{record}/dc:creator[2]", LOC_NS), split('.'), first_only, strip
to_field 'cho_creator', extract_xml("#{record}/dc:creator[3]", LOC_NS), split('.'), first_only, strip
to_field 'cho_date', extract_xml("#{record}/dc:date", LOC_NS), strip
to_field 'cho_description', extract_xml("#{record}/dc:description", LOC_NS), strip
to_field 'cho_dc_rights', extract_xml("#{record}/dc:rights", LOC_NS), strip
to_field 'cho_format', extract_xml("#{record}/dc:format", LOC_NS), strip
to_field 'cho_type', extract_xml("#{record}/dc:type", LOC_NS),
         default('notated music'),
         first_only,
         strip,
         translation_map('types'),
         default('image')
to_field 'cho_language', extract_xml("#{record}/dc:language", LOC_NS), first_only, strip, translation_map('marc_languages')
to_field 'cho_publisher', extract_xml("#{record}/dc:publisher", LOC_NS), strip
to_field 'cho_relation', extract_xml("#{record}/dc:relation", LOC_NS), strip
to_field 'cho_source', extract_xml("#{record}/dc:source", LOC_NS), strip
to_field 'cho_subject', extract_xml("#{record}/dc:subject", LOC_NS), strip

# Agg
to_field 'agg_provider', provider
to_field 'agg_data_provider', data_provider
to_field 'agg_is_shown_at', extract_xml('srw:record/srw:extraRecordData/link', LOC_NS), strip
to_field 'agg_preview', extract_xml('srw:record/srw:extraRecordData/thumbnail', LOC_NS), strip

# Not using agg_is_shown_by
