# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RecordFeedbackController do
  let(:exhibit) { create(:exhibit) }
  let(:honeypot_field_name) { Spotlight::Engine.config.spambot_honeypot_email_field }

  before do
    request.env['HTTP_REFERER'] = 'http://test.host/'
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

  describe 'POST create' do
    context 'when recaptcha verification succeeds' do
      before do
        allow(controller).to receive(:verify_recaptcha).and_return(true)
      end

      it 'sends an email' do
        expect do
          post(
            :create,
            params: {
              exhibit_id: exhibit.id,
              id: 'abc123',
              contact_form: { name: 'Joe Doe', email: 'jdoe@example.com', message: 'Great record!', honeypot_field_name => '' }
            }
          )
        end.to change { ActionMailer::Base.deliveries.count }.by(1)
      end

      it 'redirects back' do
        post(
          :create,
          params: {
            exhibit_id: exhibit.id,
            id: 'abc123',
            contact_form: { name: 'Joe Doe', email: 'jdoe@example.com', message: 'Great record!', honeypot_field_name => '' }
          }
        )
        expect(response).to redirect_to 'http://test.host/'
      end

      it 'sets a flash message' do
        post(
          :create,
          params: {
            exhibit_id: exhibit.id,
            id: 'abc123',
            contact_form: { name: 'Joe Doe', email: 'jdoe@example.com', message: 'Great record!', honeypot_field_name => '' }
          }
        )
        expect(flash[:notice]).to eq 'Thank you. Your feedback has been submitted.'
      end
    end

    context 'when recaptcha verification fails' do
      before do
        allow(controller).to receive(:verify_recaptcha).and_return(false)
      end

      it 'alerts the failure in the flash message' do
        post :create, params: { exhibit_id: exhibit.id, id: 'abc123',
                                contact_form: { name: 'Joe Doe', email: 'jdoe@example.com', message: 'Great record!',
                                                honeypot_field_name => '' } }
        expect(flash[:alert]).to eq 'There was a problem submitting feedback.'
      end
    end
  end
end
