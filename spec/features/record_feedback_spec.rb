# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Record Feedback', type: :feature do
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

    exhibit.contact_emails_attributes = [{ 'email' => 'test@example.com' }]
    exhibit.save!
    exhibit.contact_emails.first.tap do |e|
      if e.respond_to? :confirm
        e.confirm
      else
        e.confirm!
      end
    end
  end

  # rubocop:disable RSpec/ExampleLength
  it 'allows users to submit feedback', js: true do
    visit spotlight.exhibit_solr_document_path(exhibit_id: exhibit.slug, id: '36ebabd9-4d62-4d8e-8e7b-1afd048e872e')

    expect(page).to have_css('a.record-feedback', text: 'Feedback')
    click_link 'Feedback'

    expect(page).to have_css '#blacklight-modal', visible: :visible

    within '#blacklight-modal' do
      fill_in 'Question or comment', with: 'This record is one of the best I have seen all day'
      expect do
        click_button 'Send'
      end.to change { ActionMailer::Base.deliveries.count }.by(1)
    end

    expect(page).to have_css(
      '.flash_messages .alert-info',
      text: 'Your feedback has been submitted. Thank you. We will take care of it as soon as possible.'
    )
  end
  # rubocop:enable RSpec/ExampleLength

  it 'can get to the form w/o javascript' do
    visit spotlight.exhibit_solr_document_path(exhibit_id: exhibit.slug, id: '36ebabd9-4d62-4d8e-8e7b-1afd048e872e')

    expect(page).to have_css('a.record-feedback', text: 'Feedback')
    click_link 'Feedback'

    expect(page).to have_css('h1', text: 'Feedback')
    expect(current_url).to eq exhibit_record_feedback_url(exhibit_id: exhibit.slug, id: '36ebabd9-4d62-4d8e-8e7b-1afd048e872e')
  end
end
