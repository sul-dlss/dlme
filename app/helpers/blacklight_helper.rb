# frozen_string_literal: true

# Override Blacklight-provided helpers
module BlacklightHelper
  include Blacklight::BlacklightHelperBehavior

  # Override Blacklight's html_tag_attributes helper
  # to set the correct HTML dir attribute for Arabic
  def html_tag_attributes
    attr = super
    attr[:dir] = 'rtl' if I18n.locale == :ar

    attr
  end
end
