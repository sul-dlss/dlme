# frozen_string_literal: true

# transforms a DLME JSON intermediate representation into solr documents
class DlmeJsonResourceBuilder < Spotlight::SolrDocumentBuilder
  TOKENIZED_COPY_FIELDS = %w[
    cho_title
    cho_alternative
    cho_description
    cho_contributor
    cho_coverage
    cho_creator
    cho_provenance
    cho_spatial
    cho_temporal
  ].freeze

  # rubocop:disable Metrics/AbcSize
  def to_solr
    source = resource.json
    { :id => source['id'], '__raw_resource_json_ss' => JSON.pretty_generate(source) }.tap do |sink|
      transform_to_untokenized_solr_fields(source, sink: sink)
      transform_to_untokenized_solr_fields(resource.metadata, sink: sink)

      TOKENIZED_COPY_FIELDS.each do |key|
        sink["#{key}_tsim"] = source[key] if source[key]
      end

      sink['sortable_cho_title_ssi'] = Array(sink['cho_title_ssim']).first if sink['cho_title_ssim']
      sink['sortable_cho_creator_ssi'] = Array(sink['cho_creator_ssim']).first if sink['cho_creator_ssim']
    end
  end
  # rubocop:enable Metrics/AbcSize

  private

  # rubocop:disable Metrics/MethodLength
  def transform_to_untokenized_solr_fields(source = {}, sink: {}, prefix: '')
    source.each do |key, value|
      case value
      when Hash
        transform_to_untokenized_solr_fields(value, sink: sink, prefix: "#{key}.")
      when Array
        sink["#{prefix}#{key}_ssim"] = if value.any? { |x| x.is_a? Hash }
                                         value.map(&:to_json)
                                       else
                                         value
                                       end
      else
        sink["#{prefix}#{key}_ssim"] = value
      end
    end

    sink
  end
  # rubocop:enable Metrics/MethodLength
end
