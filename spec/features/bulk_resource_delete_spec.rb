# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Bulk delete can be run on search results' do # rubocop:disable RSpec/DescribeClass
  let(:exhibit) { create(:exhibit, published: true) }
  let(:curator) { create(:exhibit_curator, exhibit: exhibit) }
  let(:resource_1) { DlmeJson.new(json: json_1, metadata: metadata_1, exhibit: exhibit) }
  let(:resource_2) { DlmeJson.new(json: json_2, metadata: metadata_2, exhibit: exhibit) }
  let(:resource_3) { DlmeJson.new(json: json_3, metadata: metadata_3, exhibit: exhibit) }
  let(:resource_4) { DlmeJson.new(json: json_4, metadata: metadata_4, exhibit: exhibit) }
  let(:fixture_file_path_1) { File.join(fixture_path, 'json/bodleian.json') }
  let(:fixture_file_path_2) { File.join(fixture_path, 'json/embeddable.json') }
  let(:fixture_file_path_3) { File.join(fixture_path, 'json/iiif-single-image.json') }
  let(:fixture_file_path_4) { File.join(fixture_path, 'json/long-description.json') }
  let(:json_1) { File.open(fixture_file_path_1).read }
  let(:json_2) { File.open(fixture_file_path_2).read }
  let(:json_3) { File.open(fixture_file_path_3).read }
  let(:json_4) { File.open(fixture_file_path_4).read }
  let(:metadata_1) do
    { 'traject_context_command_line.filename' => fixture_file_path_1,
      'traject_context_source' => 'matching_resource' }
  end
  let(:metadata_2) do
    { 'traject_context_command_line.filename' => fixture_file_path_2,
      'traject_context_source' => 'not_in_the_original_search_results' }
  end
  let(:metadata_3) do
    { 'traject_context_command_line.filename' => fixture_file_path_3,
      'traject_context_source' => 'not_in_the_original_search_results' }
  end
  let(:metadata_4) do
    { 'traject_context_command_line.filename' => fixture_file_path_4,
      'traject_context_source' => 'matching_resource' }
  end

  before do
    perform_enqueued_jobs do
      resource_1.save_and_index
      resource_2.save_and_index
      resource_3.save_and_index
      resource_4.save_and_index
    end
  end

  after do
    allow(ResourceRemover).to receive(:remove_resource).and_call_original # undo any funny business from the individual tests

    # RSpec will clean up RDBMS entries automatically, but we also want to clean up solr entries after this test
    [resource_1, resource_2, resource_3, resource_4].each do |resource|
      ResourceRemover.remove_resource(resource: resource)
    end
  end

  context 'with a curator' do
    before do
      login_as curator
    end

    it 'deletes exactly the resources in the search results' do # rubocop:disable RSpec/ExampleLength
      visit root_path

      fill_in 'Search...', with: 'matching_resource'
      click_button 'Search'
      within '#documents' do
        expect(page).to have_css '.document', count: 2
      end

      click_button 'Bulk actions'
      click_link 'Delete items'
      perform_enqueued_jobs do
        click_button 'Delete'
      end

      job_tracker = Spotlight::JobTracker.recent.take # grab the most recent job tracker from the DB
      expect(job_tracker).to be_completed

      fill_in 'Search...', with: 'matching_resource'
      click_button 'Search'
      within '#documents' do
        expect(page).to have_css '.document', count: 0
      end

      fill_in 'Search...', with: 'not_in_the_original_search_results'
      click_button 'Search'
      within '#documents' do
        expect(page).to have_css '.document', count: 2
      end
    end

    context 'when an error is thrown trying to delete a resource' do
      before do
        allow(ResourceRemover).to receive(:remove_resource).and_raise(RSolr::Error::ConnectionRefused, 'network blip')
      end

      it 'gracefully handles the unexpected error and logs the event appropriately' do # rubocop:disable RSpec/ExampleLength
        visit root_path

        fill_in 'Search...', with: 'matching_resource'
        click_button 'Search'
        within '#documents' do
          expect(page).to have_css '.document', count: 2
        end

        click_button 'Bulk actions'
        click_link 'Delete items'
        perform_enqueued_jobs do
          click_button 'Delete'
        end

        job_tracker = Spotlight::JobTracker.recent.take # grab the most recent job tracker from the DB
        puts "JM_LOG job_tracker.status=#{job_tracker.status}"
        expect(job_tracker).to be_failed
      end
    end
  end

  context 'with an ordinary user' do
    it 'does not offer bulk delete' do
      visit root_path
      click_button 'Search'
      expect(page).not_to have_content 'Bulk actions'
      expect(page).not_to have_content 'Delete items'
    end
  end
end
