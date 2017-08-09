# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: Settings.application.default_from
  layout 'mailer'
end
