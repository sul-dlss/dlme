# frozen_string_literal: true

require 'rails_helper'

RSpec.describe DocumentMetadataComponent, type: :component do
  subject(:rendered) do
    render_inline(described_class.new(fields: fields))
  end

  let(:view_context) { controller.view_context }
  let(:document) do
    SolrDocument.new({
                       'agg_is_shown_at.wr_id_ssim' => ['http://example.com/resource/'],
                       'agg_is_shown_by.wr_has_service_ssim' => [{
                         'service_id' => 'http://example.com/iiif/resource',
                         'service_conforms_to' => 'http://iiif.io/api/image'
                       }.to_json]
                     })
  end
  let(:holding_institution) { CatalogController.blacklight_config.index_fields['holding_institution'] }
  let(:source_institution) { CatalogController.blacklight_config.index_fields['source_institution'] }
  let(:other) { CatalogController.blacklight_config.index_fields['title'] }
  let(:fields) do
    [
      Blacklight::FieldPresenter.new(view_context, document, holding_institution),
      Blacklight::FieldPresenter.new(view_context, document, source_institution),
      Blacklight::FieldPresenter.new(view_context, document, other)
    ]
  end

  it 'displays the item provider' do
    expect(rendered).to have_selector('.item-provider')
    expect(rendered).to have_link 'View on contributor website'
  end
end
