# frozen_string_literal: true

# Override range limit provided helpers
module OverrideRangeLimitHelper
  include RangeLimitHelper

  ##
  # Overriden helper to add the BH/H and BCE/CE to labels
  def range_display(solr_field, myparams = params)
    display = super

    # rubocop:disable Rails/OutputSafety
    case solr_field
    # Hijiri date
    when 'cho_date_range_hijri_isim'
      display.gsub(/>(-)(\d+)</, ">\\2 #{I18n.t('date.suffix.bh')}<")
             .gsub(/>(\d+)</, ">\\1 #{I18n.t('date.suffix.h')}<").html_safe
    # Gregorian date
    when 'cho_date_range_norm_isim'
      display.gsub(/>(-)(\d+)</, ">\\2 #{I18n.t('date.suffix.bce')}<")
             .gsub(/>(\d+)</, ">\\1 #{I18n.t('date.suffix.ce')}<").html_safe
    # rubocop:enable Rails/OutputSafety
    else
      display
    end
  end
end
