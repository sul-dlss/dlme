# frozen_string_literal: true

##
# Custom DLME Thumbnail Presenter
class DlmeThumbnailPresenter < Blacklight::ThumbnailPresenter
  private

  def thumbnail_value_from_document
    url = super
    return view_context.image_proxy_path(url: url, token: view_context.form_authenticity_token) if url.to_s.start_with?('http://')

    url
  end
end
