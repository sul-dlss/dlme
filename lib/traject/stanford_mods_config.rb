# frozen_string_literal: true

load_config_file((Rails.root + 'lib/traject/mods_config.rb').to_s)

# Not using agg_has_view since we have the above
to_field 'agg_is_shown_at' do |record, accumulator, context|
  druid = generate_druid(record, context)

  accumulator << transform_values(context, 'wr_id' => literal(generate_sul_shown_at(record, druid)))
end

to_field 'agg_is_shown_by' do |record, accumulator, context|
  druid = generate_druid(record, context)
  manifest = "https://purl.stanford.edu/#{druid}/iiif/manifest"
  iiif_json = grab_iiif_manifest(manifest)

  if iiif_json.present?
    accumulator << transform_values(context,
                                    'wr_description' => [
                                      extract_mods('/*/mods:physicalDescription/mods:digitalOrigin'),
                                      extract_mods('/*/mods:physicalDescription/mods:reformattingQuality')
                                    ],
                                    'wr_format' => extract_mods('/*/mods:physicalDescription/mods:internetMediaType'),
                                    'wr_has_service' => iiif_sequences_service(iiif_json),
                                    'wr_id' => literal(iiif_sequence_id(iiif_json)),
                                    'wr_is_referenced_by' => literal(manifest))
  end
end

to_field 'agg_preview' do |record, accumulator, context|
  druid = generate_druid(record, context)
  manifest = "https://purl.stanford.edu/#{druid}/iiif/manifest"
  iiif_json = grab_iiif_manifest(manifest)

  if iiif_json.present?
    accumulator << transform_values(context,
                                    'wr_format' =>  extract_mods('/*/mods:physicalDescription/mods:internetMediaType'),
                                    'wr_has_service' => iiif_thumbnail_service(iiif_json),
                                    'wr_id' => literal(iiif_thumbnail_id(iiif_json)),
                                    'wr_is_referenced_by' => literal(manifest))
  end
end

# Service Objects
def iiif_thumbnail_service(iiif_json)
  lambda { |_record, accumulator, context|
    accumulator << transform_values(context,
                                    'service_id' => literal(iiif_thumbnail_service_id(iiif_json)),
                                    'service_conforms_to' => literal(iiif_thumbnail_service_conforms_to(iiif_json)),
                                    'service_implements' => literal(iiif_thumbnail_service_protocol(iiif_json)))
  }
end

# Service Objects
def iiif_sequences_service(iiif_json)
  lambda { |_record, accumulator, context|
    accumulator << transform_values(context,
                                    'service_id' => literal(iiif_sequence_service_id(iiif_json)),
                                    'service_conforms_to' => literal(iiif_sequence_service_conforms_to(iiif_json)),
                                    'service_implements' => literal(iiif_sequence_service_protocol(iiif_json)))
  }
end

# STANFORD Specific
to_field 'cho_has_type', extract_mods('/*/mods:extension/rdf:RDF/rdf:Description/dc:format')
to_field 'cho_type', extract_mods('/*/mods:extension/rdf:RDF/rdf:Description/dc:type')
