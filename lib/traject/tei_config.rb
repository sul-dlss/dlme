# frozen_string_literal: true

require_relative 'xml_reader'
require_relative 'dlme_json_resource_writer'
require_relative 'macros/dlme'
require_relative 'macros/tei'
require_relative 'macros/xml'
extend Macros::DLME
extend Macros::Xml
extend Macros::Tei

settings do
  provide 'writer_class_name', 'DlmeJsonResourceWriter'
  provide 'reader_class_name', 'XmlReader'
end

to_field 'id', lambda { |_record, accumulator, context|
  bare_id = default_identifier(context)
  accumulator << identifier_with_prefix(context, bare_id)
}

pub_stmt = '/*/tei:teiHeader/tei:fileDesc/tei:publicationStmt'
to_field 'cho_publisher', extract_tei("#{pub_stmt}/tei:publisher")
to_field 'cho_dc_rights', extract_tei("#{pub_stmt}/tei:availability/tei:licence", trim: true)

ms_desc = '/*/tei:teiHeader/tei:fileDesc/tei:sourceDesc/tei:msDesc'
ms_id = 'tei:msIdentifier'
to_field 'cho_identifier', extract_tei("#{ms_desc}/#{ms_id}/tei:idno[@type='call-number']")
to_field 'wr_id', extract_tei("#{ms_desc}/#{ms_id}/tei:altIdentifier[@type='bibid']/tei:idno")
to_field 'agg_is_shown_at' do |_record, accumulator, context|
  accumulator << transform_values(context,
                                  'wr_id' => [extract_tei("#{ms_desc}/#{ms_id}/tei:altIdentifier[@type='resource']/tei:idno")])
end
ms_contents = 'tei:msContents'
to_field 'cho_description', extract_tei("#{ms_desc}/#{ms_contents}/tei:summary")
to_field 'cho_language', extract_tei("#{ms_desc}/#{ms_contents}/tei:textLang")

ms_item = 'tei:msItem'
to_field 'cho_title', extract_tei("#{ms_desc}/#{ms_contents}/#{ms_item}/tei:title")
to_field 'cho_creator', extract_tei("#{ms_desc}/#{ms_contents}/#{ms_item}/tei:author")

ms_origin = 'tei:history/tei:origin'
to_field 'cho_spatial', extract_tei("#{ms_desc}/#{ms_origin}/tei:p")
to_field 'cho_date', extract_tei("#{ms_desc}/#{ms_origin}/tei:origDate")
to_field 'cho_spatial', extract_tei("#{ms_desc}/#{ms_origin}/tei:origPlace")
to_field 'cho_provenance', extract_tei("#{ms_desc}/tei:history/tei:provenance")

obj_desc = 'tei:physDesc/tei:objectDesc'
to_field 'cho_extent', extract_tei("#{ms_desc}/#{obj_desc}/tei:layoutDesc/tei:layout")

support_desc = 'tei:supportDesc[@material="paper"]'
to_field 'cho_extent', extract_tei("#{ms_desc}/#{obj_desc}/#{support_desc}/tei:extent")

profile_desc = '/*/tei:teiHeader/tei:profileDesc/tei:textClass'
to_field 'cho_subject', extract_tei("#{profile_desc}/tei:keywords[@n='form/genre']/tei:term")
to_field 'cho_subject', extract_tei("#{profile_desc}/tei:keywords[@n='subjects']/tei:term")

# Provider fields [REQUIRED]
to_field 'agg_provider', provider
to_field 'agg_data_provider', generate_data_provider("#{ms_desc}/#{ms_id}")
