# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Mirador viewer' do
  let(:exhibit) { create(:exhibit, published: true) }
  let(:curator) { create(:exhibit_curator, exhibit: exhibit) }
  let(:resource) { DlmeJson.new(json: bodleian_fixture.read, metadata: metadata, exhibit: exhibit) }
  let(:bodleian_fixture) { file_fixture('json/bodleian.json') }
  let(:metadata) do
    { 'traject_context_command_line.filename' => bodleian_fixture.to_path,
      'traject_context_source' => 'dlme_json_resource_spec' }
  end

  before do
    perform_enqueued_jobs do
      resource.save_and_index
    end
  end

  it 'renders a Mirador viewer for IIIF items', js: true do
    visit spotlight.exhibit_solr_document_path(exhibit_id: exhibit.slug, id: '36ebabd9-4d62-4d8e-8e7b-1afd048e872e')
    expect(page).to have_css('#m3')
    expect(page).to have_css('.mirador-viewer')
  end

  it 'enables Mirador Image Tools plugin', js: true do
    visit spotlight.exhibit_solr_document_path(exhibit_id: exhibit.slug, id: '36ebabd9-4d62-4d8e-8e7b-1afd048e872e')
    expect(page).to have_css('div[class*=MiradorImageTools]')
  end
end
