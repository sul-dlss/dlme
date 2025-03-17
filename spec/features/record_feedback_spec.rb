# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Record Feedback' do
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
        sleep 2
      end.to change { ActionMailer::Base.deliveries.count }.by(1)
    end

    expect(page).to have_css(
      '.flash_messages .alert-info',
      text: 'Thank you. Your feedback has been submitted.'
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
