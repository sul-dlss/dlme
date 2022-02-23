# frozen_string_literal: true

# transforms a DLME JSON intermediate representation into solr documents
class DlmeJsonResourceBuilder
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

  FIELD_SUFFIXES = {
    cho_date_range_hijri: 'isim',
    cho_date_range_norm: 'isim'
  }.with_indifferent_access.freeze

  DEFAULT_FIELD_SUFFIX = 'ssim'

  attr_reader :resource

  def initialize(resource)
    @resource = resource
  end

  # rubocop:disable Metrics/MethodLength
  # rubocop:disable Metrics/AbcSize
  def to_solr
    source = resource.json
    sink = { id: source['id'], '__raw_resource_json_ss' => JSON.pretty_generate(source) }

    transform_to_untokenized_solr_fields(source, sink: sink)
    transform_to_untokenized_solr_fields(resource.metadata, sink: sink)

    TOKENIZED_COPY_FIELDS.each do |key|
      next unless source[key]

      # Handle hashes specially because if a hash slips through to Solr, Solr
      # gets unhappy and will return a 400 error.
      if source[key].is_a?(Hash)
        sink["#{key}_tsim"] = source[key].values.flatten

        source[key].each do |language_code, values|
          sink["#{key}.#{language_code}_tsim"] = values

          value = values.first
          value = apply_natural_sort_munging(value) if key.starts_with?('cho_title')

          sink["sortable_#{key}.#{language_code}_ssi"] = value
        end
      else
        sink["#{key}_tsim"] = source[key]
      end
    end

    sink['cho_date_norm_min_isi'] = Array(sink['cho_date_range_norm_isim']).min
    sink['cho_date_norm_max_isi'] = Array(sink['cho_date_range_norm_isim']).max

    sink['sortable_cho_title_ssi'] = apply_natural_sort_munging(Array(sink['cho_title_ssim']).first) if sink['cho_title_ssim']
    sink['sortable_cho_creator_ssi'] = Array(sink['cho_creator_ssim']).first if sink['cho_creator_ssim']
    if sink['agg_is_shown_at.wr_is_referenced_by_ssim']
      sink['agg_is_shown_at.wr_is_referenced_by_ssi'] = Array(sink['agg_is_shown_at.wr_is_referenced_by_ssim']).first
    end

    sink['cho_title_creator_tsim'] = (Array(sink['cho_title_ssim']) + Array(sink['cho_creator_ssim'])).join("\n")

    sink
  end
  # rubocop:enable Metrics/AbcSize
  # rubocop:enable Metrics/MethodLength

  private

  # rubocop:disable Metrics/MethodLength
  def transform_to_untokenized_solr_fields(source = {}, sink: {}, prefix: '')
    source.each do |key, value|
      solr_field = "#{prefix}#{key}_#{field_suffix_for(key)}"
      case value
      when Hash
        transform_to_untokenized_solr_fields(value, sink: sink, prefix: "#{key}.")
        sink[solr_field] = value.values.flatten
      when Array
        sink[solr_field] = if value.any?(Hash)
                             value.map(&:to_json)
                           else
                             value
                           end
      else
        sink[solr_field] = value
      end
    end

    sink
  end
  # rubocop:enable Metrics/MethodLength

  def field_suffix_for(field_name)
    FIELD_SUFFIXES.fetch(field_name, DEFAULT_FIELD_SUFFIX)
  end

  def apply_natural_sort_munging(string)
    return unless string

    # pad any digits we run into so they'll sort "naturally" (1, 2, ... 8, 9, 10)
    string.gsub(/\d+/) { |digits| digits.rjust(10, '0') }
  end
end
