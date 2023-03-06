# frozen_string_literal: true

module Icons
  # This is the angle up icon for the less text button.
  class LessTextComponent < Blacklight::Icons::IconComponent
    self.svg = <<~SVG
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 320 512">
        <path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z" class=""></path>
      </svg>
    SVG
  end
end
