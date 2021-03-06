# frozen_string_literal: true

##
# Custom DLME Thumbnail Presenter
class DlmeThumbnailPresenter < Blacklight::ThumbnailPresenter
  ##
  # Overridden to support lazy options
  def thumbnail_tag(image_options = {}, url_options = {})
    injected_options = {
      loading: 'lazy'
    }

    injected_options[:class] = 'img-thumbnail' unless view_context.controller.action_name == 'show'
    super(image_options.merge(injected_options), url_options)
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
