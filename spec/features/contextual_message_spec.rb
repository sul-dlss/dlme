# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Contextual message on search results', type: :feature do
  let(:exhibit) { create(:exhibit, published: true) }
  let(:resource) { DlmeJson.new(json: json, metadata: metadata, exhibit: exhibit) }
  let(:fixture_file_path) { File.join(fixture_path, 'json/bodleian.json') }
  let(:json) { File.open(fixture_file_path).read }
  let(:metadata) do
    { 'traject_context_command_line.filename' => fixture_file_path,
      'traject_context_source' => 'dlme_json_resource_spec' }
  end

  before do
    ActiveJob::Base.queue_adapter = :inline # block until indexing has committed
    resource.save_and_index
    visit root_path
    click_button 'Search'
  end

  it 'renders info alert, that is dismissable', js: true do
    within '#content' do
      expect(page).to have_css '.alert.alert-info', text: 'You might see more results for your query'
      click_button 'Dismiss'
      expect(page).not_to have_css '.alert.alert-info'
    end
    click_button 'Search'
    within '#content' do
      expect(page).to have_css '.alert.alert-info', text: 'You might see more results for your query'
    end
  end

  it 'renders info alert, that is not shown again in the session', js: true do
    within '#content' do
      expect(page).to have_css '.alert.alert-info', text: 'You might see more results for your query'
      click_button 'Don\'t show again'
      expect(page).not_to have_css '.alert.alert-info'
    end
    click_button 'Search'
    within '#content' do
      expect(page).not_to have_css '.alert.alert-info', text: 'You might see more results for your query'
    end
  end
end
