# frozen_string_literal: true

require_relative 'csv_reader'
require_relative 'dlme_json_resource_writer'
require_relative 'macros/csv'
require_relative 'macros/dlme'

extend Macros::DLME
extend Macros::Csv
settings do
  provide 'writer_class_name', 'DlmeJsonResourceWriter'
  provide 'reader_class_name', 'CsvReader'
  provide 'allow_empty_fields', true
end

# MET Museum
to_field 'id', column('Object ID')
to_field 'cho_title', column('Object Name')

# Aggregation Object(s)
to_field 'agg_data_provider', data_provider
to_field 'agg_provider', provider
