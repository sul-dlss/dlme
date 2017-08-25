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
to_field 'id', normalize_prefixed_id('RecordId')

to_field 'cho_contributor', column('Authority', split: '|')
to_field 'cho_description', column('Denomination')
to_field 'agg_data_provider', column('Department')
to_field 'cho_extent', column('Diameter')
to_field 'cho_temporal', column('Dynasty')
to_field 'cho_date', column('Era')
to_field 'cho_coverage', column('Findspot')
to_field 'cho_description', column('Manufacture')
to_field 'cho_medium', column('Material')
to_field 'cho_creator', column('Mint')
to_field 'cho_format', column('Object Type')
to_field 'cho_description', column('Obverse Legend')
to_field 'cho_description', column('Obverse Type')
to_field 'cho_identifier', column('RecordId')
to_field 'cho_source', column('Reference')
to_field 'cho_spatial', column('Region')
to_field 'cho_description', column('Reverse Legend')
to_field 'cho_description', column('Reverse Type')
to_field 'cho_title', column('Title')
to_field 'cho_identifier', column('URI')
to_field 'cho_description', column('Weight')
to_field 'cho_date', normalize_numismatic_date
to_field 'agg_is_shown_at' do |_record, accumulator, context|
  accumulator << transform_values(context,
                                  'wr_id' => [column('URI')])
end
