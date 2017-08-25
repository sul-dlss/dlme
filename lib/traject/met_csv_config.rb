# frozen_string_literal: true

require_relative 'csv_reader'
require_relative 'dlme_json_resource_writer'
require_relative 'macros/dlme'
require_relative 'macros/met_csv'
require_relative 'macros/csv'
extend Macros::DLME
extend Macros::Csv
extend Macros::MetCsv

settings do
  provide 'writer_class_name', 'DlmeJsonResourceWriter'
  provide 'reader_class_name', 'CsvReader'
end

to_field 'agg_provider', provider

# MET Museum
to_field 'id', normalize_prefixed_id('Object ID')
to_field 'cho_format', column('Object Name')
to_field 'cho_creator', generate_creator
to_field 'cho_spatial', column('City')
to_field 'cho_has_type', column('Classification')
to_field 'cho_spatial', column('Country')
to_field 'cho_spatial', column('County')
to_field 'cho_provenance', column('Credit Line')
to_field 'cho_coverage', column('Culture')
to_field 'cho_extent', column('Dimensions')
to_field 'cho_coverage', column('Dynasty')
to_field 'cho_coverage', column('Excavation')
to_field 'cho_dc_rights', public_domain
to_field 'agg_is_shown_at' do |_record, accumulator, context|
  accumulator << transform_values(context,
                                  'wr_id' => [column('Link Resource')])
end

to_field 'agg_preview', met_thumbnail

to_field 'cho_spatial', column('Locale')
to_field 'cho_spatial', column('Locus')
to_field 'cho_medium', column('Medium')
to_field 'cho_date', generate_object_date
to_field 'cho_date', column('Object Date')
to_field 'cho_identifier', column('Object Number')
to_field 'cho_source', column('Object Number')
to_field 'cho_temporal', column('Period')
to_field 'cho_spatial', column('Region')
to_field 'cho_temporal', column('Reign')
to_field 'agg_data_provider', data_provider
to_field 'cho_dc_rights', column('Rights and Reproduction')
to_field 'cho_spatial', column('River')
to_field 'cho_spatial', column('Subregion')
to_field 'cho_title', column('Title')
to_field 'cho_edm_type', edm_type
to_field 'cho_type', literal('Image')
