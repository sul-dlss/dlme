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
end
