# frozen_string_literal: true

# Joins values using configured value or linebreak
class Join < Blacklight::Rendering::AbstractStep
  include ActionView::Helpers::TextHelper

  def render
    # rubocop:disable Rails/OutputSafety
    joiner = config.join_with || '<br>'.html_safe
    # rubocop:enable Rails/OutputSafety
    next_step(safe_join(values, joiner))
  end
end
