# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Things can be indexed' do
  let(:exhibit) { create(:exhibit) }
  let(:curator) { create(:exhibit_curator, exhibit: exhibit) }
  let(:resource) { DlmeJson.new(json: json, metadata: metadata, exhibit: exhibit) }
  let(:fixture_file_path) { File.join(fixture_path, 'json/iiif-single-image.json') }
  let(:json) { File.open(fixture_file_path).read }
  let(:metadata) do
    { 'traject_context_command_line.filename' => fixture_file_path,
      'traject_context_source' => 'dlme_json_resource_spec' }
  end

  before do
    ActiveJob::Base.queue_adapter = :inline # block until indexing has committed

    resource.save_and_index
    login_as curator
  end

  it 'basic search results are available' do
    visit root_path
    click_button 'Search'
    within '#documents' do
      expect(page).to have_css '.document', count: 1
    end
  end
end
