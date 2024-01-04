# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Contextual result message on search results' do
  let(:exhibit) { create(:exhibit, published: true) }
  let(:resource) { DlmeJson.new(json: json, metadata: metadata, exhibit: exhibit) }
  let(:fixture_file_path) { File.join(fixture_path, 'json/bodleian.json') }
  let(:json) { File.read(fixture_file_path) }
  let(:metadata) do
    { 'traject_context_command_line.filename' => fixture_file_path,
      'traject_context_source' => 'dlme_json_resource_spec' }
  end
  let(:query) { 'Kitāb' }

  before do
    perform_enqueued_jobs do
      resource.save_and_index
    end
    visit root_path
    fill_in 'Search...', with: query
    click_button 'Search'
  end

  context 'without a search term' do
    let(:query) { '' }

    it 'does not show the contextual pane' do
      within '#content' do
        expect(page).to have_no_css '.alert.alert-info'
      end
    end
  end

  it 'contains a link to contextual page' do
    within '#content' do
      expect(page).to have_css '.alert.alert-info', text: 'You might see more results for your query'
      click_button 'Don\'t show again'
      expect(page).to have_no_css '.alert.alert-info'
    end
  end

  it 'renders info alert, that is dismissable', js: true do
    within '#content' do
      expect(page).to have_css '.alert.alert-info', text: 'You might see more results for your query'
      click_button 'Dismiss'
      expect(page).to have_no_css '.alert.alert-info'
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
      expect(page).to have_no_css '.alert.alert-info'
    end
    click_button 'Search'
    within '#content' do
      expect(page).to have_no_css '.alert.alert-info', text: 'You might see more results for your query'
    end
  end
end
