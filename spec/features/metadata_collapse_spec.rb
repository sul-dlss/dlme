# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Metadata Collapse' do
  let(:exhibit) { create(:exhibit, published: true) }
  let(:resource) { DlmeJson.new(json: json, metadata: metadata, exhibit: exhibit) }
  let(:fixture_file_path) { File.join(fixture_path, 'json/long-description.json') }
  let(:json) { File.read(fixture_file_path) }
  let(:metadata) do
    { 'traject_context_command_line.filename' => fixture_file_path,
      'traject_context_source' => 'dlme_json_resource_spec' }
  end

  before do
    perform_enqueued_jobs do
      resource.save_and_index
    end
  end

  it 'has a toggle link to show more/less for long fields', js: true do
    # rubocop:disable Layout/LineLength
    id = 'themaghribpodcast.podbean.com/educational-transitions-in-post-revolutionary-spaces-islam-security-and-social-movements-in-tunisia-361d846242ba817e19c59aeda9439d1f'
    # rubocop:enable Layout/LineLength

    title = 'Posted by Hayet Lansari, Librarian, Outreach Coordinator, Content Curator (CEMA).'

    visit spotlight.exhibit_solr_document_path(exhibit_id: exhibit.slug, id: id)

    within 'dd.blacklight-description' do
      expect(page).to have_css('p', text: title, visible: :hidden)

      click_button 'more'
      expect(page).to have_css('p', text: title, visible: :visible)

      click_button 'less'
      expect(page).to have_css('p', text: title, visible: :hidden)
    end
  end
end
