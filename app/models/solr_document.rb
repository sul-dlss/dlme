# frozen_string_literal: true

class SolrDocument
  include Blacklight::Solr::Document
  include Blacklight::Gallery::OpenseadragonSolrDocument

  include Spotlight::SolrDocument

  include Spotlight::SolrDocument::AtomicUpdates

  # self.unique_key = 'id'

  # Email uses the semantic field mappings below to generate the body of an email.
  SolrDocument.use_extension(Blacklight::Document::Email)

  # SMS uses the semantic field mappings below to generate the body of an SMS email.
  SolrDocument.use_extension(Blacklight::Document::Sms)

  # DublinCore uses the semantic field mappings below to assemble an OAI-compliant Dublin Core document
  # Semantic mappings of solr stored fields. Fields may be multi or
  # single valued. See Blacklight::Document::SemanticFields#field_semantics
  # and Blacklight::Document::SemanticFields#to_semantic_values
  # Recommendation: Use field names from Dublin Core
  use_extension(Blacklight::Document::DublinCore)

  def initialize(*args)
    super
    will_export_as(:ir)
  end

  def export_as_ir
    fetch('__raw_resource_json_ss', '')
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

  def openseadragonable?(blacklight_config = CatalogController.blacklight_config)
    to_openseadragon(blacklight_config.view_config(:show)).present?
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
