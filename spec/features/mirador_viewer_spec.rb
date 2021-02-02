# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Mirador viewer', type: :feature do
  let(:exhibit) { create(:exhibit, published: true) }
  let(:curator) { create(:exhibit_curator, exhibit: exhibit) }
  let(:resource) { DlmeJson.new(json: json, metadata: metadata, exhibit: exhibit) }
  let(:fixture_file_path) { File.join(fixture_path, 'json/bodleian.json') }
  let(:json) { File.open(fixture_file_path).read }
  let(:metadata) do
    { 'traject_context_command_line.filename' => fixture_file_path,
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
end
