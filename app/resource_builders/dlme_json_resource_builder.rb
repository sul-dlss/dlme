# frozen_string_literal: true

# transforms a DLME JSON intermediate representation into solr documents
class DlmeJsonResourceBuilder < Spotlight::SolrDocumentBuilder
  def to_solr
    source = resource.json
    { 'id' => source['id'] }.tap do |sink|
      transform_to_untokenized_solr_fields(source, sink: sink)
    end
  end

  private

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
end
