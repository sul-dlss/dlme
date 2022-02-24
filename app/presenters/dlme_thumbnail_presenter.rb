# frozen_string_literal: true

##
# Custom DLME Thumbnail Presenter
class DlmeThumbnailPresenter < Blacklight::ThumbnailPresenter
  ##
  # Overridden to inject custom options
  def thumbnail_tag(image_options = {}, url_options = {})
    super(image_options.reverse_merge(class: 'img-thumbnail'), url_options.reverse_merge(skip_pipeline: true))
  end

  private

  ##
  # Overridden to support lazy options
  def thumbnail_value(image_options)
    super image_options.reverse_merge(loading: 'lazy')
  end

  ##
  # Overridden to support http proxy
  def thumbnail_value_from_document
    url = super
    return if url.blank?
    return unless url.match? URI::DEFAULT_PARSER.make_regexp # do not try to resolve invalid URLs

    return view_context.image_proxy_path(url: url) if url.to_s.start_with?('http://')

    url
  end
end
