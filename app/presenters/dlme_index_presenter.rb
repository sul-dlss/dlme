# frozen_string_literal: true

##
# Custom DLME Index Presenter
class DlmeIndexPresenter < Blacklight::IndexPresenter
  self.thumbnail_presenter = DlmeThumbnailPresenter
end
