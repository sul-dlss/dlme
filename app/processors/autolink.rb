# frozen_string_literal: true

# creates html links for fields
class Autolink < Blacklight::Rendering::AbstractStep
  include ActionView::Helpers::TextHelper
  def render
    return next_step(values) unless config.autolink
    next_step(values.map { |x| auto_link(x) })
  end
end
