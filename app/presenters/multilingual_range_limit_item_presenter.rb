# frozen_string_literal: true

# The view-model for one item in the range limit facet
class MultilingualRangeLimitItemPresenter < BlacklightRangeLimit::FacetItemPresenter
  def format_range_display_value(value)
    value_int = value.to_i

    case key
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

  delegate :t, to: :I18n
end
