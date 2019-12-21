# frozen_string_literal: true

module ApplicationHelper
  def link_type_hierarchy(args)
    # we only want the last one because it will be the deepest leaf of the hierarchy
    values = args[:values]&.last&.split(':')
    return unless values

    safe_join(
      values.each_with_index.collect do |value, index|
        facet_value = values[0, index + 1].join(':')
        link_to(value, path_for_facet(link_to_config_pattern(args[:config]), facet_value))
      end,
      ' › '
    )
  end

  # Generate a display value for multi-calendar date ranges
  def display_date_ranges(values: [], **_args)
    values = Array(values).map do |value|
      gregorian_dates = roll_up_date_range_values(value[:gregorian] || [])
      hijri_dates = roll_up_date_range_values(value[:hijri] || [])

      display_date_range(gregorian_dates: gregorian_dates, hijri_dates: hijri_dates)
    end.compact

    safe_join(values, '<br />'.html_safe) if values.any?
  end

  def display_search_context?
    !session[:disable_search_context]
  end

  private

  def link_to_config_pattern(config)
    format(config.pattern, lang: hierarchy_locale_map[I18n.locale])
  end

  # The hierarchy field is based on a facet so it
  # will only have en and ar-Arab field varations
  def hierarchy_locale_map
    { ar: 'ar-Arab', en: 'en' }
  end

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

  def roll_up_date_range_values(values)
    values.sort.chunk_while { |i, j| i + 1 == j }.map do |arr|
      if arr.length == 1
        arr.first
      else
        min, max = arr.minmax
        I18n.t(:date_range, min: min, max: max)
      end
    end
  end
end
