# frozen_string_literal: true

# Responsible for describing the JSON schema for the intermediate representation.
# rubocop:disable Metrics/BlockLength

# See https://github.com/sul-dlss/dlme/blob/master/docs/application_profile.md#svcsservice
ServicesSchema = Dry::Validation.Schema do
  # See https://github.com/sul-dlss/dlme/blob/master/docs/application_profile.md#svcsservice
  required('service_id').filled(:str?)
  required('service_conforms_to') { array? { each(:str?) } }
  optional('service_implements').filled(:str?)
end

# See https://github.com/sul-dlss/dlme/blob/master/docs/application_profile.md#edmwebresource
EDMWebResourceSchema = Dry::Validation.Schema do
  required('wr_id').filled(:str?)
  optional('wr_format') { array? { each(:str?) } }
  optional('wr_has_service').each do
    schema(ServicesSchema)
  end
end

DlmeJsonSchema = Dry::Validation.Schema do
  # See https://github.com/sul-dlss/dlme/blob/master/docs/application_profile.md#edmprovidedcho
  optional('cho_alternative') { array? { each(:str?) } }
  optional('cho_contributor') { array? { each(:str?) } }
  optional('cho_coverage') { array? { each(:str?) } }
  optional('cho_creator') { array? { each(:str?) } }
  optional('cho_date') { array? { each(:str?) } }
  optional('cho_dc_rights') { array? { each(:str?) } }
  optional('cho_description') { array? { each(:str?) } }
  optional('cho_edm_type') { array? { each(:str?) } }
  optional('cho_extent') { array? { each(:str?) } }
  optional('cho_format') { array? { each(:str?) } }
  optional('cho_has_part') { array? { each(:str?) } }
  optional('cho_has_type') { array? { each(:str?) } }
  optional('cho_identifier') { array? { each(:str?) } }
  optional('cho_is_part_of') { array? { each(:str?) } }
  optional('cho_language') { array? { each(:str?) } }
  optional('cho_medium') { array? { each(:str?) } }
  optional('cho_provenance') { array? { each(:str?) } }
  optional('cho_publisher') { array? { each(:str?) } }
  optional('cho_relation') { array? { each(:str?) } }
  optional('cho_same_as') { array? { each(:str?) } }
  optional('cho_source') { array? { each(:str?) } }
  optional('cho_spatial') { array? { each(:str?) } }
  optional('cho_subject') { array? { each(:str?) } }
  optional('cho_temporal') { array? { each(:str?) } }
  required('cho_title') { array? { each(:str?) } }
  optional('cho_type') { array? { each(:str?) } }

  # See https://github.com/sul-dlss/dlme/blob/master/docs/application_profile.md#oreaggregation
  required('id').filled(:str?)
  optional('__source').filled(:str?)
  # Since the IR is a flattened projection of the MAP, 'agg_aggregated_cho' is not used.
  required('agg_data_provider').filled(:str?)
  optional('agg_dc_rights') { array? { each(:str?) } }
  optional('agg_edm_rights') { array? { each(:str?) } } # At least one is required

  optional('agg_has_view').each do # 0 to n
    schema(EDMWebResourceSchema)
  end

  optional('agg_is_shown_at').schema(EDMWebResourceSchema) # 0 or 1
  optional('agg_is_shown_by').schema(EDMWebResourceSchema) # 0 or 1
  optional('agg_preview').schema(EDMWebResourceSchema) # 0 or 1

  required('agg_provider').filled(:str?)
  optional('agg_same_as') { array? { each(:str?) } } # reference
end
# rubocop:enable Metrics/BlockLength
