# frozen_string_literal: true

module ApplicationHelper
  # Displays the hierarchy of types as a list of links to the various type facets
  def link_type_hierarchy(document:, config: nil, **)
    # this should be the same as the kwarg `values`, but for some reason is currently blank
    values = Blacklight::FieldRetriever.new(document, config).fetch

    # we only want the last one because it will be the deepest leaf of the hierarchy
    values = values&.last&.split(':')
    return unless values

    safe_join(
      values.each_with_index.collect do |label, index|
        facet_value = values[0, index + 1].join(':')
        link_to(label, facet_path_for_type(config, facet_value))
      end,
      ' › '
    )
  end

  def facet_path_for_type(config, facet_value)
    facet_field = link_to_config_pattern(config)
    facet_config = facet_configuration_for_field(facet_field)
    facet_item_presenter(facet_config, facet_value, facet_field).href
  end

  # Generate a display value for multi-calendar date ranges
  def display_date_ranges(values: [], **_args)
    values = Array(values).filter_map do |value|
      gregorian_dates = roll_up_date_range_values(value[:gregorian] || [], :'date.bce')
      hijri_dates = roll_up_date_range_values(value[:hijri] || [], :'date.bh')

      display_date_range(gregorian_dates: gregorian_dates, hijri_dates: hijri_dates)
    end

    safe_join(values, '<br />'.html_safe) if values.any?
  end

  def display_result_info_context?
    !session[:disable_result_info_context] && params[:q].present?
  end

  def display_date_sort_context?
    !session[:disable_date_sort_context] &&
      %w[date_old_to_new date_new_to_old].include?(search_state.sort_field&.field)
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

  def ir_for_output(value: [], **)
    JSON.parse(value.first)
  end
end
