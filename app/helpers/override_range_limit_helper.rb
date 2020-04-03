# frozen_string_literal: true

# Override range limit provided helpers
module OverrideRangeLimitHelper
  include RangeLimitHelper

  ##
  # Overriden helper to add the BH/H and BCE/CE to labels
  def range_display(solr_field, myparams = params)
    display = super

    # rubocop:disable Rails/OutputSafety
    # Hijiri date
    return display.gsub(/>(-)(\d+)</, '>\2 BH<').gsub(/>(\d+)</, '>\1 H<').html_safe if solr_field == 'cho_date_range_hijri_isim'

    # Gregorian date
    return display.gsub(/>(-)(\d+)</, '>\2 BCE<').gsub(/>(\d+)</, '>\1 CE<').html_safe if solr_field == 'cho_date_range_norm_isim'

    # rubocop:enable Rails/OutputSafety

    display
  end
end
