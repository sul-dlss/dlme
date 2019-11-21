# frozen_string_literal: true

# Wrap document values in <bdi> so they can calculate their own LTR/RTL-ness
# and not influence other page content
class BidiWrap < Blacklight::Rendering::AbstractStep
  include ActionView::Helpers::TagHelper

  def render
    next_step(values.map { |x| wrap(x) })
  end

  private

  def wrap(val)
    return val if config.no_html

    content_tag :bdi, val, class: 'metadata-value'
  end
end
