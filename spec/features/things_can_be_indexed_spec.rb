# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Things can be indexed' do
  let(:exhibit) { create(:exhibit, published: true) }
  let(:curator) { create(:exhibit_curator, exhibit: exhibit) }
  let(:resource) { DlmeJson.new(json: iiif_single_image_fixture.read, metadata: metadata, exhibit: exhibit) }
  let(:iiif_single_image_fixture) { file_fixture('json/iiif-single-image.json') }
  let(:metadata) do
    { 'traject_context_command_line.filename' => iiif_single_image_fixture.to_path,
      'traject_context_source' => 'dlme_json_resource_spec' }
  end

  before do
    perform_enqueued_jobs do
      resource.save_and_index
    end
  end

  context 'with a curator' do
    before do
      login_as curator
    end

    it 'basic search results are available' do
      visit root_path
      click_button 'Search'
      within '#documents' do
        expect(page).to have_css '.document', count: 1
      end
      expect(page).to have_content 'Creator'
      expect(page).to have_content 'Shown At'
      expect(page).to have_content 'Indexed At'
    end
  end

  context 'with an ordinary user' do
    it 'hides some facets' do
      visit root_path
      click_button 'Search'
      expect(page).to have_content 'Creator'
      expect(page).to have_no_content 'Shown At'
      expect(page).to have_no_content 'Indexed At'
    end
  end
end
