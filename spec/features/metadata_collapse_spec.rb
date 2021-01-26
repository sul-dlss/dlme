# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Meatadata Collapse', type: :feature do
  let(:exhibit) { create(:exhibit, published: true) }
  let(:resource) { DlmeJson.new(json: json, metadata: metadata, exhibit: exhibit) }
  let(:fixture_file_path) { File.join(fixture_path, 'json/long-description.json') }
  let(:json) { File.open(fixture_file_path).read }
  let(:metadata) do
    { 'traject_context_command_line.filename' => fixture_file_path,
      'traject_context_source' => 'dlme_json_resource_spec' }
  end

  before do
    ActiveJob::Base.queue_adapter = :inline # block until indexing has committed
    resource.save_and_index
  end

  it 'has a toggle link to show more/less for long fields', js: true do
    # rubocop:disable Metrics/LineLength
    id = 'themaghribpodcast.podbean.com/educational-transitions-in-post-revolutionary-spaces-islam-security-and-social-movements-in-tunisia-361d846242ba817e19c59aeda9439d1f'
    # rubocop:enable Metrics/LineLength

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
