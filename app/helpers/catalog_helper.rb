# frozen_string_literal: true

# Overrides of methods provided by Blacklight.
module CatalogHelper
  include Blacklight::CatalogHelperBehavior

  # Overriding Blacklight so that everything has a thumbnail
  # rubocop:disable Naming/PredicateName
  def has_thumbnail?(_document)
    true
  end
  # rubocop:enable Naming/PredicateName

  # @note thumbnail handling moves to a presenter in Blacklight 7.
  # overriding to provide a default thumbnail if none exists
  #
  # @param [SolrDocument] document
  # @param [Hash] image_options to pass to the image tag
  # @param [Hash] url_options to pass to #link_to_document
  # @return [String]
  def render_thumbnail_tag(document, image_options = {}, url_options = {})
    value = super
    return value if value
    image = image_tag 'default.png', image_options
    return image if url_options == false || url_options[:suppress_link]
    link_to_document document, image, url_options
  end
end
