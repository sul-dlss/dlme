# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Contact form override' do
  let!(:exhibit) { create(:exhibit) }

  describe 'when emails are setup' do
    before do
      exhibit.contact_emails_attributes = [{ 'email' => 'test@example.com' }, { 'email' => 'test2@example.com' }]
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
    it 'accepts a problem report', js: true do
      visit spotlight.exhibit_path(exhibit)
      click_on 'Contact us'
      expect(page).to have_content 'To contact us about any matter related to DLME'
      expect(page).to have_no_css('.alert-primary') # We removed this markup from the spotlight form
      fill_in 'Your name', with: 'Some Body'
      fill_in 'Your email', with: 'test@example.com'
      fill_in 'Message', with: 'This is my problem report'

      expect do
        click_on 'Send'
        expect(page).to have_content 'Your feedback has been submitted'
      end.to change { ActionMailer::Base.deliveries.count }.by(1)
    end
    # rubocop:enable RSpec/ExampleLength
  end
end
