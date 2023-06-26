# frozen_string_literal: true

##
# Subclass of Spotlight::ContactForm to inject our subject into the headers
# and change how the validations work under the RecordFeedbackForm context
class RecordFeedbackForm < Spotlight::ContactForm
  clear_validators! # Remove upstream validators and define our own.
  validates :message, presence: true
  validates :email, format: { with: /\A([\w\.%\+\-]+)@([\w\-]+\.)+([\w]{2,})\z/i }, allow_blank: true
  # the spambot_honeypot_email_field field is intended to be hidden visually from the user,
  # in hope that a spam bot filling out the form will enter a value, whereas a human with a
  # browser wouldn't, allowing us to differentiate and reject likely spam messages.
  # the field must be present, since we expect real users to just submit the form as-is w/o
  # hacking what fields are present.
  validates Spotlight::Engine.config.spambot_honeypot_email_field, length: { is: 0 }

  def headers
    super.merge(subject: I18n.t(:'record_feedback.email_subject'))
  end
end
