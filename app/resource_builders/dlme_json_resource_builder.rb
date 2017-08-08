# frozen_string_literal: true

# transforms a DLME JSON intermediate representation into solr documents
class DlmeJsonResourceBuilder < Spotlight::SolrDocumentBuilder
  # We aren't tokenizing cho_title, because it may not be English (see princeton_rj4305881)
  NON_TOKENIZED_DIRECT_COPY_FIELDS = %w[agg_data_provider
                                        __source
                                        agg_edm_rights
                                        agg_provider
                                        cho_alternative
                                        cho_contributor
                                        cho_coverage
                                        cho_creator
                                        cho_date
                                        cho_dc_rights
                                        cho_description
                                        cho_edm_type
                                        cho_extent
                                        cho_format
                                        cho_has_part
                                        cho_has_type
                                        cho_identifier
                                        cho_is_part_of
                                        cho_language
                                        cho_medium
                                        cho_provenance
                                        cho_publisher
                                        cho_relation
                                        cho_same_as
                                        cho_source
                                        cho_spatial
                                        cho_subject
                                        cho_temporal
                                        cho_title
                                        cho_type].freeze
  # TODO: need to destructure:
  # agg_is_shown_at
  # agg_is_shown_by
  # agg_preview

  def to_solr
    source = resource.json
    { 'id' => source['id'] }.tap do |sink|
      NON_TOKENIZED_DIRECT_COPY_FIELDS.each do |key|
        sink["#{key}_ssim"] = source[key] if source[key]
      end
    end
  end
end
