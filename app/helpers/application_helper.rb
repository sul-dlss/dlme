# frozen_string_literal: true

module ApplicationHelper
  def link_type_hierarchy(args)
    # we only want the last one because it will be the deepest leaf of the hierarchy
    values = args[:values]&.last&.split(':')
    return unless values

    safe_join(
      values.each_with_index.collect do |value, index|
        facet_value = values[0, index + 1].join(':')
        link_to(value, path_for_facet(args[:field], facet_value))
      end,
      ' › '
    )
  end

  # Generate a display value for multi-calendar date ranges
  def display_date_ranges(values: [], **_args)
    values = Array(values).map do |value|
      gregorian_dates = roll_up_date_range_values(value[:gregorian] || [], :'date.bce')
      hijri_dates = roll_up_date_range_values(value[:hijri] || [], :'date.bh')

      display_date_range(gregorian_dates: gregorian_dates, hijri_dates: hijri_dates)
    end.compact

    safe_join(values, '<br />'.html_safe) if values.any?
  end

  def display_search_context?
    !session[:disable_search_context]
  end

  private

  def display_date_range(gregorian_dates:, hijri_dates:)
    gregorian_dates_str = I18n.t(:date_field_gregorian, dates: gregorian_dates.to_sentence) if gregorian_dates.any?
    hijri_dates_str = I18n.t(:date_field_hijri, dates: hijri_dates.to_sentence) if hijri_dates.any?

    if gregorian_dates.any? && hijri_dates.any?
      I18n.t(:date_field,
             gregorian_dates: gregorian_dates_str,
             hijri_dates: hijri_dates_str)
    else
      gregorian_dates_str || hijri_dates_str
    end
  end

  def roll_up_date_range_values(values, suffix_key = nil)
    values.sort.chunk_while { |i, j| i + 1 == j }.map do |arr|
      if arr.length == 1
        add_suffix_for_negative_dates(arr.first, suffix_key)
      else
        min, max = arr.minmax
        I18n.t(:date_range,
               min: add_suffix_for_negative_dates(min, suffix_key),
               max: add_suffix_for_negative_dates(max, suffix_key))
      end
    end
  end

  def add_suffix_for_negative_dates(year, suffix_key)
    return year unless year.negative?

    I18n.t(suffix_key, year: year.abs)
  end
end
