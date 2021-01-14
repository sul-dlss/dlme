# frozen_string_literal: true

##
# Custom DLME Show Presenter
class DlmeShowPresenter < Blacklight::ShowPresenter
  self.thumbnail_presenter = DlmeThumbnailPresenter
end
