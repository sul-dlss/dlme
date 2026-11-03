# frozen_string_literal: true

# Shows the media on the Blacklight show page
class EmbedComponent < ViewComponent::Base
  def initialize(presenter:, document: presenter.document, **)
    super()
    @document = document
    @presenter = presenter
  end

  attr_reader :document, :presenter

  delegate :thumbnail, to: :presenter
  delegate :render_document_partial, to: :helpers
end
