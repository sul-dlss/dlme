# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Boolean query functionality', type: :feature, js: true do
  let(:exhibit) { create(:exhibit) }
  let(:curator) { create(:exhibit_curator, exhibit: exhibit) }

  def create_resource(exhibit, file_name)
    fixture_file_path = File.join(fixture_path, file_name)
    json = File.read(fixture_file_path)
    metadata = { 'traject_context_command_line.filename' => fixture_file_path,
                 'traject_context_source' => 'dlme_json_resource_spec' }

    DlmeJson.new(json: json, metadata: metadata, exhibit: exhibit)
  end

  before do
    perform_enqueued_jobs do
      create_resource(exhibit, 'json/boolean-01.json').save_and_index
      create_resource(exhibit, 'json/boolean-02.json').save_and_index
      create_resource(exhibit, 'json/boolean-03.json').save_and_index
    end

    login_as curator
  end

  it 'Jupiter OR Saturn query returns both titles' do
    visit spotlight.search_exhibit_catalog_path(
      exhibit,
      q: 'jupiter OR saturn'
    )
    expect(page).to have_css('.document-title-heading bdi', text: /^Jupiter$/)
    expect(page).to have_css('.document-title-heading bdi', text: /^Saturn$/)
  end

  it 'Mars AND Saturn query returns the right title' do
    visit spotlight.search_exhibit_catalog_path(
      exhibit,
      q: 'mars AND saturn'
    )
    expect(page).to have_css('.document-title-heading bdi', text: /^Mars Saturn$/)
    expect(page).not_to have_css('.document-title-heading bdi', text: /^Saturn$/)
  end

  it 'Saturn NOT Mars excludes Mars in titles' do
    visit spotlight.search_exhibit_catalog_path(
      exhibit,
      q: 'saturn NOT mars'
    )
    expect(page).to have_css('.document-title-heading bdi', text: /^Saturn$/)
    expect(page).not_to have_css('.document-title-heading bdi', text: /^Mars Saturn$/)
  end
end
