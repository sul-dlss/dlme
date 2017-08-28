# frozen_string_literal: true

require 'traject/macros/marc21_semantics'
require 'traject/macros/marc_format_classifier'
require_relative 'macros/dlme'

extend Macros::DLME
extend  Traject::Macros::Marc21Semantics
extend Traject::Macros::MarcFormats

settings do
  provide 'writer_class_name', 'DlmeJsonResourceWriter'
  provide 'reader_class_name', 'MarcReader'
end

to_field 'id', extract_marc('001', first: true)

# CHO Required
to_field 'cho_identifier', extract_marc('001')
to_field 'cho_identifier', extract_marc('010a')
to_field 'cho_identifier', oclcnum
to_field 'cho_language', marc_languages
to_field 'cho_title', extract_marc('245ak')
to_field 'cho_title', extract_marc('245')

# CHO Other
to_field 'cho_abstract', extract_marc('500')
to_field 'cho_alternative', extract_marc('130:240:246')
to_field 'cho_contributor', extract_marc('700')
to_field 'cho_coverage', extract_marc('300b')
to_field 'cho_creator', extract_marc('100abcdq:110abcdgnu:111acdenqu:700abcdq:710abcdgnu:711acdenqu', trim_punctuation: true)
to_field 'cho_date', marc_publication_date
# to_field 'cho_dc_rights', ?
to_field 'cho_description', extract_marc('500:505:520')
to_field 'cho_edm_type', marc_formats
to_field 'cho_extent', extract_marc('300a', separator: nil, trim_punctuation: true)
to_field 'cho_format', marc_formats
# to_field 'cho_has_part', ?
# to_field 'cho_has_type', ?
to_field 'cho_is_part_of', extract_marc('440a:490a:800abcdt:400abcd:810abcdt:410abcd:811acdeft:411acdef:830adfgklmnoprst:760ast')
# to_field 'cho_medium', ?
# fo_field 'cho_provenance', ?
to_field 'cho_publisher', extract_marc('260b:264b')
# to_field 'cho_relation'
# to_field 'cho_source'
to_field 'cho_spatial', marc_geo_facet
to_field 'cho_subject', extract_marc('600:610:611:630:650:651avxyz:653aa:654abcvyz:655abcvxyz:690abcdxyz:691abxyz:692abxyz')
to_field 'cho_temporal', marc_era_facet
to_field 'cho_type', marc_formats

# Agg Required
to_field 'agg_has_view' do |record, accumulator, context|
  accumulator << transform_values(context, 'wr_id' => extract_marc('856u', first: true))
end
