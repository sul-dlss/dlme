# frozen_string_literal: true

require_relative 'xml_reader'
require_relative 'dlme_json_resource_writer'
require_relative 'macros/dlme'
require_relative 'macros/fgdc'
require_relative 'macros/xml'

extend Macros::DLME
extend Macros::Xml
extend Macros::FGDC

settings do
  provide 'writer_class_name', 'DlmeJsonResourceWriter'
  provide 'reader_class_name', 'XmlReader'
end

# Record Identifier
to_field 'id', generate_fgdc_id

# CHO Required
to_field 'cho_identifier', generate_fgdc_id
to_field 'cho_title', extract_fgdc('/*/idinfo/citation/citeinfo/title')
to_field 'cho_title', extract_fgdc('/*/idinfo/citation/citeinfo/edition')

# Other CHO
to_field 'cho_coverage', extract_fgdc('/*/dataqual/lineage/srcinfo/srctime/timeinfo/rngdates/begdate')
to_field 'cho_coverage', extract_fgdc('/*/dataqual/lineage/srcinfo/srctime/timeinfo/rngdates/enddate')
to_field 'cho_coverage', extract_fgdc('/*/dataqual/lineage/srcinfo/srctime/timeinfo/sngdate/caldate')
# to_field 'cho_date', extract_fgdc('/*/dataqual/lineage/srcinfo/srccite/citeinfo/pubdate')
to_field 'cho_date', extract_fgdc('/*/idinfo/citation/citeinfo/pubdate')
# to_field 'cho_dc_rights', extract_fgdc('/*/idinfo/accconst')
to_field 'cho_dc_rights', extract_fgdc('/*/idinfo/useconst')
to_field 'cho_description', extract_fgdc('/*/idinfo/descript/abstract')
to_field 'cho_description', extract_fgdc('/*/idinfo/descript/purpose')
to_field 'cho_description', extract_fgdc('/*/idinfo/status/update')
to_field 'cho_edm_type', normalize_type
to_field 'cho_extent', extract_fgdc('/*/idinfo/crossref/citeinfo/othercit')
to_field 'cho_format', extract_fgdc('/*/distinfo/stdorder/digform/digtinfo/formname')
to_field 'cho_format', extract_fgdc('/*/spdoinfo/direct')
to_field 'cho_format', extract_fgdc('/*/spdoinfo/ptvctinf/sdtsterm/sdtstype')
to_field 'cho_format', extract_fgdc('/*/spdoinfo/rastinfo/rasttype')
to_field 'cho_has_type', extract_fgdc('/*/idinfo/citation/citeinfo/geoform')
to_field 'cho_has_type', extract_fgdc('/*/idinfo/crossref/citeinfo/geoform')
to_field 'cho_is_part_of', extract_fgdc('*/dataqual/lineage/srcinfo/srccite/citeinfo/lworkcit/citeinfo/serinfo/sername')
to_field 'cho_is_part_of', extract_fgdc('*/dataqual/lineage/srcinfo/srccite/citeinfo/lworkcit/citeinfo/title')
to_field 'cho_is_part_of', extract_fgdc('*/idinfo/citation/citeinfo/serinfo/sername')
to_field 'cho_provenance', extract_fgdc('/*/dataqual/lineage/procstep/proccont/cntinfo/cntorgp/cntorg')
to_field 'cho_provenance', extract_fgdc('/*/idinfo/citation/citeinfo/origin')
to_field 'cho_provenance', extract_fgdc('/*/idinfo/crossref/citeinfo/origin')
to_field 'cho_provenance', extract_fgdc('/*/idinfo/native')
to_field 'cho_publisher', extract_fgdc('/*/idinfo/citation/citeinfo/pubinfo/publish')
to_field 'cho_publisher', extract_fgdc('/*/idinfo/crossref/citeinfo/pubinfo/publish')
to_field 'cho_publisher', extract_fgdc('/*/distinfo/distrib/cntinfo/cntorgp/cntorg')
to_field 'cho_publisher', extract_fgdc('/*/distinfo/distrib/cntinfo/cntpos')
to_field 'cho_source', extract_fgdc('/*/dataqual/lineage/procstep/srcprod')
to_field 'cho_source', extract_fgdc('/*/dataqual/lineage/procstep/srcused')
to_field 'cho_source', extract_fgdc('/*/dataqual/lineage/srcinfo/srccite/citeinfo/origin')
to_field 'cho_source', extract_fgdc('/*/dataqual/lineage/srcinfo/srccite/citeinfo/pubinfo/publish')
to_field 'cho_source', extract_fgdc('/*/dataqual/lineage/srcinfo/srccite/citeinfo/serinfo/issue')
to_field 'cho_source', extract_fgdc('/*/dataqual/lineage/srcinfo/srccite/citeinfo/serinfo/sername')
to_field 'cho_source', extract_fgdc('/*/dataqual/lineage/srcinfo/srccite/citeinfo/title')
to_field 'cho_spatial', extract_fgdc('/*/idinfo/keywords/place/placekey')
to_field 'cho_spatial', extract_fgdc('/*/idinfo/spdom/bounding/eastbc')
to_field 'cho_spatial', extract_fgdc('/*/idinfo/spdom/bounding/northbc')
to_field 'cho_spatial', extract_fgdc('/*/idinfo/spdom/bounding/southbc')
to_field 'cho_spatial', extract_fgdc('/*/idinfo/spdom/bounding/westbc')
to_field 'cho_type', extract_fgdc('/*/dataqual/lineage/srcinfo/srccite/citeinfo/geoform')

# Aggregation Object(s)

# Using settings for agg_provider and agg_data_provider for the time being.
to_field 'agg_provider', provider
to_field 'agg_data_provider', data_provider

to_field 'agg_has_view' do |record, accumulator, context|
  accumulator << transform_values(context,
                                  'wr_id' => literal(record.xpath('/*/idinfo/citation/citeinfo/onlink', NS).map(&:text).first),
                                  'wr_rights' => extract_fgdc('/*/idinfo/useconst'))
end

# Not using agg_is_shown_at
# Not using agg_is_shown_by
# Not using agg_preview

# Service Objects
# No known services from Harvard FGDC.
