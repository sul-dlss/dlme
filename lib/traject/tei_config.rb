# frozen_string_literal: true

require_relative 'xml_reader'
require_relative 'dlme_json_resource_writer'
require_relative 'macros/tei'
require_relative 'macros/xml'
extend Macros::DLME
extend Macros::Xml
extend Macros::Tei

settings do
  provide 'writer_class_name', 'DlmeJsonResourceWriter'
  provide 'reader_class_name', 'XmlReader'
  provide 'allow_empty_fields', true
  provide 'agg_provider', 'University of Pennsylvania Library'
  provide 'agg_data_provider', 'University of Pennsylvania Library'
end

to_field 'id', lambda { |_record, accumulator, context|
  accumulator << context.settings.fetch('identifier')
}
ms_desc = '/*/tei:teiHeader/tei:fileDesc/tei:sourceDesc/tei:msDesc'

to_field 'cho_title', extract_tei("#{ms_desc}/tei:msContents/tei:msItem/tei:title")
# ??? to_field 'cho_alternative', ???
to_field 'cho_description', extract_tei("#{ms_desc}/tei:msContents/tei:summary")
to_field 'cho_date', extract_tei("#{ms_desc}/tei:history/tei:origin/tei:origDate")
rights_query = '/*/tei:teiHeader/tei:fileDesc/tei:publicationStmt/tei:availability/tei:licence'
to_field 'cho_dc_rights', extract_tei(rights_query, trim: true)
to_field 'cho_creator', extract_tei("#{ms_desc}/tei:msContents/tei:msItem/tei:author")
# ??? to_field 'cho_contributor', ???

# Aggregation Object(s)
to_field 'agg_data_provider', data_provider
to_field 'agg_provider', provider
