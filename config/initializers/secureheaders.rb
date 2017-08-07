SecureHeaders::Configuration.default do |config|
  config.cookies = {
    secure: true,
    httponly: true,
    samesite: {
      lax: true
    }
  }

  # thanks to sir-trevor..
  config.csp[:script_src] << '\'unsafe-eval\''

  # thanks to google analytics
  config.csp[:script_src] << '\'sha256-eIXp0Y9oGnpSZ5jWtc2F33FzWpsGCPLvAyFLl/D0nHo=\''
  config.csp[:script_src] << 'www.google-analytics.com'
  config.csp[:img_src] << 'www.google-analytics.com'

  if Rails.env.development? || Rails.env.test?
    config.cookies[:secure] = false
    config.hsts = SecureHeaders::OPT_OUT
    config.csp[:default_src] << 'http:'
    config.csp[:script_src] << 'http:'
  end
end
