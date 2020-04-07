# frozen_string_literal: true

# creates html links for fields
class Autolink < Blacklight::Rendering::AbstractStep
  include ActionView::Helpers::TextHelper
  include ActionView::Helpers::UrlHelper # for mail_to

  def render
    return next_step(values) unless config.autolink && html_context?

    next_step(values.map { |x| auto_link(x) })
  end

  private

  def html_context?
    context.try(:request)&.format&.html?
  end
end
