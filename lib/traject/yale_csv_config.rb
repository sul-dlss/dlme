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

to_field 'agg_provider',     provider
to_field 'id',               normalize_prefixed_id('OrbisBibID')
to_field 'cho_identifier',   column('OrbisBibID', trim: true)
to_field 'cho_provenance',   column('Place of origin', trim: true)
to_field 'cho_creator',      column('Creator', split: '|', trim: true)
to_field 'cho_title',        column('Title', split: '|', trim: true)
to_field 'cho_alternative',  column('Variant Titles', split: '|', trim: true)
to_field 'cho_publisher',    column('Publisher', trim: true)
to_field 'edm:dateProvider', column('Date, created', trim: true)
to_field 'cho_description',  column('Physical description', trim: true)
to_field 'cho_language',     column('Language', trim: true)
to_field 'cho_description',  column('Notes', split: '|', trim: true)
to_field 'cho_description',  column('Abstract', trim: true)
to_field 'cho_provenance',   column('Associated Names', trim: true)
to_field 'cho_subject',      column('Subject, topic', split: '|', trim: true)
to_field 'cho_edm_type',     column('Type of resource', trim: true)
to_field 'cho_is_part_of',   column('Yale Collection', trim: true)
to_field 'wr_dc_rights',     column('Rights', trim: true)
to_field 'cho_provenance',   column('part of, group', trim: true)
to_field 'agg_is_shown_at' do |_record, accumulator, context|
  accumulator << transform_values(
    context,
    'wr_id' => [column('Handle', trim: true)]
  )
end
to_field 'agg_is_shown_by' do |_record, accumulator, context|
  accumulator << transform_values(
    context,
    'wr_id' => [column('Handle', trim: true)]
  )
end
