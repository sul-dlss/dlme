# frozen_string_literal: true

# Override range limit provided helpers
module OverrideRangeLimitHelper
  include RangeLimitHelper

  ##
  # Overriden helper to add the BH/H and BCE/CE to labels
  def format_range_display_value(value, solr_field)
    value_int = value.to_i

    case solr_field
    # Hijiri date
    when 'cho_date_range_hijri_isim'
      return t('date.bh', year: value_int * -1) if value_int.negative?
      return t('date.h', year: value_int) if value_int.positive?
    # Gregorian date
    when 'cho_date_range_norm_isim'
      return t('date.bce', year: value_int * -1) if value_int.negative?
      return t('date.ce', year: value_int) if value_int.positive?
    else
      value
    end
  end
end
