# frozen_string_literal: true

# Wraps values in paragraph tags
class Collapse < Blacklight::Rendering::AbstractStep
  DEFAULT_LINES = 6

  def render
    return next_step(values) unless config.collapse && html_context?

    next_step(context.safe_join([wrap_values, button], ''))
  end

  private

  def wrap_values
    context.tag.div(values, class: 'line-collapse', data: { behavior: 'line-collapse', 'collapse-at' => lines })
  end

  def button
    context.tag.button(
      (more_text + less_text),
      aria: { hidden: true },
      class: 'btn btn-sm btn-outline-secondary line-collapse-button collapsed mt-1',
      style: 'display: none;',
      data: { behavior: 'line-collapse-button' }
    )
  end

  def more_text
    context.tag.span(
      context.safe_join(
        [
          I18n.t('metadata_collapse.button.more'),
          context.blacklight_icon('angle-down', classes: 'ml-2')
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
          context.blacklight_icon('angle-up', classes: 'ml-2')
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
