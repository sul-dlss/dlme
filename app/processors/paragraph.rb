# frozen_string_literal: true

# Wraps values in paragraph tags
class Paragraph < Blacklight::Rendering::AbstractStep
  include ActionView::Helpers::TextHelper

  def render
    return next_step(values) unless config.paragraph && html_context?

    next_step(values.map { |x| content_tag(:p, x) })
  end

  private

  def html_context?
    context&.request&.format&.html?
  end
end
