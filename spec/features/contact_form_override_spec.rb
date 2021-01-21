# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Contact form override', type: :feature do
  let!(:exhibit) { FactoryBot.create(:exhibit) }

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

    it 'accepts a problem report', js: true do
      visit spotlight.exhibit_path(exhibit)
      click_on 'Contact us'
      expect(page).to have_content 'To contact us about any matter related to DLME'
      expect(page).not_to have_css('.alert-primary') # We removed this markup from the spotlight form
      fill_in 'Your name', with: 'Some Body'
      fill_in 'Your email', with: 'test@example.com'
      fill_in 'Message', with: 'This is my problem report'

      expect do
        click_on 'Send'
      end.to change { ActionMailer::Base.deliveries.count }.by(1)
    end
  end
end
