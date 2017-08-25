# frozen_string_literal: true

# Numismatics CSV Mapping Configuration

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

# MET Museum
to_field 'id', normalize_prefixed_id('emuIRN')

to_field 'cho_provenance', column('accession_credit_line')
to_field 'cho_creator', column('creator')
to_field 'cho_coverage', column('culture', split: '|')
to_field 'agg_data_provider', normalize_penn_egyptian_provider
to_field 'cho_date', column('date_made')
to_field 'cho_date', column('date_made_early')
to_field 'cho_date', column('date_made_late')
to_field 'cho_description', column('description')
to_field 'cho_identifier', column('emuIRN')
to_field 'cho_subject', column('iconography')
to_field 'cho_medium', column('material', split: '|')
to_field 'cho_extent', column('measurement_height')
to_field 'cho_extent', column('measurement_length')
to_field 'cho_extent', column('measurement_outside_diameter')
to_field 'cho_extent', column('measurement_tickness')
to_field 'cho_extent', column('measurement_unit')
to_field 'cho_extent', column('measurement_width')
to_field 'cho_title', column('object_name', split: '|')
to_field 'cho_source', column('object_number')
to_field 'cho_source', column('other_numbers', split: '|')
to_field 'cho_temporal', column('period', split: '|')
to_field 'cho_spatial', column('provenience', split: '|')
to_field 'cho_description', column('technique', split: '|')
to_field 'agg_is_shown_at' do |_record, accumulator, context|
  accumulator << transform_values(context,
                                  'wr_id' => [column('url')])
end
to_field 'agg_is_shown_by' do |_record, accumulator, context|
  accumulator << transform_values(context,
                                  'wr_id' => normalize_penn_egyptian_shown_by)
end
