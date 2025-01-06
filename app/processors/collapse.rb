# frozen_string_literal: true

# Wraps values in paragraph tags
class Collapse < Blacklight::Rendering::AbstractStep
  DEFAULT_LINES = 6

  def render
    return next_step(values) unless config.collapse && html_context?

    next_step(element)
  end

  private

  def element
    context.tag.div(data: { controller: 'line-collapse', line_collapse_collapse_at_value: lines }) do
      context.safe_join([wrap_values, button])
    end
  end

  def wrap_values
    context.tag.div(values, class: 'line-collapse', data: { line_collapse_target: 'container' })
  end

  def button
    context.tag.button(
      (more_text + less_text),
      class: 'btn btn-sm btn-outline-secondary line-collapse-button collapsed mt-1',
      hidden: true,
      data: { line_collapse_target: 'button', action: 'click->line-collapse#toggle' }
    )
  end

  def more_text
    context.tag.span(
      context.safe_join(
        [
          I18n.t('metadata_collapse.button.more'),
          Icons::MoreTextComponent.new(classes: 'ml-2').call
        ], ' '
      ),
      class: 'arrow-down'
    )
  end

  def less_text
    context.tag.span(
      context.safe_join(
        [
          I18n.t('metadata_collapse.button.less'),
          Icons::LessTextComponent.new(classes: 'ml-2').call
        ], ' '
      ),
      class: 'arrow-up'
    )
  end

  def lines
    config.lines || DEFAULT_LINES
  end

  def html_context?
    context&.request&.format&.html?
  end
end
