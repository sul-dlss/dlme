# frozen_string_literal: true

# Joins values using configured value or linebreak
class Join < Blacklight::Rendering::AbstractStep
  include ActionView::Helpers::TextHelper

  def render
    next_step(safe_join(values, joiner))
  end

  private

  def joiner
    config.join_with || default_joiner
  end

  def default_joiner
    options[:no_html] ? '; ' : '<br>'.html_safe
  end
end
