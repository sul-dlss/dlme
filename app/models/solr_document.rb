# frozen_string_literal: true

# Represents a single document returned from Solr
class SolrDocument
  include Blacklight::Solr::Document
  include Blacklight::Gallery::OpenseadragonSolrDocument
  include Spotlight::SolrDocument
  include Spotlight::SolrDocument::AtomicUpdates

  def initialize(*args)
    super
    will_export_as(:ir)
    will_export_as(:ndjson)
  end

  def export_as_ir
    fetch('__raw_resource_json_ss', '')
  end

  # Reparse the IR and reformat it to a single line
  def export_as_ndjson
    JSON.fast_generate(JSON.parse(export_as_ir))
  end

  # overriding the upstream method with our own that knows
  # how to unpack the agg_is_shown_by > wr_has_service field
  def to_openseadragon(_view_config = nil)
    iiif_services = shown_by_service(conforms_to: 'http://iiif.io/api/image')

    return unless iiif_services.any?

    "#{iiif_services.first['service_id']}/info.json"
  end

  def embeddable?(blacklight_config = CatalogController.blacklight_config)
    url = first(blacklight_config.show.oembed_field)

    return if url.blank?

    OEmbed::Providers.get(url)
  rescue OEmbed::NotFound
    false
  end

  def iiifable?
    iiif_manifest_url.present? && iiif_manifest_url.starts_with?('https://')
  end

  def iiif_manifest_url
    first(Spotlight::Engine.config.iiif_manifest_field)
  end

  def openseadragonable?(blacklight_config = CatalogController.blacklight_config)
    to_openseadragon(blacklight_config.view_config(:show)).present?
  end

  def intermediate_representation
    JSON.parse(fetch('__raw_resource_json_ss', '{}'))
  end

  private

  def shown_by_service(conforms_to:)
    services.select { |service| service['service_conforms_to'] == conforms_to }
  end

  def services
    Array(self['agg_is_shown_by.wr_has_service_ssim']).map do |service|
      if service.is_a? String
        JSON.parse(service)
      else
        service
      end
    end
  end
end
