if defined?(Settings) && Settings.action_mailer
  if Settings.action_mailer.default_url_options
    Dlme::Application.config.action_mailer.default_url_options = Settings.action_mailer.default_url_options&.to_h || {}
  end

  if Settings.action_mailer.default_options
    Dlme::Application.config.action_mailer.default_options = Settings.action_mailer.default_options&.to_h || {}
  end

  if ENV['SMTP_ID']
    Dlme::Application.config.action_mailer.smtp_settings = {
      address: ENV['SMTP_HOST'],
      user_name: ENV['SMTP_ID'],
      password: ENV['SMTP_KEY']
    }
  end
end
