# frozen_string_literal: true

##
# Custom DLME Thumbnail Presenter
class DlmeThumbnailPresenter < Blacklight::ThumbnailPresenter
  ##
  # Overridden to support lazy options
  def thumbnail_tag(image_options = {}, url_options = {})
    super(image_options.merge(loading: 'lazy', class: 'img-thumbnail'), url_options)
  end

  private

  ##
  # Overridden to support http proxy
  def thumbnail_value_from_document
    url = super
    return view_context.image_proxy_path(url: url) if url.to_s.start_with?('http://')

    url
  end
end
