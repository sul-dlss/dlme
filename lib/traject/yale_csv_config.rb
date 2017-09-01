# frozen_string_literal: true

# Yale CSV Mapping Configuration

require_relative 'csv_reader'
require_relative 'dlme_json_resource_writer'
require_relative 'macros/dlme'
require_relative 'macros/csv'
extend Macros::DLME
extend Macros::Csv

settings do
  provide 'writer_class_name', 'DlmeJsonResourceWriter'
  provide 'reader_class_name', 'CsvReader'
end

to_field 'agg_provider', provider

to_field 'id', column('OrbisBibID')
to_field 'cho_id', column('OrbisBibID')

to_field 'cho_provenance', column('Place of origin')
to_field 'cho_creator', column('Creator', split: '|')
to_field 'cho_title', column('Title', split: '|')
to_field 'cho_alternative_title', column('Varient Titles', split: '|')
to_field 'cho_publisher', column('Publisher')
to_field 'edm:dateProvider', column('Date, created')
to_field 'cho_description', column('Physical description')
to_field 'cho_language', column('Language')
to_field 'cho_description', column('Notes')
to_field 'cho_description', column('Abstract')
to_field 'cho_provenance', column('Associated Names')
to_field 'cho_subject', column('Subject, topic', split: '|')
to_field 'cho_edm_type', column('Type of resource')
to_field 'cho_is_part_of', column('Yale Collection')
to_field 'wr_dc_rights', column('Rights')
to_field 'cho_provenance', column('part of, group')
to_field 'agg_is_shown_by', column('Handle')
to_field 'agg_is_shown_at', column('Handle')
