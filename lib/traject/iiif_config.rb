# frozen_string_literal: true

require_relative 'json_reader'
require_relative 'dlme_json_resource_writer'
require_relative 'macros/dlme'
require_relative 'macros/json'

extend Macros::DLME
extend Macros::JSON

settings do
  provide 'writer_class_name', 'DlmeJsonResourceWriter'
  provide 'reader_class_name', 'JsonReader'
  provide 'allow_empty_fields', true
end

to_field 'id', lambda { |_record, accumulator, context|
  accumulator << context.settings.fetch('identifier')
}
to_field 'cho_title', extract_json('$.label')

# Aggregation Object(s)
to_field 'agg_data_provider', data_provider
to_field 'agg_provider', provider
