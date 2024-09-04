# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Contextual date sort message on search results' do
  let(:exhibit) { create(:exhibit, published: true) }
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
    visit root_path
    click_button 'Search'
  end

  context 'without a date sort applied' do
    it 'does not show the contextual pane' do
      within '#sort-dropdown' do
        click_button('Relevance')
        click_link('Title')
      end
      within '#content' do
        expect(page).to have_no_css '.date-sort-message'
      end
    end
  end

  it 'contains the contextual pane when old to new sort is applied' do
    within '#sort-dropdown' do
      click_button('Relevance')
      click_link('Date (old to new)')
    end
    within '#content' do
      expect(page).to have_css '.date-sort-message'
    end
  end

  it 'contains the contextual pane when new to old sort is applied' do
    within '#sort-dropdown' do
      click_button('Relevance')
      click_link('Date (new to old)')
    end
    within '#content' do
      expect(page).to have_css '.date-sort-message'
    end
  end

  # rubocop:disable RSpec/ExampleLength
  it 'renders info alert, that is dismissable', js: true do
    within '#sort-dropdown' do
      click_button('Relevance')
      click_link('Date (old to new)')
    end
    within '#content' do
      expect(page).to have_css '.date-sort-message'
      within '.date-sort-message' do
        click_button 'Dismiss'
      end
      expect(page).to have_no_css '.date-sort-message'
    end
    click_button 'Search'
    within '#content' do
      expect(page).to have_css '.date-sort-message'
    end
  end
  # rubocop:enable RSpec/ExampleLength

  # rubocop:disable RSpec/ExampleLength
  it 'renders info alert, that is not shown again in the session', js: true do
    within '#sort-dropdown' do
      click_button('Relevance')
      click_link('Date (old to new)')
    end
    within '#content' do
      expect(page).to have_css '.date-sort-message'
      within '.date-sort-message' do
        click_button "Don't show again"
      end
      expect(page).to have_no_css '.date-sort-message'
    end
    click_button 'Search'
    within '#content' do
      expect(page).to have_no_css '.date-sort-message'
    end
    # Quit the session so that the other tests can show the alert again
    Capybara.current_session.driver.quit
  end
  # rubocop:enable RSpec/ExampleLength
end
