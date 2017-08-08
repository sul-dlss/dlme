# frozen_string_literal: true

require_relative 'mods_reader'
require_relative 'dlme_json_resource_writer'
require_relative 'macros/mods'
Traject::Indexer.include Macros::Mods

settings do
  provide 'writer_class_name', 'DlmeJsonResourceWriter'
  provide 'reader_class_name', 'ModsReader'
  provide 'allow_empty_fields', true
end

to_field 'id', lambda { |_record, accumulator, context|
  accumulator << context.settings.fetch('identifier')
}
to_field 'cho_title', extract_mods('/*/mods:titleInfo[not(@type)]/mods:title')
to_field 'cho_alternative', extract_mods('/*/mods:titleInfo[@type]/mods:title')
to_field 'cho_description', extract_mods('/*/mods:abstract')
to_field 'cho_date', extract_mods('/*/mods:originInfo/mods:dateCreated')
to_field 'cho_dc_rights', extract_mods('/*/mods:accessCondition[@type="useAndReproduction"]')
to_field 'cho_creator', extract_name(role: 'author')
to_field 'cho_contributor', extract_name(exclude: 'author')
