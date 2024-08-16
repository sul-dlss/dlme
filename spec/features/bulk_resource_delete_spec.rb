# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Bulk delete can be run on search results' do
  let(:exhibit) { create(:exhibit, published: true) }
  let(:curator) { create(:exhibit_curator, exhibit: exhibit) }
  let(:bodleian_resource) { DlmeJson.new(json: bodleian_fixture.read, metadata: bodleian_metadata, exhibit: exhibit) }
  let(:embeddable_resource) { DlmeJson.new(json: embeddable_fixture.read, metadata: embeddable_metadata, exhibit: exhibit) }
  let(:iiif_single_image_resource) do
    DlmeJson.new(json: iiif_single_image_fixture.read, metadata: iiif_single_image_metadata, exhibit: exhibit)
  end
  let(:long_description_resource) do
    DlmeJson.new(json: long_description_fixture.read, metadata: long_description_metadata, exhibit: exhibit)
  end
  let(:bodleian_fixture) { file_fixture('json/bodleian.json') }
  let(:embeddable_fixture) { file_fixture('json/embeddable.json') }
  let(:iiif_single_image_fixture) { file_fixture('json/iiif-single-image.json') }
  let(:long_description_fixture) { file_fixture('json/long-description.json') }
  let(:bodleian_metadata) do
    { 'traject_context_command_line.filename' => bodleian_fixture.to_path,
      'traject_context_source' => 'matching_resource' }
  end
  let(:embeddable_metadata) do
    { 'traject_context_command_line.filename' => embeddable_fixture.to_path,
      'traject_context_source' => 'not_in_the_original_search_results' }
  end
  let(:iiif_single_image_metadata) do
    { 'traject_context_command_line.filename' => iiif_single_image_fixture.to_path,
      'traject_context_source' => 'not_in_the_original_search_results' }
  end
  let(:long_description_metadata) do
    { 'traject_context_command_line.filename' => long_description_fixture.to_path,
      'traject_context_source' => 'matching_resource' }
  end

  before do
    perform_enqueued_jobs do
      bodleian_resource.save_and_index
      embeddable_resource.save_and_index
      iiif_single_image_resource.save_and_index
      long_description_resource.save_and_index
    end
  end

  after do
    allow(ResourceRemover).to receive(:remove_resource).and_call_original # undo any funny business from the individual tests

    # RSpec will clean up RDBMS entries automatically, but we also want to clean up solr entries after this test
    [bodleian_resource, embeddable_resource, iiif_single_image_resource, long_description_resource].each do |resource|
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
        expect(job_tracker).to be_failed
      end
    end
  end

  context 'with an ordinary user' do
    it 'does not offer bulk delete' do
      visit root_path
      click_button 'Search'
      expect(page).to have_no_content 'Bulk actions'
      expect(page).to have_no_content 'Delete items'
    end
  end
end
