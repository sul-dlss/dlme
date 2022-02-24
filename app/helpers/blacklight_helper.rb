# frozen_string_literal: true

# Override Blacklight-provided helpers
module BlacklightHelper
  include Blacklight::BlacklightHelperBehavior
  include Blacklight::RenderPartialsHelperBehavior

  # Override Blacklight's html_tag_attributes helper
  # to set the correct HTML dir attribute for Arabic
  def html_tag_attributes
    attr = super
    attr[:dir] = 'rtl' if I18n.locale == :ar

    attr
  end

  # Overidden from Blacklight to provide contextual information
  def render_document_index(documents = nil, locals = {})
    safe_join(
      [
        *(render('shared/contextual_date_sort_info') if display_date_sort_context?),
        *(render('shared/contextual_result_info') if display_search_context?),
        super(documents, locals)
      ]
    )
  end
end
