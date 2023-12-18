# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RecordFeedbackForm do
  context 'when validating feedback submission fields' do
    let(:form) { described_class.new(email: 'user@example.com') }
    let(:honeypot_field_name) { Spotlight::Engine.config.spambot_honeypot_email_field }

    it 'allows submissions that set a valid email address & message' do
      form.message = 'This is a great record'
      form.email = 'user@legitimatebusinesspersonssocialclub.biz'
      form.send(:"#{honeypot_field_name}=", '')
      expect(form).to be_valid
    end

    it 'rejects submissions that set an invalid email address' do
      form.message = 'This is a great record'
      form.email = 'user'
      form.send(:"#{honeypot_field_name}=", '')
      expect(form).not_to be_valid
    end

    it 'allows submissions that leave the spammer honeypot field blank' do
      form.message = 'This is a great record'
      form.send(:"#{honeypot_field_name}=", '')
      expect(form).to be_valid
    end

    it 'rejects submissions that set the spammer honeypot field' do
      form.message = 'This is a great record'
      form.send(:"#{honeypot_field_name}=", 'spam@spam.com')
      expect(form).not_to be_valid
    end

    it 'rejects submissions that do not set a message' do
      form.send(:"#{honeypot_field_name}=", '')
      expect(form).not_to be_valid
    end

    it 'allows submissions that do not include an email' do
      form.message = 'This is a great record'
      form.email = nil
      form.send(:"#{honeypot_field_name}=", '')
      expect(form).to be_valid
    end
  end

  describe '#headers' do
    it 'overrides the described_class.new key in the super class\' hash' do
      expect(described_class.new.headers[:subject]).to end_with 'item feedback'
    end
  end
end
