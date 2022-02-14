# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Facet titles', type: :feature do
  let(:exhibit) { create(:exhibit) }
  let(:curator) { create(:exhibit_curator, exhibit: exhibit) }
  let(:resource) { DlmeJson.new(json: json, metadata: metadata, exhibit: exhibit) }
  let(:fixture_file_path) { File.join(fixture_path, 'json/iiif-single-image.json') }
  let(:json) { File.read(fixture_file_path) }
  let(:metadata) do
    { 'traject_context_command_line.filename' => fixture_file_path,
      'traject_context_source' => 'dlme_json_resource_spec' }
  end

  before do
    perform_enqueued_jobs do
      resource.save_and_index
    end
    login_as curator
  end

  it 'homepage title' do
    visit root_path
    expect(page).to have_css 'h2', text: 'Find items by ...'
  end

  it 'search results title' do
    visit spotlight.search_exhibit_catalog_path(exhibit, q: '*')
    expect(page).to have_css 'h2', text: 'Refine your results'
  end
end
